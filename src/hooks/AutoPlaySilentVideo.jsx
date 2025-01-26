import React, { useEffect } from "react"

export default function AutoPlaySilentVideo({
  video,
  videoRef,
  className,
  poster
}) {

  useEffect(() => { /* Preload videos, especially important for IOS */
    // Ensure that videoRef.current is a valid DOM element
    const videoElement = videoRef.current;
    videoElement.load();
    if (videoElement) {
  
      // Define the event handler
      const handleCanPlayThrough = () => {
        console.log("Video is fully loaded and can play through.");
        videoElement.play();
        videoElement.pause();
        //videoElement.currentTime = 0;
        videoElement.removeEventListener("canplaythrough", handleCanPlayThrough);
      };
  
      // Add the event listener only when the video element is available
      videoElement.addEventListener("canplaythrough", handleCanPlayThrough);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        if (videoElement) {
          videoElement.removeEventListener("canplaythrough", handleCanPlayThrough);
        }
      };
    }
  }, []);

  return (
    <video
    onLoad={() => console.log('loaded')}
      className={className}
      ref={videoRef}
      muted
      playsInline
      poster={poster}
    >
      <source src={video} type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
  );
}