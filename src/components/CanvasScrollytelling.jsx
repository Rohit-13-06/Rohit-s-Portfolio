import React, { useRef, useEffect, useState } from 'react';
import { useMotionValueEvent, motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES = 240;

export default function CanvasScrollytelling({ scrollProgress, onLoaded, rotateX, rotateY }) {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesRef = useRef([]);
  const hasPreloaded = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  // --- Image Preloading ---
  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    if (hasPreloaded.current) return;
    hasPreloaded.current = true;

    let loadedCount = 0;
    
    // Safety timeout
    const forceLoadTimeout = setTimeout(() => {
      if (loadedCount < TOTAL_FRAMES) {
        if (onLoaded) onLoaded();
      }
    }, 15000); // Increased timeout for larger frame count or slower loading

    const onLoad = () => {
      loadedCount++;
      setImagesLoaded(loadedCount);
      
      if (loadedCount === TOTAL_FRAMES) {
        clearTimeout(forceLoadTimeout);
        requestAnimationFrame(() => drawFrame(scrollProgress.get()));
        if (onLoaded) onLoaded();
      }
    };

    const preloadSequence = () => {
      // Use desktop flow for both mobile and desktop as requested
      const framePath = "/desktop-flow-new/ezgif-frame-";

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const framePad = String(i).padStart(3, '0');
        
        img.onload = onLoad;
        img.onerror = onLoad;
        
        img.src = `${framePath}${framePad}.png`;
        imagesRef.current[i - 1] = img;
      }
    };

    preloadSequence();
    return () => clearTimeout(forceLoadTimeout);
  }, []);

  // Frame Drawing Logic
  const drawFrame = (progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const remapped = Math.min(1, progress / 0.8);
    const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(remapped * TOTAL_FRAMES)));
    const targetImage = imagesRef.current[frameIndex];

    if (targetImage && targetImage.complete && targetImage.width > 0) {
      const hRatio = canvas.width / targetImage.width;
      const vRatio = canvas.height / targetImage.height;
      
      // Fit width (1.0x) on mobile to show background above/below, keep cover (1.35x) on desktop
      const ratio = isMobile ? hRatio * 1.0 : Math.max(hRatio, vRatio) * 1.35; 
      
      const drawW = Math.round(targetImage.width * ratio);
      const drawH = Math.round(targetImage.height * ratio);
      
      const centerShift_x = Math.round((canvas.width - drawW) / 2);
      // Perfect vertical centering on mobile to reveal background above and below
      const centerShift_y = Math.round((canvas.height - drawH) / 2);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        targetImage, 
        0, 0, targetImage.width, targetImage.height,
        centerShift_x, centerShift_y, drawW, drawH
      );
      
      // Surgical "Veo" watermark cover: Solid mask to exactly hide the logo on mobile
      if (isMobile) {
        // Precise coordinates relative to the bottom-right corner of the drawn frame
        const maskWidth = 65;
        const maskHeight = 35;
        const maskX = centerShift_x + drawW - maskWidth - 5; 
        const maskY = centerShift_y + drawH - maskHeight - 15;
        
        // Use solid background color for perfect concealment
        ctx.fillStyle = '#050505';
        ctx.fillRect(maskX, maskY, maskWidth, maskHeight);
        
        // Optional: Very subtle feathered edge to blend
        const gradient = ctx.createRadialGradient(
          maskX + maskWidth/2, maskY + maskHeight/2, maskWidth/2,
          maskX + maskWidth/2, maskY + maskHeight/2, maskWidth
        );
        gradient.addColorStop(0, 'rgba(5, 5, 5, 1)');
        gradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(maskX - 10, maskY - 10, maskWidth + 20, maskHeight + 20);
      }
    }
  };

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    requestAnimationFrame(() => drawFrame(latest));
  });

  const canvasOpacity = useSpring(useTransform(scrollProgress, [0.75, 0.82], [1, 0]), { damping: 20 });
  const canvasScale = useSpring(useTransform(scrollProgress, [0.75, 0.82], [1, 1.2]), { damping: 20 });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
      setIsMobile(window.innerWidth < 768);
      drawFrame(scrollProgress.get());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollProgress]);

  // Redraw when images count changes
  useEffect(() => {
    if (imagesLoaded === TOTAL_FRAMES) {
      drawFrame(scrollProgress.get());
    }
  }, [imagesLoaded, scrollProgress]);

  return (
    <>
      <AnimatePresence>
        {imagesLoaded < TOTAL_FRAMES && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              position: 'fixed', 
              top: 0, left: 0, 
              width: '100%', height: '100vh', 
              background: '#050505', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.5rem', 
              zIndex: 100 
            }}
          >
            <div style={{ color: '#fff', fontFamily: 'var(--font-headline)', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.8 }}>
              LOADING...
            </div>
            
            <div style={{ width: '240px', height: '1px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <motion.div 
                style={{ 
                  height: '100%', 
                  background: 'var(--bm-primary)', 
                  width: `${(imagesLoaded / TOTAL_FRAMES) * 100}%`
                }} 
              />
            </div>

            <div style={{ color: 'var(--bm-primary)', fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.6 }}>
              {Math.floor((imagesLoaded / TOTAL_FRAMES) * 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <motion.canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100vh', 
            opacity: canvasOpacity,
            scale: canvasScale,
            rotateX,
            rotateY,
            imageRendering: 'crisp-edges',
            willChange: 'transform, opacity',
            // Advanced galactic vignette blending
            maskImage: 'radial-gradient(circle at center, black 40%, rgba(0,0,0,0.8) 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, rgba(0,0,0,0.8) 70%, transparent 100%)',
          }} 
        />
        
      </div>
    </>
  );
}
