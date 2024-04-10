import { Role } from "./role.enum";

export type DecodedToken = {
  sub: string,
  role: {id:number, roleName:Role}[],
  iat: number,
  exp: number
}
