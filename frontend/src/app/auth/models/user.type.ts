import { RawUser } from "./raw-user.type"
import { Role } from "./role.enum"

export type User = RawUser & {
  role: Role
}
