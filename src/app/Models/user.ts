import { role } from "./role";

export class User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  numtel?: string;
  password?: string;
  isDeleted?: boolean;
  isVerified?: boolean;
  societyName?: string;
  Signature?: string;
  logo?: string;
  uuid?: string;
  matricule_fiscale?: string;
  role?: role;
}
