import React from "react";
import { Match } from "../models/Match";

type Props = {
  match: Match;
};

const MatchCard = ({ match }: Props) => {
  return (
    <div className=" bg-white rounded-lg shadow-md p-6 m-4 hover:shadow-lg hover:border hover:border-green-500 hover:transform hover:-translate-y-1 transition-all duration-200 ">
      <div className="flex justify-center mt-4">
        <h2 className="text-base ">
          {match.homeTeam} vs. {match.guestTeam}
        </h2>
      </div>
      <div className="flex justify-center mt-4">
        <h1 className="text-xl font-medium">
          {match.homeScore} : {match.guestScore}{" "}
        </h1>
      </div>
      <div className="flex justify-between mt-4">
        <div>{match.date}</div>
        <div>{match.place}</div>
      </div>
    </div>
  );
};

export default MatchCard;
