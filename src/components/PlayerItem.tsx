import { Player } from "../models/Player";

export const FindImg = ({ name }: any) => {
  let imgPath = "";
  const imgString = `../images/${name}.png`;
  console.log(imgString);
  try {
    imgPath = require("../images/" + name + ".png");
  } catch (err) {
    try {
      imgPath = require("../images/Bongo.png");
    } catch (err) {}
  }
  return (
    <img
      src={imgPath}
      alt={name}
      width={70}
      height={70}
      style={{ borderRadius: "50%", margin: 5 }}
    />
  );
};

const PlayerItem = ({
  player,
  handleClick,
}: {
  player: Player;
  handleClick: (player: Player) => void;
}) => {
  // const handleClick = () => {
  //   console.log("clicked");
  // };
  return (
    <>
      {player ? (
        <li
          onClick={() => handleClick(player)}
          className="bg-gray-50 m-5 p-2 flex flex-row basis-1 w-80 justify-between shadow-xl rounded-lg hover:shadow-lg hover:border hover:border-green-500 hover:transform hover:-translate-y-1 transition-all duration-200 "
        >
          <div className="flex flex-row items-center ">
            <FindImg name={player.name} />
            <p className="flex m-1 text-lg">{player.number}. </p>
            <p className="flex m-1 text-lg">{player.name}</p>
          </div>
        </li>
      ) : null}
    </>
  );
};

export default PlayerItem;
