import { ICustomError } from "../types/interfaces";

export function CustomError(err: ICustomError) {
  throw new Error(JSON.stringify(err))
}