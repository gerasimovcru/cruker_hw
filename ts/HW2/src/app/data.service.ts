import { Injectable } from "@angular/core";

export interface Student {
  studentName: string;
  studentSurname: string;
  studentPatronymic: string;
  studentDate: { day: number, month: number, year: number };
  studentScore: number;

}

@Injectable({ providedIn: "root" })
export class DataService {
    private data: Student [] = [
        {
          studentName:"Иванов",
          studentSurname: "Иван",
          studentPatronymic:"Иванович",
          studentDate: {
            day: 5,
            month: 5,
            year: 2000,
          },
          studentScore: 3

        },
        {
          studentName:"Алекстандр",
          studentSurname: "Александров",
          studentPatronymic:"Александрович",
          studentDate: {
            day: 22,
            month: 2,
            year: 1997,
          },
          studentScore: 4

        },
        {
          studentName:"Петр",
          studentSurname: "Петров",
          studentPatronymic:"Петрович",
          studentDate: {
            day: 16,
            month: 9,
            year: 1998,
          },
          studentScore: 5

        },
        {
          studentName:"Владимир",
          studentSurname: "Владимиров",
          studentPatronymic:"Владимиррович",
          studentDate: {
            day: 29,
            month: 11,
            year: 2002,
          },
          studentScore: 2

        },
    ];


}
