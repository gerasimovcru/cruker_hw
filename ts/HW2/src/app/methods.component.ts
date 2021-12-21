import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";


function getErrorName(surname: string, patronymic: string): ValidatorFn {

const date = new Date();


  return (control: AbstractControl): { errorStudentForm: string } | null => {


    if (control.value.name === control.value.surname || control.value.name  === control.value.patronymic){
      console.log(control.value.surname);
      return { errorStudentForm: "Error: name and surname or patronymic are equal" };
    }
    if (control.value.dateYear + 10 > date.getFullYear() ||
      (control.value.dateYear + 10 >= date.getFullYear() && control.value.dateMonth > date.getMonth()) ||
      (control.value.dateYear + 10 >= date.getFullYear() && control.value.dateMonth >= date.getMonth() && control.value.dateDay > date.getDay() )){
      return { errorStudentForm: "Error: you are under 10 years old" };
    }
    if (control.value.name.length < 2){
      return { errorStudentForm: "Error: short name" };
    }
    if (control.value.surname.length < 2){
      return { errorStudentForm: "Error: short surname" };
    }
    if (control.value.patronymic.length < 2){
      return { errorStudentForm: "Error: short patronymic" };
    }
    if (control.value.score < 1 || control.value.score > 5){
      return { errorStudentForm: "Error: wrong score" };
    }
    if ((control.value.dateYear < 1900 || control.value.dateYear > 2200) ||
      (control.value.dateMonth < 1 || control.value.dateMonth > 12) ||
      (control.value.dateDay < 1 || control.value.dateDay > 31)){
      return { errorStudentForm: "Error: wrong data" };
    }


    return null;
  };
}


@Component({

  selector: "add_student",
  templateUrl: "./methods.component.html",
  styleUrls: ["./methods.component.css"]


})

export class AddStudentComponent {



  @Output() changeStudentTable = new EventEmitter();

  @Input() addStudentForTable: boolean | undefined;
  @Input() changeStudentForTable: boolean | undefined;

  @Input() name: string = "Name";
  @Input() surname: string = "Surname";
  @Input() patronymic: string = "Patronymic";
  @Input() day: number = 1;
  @Input() month: number = 1;
  @Input() year: number = 2010;
  @Input() score: number = 5;


  add = false;
  changed = false;




  student = {
    name: this.name, surname: this.surname, patronymic: this.patronymic,
    date: { day: this.day, month: this.month, year: this.year }, score: this.score, type: ""

  };







  studentForm: FormGroup = new FormGroup({
    addStudent: new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      surname: new FormControl(this.surname, [Validators.required]),
      patronymic: new FormControl(this.patronymic, [Validators.required]),
      dateDay: new FormControl( this.day, [Validators.required]),
      dateMonth: new FormControl(this.month, [Validators.required]),
      dateYear: new FormControl(this.year, [Validators.required]),
      score: new FormControl(this.score, [Validators.required]),
    }, { validators: getErrorName(this.surname, this.patronymic) })

  });



  public addStudentOnTable(ac: string): void {

    console.log(this.name);


      this.student.name = this.studentForm.get("addStudent.name")?.value;
      this.student.surname = this.studentForm.get("addStudent.surname")?.value;
      this.student.patronymic = this.studentForm.get("addStudent.patronymic")?.value;
      this.student.date.day = this.studentForm.get("addStudent.dateDay")?.value;
      this.student.date.month = this.studentForm.get("addStudent.dateMonth")?.value;
      this.student.date.year = this.studentForm.get("addStudent.dateYear")?.value;
      this.student.score = this.studentForm.get("addStudent.score")?.value;

      console.log(this.studentForm.get("addStudent"));
      this.errors();
      if (!this.studentForm.get("addStudent")?.getError("errorStudentForm") &&
        !this.studentForm.get("addStudent.name")?.errors &&
        !this.studentForm.get("addStudent.surname")?.errors &&
        !this.studentForm.get("addStudent.patronymic")?.errors &&
        !this.studentForm.get("addStudent.dateDay")?.errors &&
        !this.studentForm.get("addStudent.dateMonth")?.errors &&
        !this.studentForm.get("addStudent.dateYear")?.errors &&
        !this.studentForm.get("addStudent.score")?.errors) {

        this.student.type = ac;
        this.changeStudentTable.emit(this.student);

      }





  }

  errorMy = false;
  errorName = false;
  errorSurname = false;
  errorPatronymic = false;
  errorScore = false;
  errorDateDay = false;
  errorDateMonth = false;
  errorDateYear = false;


  public errors(): void {
    if (this.studentForm.get("addStudent")?.getError("errorStudentForm")) {
      this.errorMy = true;
    }

    if (this.studentForm.get("addStudent.name")?.errors) {
      this.errorName = true;
    }

    if (this.studentForm.get("addStudent.surname")?.errors) {
      this.errorSurname = true;
    }

    if (this.studentForm.get("addStudent.patronymic")?.errors) {
      this.errorPatronymic = true;
    }

    if (this.studentForm.get("addStudent.dateDay")?.errors) {
      this.errorDateDay = true;
    }

    if (this.studentForm.get("addStudent.dateMonth")?.errors) {
      this.errorDateMonth = true;
    }

    if (this.studentForm.get("addStudent.dateYear")?.errors) {
      this.errorDateYear = true;
    }

    if (this.studentForm.get("addStudent.score")?.errors) {
      this.errorScore = true;
    }

  }



  _onSubmit(): void{

  }

}
