import { RegUser } from "./reg-user.type";

export type RegUserFormModel = RegUser & {
  confirmPassword: string;
};
