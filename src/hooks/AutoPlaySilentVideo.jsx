import React, { useEffect, useState } from "react"
import Loader from "../components/Loader";

export default function AutoPlaySilentVideo({
  video,
  videoRef,
  className,
  poster
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { /* Preload videos, especially important for IOS */
    // Ensure that videoRef.current is a valid DOM element
    const videoElement = videoRef.current;
    videoElement.load();
    if (videoElement) {
  
      // Define the event handler
      const handleCanPlayThrough = () => {
        videoElement.play();
        videoElement.pause();
        //videoElement.currentTime = 0;
        videoElement.removeEventListener("canplaythrough", handleCanPlayThrough);
        //console.log("Video is fully loaded and can play through.");
        setIsLoading(false)
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
    <>
      {isLoading && <Loader style={{ zIndex: 50 }}/>}
      <video
        className={className}
        ref={videoRef}
        muted
        playsInline
        poster={poster}
      >
        <source src={video} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </>
    
  );
}