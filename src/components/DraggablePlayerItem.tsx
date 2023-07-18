import { Draggable } from "react-beautiful-dnd";
import PlayerItem from "./PlayerItem";
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
    <Draggable draggableId={player._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-blue-400" // Add tailwind classes here
        >
          <PlayerItem
            player={player}
            handleClick={(player: Player) => console.log("fdgd")}
          />
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePlayerItem;
