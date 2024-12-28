import React, { useEffect } from "react"

export default function AutoPlaySilentVideo({
  video,
  videoRef,
  className,
}) {
  useEffect(() => {
    videoRef.current.defaultMuted = true;
  })

  return (
    <video
      className={className}
      ref={videoRef}
      loop
      muted
      playsInline
    >
      <source src={video} type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
  );
}