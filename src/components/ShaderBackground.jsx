import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported by this browser.');
      return;
    }

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      gl.viewport(0, 0, w, h);
    };
    window.addEventListener('resize', onResize);

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (Adapted from Stitch-generated Cybernetic Shader)
    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        vec3 finalColor = vec3(0.0);

        // Scrolling particle field
        for(float i=0.0; i<45.0; i++) {
          float speed = 0.15 + hash(vec2(i, 1.2)) * 0.45;
          vec2 p = vec2(
            hash(vec2(i, 2.3)) * 2.0 - 1.0,
            fract(hash(vec2(i, 3.4)) - u_time * speed * 0.15) * 2.0 - 1.0
          );
          
          float d = length(uv - p);
          float glow = 0.0009 / d;
          
          // Electric Sky Blue particles
          vec3 color = vec3(0.22, 0.74, 0.97) * hash(vec2(i, 4.5));
          finalColor += glow * color;
        }

        // Cyber grid lines
        vec2 gridUv = fract(v_texCoord * 24.0);
        float grid = smoothstep(0.015, 0.0, abs(gridUv.x - 0.5)) + smoothstep(0.015, 0.0, abs(gridUv.y - 0.5));
        finalColor += grid * vec3(0.03, 0.18, 0.28) * 0.35;

        // Subtle vignette-like shading inside shader
        float distToCenter = length(v_texCoord - 0.5);
        finalColor *= smoothstep(1.2, 0.2, distToCenter);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Shader compiler helper
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Link Program
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, 'u_time');
    const uResolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLocation = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: w / 2, y: h / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * w;
        mouse.y = ny * h;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const render = (time) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.02, 0.02, 0.03, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLocation, time * 0.001);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(uMouseLocation, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
