import { RawUser } from "./raw-user"
import { Role } from "./role"

export type User = RawUser & {
  role: Role
}
