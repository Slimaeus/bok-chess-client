export interface IPieceOptions {
  id: number
  name: string
  star: number
}
export class Piece {
  id: number
  name: string
  star: number
  constructor(options?: Partial<IPieceOptions>) {
      this.id = options?.id ?? 0
      this.name = options?.name ?? "Blank"
      this.star = options?.star ?? 0
  }
}