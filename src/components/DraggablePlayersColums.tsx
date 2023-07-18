import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Player } from "../models/Player";
import { players } from "../assets/samplePlayers";

interface Column {
  id: string;
  title: string;
  players: Player[];
}

interface Columns {
  [key: string]: Column;
}

const initialData: Columns = {
  column1: {
    id: "column1",
    title: "Column 1",
    players: players,
  },
  column2: {
    id: "column2",
    title: "Column 2",
    players: [],
  },
  column3: {
    id: "column3",
    title: "Column 3",
    players: [],
  },
};

const DraggablePlayersColumns: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourcePlayers = [...sourceColumn.players];
    const destPlayers = [...destColumn.players];
    const [removed] = sourcePlayers.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourcePlayers.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [sourceColumn.id]: { ...sourceColumn, players: sourcePlayers },
      });
    } else {
      destPlayers.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [sourceColumn.id]: { ...sourceColumn, players: sourcePlayers },
        [destColumn.id]: { ...destColumn, players: destPlayers },
      });
    }
  };

  return (
    <div className="flex justify-center pt-8">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(columns).map((column) => (
          <div className="w-64 mx-2 bg-blue-100 p-2 rounded" key={column.id}>
            <h2 className="text-lg font-bold">{column.title}</h2>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`py-4 pb-14 px-2 mt-2 mb-8 space-y-2 ${
                    snapshot.isDraggingOver ? "bg-blue-200" : ""
                  }`}
                >
                  {column.players.map((player, index) => (
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
                          className={`p-2 bg-white rounded shadow ${
                            snapshot.isDragging ? "bg-blue-300" : ""
                          }`}
                        >
                          {player.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default DraggablePlayersColumns;
