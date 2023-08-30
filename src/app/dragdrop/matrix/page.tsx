"use client";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

export default function Page() {
  const [list, setList] = useState([
    ["Dragon", "Warrior", "Magician"],
    ["Goblin", "Elf", "Drawf"],
    ["Thor", "Loki", "Lucifer"]
  ]);

  const handleDragDrop: OnDragEndResponder = (results, provided) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const sourceRow = parseInt(source.droppableId)
      const destinationRow = parseInt(destination.droppableId)

      console.log(destination.index)
      
        const newList = [...list];

        const temp = newList[sourceRow][source.index]
        newList[sourceRow][source.index] = newList[destinationRow][destination.index]
        newList[destinationRow][destination.index] = temp
        setList(newList);

      // const [removed] = newList[sourceRow].splice(source.index, 1);
      // newList[destinationRow].splice(destination.index, 0, removed);
    }
  };

  const columnWidth = 200
  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="flex">
      {list.map((row, rowIndex) => (
        <Droppable droppableId={rowIndex.toString()} key={rowIndex} type="group">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}  className="border p-4 mb-4 mr-4"
          style={{ minWidth: `${columnWidth}px`, width: `${columnWidth}px` }}
        >
            {row.map((item, index) => (
              <Draggable
                draggableId={`${rowIndex}-${index}`}
                key={`${rowIndex}-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="border p-2 rounded-md"
                  >
                    <h3>{item}</h3>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
      
      ))}
      </div>
    </DragDropContext>
  );
}
