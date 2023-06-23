import { NextFunction, Request, Response } from "express";
import { ICustomError } from "../types/interfaces";


export function sendErros(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  if (err instanceof Error) {
    const errObject: ICustomError = JSON.parse(err.message)
    return res.status(errObject.status).json({
      status: errObject.status,
      message: errObject.msg
    })
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
}