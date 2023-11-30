import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(products: Product[], searchKey:string): Product[] {
    return products.filter((product)=>product.title.toLowerCase().includes(searchKey.toLocaleLowerCase()));
  }

}
