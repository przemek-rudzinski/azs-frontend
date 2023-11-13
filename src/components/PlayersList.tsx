import usePlayers from "../hooks/usePlayers";
import { Player } from "../models/Player";
import PlayerItem from "./PlayerItem";
import { useState } from "react";
import EditPlayerModal from "./EditPlayerModal";

export type PlayersListProps = {
  players: Player[];
  error: any;
  loading: boolean;
  refetch: () => void;
};

const PlayersList = ({
  players,
  error,
  loading,
  refetch,
}: PlayersListProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>();

  const handlePlayerClick = (player: Player) => {
    console.log("clicked");
    setSelectedPlayer(player);
  };

  const handleModalClose = () => {
    setSelectedPlayer(undefined);
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
      {selectedPlayer && (
        <EditPlayerModal
          player={selectedPlayer}
          onClose={handleModalClose}
          refetch={refetch}
        />
      )}
      <h1 className="text-green-600 text-2xl font-bold p-4">Players</h1>
      {players.map((player: Player) => (
        <PlayerItem
          key={player._id}
          player={player}
          handleClick={() => handlePlayerClick(player)}
        />
      ))}
    </div>
  );
};

export default PlayersList;
