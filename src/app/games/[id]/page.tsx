"use client";

import {Game} from "@/libs/games/Game";
import { useEffect, useState } from "react"

interface GamePageOptions {
  params: { id: string }
}

export default function Page(options: GamePageOptions) {
  // const [board, setBoard] = useState<Board>()
  const [game, setGame] = useState<Game>(new Game({id: options.params.id}))
  return <div className="m-8 flex flex-col space-y-4">
                {game.board.map((row, i) => (
                    <div key={`row_${i}`} className="flex space-x-4">
                        {row.map((cell, j) => {
                            // const isSelected =
                            //     selectedSquare &&
                            //     selectedSquare.coord.x == i &&
                            //     selectedSquare.coord.y == j

                            // const selected = isSelected
                            //     ? 'border-2 border-black'
                            //     : ''

                            const baseClassName =
                                // selected +
                                ' ' +
                                'flex w-24 justify-center cursor-pointer'

                            const itemColorStyle = (color: string) => `${baseClassName} bg-white-500 hover:bg-${color}-400`

                            const white = itemColorStyle('white')
                            const green = itemColorStyle('green')
                            const blue = itemColorStyle('blue')
                            const yellow = itemColorStyle('yellow')
                            const red = itemColorStyle('red')

                            const emptyCell =
                                baseClassName +
                                ' ' +
                                'bg-slate-500 hover:bg:slate-400'

                            const getClassName = (star: number) : string => {
                              switch (star) {
                                case 1:
                                  return white
                                case 2:
                                  return green
                                case 3:
                                  return blue
                                case 4:
                                  return yellow
                                case 5:
                                  return red
                              }
                              return red
                            } 
                            return (
                              cell !== null && cell.item !== null && 
                              <div
                                    key={`cell_${j}`}
                                    className={getClassName(cell.item.star)}
                                    onClick={() => {
                                      console.log(cell)
                                      console.log(`${getClassName(cell.item?.star ?? 1)}`)
                                    }}
                              >{`${ cell.item.id} ${
                                  cell.item.name
                              } ${cell.item.star}`}</div>
                            )
                        })}
                    </div>
                ))}
            </div>
}