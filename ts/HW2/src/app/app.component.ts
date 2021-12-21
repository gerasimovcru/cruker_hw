import { Component } from "@angular/core";
// import {  } from "@angular/core";


@Component({

  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]


})



export class AppComponent {


  searchStudent = "";
  filterThreeCheck = false;
  changed = false;

  addStudentForTable = false;
  changeStudentForTable = false;

  public index: number | undefined;

  public minScore: number | undefined;
  public maxScore: number | undefined;
  public minDate: string | undefined;
  public maxDate: string | undefined;

  nameSort = false;
  surnameSort = false;
  patronymicSort = false;
  dataSort = false;
  scoreSort = false;

  buttonDelete = false;

  methods = false;

  confirmation = false;

  public studentList: {
    studentName: string; studentSurname: string; studentPatronymic: string;
    studentDate: { day: number, month: number, year: number }; studentScore: number; isChanged: {
      searchStudent: boolean; filterThreeStudent: boolean; changeStudent: boolean;
    };
  }[] = [];

  resultStudentList = this.studentList;
  title = "";

  studentChange = this.resultStudentList[0];


  public getStudent(): void {

    this.studentList.splice(0, this.studentList.length);

    const student1 = {
      studentName: "string6",
      studentSurname: "string21",
      studentPatronymic: "string31",
      studentDate: { day: 2, month: 12, year: 2001 },
      studentScore: 2,
      isChanged: { searchStudent: false, filterThreeStudent: false, changeStudent: false }
    };

    const student2 = {
      studentName: "string3",
      studentSurname: "string22",
      studentPatronymic: "string32",
      studentDate: { day: 2, month: 2, year: 2005 },
      studentScore: 22,
      isChanged: { searchStudent: false, filterThreeStudent: false, changeStudent: false }
    };

    const student3 = {
      studentName: "string8",
      studentSurname: "string23",
      studentPatronymic: "string33",
      studentDate: { day: 1, month: 12, year: 2010 },
      studentScore: 222,
      isChanged: { searchStudent: false, filterThreeStudent: false, changeStudent: false }
    };

    this.studentList.push(student1);
    this.studentList.push(student2);
    this.studentList.push(student3);

  }


  public searchStudents(nameOrSurname: string | undefined = this.searchStudent): void {


    const student = nameOrSurname?.split(/[\s*]+/);
    if (student[0] === "") {
      student.shift();
    }
    if (student[student.length - 1] === "") {
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

  public filterThreeStudent(): void {
    for (const value of this.resultStudentList) {
      value.isChanged.filterThreeStudent = false;
      console.log(this.filterThreeCheck);
      if ((value.studentScore < 3) && (this.filterThreeCheck)) {
        value.isChanged.filterThreeStudent = true;
      }
    }
  }

  private sortOf(column: string): void{
    this.nameSort = false;
    this.surnameSort = false;
    this.patronymicSort = false;
    this.dataSort = false;
    this.scoreSort = false;
    switch (column) {
      case "Name":
        this.nameSort = true;
        break;

      case "Surname":
        this.surnameSort = true;
        break;
      case "Patronymic":
        this.patronymicSort = true;
        break;
      case "Date":
        this.dataSort = true;
        break;

      case "Score":
        this.scoreSort = true;
        break;

      default:

    }
  }

  public sortStudent(tableColumn: string): void {
    this.sortOf(tableColumn);
    switch (tableColumn) {
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

  public filterStudent(): void {

    const minDate = this.minDate?.split("-");
    const maxDate = this.maxDate?.split("-");
    let minScore = this.minScore;
    let maxScore = this.maxScore;


    // switch (deleteFor) {
    // case "forDate":

      if ((this.minDate !== undefined) && (this.maxDate !== undefined)) {

        this.resultStudentList = this.studentList.filter((date) => (((minDate !== undefined) && (maxDate !== undefined)) &&
          (((date.studentDate.year > <number><unknown>minDate[0]) && (date.studentDate.year < <number><unknown>maxDate[0])) ||
            ((date.studentDate.year >= <number><unknown>minDate[0]) && (date.studentDate.month > <number><unknown>minDate[1])) ||
            ((date.studentDate.year >= <number><unknown>minDate[0]) && (date.studentDate.month >= <number><unknown>minDate[1]) && ((date.studentDate.day >= <number><unknown>minDate[2]))) ||
            ((date.studentDate.year <= <number><unknown>maxDate[0]) && (date.studentDate.month < <number><unknown>maxDate[1])) ||
            ((date.studentDate.year <= <number><unknown>maxDate[0]) && (date.studentDate.month <= <number><unknown>maxDate[1]) && ((date.studentDate.day <= <number><unknown>maxDate[2]))))));
      }



    // break;

    // case "forScore":

    if ((this.minScore !== undefined) && (this.maxScore !== undefined) && (this.minScore !== null) && (this.maxScore !== null)) {
      if (this.minScore > this.maxScore) {
        minScore = this.maxScore;
        maxScore = this.minScore;
      }
      this.resultStudentList = this.resultStudentList.filter((score) => ((minScore !== undefined) && (maxScore !== undefined) &&
        (score.studentScore >= minScore) && (score.studentScore <= maxScore)));
    }

      //  break;

      // default:
    // }

  }


  public discharge(): void {
    this.resultStudentList = this.studentList;
    this.searchStudent = "";
    this.searchStudents(this.searchStudent);
  }

  public saveIndex(student: {
    studentName: string; studentSurname: string; studentPatronymic: string; studentDate: { day: number, month: number, year: number };
    studentScore: number; isChanged: { searchStudent: boolean, filterThreeStudent: boolean, changeStudent: boolean };
  }): void {


    for (const value of this.resultStudentList) {
      value.isChanged.changeStudent = false;
    }



    this.index = this.studentList.indexOf(student);

    this.studentChange = this.resultStudentList[this.index];

    this.resultStudentList[this.index].isChanged.changeStudent = true;

    this.changed = true;

    this.changeStudentForTable = true;




  }

  public saveIndexDelete(student: {
    studentName: string; studentSurname: string; studentPatronymic: string; studentDate: { day: number, month: number, year: number };
    studentScore: number; isChanged: { searchStudent: boolean, filterThreeStudent: boolean, changeStudent: boolean };
  }): void {

    this.index = this.studentList.indexOf(student);

    this.confirmation = true;

    this.changeStudentForTable = false;
    //
    this.changed = false;

    // changeStudentForTable

  }

  public no(): void {
    this.confirmation = false;
  }

  public deleteStudent(): void {
    if (this.index !== undefined) {
      this.studentList.splice(this.index, 1);
    }
    this.resultStudentList = this.studentList;
    // this.no();
    this.confirmation = false;
  }

  public methodsOff(): void {

    this.methods = false;

  }

  public methodsOn(): void {

    this.methods = true;
    this.addStudentForTable = true;

  }


  onClick(student: {
    name: string; surname: string; patronymic: string;
    date: { day: number, month: number, year: number }; score: number; type: string;
  }): void{

    if (student.type === "add") {
    this.resultStudentList.push({ studentName: student.name, studentSurname: student.surname, studentPatronymic: student.patronymic,
      studentDate: { day: student.date.day, month: student.date.month, year: student.date.year }, studentScore: student.score,
      isChanged: { searchStudent: false, filterThreeStudent: false, changeStudent: false } });
    }

    if (student.type === "change"){
      if (this.index !== undefined) {
            this.resultStudentList[this.index].studentName = student.name;
            this.resultStudentList[this.index].studentSurname = student.surname;
            this.resultStudentList[this.index].studentPatronymic = student.patronymic;
            this.resultStudentList[this.index].studentDate.day = student.date.day;
            this.resultStudentList[this.index].studentDate.year = student.date.year;
            this.resultStudentList[this.index].studentDate.month = student.date.month;
            this.resultStudentList[this.index].studentScore = student.score;
            this.resultStudentList[this.index].isChanged.filterThreeStudent = false;
            this.resultStudentList[this.index].isChanged.searchStudent = false;
            this.resultStudentList[this.index].isChanged.changeStudent = false;
          }
    }

    this.changed = false;
    this.changeStudentForTable = false;

  }

  public close(): void{

    this.changed = false;

    this.changeStudentForTable = false;

  }



}
















