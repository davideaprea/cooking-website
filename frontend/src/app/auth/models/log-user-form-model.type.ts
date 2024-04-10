import { LogUser } from "./log-user.type";

export type LogUserFormModel = LogUser & {
  remember: boolean;
};
