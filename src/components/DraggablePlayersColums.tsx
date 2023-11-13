import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Player } from "../models/Player";
import DraggablePlayerItem from "./DraggablePlayerItem";
interface Column {
  id: string;
  title: string;
  players: Player[];
}

interface Columns {
  [key: string]: Column;
}

const DraggablePlayersColumns = ({
  players: initialPlayers,
  refetch,
}: {
  players: Player[];
  refetch: any;
}) => {
  const [columns, setColumns] = useState<Columns>({});

  useEffect(() => {
    // Set initial data when players prop changes
    setColumns({
      column1: {
        id: "column1",
        title: "Players",
        players: initialPlayers,
      },
      column2: {
        id: "column2",
        title: "Squad",
        players: [],
      },
      column3: {
        id: "column3",
        title: "Bench",
        players: [],
      },
    });
  }, [initialPlayers]);

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
          <Droppable key={column.id} droppableId={column.id}>
            {(provided, snapshot) => (
              <div
                className={`w-96 mx-10 bg-blue-100 rounded ${
                  snapshot.isDraggingOver ? "bg-red-500" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-lg font-bold">{column.title}</h2>
                <div className="flex flex-col justify-center ">
                  {column.players.map((player, index) => (
                    <DraggablePlayerItem player={player} index={index} />
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default DraggablePlayersColumns;
