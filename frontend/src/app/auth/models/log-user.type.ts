import { RegUser } from "./reg-user.type";

export type LogUser = Pick<RegUser, 'username' | 'password'>;
