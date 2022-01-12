import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "uppercase"
})
export class UppercasePipe implements PipeTransform {

    transform(value: string): string {
      console.log(123);
     return value.charAt(0).toUpperCase() + value.slice(1);
    }

}
