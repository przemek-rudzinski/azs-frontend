// CreatePlayerMatchPage.tsx

import { useState, useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import axios from "../api/axios";
import { Player } from "../models/Player";
import usePlayers from "../hooks/usePlayers";
import DraggablePlayerColumn from "../components/DraggablePlayerColumn";

type TeamState = {
  squad: Player[];
  bench: Player[];
  rest: Player[];
};

const CreatePlayerMatchPage = () => {
  const { players: initialPlayers, error, loading, refetch } = usePlayers();
  const [team, setTeam] = useState<TeamState>({
    squad: [],
    bench: [],
    rest: [],
  });

  useEffect(() => {
    if (initialPlayers.length > 0) {
      setTeam({
        squad: initialPlayers.slice(0, 2),
        bench: initialPlayers.slice(2, 4),
        rest: initialPlayers.slice(4, 6),
      });
    }
  }, [initialPlayers]);

  const onDragEnd = (result: DropResult) => {
    // Drag and drop logic
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="columns"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Droppable droppableId="squad">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-red-200 p-4 rounded-md w-1/3 px-2"
            >
              <h2>Squad</h2>
              <DraggablePlayerColumn column="squad" players={team.squad} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="bench">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-red-200 p-4 rounded-md w-1/3 px-2"
            >
              <h2>Bench</h2>
              <DraggablePlayerColumn column="bench" players={team.bench} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="rest">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-red-200 p-4 rounded-md w-1/3 px-2"
            >
              <h2>Rest</h2>
              <DraggablePlayerColumn column="rest" players={team.rest} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <button className="button is-primary">Create Player Match</button>
    </DragDropContext>
  );
};

export default CreatePlayerMatchPage;
