"use client";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

export default function Page() {
  const [list, setList] = useState(["Dragon", "Warrior", "Magician"]);

  const handleDragDrop: OnDragEndResponder = (results, provided) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const newList = [...list];
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      setList(newList);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable
                draggableId={item.toString()}
                key={item.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <h3>{item}</h3>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
