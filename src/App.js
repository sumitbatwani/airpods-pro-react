import React, { useEffect } from 'react';

const IMAGE_URL =
  'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/';

const App = () => {
  let canvasRef = React.createRef();
  const html = document.documentElement;
  const frameCount = 148;

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const initialFrameSetup = (img, ctx) => {
    img.src = currentFrame(1);
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  };
  const updateImage = (index, img, ctx) => {
    img.src = currentFrame(index);
    ctx.drawImage(img, 0, 0);
  };

  const onScroll = (img, ctx) => {
    window.addEventListener('scroll', () => {
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );
      requestAnimationFrame(() => updateImage(frameIndex + 1, img, ctx));
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    initialFrameSetup(img, ctx);
    preloadImages();
    onScroll(img, ctx);
  }, []);

  const currentFrame = (index) =>
    `${IMAGE_URL}${index.toString().padStart(4, '0')}.jpg`;

  return (
    <div>
      <canvas ref={canvasRef} id='hero-apple' width={1158} height={770} />
    </div>
  );
};

export default App;
