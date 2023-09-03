"use client";

import { Game } from "@/libs/games/Game";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd";

interface GamePageOptions {
  params: { id: string };
}

export default function Page(options: GamePageOptions) {
  const [game, setGame] = useState<Game>(new Game({ id: options.params.id }));


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
      

        const temp = game.board[sourceRow][source.index]
        game.board[sourceRow][source.index] = game.board[destinationRow][destination.index]
        game.board[destinationRow][destination.index] = temp
        setGame(game);

      // const [removed] = newList[sourceRow].splice(source.index, 1);
      // newList[destinationRow].splice(destination.index, 0, removed);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="m-8 flex flex-col space-y-4">
        {game.board.map((row, rowIndex) => (
          <Droppable
            droppableId={rowIndex.toString()}
            key={rowIndex}
            type="group"
          >
            {(provided) => (
              <div
                key={`row_${rowIndex}`}
                className="flex space-x-4 border p-4 mb-4 mr-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {row.map((cell, index) => {
                  // const isSelected =
                  //     selectedSquare &&
                  //     selectedSquare.coord.x == i &&
                  //     selectedSquare.coord.y == j

                  // const selected = isSelected
                  //     ? 'border-2 border-black'
                  //     : ''

                  const baseClassName =
                    // selected +
                    " " + "flex w-24 justify-center cursor-pointer";

                  const itemColorStyle = (color: string) =>
                    `${baseClassName} bg-white-500 hover:bg-${color}-400`;

                  const white = itemColorStyle("white");
                  const green = itemColorStyle("green");
                  const blue = itemColorStyle("blue");
                  const yellow = itemColorStyle("yellow");
                  const red = itemColorStyle("red");

                  const emptyCell =
                    baseClassName + " " + "bg-slate-500 hover:bg:slate-400";

                  const getClassName = (star: number): string => {
                    switch (star) {
                      case 1:
                        return white;
                      case 2:
                        return green;
                      case 3:
                        return blue;
                      case 4:
                        return yellow;
                      case 5:
                        return red;
                    }
                    return red;
                  };
                  return (
                    cell &&
                    cell.item !== null && (
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

                            key={`cell_${index}`}
                            className={getClassName(cell.item!.star) + ' border p-2 rounded-md'}
                            onClick={() => {
                              console.log(cell);
                              console.log(
                                `${getClassName(cell.item?.star ?? 1)}`
                              );
                            }}
                          >{`${cell.item!.id} ${cell.item!.name} ${
                            cell.item!.star
                          }`}</div>
                        )}
                      </Draggable>
                    )
                  );
                })}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
