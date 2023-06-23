

export interface ITodos {
  id: string
  name: string;
  description: string;
  due: Date;
  priority: string;
  status: boolean;
}

// export interface ITodosCreate {
//   name: string;
//   description: string;
//   due: Date;
//   priority: string;
//   status: boolean;
// }

export interface ICustomError {
  msg: string;
  status: number
}