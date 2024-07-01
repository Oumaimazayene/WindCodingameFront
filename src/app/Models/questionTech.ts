import { Answer } from "./Answer";
import { Type } from "./type";

export class questionTech {
  id?: number;
  title?: String;
  questionBody?: String;
  difficulty?: String;
  score?: number;
  domain_id?: number;
  type_id?: number;
  time?: number;
  answer?: Answer[];
  isPrivate?: boolean = false;
}
