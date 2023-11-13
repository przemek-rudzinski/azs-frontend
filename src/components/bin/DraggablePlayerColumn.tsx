// DraggablePlayerColumn.tsx

import { Droppable, Draggable } from "react-beautiful-dnd";
import { Player } from "../../models/Player";
import DraggablePlayerItem from "../DraggablePlayerItem";

interface DraggablePlayerColumnProps {
  column: string;
  players: Player[];
}

const DraggablePlayerColumn = ({
  column,
  players,
}: DraggablePlayerColumnProps) => {
  console.log("Rendering DraggablePlayerColumn", column, players);

  return (
    <Droppable droppableId={column}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-red-200 p-4 rounded-md w-1/3 px-2" // Add tailwind classes here
        >
          <h2>{column}</h2>
          {players.map((player: Player, index: number) => {
            console.log(
              `Rendering draggable for player ${player.name} at index ${index}`
            );
            return (
              <Draggable
                key={player._id}
                draggableId={player._id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DraggablePlayerItem player={player} index={index} />
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DraggablePlayerColumn;
