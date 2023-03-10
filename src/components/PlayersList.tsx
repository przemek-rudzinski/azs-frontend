import usePlayers from "../hooks/usePlayers";

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
        <div key={player._id}>
          {player.playerName} on field: {JSON.stringify(player)}
        </div>
      ))}
    </div>
  );
};

export default PlayersList;
