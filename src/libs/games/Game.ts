import { Board } from "../boards/Board"
import { BoardItem } from "../boards/BoardItem"
import { Piece } from "../pieces/Piece"
import { Square } from "../squares/Square"

export interface IGameOptions {
  id: string
  rowNumber: number
  columnNumber: number
  board: Board
  players: Player[]
}

export class Game {
  id: string
  rowNumber: number
  columnNumber: number
  board: Board
  players: Player[]
  constructor(options?: Partial<IGameOptions>) {
    this.id = options?.id ?? ""
    this.rowNumber = options?.rowNumber ?? 10
    this.columnNumber = options?.columnNumber ?? 10
    this.board = options?.board ?? this.initializeEmptyBoard()
    this.board = this.initializeDefaultBoard()
    this.players = options?.players ?? []
  }
  initializeEmptyBoard() : Board {
    return new Array<BoardItem[]>(this.rowNumber).fill(new Array<BoardItem>(this.columnNumber).fill(null))
  }
  initializeDefaultBoard() : Board {
    return this.board.map((row, rowIndex) =>
      row.map((item, columnIndex) => {
        if (rowIndex % 2)
          return new Square({item: new Piece({id: 2, name: "Ceberus", star: 3})})
        return new Square({item: new Piece({id: 1, name: "Dragon", star: 1})})
      })
    )
  }
}