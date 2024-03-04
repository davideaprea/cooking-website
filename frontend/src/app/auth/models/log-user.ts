import { RegUser } from "./reg-user";

export type LogUser = Pick<RegUser, 'username' | 'password'>;
