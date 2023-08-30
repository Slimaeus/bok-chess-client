import { SquareItem } from "./SquareItem"

export interface ISquareOptions {
  item: SquareItem
}

export class Square {
  item: SquareItem
  constructor(options?: Partial<ISquareOptions>) {
      this.item = options?.item ?? null
  }
}