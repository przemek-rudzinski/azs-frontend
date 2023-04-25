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
  //console.log("duupa");
  // console.log(imgPath);
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

const PlayerItem = ({ player }: any) => {
  return (
    <>
      {player ? (
        <li className="bg-gray-50 m-5 p-2 flex flex-row basis-1 w-80 justify-between shadow-xl rounded-lg">
          <div className="flex flex-row items-center ">
            <FindImg name={player.playerName} />
            <p className="flex m-1 text-lg">{player.playerNumber}. </p>
            <p className="flex m-1 text-lg">{player.playerName}</p>
          </div>
          <div className="flex items-center">
            <button
              className=" bg-green-200  shadow z-50 flex-none w-14 h-10 m-2 p-1 px-2  rounded-lg text-green-600 font-bold text-lg hover:bg-green-500 hover:text-white"
              onClick={() => {
                console.log("change");
              }}
              value={player.playerName}
            >
              {player ? "out" : "in"}
            </button>
          </div>
        </li>
      ) : null}
    </>
  );
};

export default PlayerItem;
