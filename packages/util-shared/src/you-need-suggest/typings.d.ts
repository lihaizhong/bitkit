export type TResult = {
  continuous: number
  count: number
  position: number
  distance: number
}

export interface IResultWrapper {
  get(): TResult
  setContinuous(continuous: number): void
  getContinuous(): number
  setCount(count: number): void
  getCount(): number
  setPosition(position: number): void
  getPosition(): number
  setDistance(distance: number): void
  getDistance(): number
}
