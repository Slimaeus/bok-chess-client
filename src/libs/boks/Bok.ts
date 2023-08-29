class Bok {
  piece: Piece
  squares: Square[]
  constructor(piece: Piece) {
    this.piece = piece
    this.squares = this.randomSquares()
  }

  randomSquares() : Square[]  {
    return []
  }

  place(piece: Piece) {
    
  }
}