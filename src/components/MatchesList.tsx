import useMatches from "../hooks/useMatches";
import React, { useState } from "react";
import { Match } from "../models/Match";
import MatchCard from "./MatchItem";
import { useNavigate } from "react-router-dom";

const MatchesList = () => {
  const navigate = useNavigate();
  const id = "match_f6k1jaxkk6";
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
    <div className="flex flex-col">
      <div className="flex justify-center p-6">
        <button
          className="bg-green-200 shadow z-50 flex-none w-50 h-15 p-2 px-4 rounded-lg text-green-600 font-bold text-2xl hover:bg-green-500 hover:text-white"
          onClick={() => navigate("new-match")}
        >
          New Match
        </button>
        <button
          className="bg-green-200 shadow z-50 flex-none w-50 h-15 p-2 px-4 rounded-lg text-green-600 font-bold text-2xl hover:bg-green-500 hover:text-white"
          onClick={() => navigate(`player-match/${id}`)}
        >
          player Match
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {matches.map((match: Match, index: number) => (
          <MatchCard match={match} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MatchesList;
