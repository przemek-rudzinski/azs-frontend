import { PlayerMatch } from "../models/PlayerMatch";
import PlayerMatchItem from "./PlayerMatchItem";

type PlayersMatchListProps = {
  players: PlayerMatch[];
  error: any;
  loading: boolean;
  refetch: () => void;
};

const PlayersMatchList = ({
  players,
  error,
  loading,
  refetch,
}: PlayersMatchListProps) => {
  const handlePlayerClick = (player: PlayerMatch) => {
    console.log(player);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        loading ...
      </div>
    );
  }
  if (error) {
    <div className="flex items-center justify-center h-screen">
      some error occured
    </div>;
  }

  return (
    <div>
      <h1 className="text-green-600 text-2xl font-bold p-4">Players</h1>
      {players.map((player: PlayerMatch) => (
        <PlayerMatchItem
          key={player._id}
          player={player}
          handleClick={() => handlePlayerClick(player)}
        />
      ))}
    </div>
  );
};

export default PlayersMatchList;
