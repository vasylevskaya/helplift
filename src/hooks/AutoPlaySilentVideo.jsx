import React, { useEffect } from "react"

export default function AutoPlaySilentVideo({
  video,
  videoRef,
  className,
  poster
}) {

  useEffect(() => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }, [])


  return (
    <video
      id={video} /* delete later */
      className={className}
      ref={videoRef}
      muted
      playsInline
      //poster={poster}
      preload="auto" 
      autoPlay
    >
      <source src={video} type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
  );
}