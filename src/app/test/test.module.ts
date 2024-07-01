import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { StartTestComponent } from "./start-test/start-test.component";
import { CodeComponent } from "./code/code.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CountdownModule } from "ngx-countdown";
import { FormsModule } from "@angular/forms";
import { StartComponent } from "./start/start.component";

const routes: Routes = [
  { path: "test-start/:id", component: StartTestComponent },
  { path: "edit-code", component: CodeComponent },
  { path: "start/:id", component: StartComponent },
];

@NgModule({
  declarations: [StartTestComponent, CodeComponent, StartComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    CountdownModule,
    RouterModule.forChild(routes),
  ],
})
export class TestModule {}
