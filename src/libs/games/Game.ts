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
    this.board = options?.board ?? this.initializeDefaultBoard()
    this.players = options?.players ?? []
  }
  initializeDefaultBoard() : Board {
    return new Array<BoardItem[]>(this.rowNumber).fill(new Array<BoardItem>(this.columnNumber).fill(new Square({item: new Piece({id: 1, name: "Dragon", star: 3})})))
  }
}