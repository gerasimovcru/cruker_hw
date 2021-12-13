import { Component } from "@angular/core";



@Component({

  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]


})









export class AppComponent {

  searchStudent = "";
  filterThreeCheck = false;

  private index: number | undefined;
  public minScore: number | undefined;
  public maxScore: number | undefined;
  public minDate: string | undefined;
  public maxDate: string | undefined;

  searchStudentChanged = false;
  filterThreeStudentChanged = false;
  filterStudentForDateChanged = false;
  filterStudentForScoreChanged= false;

  confirmation = false;

  public studentList: { studentName: string; studentSurname: string; studentPatronymic: string;
    studentDate: { day: number, month: number, year: number }; studentScore: number; isChanged: { searchStudent: boolean, filterThreeStudent: boolean }; }[] = [];

  resultStudentList = this.studentList;


  public getStudent(): void{

    this.studentList.splice(0, this.studentList.length);

    const student1 = { studentName: "string6", studentSurname: "string21", studentPatronymic: "string31",
      studentDate: { day: 1, month: 12, year: 2001 }, studentScore: 2, isChanged: { searchStudent: false,  filterThreeStudent: false } };

    const student2 = { studentName: "string3", studentSurname: "string22", studentPatronymic: "string32",
      studentDate: { day: 2, month: 2, year: 2001 }, studentScore: 22, isChanged: { searchStudent: false,  filterThreeStudent: false } };

    const student3 = { studentName: "string8", studentSurname: "string23", studentPatronymic: "string33",
      studentDate: { day: 1, month: 12, year: 2001 }, studentScore: 222, isChanged: { searchStudent: false,  filterThreeStudent: false } };

    this.studentList.push(student1);
    this.studentList.push(student2);
    this.studentList.push(student3);

  }


  public searchStudents(nameOrSurname: string | undefined = this.searchStudent): void{



    const student = nameOrSurname?.split(/[\s*]+/);
    if (student[0] === ""){
      student.shift();
    }
    if (student[student.length - 1] === ""){
      student.pop();
    }

    for (const value of this.resultStudentList) {

      value.isChanged.searchStudent = false;

      if (student.length === 2) {
        if (((value["studentName"] === student[0]) && (value["studentSurname"] === student[1])) ||
          ((value["studentName"] === student[1]) && (value["studentSurname"] === student[0]))) {
          value.isChanged.searchStudent = true;
        }
      }

      if (student.length === 1) {
        if ((value["studentName"] === student[0]) || (value["studentSurname"] === student[0])) {
          value.isChanged.searchStudent = true;

        }
      }
    }
  }

  public filterThreeStudent(): void{
    for (const value of this.resultStudentList) {
      value.isChanged.filterThreeStudent = false;
      console.log(this.filterThreeCheck);
      if ((value.studentScore < 3) && (this.filterThreeCheck)) {
        value.isChanged.filterThreeStudent = true;
      }
    }
  }

  public sortStudent(tableColumn: string): void{

    switch (tableColumn){
      case "Name":
        this.studentList.sort((a, b) => {
          if (a.studentName > b.studentName) {
            return 1;
          }
          if (a.studentName < b.studentName) {
            return -1;
          }
          return 0;
        });
        break;

      case "Surname":
        this.studentList.sort((a, b) => {
          if (a.studentSurname > b.studentSurname) {
            return 1;
          }
          if (a.studentSurname < b.studentSurname) {
            return -1;
          }
          return 0;
        });
        break;

      case "Patronymic":
        this.studentList.sort((a, b) => {
          if (a.studentPatronymic > b.studentPatronymic) {
            return 1;
          }
          if (a.studentPatronymic < b.studentPatronymic) {
            return -1;
          }
          return 0;
        });
        break;

      case "Date":
        this.studentList.sort((a, b) => {
          if (a.studentDate.year > b.studentDate.year) {
            return 1;
          }
          if (a.studentDate.year < b.studentDate.year) {
            return -1;
          }
          if (a.studentDate.year === b.studentDate.year) {
            if (a.studentDate.month > b.studentDate.month) {
              return 1;
            }
            if (a.studentDate.month < b.studentDate.month) {
              return -1;
            }
            if (a.studentDate.month === b.studentDate.month) {
              if (a.studentDate.day > b.studentDate.day) {
                return 1;
              }
              if (a.studentDate.day < b.studentDate.day) {
                return -1;
              }
            }
          }
          return 0;
        });



        break;

      case "Score":
        this.studentList.sort((a, b) => {
          if (a.studentScore > b.studentScore) {
            return 1;
          }
          if (a.studentScore < b.studentScore) {
            return -1;
          }
          return 0;
        });
        break;

      default:

    }

  }

  public filterStudent(deleteFor: string): void{

    const minDate = this.minDate?.split("-");
    const maxDate = this.maxDate?.split("-");
    let minScore = this.minScore;
    let maxScore = this.maxScore;


    switch (deleteFor){

      case "forScore":
        if ((this.minScore !== undefined) && (this.maxScore !== undefined)) {
          if (this.minScore > this.maxScore){
            minScore = this.maxScore;
            maxScore = this.minScore;
          }
          this.resultStudentList = this.studentList.filter((score) => ((minScore !== undefined) && (maxScore !== undefined) &&
            (score.studentScore >= minScore) && (score.studentScore <= maxScore)));
        }
        break;

      case "forDate":

        if ((this.minDate !== undefined) && (this.maxDate !== undefined)) {

          this.resultStudentList = this.studentList.filter((date) => ((minDate !== undefined) && (maxDate !== undefined) &&
            (date.studentDate.year >= <number><unknown>minDate[0]) && (date.studentDate.year <= <number><unknown>maxDate[0]) &&
            (date.studentDate.month >= <number><unknown>minDate[1]) && (date.studentDate.month <= <number><unknown>maxDate[1]) &&
            (date.studentDate.day >= <number><unknown>minDate[2]) && (date.studentDate.day <= <number><unknown>maxDate[2])));
        }


        break;

      default:
    }

  }

  public discharge(): void{
      this.resultStudentList = this.studentList;
  }

  public saveIndex(student: { studentName: string; studentSurname: string; studentPatronymic: string; studentDate: { day: number, month: number, year: number };
    studentScore: number; isChanged: { searchStudent: boolean, filterThreeStudent: boolean }; }): void{

    this.index = this.studentList.indexOf(student);

    this.confirmation = true;

  }

  public no(): void{
    this.confirmation = false;
  }

  public deleteStudent(): void {
    if (this.index !== undefined) {
      this.studentList.splice(this.index, 1);
    }
    this.resultStudentList = this.studentList;
    this.no();
  }

  private methodsClear(): void {

    this.searchStudentChanged = false;
    this.filterThreeStudentChanged = false;
    this.filterStudentForDateChanged = false;
    this.filterStudentForScoreChanged= false;
  }

  public methods(methodsSwitch: string): void {

    this.methodsClear();

    switch (methodsSwitch) {
      case "searchStudent":

        this.searchStudentChanged = true;
        break;

      case "filterThreeStudent":

        this.filterThreeStudentChanged = true;
        break;

      case "filterStudentForDate":

        this.filterStudentForDateChanged = true;
        break;

      case "filterStudentForScore":

        this.filterStudentForScoreChanged= true;
        break;

      default:

    }


  }


}
















