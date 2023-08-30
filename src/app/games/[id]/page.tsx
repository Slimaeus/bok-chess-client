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

                            const itemColorStyle = (color: string) => `${baseClassName} bg-${color}-500 hover:bg-${color}-400`

                            const white = itemColorStyle('white')
                            const green = itemColorStyle('green')
                            const blue = itemColorStyle('blue')
                            const red = itemColorStyle('red')
                            const yellow = itemColorStyle('yellow')

                            const emptyCell =
                                baseClassName +
                                ' ' +
                                'bg-slate-500 hover:bg:slate-400'

                            const className = 
                                cell === null
                                    ? emptyCell
                                    // : cell.isRed
                                    : true
                                    ? red
                                    : blue
                                    
                            return (
                              cell !== null && cell.item !== null && <div
                                    key={`cell_${j}`}
                                    className={className}
                                    onClick={() => {}
                                        // selectSquareHandler(cell, i, j)
                                    }
                                >{`${ cell.item.id} ${
                                    cell.item.name
                                } ${cell.item.star}`}</div>
                            )
                        })}
                    </div>
                ))}
            </div>
}