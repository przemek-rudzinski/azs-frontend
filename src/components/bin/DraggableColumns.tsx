import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Item {
  id: string;
  name: string;
}

interface Column {
  id: string;
  title: string;
  items: Item[];
}

interface Columns {
  [key: string]: Column;
}

const initialData: Columns = {
  column1: {
    id: "column1",
    title: "Column 1",
    items: [
      { id: "item1", name: "First task" },
      { id: "item2", name: "Second task" },
      { id: "item3", name: "Third task" },
    ],
  },
  column2: {
    id: "column2",
    title: "Column 2",
    items: [],
  },
  column3: {
    id: "column3",
    title: "Column 3",
    items: [],
  },
};

const DraggableColumns: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [sourceColumn.id]: { ...sourceColumn, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [sourceColumn.id]: { ...sourceColumn, items: sourceItems },
        [destColumn.id]: { ...destColumn, items: destItems },
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
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
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
                          {item.name}
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

export default DraggableColumns;
