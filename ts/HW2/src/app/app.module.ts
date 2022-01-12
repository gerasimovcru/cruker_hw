import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddStudentComponent } from "./methods.component";
import { FocusDirective } from "./focus.directive";
import { UppercasePipe } from "./uppercase.pipe";
// import { DataService } from "./data.service";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./notFound.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "static", pathMatch: "full" },
  { path: "form/addStudent", component: AddStudentComponent },
  { path: "form/editStudent", component: AddStudentComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AddStudentComponent,
    AppComponent,
    FocusDirective,
    NotFoundComponent,
    UppercasePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
