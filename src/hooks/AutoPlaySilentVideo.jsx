import React, { useEffect } from "react"

export default function AutoPlaySilentVideo({
  video,
  videoRef,
  className,
  poster
}) {

  return (
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
  );
}