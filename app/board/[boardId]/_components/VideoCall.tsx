import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { VideoRoom } from "./VideoRoom";

const VideoCall = () => {
  const [joined, setJoined] = useState(false);

  const fetchAccessToken = async () => {
    const response = await fetch(
      "https://bridge-agora-server.onrender.com/access-token?channelName=bridge"
    );
    const data = await response.json();
    return data.token;
  };

  const handleJoinRoom = async () => {
    const url = new URL(window.location.href);
    let currToken = url.searchParams.get("code");
    if (!currToken) {
      const token = await fetchAccessToken();
      const newUrl = window.location.href + "?code=" + token;
      console.log("newUrl : ", newUrl);
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
    setJoined(true);
  };

  return (
    <div className="absolute h-[80vh] w-[20vw] bottom-5 right-2 bg-gray-300 dark:bg-white rounded-lg p-3 flex items-center shadow-md overflow-y-scroll">
      <div className="flex flex-col justify-center items-center m-auto gap-2">
        <h1 className="text-gray-200 dark:text-black">Bridge Virtual Call</h1>

        {!joined && (
          <Button
            className="outline outline-1"
            onClick={() => handleJoinRoom()}
          >
            Join Room
          </Button>
        )}

        {joined && <VideoRoom />}
      </div>
    </div>
  );
};

export default VideoCall;
