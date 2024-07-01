import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterRespenseComponent } from "./register-respense/register-respense.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "response", component: RegisterRespenseComponent },
];
@NgModule({
  declarations: [RegisterRespenseComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RegisterRespenceModule {}
