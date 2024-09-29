import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteredProducts'
})
export class FilteredProductsPipe implements PipeTransform {

  transform(products: any[], ): any[] {
    return products.filter((product)=>product.count > 0);
  }

}
