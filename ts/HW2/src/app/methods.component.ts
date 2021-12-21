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


  return (control: AbstractControl): { invalidName: string } | null => {

    if (control.value.name === control.value.surname || control.value.name  === control.value.patronymic ||
      (control.value.dateYear + 10 > date.getFullYear() ||
        (control.value.dateYear + 10 >= date.getFullYear() && control.value.dateMonth > date.getMonth()) ||
        (control.value.dateYear + 10 >= date.getFullYear() && control.value.dateMonth >= date.getMonth() && control.value.dateDay > date.getDay() ))){

      return { invalidName: "error" };
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



  @Output() chang = new EventEmitter();


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
      name: new FormControl(this.name, [Validators.required, Validators.minLength(2) ]),
      surname: new FormControl(this.surname, [Validators.required, Validators.minLength(2) ]),
      patronymic: new FormControl(this.patronymic, [Validators.required, Validators.minLength(2) ]),
      dateDay: new FormControl( this.day, [Validators.required, Validators.min(1), Validators.max(31) ]),
      dateMonth: new FormControl(this.month, [Validators.required, Validators.min(1), Validators.max(12) ]),
      dateYear: new FormControl(this.year, [Validators.required, Validators.min(1900), Validators.max(2222) ]),
      score: new FormControl(this.score, [Validators.required, Validators.min(1), Validators.max(5)]),
    }, { validators: getErrorName(this.surname, this.patronymic) })

  });



  public addStudentOnTable(ac: string): void {


      this.student.name = this.studentForm.get("addStudent.name")?.value;
      this.student.surname = this.studentForm.get("addStudent.surname")?.value;
      this.student.patronymic = this.studentForm.get("addStudent.patronymic")?.value;
      this.student.date.day = this.studentForm.get("addStudent.dateDay")?.value;
      this.student.date.month = this.studentForm.get("addStudent.dateMonth")?.value;
      this.student.date.year = this.studentForm.get("addStudent.dateYear")?.value;
      this.student.score = this.studentForm.get("addStudent.score")?.value;

      console.log(this.studentForm.get("addStudent.dateMonth"));
      if (!this.studentForm.get("addStudent")?.getError("invalidName") &&
        !this.studentForm.get("addStudent.name")?.errors &&
        !this.studentForm.get("addStudent.surname")?.errors &&
        !this.studentForm.get("addStudent.patronymic")?.errors &&
        !this.studentForm.get("addStudent.dateDay")?.errors &&
        !this.studentForm.get("addStudent.dateMonth")?.errors &&
        !this.studentForm.get("addStudent.dateYear")?.errors &&
        !this.studentForm.get("addStudent.score")?.errors) {
        this.student.type = ac;
        this.chang.emit(this.student);
      }



  }



  _onSubmit(): void{

  }

}
