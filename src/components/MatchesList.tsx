import useMatches from "../hooks/useMatches";
import React, { useState } from "react";
import { Match } from "../models/Match";
import MatchCard from "./MatchItem";

const MatchesList = () => {
  const {
    matches,
    error,
    loading,
  }: { matches: Match[]; error: any; loading: boolean } = useMatches();
  const [errorDisplayed, setErrorDisplayed] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        loading ...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error with fetching data occurs : {error?.message}
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {matches.map((match: Match, index: number) => (
          <MatchCard match={match} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MatchesList;
