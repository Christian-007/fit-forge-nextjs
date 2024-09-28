import { AuthEntity } from "./auth.entity";

export interface AuthRepository {
  login(data: AuthEntity): Promise<void>;
}
