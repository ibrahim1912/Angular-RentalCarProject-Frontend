import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'src/app/models/color';

@Pipe({
  name: 'filterColorPipe'
})
export class FilterColorPipePipe implements PipeTransform {

  transform(value: Color[], filterText: string): Color[] {
    filterText = filterText
    ?filterText.toLocaleLowerCase()
    :""
    return filterText
    ?value
    .filter((co:Color)=>co.colorName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
