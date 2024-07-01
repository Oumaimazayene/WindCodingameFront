import { TestSectionLogiqueComponent } from "../pages/TestSection/test-section-logique/test-section-logique.component";
import { candidat } from "./candidat";
import { questionLog } from "./questionLog";
export class TestLogique {
  createdAt?: Date;
  isSubmitted?: boolean;
  ScoreTotale?: number;
  correctAnswerCount?: number;
  SuccessRate?: number;
  scorefinale?: number;
  SubmittedDate?: Date;
  candidat?: candidat;
  test_Section_UUID?: string;
  questionsLogique?: questionLog[];
}
