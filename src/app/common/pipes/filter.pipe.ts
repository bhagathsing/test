import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterData'})
export class FilterPipe implements PipeTransform {
    transform(value: any[], keys: string[]): any {
       
        if(!keys || !value){
            return value;
        }
        if(keys && keys.length == 0){
            return value;
        }
        let searchTxt = keys[1] ? keys[1].toLowerCase() : '';
        return value.filter(item => item[keys[0]].toLowerCase().indexOf(searchTxt) !== -1);
    }
}