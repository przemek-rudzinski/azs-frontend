import usePlayers from "../hooks/usePlayers";
import PlayerItem from "./PlayerItem";

const PlayersList = () => {
  const { players, error, loading }: any = usePlayers();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        loading ...
      </div>
    );
  }
  if (error) {
    return <div>Error loading players: {error.message}</div>;
  }

  return (
    <div>
      <p>Players</p>
      {players.map((player: any) => (
        <PlayerItem key={player._id} player={player} />
      ))}
    </div>
  );
};

export default PlayersList;
