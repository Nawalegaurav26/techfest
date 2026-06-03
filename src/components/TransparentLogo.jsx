import { useState, useEffect } from 'react';

export default function TransparentLogo({ src, alt, className = '', threshold = 40 }) {
  const [processedSrc, setProcessedSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // If pixel is black or very dark, make it fully transparent (alpha = 0)
        if (r < threshold && g < threshold && b < threshold) {
          data[i+3] = 0;
        }
      }
      
      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src, threshold]);

  if (!processedSrc) {
    // Show a loading style until canvas processing finishes
    return (
      <div className={`animate-pulse bg-white/5 flex items-center justify-center border border-white/10 ${className}`}>
        <span className="text-[8px] font-mono text-white/40 tracking-widest">[LOADING_LOGO]</span>
      </div>
    );
  }

  return <img src={processedSrc} alt={alt} className={className} />;
}
