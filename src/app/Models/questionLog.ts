import { Answer } from "./Answer";
import { Type } from "./type";

export class questionLog {
  id?: number;
  title?: String;
  questionBody?: String;
  difficulty?: String;
  score?: number;
  type_id?: number;
  time?: number;
  answer?: Answer[];
  isPrivate?: boolean = false;
  urlimage?: string;
}
