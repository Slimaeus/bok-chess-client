class Game {
  board: Board
  players: Player[]
  constructor(board: Board, players: Player[]) {
    this.board = board
    this.players = players
  }
}