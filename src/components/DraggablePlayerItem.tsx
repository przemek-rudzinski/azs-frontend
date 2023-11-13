import { Draggable } from "react-beautiful-dnd";
import PlayerItem, { FindImg } from "./PlayerItem";
import { Player } from "../models/Player";

type DraggablePlayerItemProps = {
  player: Player;
  index: number;
};

const DraggablePlayerItem: React.FC<DraggablePlayerItemProps> = ({
  player,
  index,
}) => {
  return (
    <Draggable key={player._id} draggableId={player._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-50 m-5 my-2 p-2 flex flex-row basis-1 w-80 justify-between shadow-xl rounded-lg hover:shadow-lg hover:border hover:border-green-500 hover:transform hover:-translate-y-1 transition-all duration-200 "
        >
          <>
            {player ? (
              <div className="flex flex-row items-center ">
                <FindImg name={player.name} />
                <p className="flex m-1 text-lg">{player.number}. </p>
                <p className="flex m-1 text-lg">{player.name}</p>
              </div>
            ) : null}
          </>
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePlayerItem;
