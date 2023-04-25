const FindImg = (proops: { name: string }) => {
  let imgPath = "";
  try {
    imgPath = require("../images/" + proops.name + ".png");
  } catch (err) {
    imgPath = require("../images/Bongo.png");
  }
  console.log(imgPath);
  return (
    <img
      src={imgPath}
      alt={proops.name}
      width={70}
      height={70}
      style={{ borderRadius: "50%", margin: 5 }}
    />
  );
};

const PlayerItem = (props: {
  player: any;
  onPlayerChange: any;
  squad: boolean;
}) => {
  return (
    <>
      {props.player.sklad === props.squad ? (
        <li className="bg-gray-50 m-5 p-2 flex flex-row basis-1 w-80 justify-between shadow-xl rounded-lg">
          <div className="flex flex-row items-center ">
            <FindImg name={props.player.playerName} />
            <input
              className="w-10 text-xl"
              placeholder={props.player.numerZawodnika.toString()}
            />
            <p className="flex m-1 text-lg">{props.player.playerName}</p>
          </div>
          <div className="flex items-center">
            <button
              className=" bg-green-200  shadow z-50 flex-none w-14 h-10 m-2 p-1 px-2  rounded-lg text-green-600 font-bold text-lg hover:bg-green-500 hover:text-white"
              onClick={props.onPlayerChange}
              value={props.player.playerName}
            >
              {props.squad ? "out" : "in"}
            </button>
          </div>
        </li>
      ) : null}
    </>
  );
};

export default PlayerItem;
