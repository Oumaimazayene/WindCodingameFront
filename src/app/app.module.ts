import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { UserComponent } from "./pages/user/user.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { QuestionsTechComponent } from "./pages/Question/questions-tech/questions-tech.component";
import { DomainsComponent } from "./pages/domains/domains.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { DeleteConfirmationDialogComponent } from "./pages/domains/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { AjoutConfirmationDialogComponent } from "./pages/domains/ajout-confirmation-dialog/ajout-confirmation-dialog.component";
import { UpdateConfirmationDialogComponent } from "./pages/domains/update-confirmation-dialog/update-confirmation-dialog.component";
import { QuestionsLogComponent } from "./pages/Question/questions-log/questions-log.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { AddQuestionTechDialogComponent } from "./pages/Question/questions-tech/add-question-tech-dialog/add-question-tech-dialog.component";
import { DeleteQuestionTechDialogComponent } from "./pages/Question/questions-tech/delete-question-tech-dialog/delete-question-tech-dialog.component";
import { TypeComponent } from "./pages/type/type.component";
import { AfficheQuestionTechDialogComponent } from "./pages/Question/questions-tech/affiche-question-tech-dialog/affiche-question-tech-dialog.component";
import { ViewQuestionLogDialogComponent } from "./pages/Question/questions-log/view-question-log-dialog/view-question-log-dialog.component";
import { AddQuestionLogDialogComponent } from "./pages/Question/questions-log/add-question-log-dialog/add-question-log-dialog.component";
import { MatStepperModule } from "@angular/material/stepper";
import { DeleteQuestionLogDialogComponent } from "./pages/Question/questions-log/delete-question-log-dialog/delete-question-log-dialog.component";
import { AddTypeDialogComponent } from "./pages/type/add-type-dialog/add-type-dialog.component";
import { DeleteTypeDialogComponent } from "./pages/type/delete-type-dialog/delete-type-dialog.component";
import { UpdateTypeDialogComponent } from "./pages/type/update-type-dialog/update-type-dialog.component";
import { TestSectionLogiqueComponent } from "./pages/TestSection/test-section-logique/test-section-logique.component";
import { AddTestSectionDialogComponent } from "./pages/TestSection/test-section-logique/add-test-section-dialog/add-test-section-dialog.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { QuestionpriveLogComponent } from "./pages/QuestionPrivée/QuestionLogiquePri/questionprive-log/questionprive-log.component";
import { AddQuestionPriveeLogDialogComponent } from "./pages/QuestionPrivée/QuestionLogiquePri/add-question-privee-log-dialog/add-question-privee-log-dialog.component";
import { TestSectionTechComponent } from "./pages/TestSection/TestSection -Tech/test-section-tech/test-section-tech.component";
import { ViewTestSectionTechDialogComponent } from "./pages/TestSection/TestSection -Tech/view-test-section-tech-dialog/view-test-section-tech-dialog.component";
import { AddTestSectionTechDialogComponent } from "./pages/TestSection/TestSection -Tech/add-test-section-tech-dialog/add-test-section-tech-dialog.component";
import { QuestionTechPriveComponent } from "./pages/QuestionPrivée/QuestionTech/question-tech-prive/question-tech-prive.component";
import { AddquestionTechPriveComponent } from "./pages/QuestionPrivée/QuestionTech/addquestion-tech-prive/addquestion-tech-prive.component";
import { AddTestLogiqueComponent } from "./pages/TestSection/test-section-logique/add-test-logique/add-test-logique.component";
import { ListTestComponent } from "./pages/TestSection/list-test/list-test.component";
import { SendTestComponent } from "./pages/TestSection/list-test/send-test/send-test.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ListTestTechComponent } from "./pages/TestSection/TestSection -Tech/list-test-tech/list-test-tech.component";
import { AddTestTechComponent } from "./pages/TestSection/TestSection -Tech/add-test-tech/add-test-tech.component";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ConfirmValidationComponent } from "./pages/user/confirm-validation/confirm-validation.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { TestdetailsComponent } from "./pages/TestSection/list-test/testdetails/testdetails.component";
import { CandidatsComponent } from "./pages/candidats/candidats.component";
import { ChangePasswordDialogComponent } from "./pages/login/change-password-dialog/change-password-dialog.component";
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    MatCardModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    BrowserModule,
    NgbPaginationModule,
    MatStepperModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      enableHtml: true,
      closeButton: true,
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      tapToDismiss: false,
      extendedTimeOut: 0,
    }),
    MatPaginatorModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserComponent,
    DomainsComponent,
    DeleteConfirmationDialogComponent,
    AjoutConfirmationDialogComponent,
    UpdateConfirmationDialogComponent,
    QuestionsTechComponent,
    QuestionsLogComponent,
    AddQuestionTechDialogComponent,
    DeleteQuestionTechDialogComponent,
    TypeComponent,
    AfficheQuestionTechDialogComponent,
    ViewQuestionLogDialogComponent,
    AddQuestionLogDialogComponent,
    DeleteQuestionLogDialogComponent,
    AddTypeDialogComponent,
    DeleteTypeDialogComponent,
    UpdateTypeDialogComponent,
    TestSectionLogiqueComponent,
    AddTestSectionDialogComponent,
    QuestionpriveLogComponent,
    AddQuestionPriveeLogDialogComponent,
    TestSectionTechComponent,
    ViewTestSectionTechDialogComponent,
    AddTestSectionTechDialogComponent,
    QuestionTechPriveComponent,
    AddquestionTechPriveComponent,
    AddTestLogiqueComponent,
    ListTestComponent,
    SendTestComponent,
    TestdetailsComponent,
    ListTestTechComponent,
    AddTestTechComponent,
    ChangePasswordComponent,
    ConfirmValidationComponent,
    TestdetailsComponent,
    CandidatsComponent,
    ChangePasswordDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
