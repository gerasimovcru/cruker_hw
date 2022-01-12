import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";



class ValidatorErrors {
  [key: string]: string;
}

function getErrorNameStudent(control: AbstractControl): ValidatorErrors | null {

  if (control.value.name === control.value.surname || control.value.name  === control.value.patronymic){
    return { errorStudentForm: "Error: name and surname or patronymic are equal" };
  }

  return null;
}

function getErrorStudentData(control: AbstractControl): ValidatorErrors | null {

  const date = new Date();

  if (control.value.dateYear + 10 > date.getFullYear() ||
    (control.value.dateYear + 10 >= date.getFullYear() && control.value.dateMonth > date.getMonth()) ||
    (control.value.dateYear + 10 >= date.getFullYear() && control.value.dateMonth >= date.getMonth() && control.value.dateDay > date.getDay() )){
    return { errorStudentDate: "Error: you are under 10 years old" };
  }

  return null;
}

function getErrorData(control: AbstractControl): ValidatorErrors | null {

  let error = "";

  if (control.value.dateYear < 1900 || control.value.dateYear > 2200) {
    error = error + " wrong year, " ;
  }

    if (control.value.dateMonth < 1 || control.value.dateMonth > 12) {
      error = error + " wrong month, " ;
    }
    if (control.value.dateDay < 1 || control.value.dateDay > 31){
      error = error + " wrong day " ;
  }
    if (error.length > 3){
      error = "Error: " + error ;
    }

  return { errorDataForm: error };
}


@Component({

  selector: "add_student",
  templateUrl: "./methods.component.html",
  styleUrls: ["./methods.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class AddStudentComponent{


  @Output() changeStudentTable = new EventEmitter();

  @Input() newStudent: object = function (){
console.log(123);
};

  @Input() addStudentForTable: boolean | undefined;
  @Input() changeStudentForTable: boolean | undefined;

  @Input() name: string = "Name";
  @Input() surname: string = "Surname";
  @Input() patronymic: string = "Patronymic";
  @Input() day: number = 1;
  @Input() month: number = 1;
  @Input() year: number = 2010;
  @Input() score: number = 5;
  ed = true;

  student = {
    name: this.name, surname: this.surname, patronymic: this.patronymic,
    date: { day: this.day, month: this.month, year: this.year }, score: this.score, type: ""

  };

  add = false;
  changed = false;

  studentForm: FormGroup = new FormGroup({ addStudent: new FormGroup({
      name: new FormControl(this.student.name, [Validators.required, Validators.minLength(2)]),
      surname: new FormControl(this.student.surname, [Validators.required, Validators.minLength(2)]),
      patronymic: new FormControl(this.student.patronymic, [Validators.required, Validators.minLength(2)]),

      studentData: new FormGroup({
        dateDay: new FormControl(this.student.date.day, [Validators.required]),
        dateMonth: new FormControl(this.student.date.month, [Validators.required]),
        dateYear: new FormControl(this.student.date.year, [Validators.required]),
      }, { validators: [getErrorStudentData, getErrorData] }),

      score: new FormControl(this.student.score, [Validators.required, Validators.min(1), Validators.max(5)]),
    }, { validators: [getErrorNameStudent] }) });



  public addStudentOnTable(ac: string): void {

    this.student.name = this.studentForm?.get("addStudent.name")?.value;
    this.student.surname = this.studentForm?.get("addStudent.surname")?.value;
    this.student.patronymic = this.studentForm?.get("addStudent.patronymic")?.value;
    this.student.date.day = this.studentForm?.get("addStudent.studentData.dateDay")?.value;
    this.student.date.month = this.studentForm?.get("addStudent.studentData.dateMonth")?.value;
    this.student.date.year = this.studentForm?.get("addStudent.studentData.dateYear")?.value;
    this.student.score = this.studentForm?.get("addStudent.score")?.value;

    this.errors();
    if (!this.studentForm?.get("addStudent")?.getError("errorStudentForm") &&
      !this.studentForm?.get("addStudent.name")?.getError("minlength") &&
      !this.studentForm?.get("addStudent.surname")?.getError("minlength") &&
      !this.studentForm?.get("addStudent.patronymic")?.getError("minlength") &&
      !this.studentForm?.get("addStudent.studentData")?.getError("errorDataForm") &&
      !this.studentForm?.get("addStudent.studentData")?.getError("errorStudentDate") &&
      !this.studentForm?.get("addStudent.score")?.getError("min") && !this.studentForm?.get("addStudent.score")?.getError("max")) {

      this.student.type = ac;
      this.changeStudentTable.emit(this.student);
      this.ed = true;

    }


  }

  errorMy = false;
  errorName = false;
  errorSurname = false;
  errorPatronymic = false;
  errorScore = false;
  errorDate = false;
  errorDay = false;
  errorMonth = false;
  errorYear = false;


  public errors(): void {

    this.errorMy = false;
    this.errorName = false;
    this.errorSurname = false;
    this.errorPatronymic = false;
    this.errorScore = false;
    this.errorDate = false;
    this.errorDay = false;
    this.errorMonth = false;
    this.errorYear = false;

    if (this.studentForm?.get("addStudent")?.getError("errorStudentForm")) {
      this.errorMy = true;
    }

    if (this.studentForm?.get("addStudent.name")?.errors) {
      this.errorName = true;
    }

    if (this.studentForm?.get("addStudent.surname")?.errors) {
      this.errorSurname = true;
    }

    if (this.studentForm?.get("addStudent.patronymic")?.errors) {
      this.errorPatronymic = true;
    }

    if (this.studentForm?.get("addStudent.studentData")?.errors) {
      this.errorDate = true;
    }
    if (this.studentForm?.get("addStudent.studentData")?.errors) {
      this.errorDay = true;
    }
    if (this.studentForm?.get("addStudent.studentData")?.errors) {
      this.errorMonth = true;
    }
    if (this.studentForm?.get("addStudent.studentData")?.errors) {
      this.errorYear = true;
    }

    if (this.studentForm?.get("addStudent.score")?.errors) {
      this.errorScore = true;
    }

  }


  _onSubmit(): void {

    this.student.name = this.studentForm.controls["addStudent.name"].value;

  }

  public enable(): void{
    this.ed = false;
  }

}

