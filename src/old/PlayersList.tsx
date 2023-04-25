import PlayerItem from "./PlayerItem";

const PlayersList = (props: {
  players: any[];
  onSquadChange: (playerName: string) => void;
  squad: boolean;
}) => {
  return (
    <div className="flex  align-center flex-col">
      <h2 className=" text-center font-bold ">
        {props.squad ? "sklad" : "rezerwa "}
      </h2>
      <ul>
        {props.players
          .sort((a, b) => (a.numerZawodnika > b.numerZawodnika ? 1 : -1))
          .map((player) => (
            <PlayerItem
              key={Math.random().toString(36).substr(2, 9)}
              onPlayerChange={() => props.onSquadChange(player.nazwa)}
              player={player}
              squad={props.squad}
            />
          ))}
      </ul>
    </div>
  );
};

export default PlayersList;
