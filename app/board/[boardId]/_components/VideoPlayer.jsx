import React, { useEffect, useRef } from "react";

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div
      className="outline outline-1 border p-4 rounded-md"
      style={{ borderColor: "rgb(156 163 175 / 1)" }}
    >
      <div ref={ref} style={{ width: "200px", height: "200px" }}></div>
    </div>
  );
};
