"use client";

import { useOrganization } from "@clerk/nextjs";

import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { useEffect } from "react";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

interface AccessTokenResponse {
  token: string;
}

const fetchAccessToken = async () => {
  const response = await fetch(
    "https://bridge-agora-server.onrender.com/access-token?channelName=bridge"
  );
  const data: AccessTokenResponse = await response.json();
  return data.token;
};

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();

  // useEffect(() => {
  //   const fetchAndStoreToken = async () => {
  //     let agoraAccessToken = localStorage.getItem("agoraAccessToken");

  //     if (!agoraAccessToken) {
  //       agoraAccessToken = await fetchAccessToken();
  //       localStorage.setItem("agoraAccessToken", agoraAccessToken);
  //     }
  //   };

  //   fetchAndStoreToken();
  // }, []);

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
