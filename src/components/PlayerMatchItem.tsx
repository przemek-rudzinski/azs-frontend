import { Player } from "../models/Player";
import { PlayerMatch } from "../models/PlayerMatch";
import { FindImg } from "./PlayerItem";

const PlayerMatchItem = ({
  player,
  handleClick,
}: {
  player: PlayerMatch;
  handleClick: any;
}) => {
  return (
    <>
      {player ? (
        <li
          onClick={() => handleClick(player)}
          className="bg-gray-50 m-5 p-2 flex flex-row basis-1 w-80 justify-between shadow-xl rounded-lg hover:shadow-lg hover:border hover:border-green-500 hover:transform hover:-translate-y-1 transition-all duration-200 "
        >
          <div className="flex flex-row items-center ">
            <FindImg name={player.playerName} />
            <p className="flex m-1 text-lg">{player.playerNumber}. </p>
            <p className="flex m-1 text-lg">{player.playerName}</p>
          </div>
        </li>
      ) : null}
    </>
  );
};

export default PlayerMatchItem;
