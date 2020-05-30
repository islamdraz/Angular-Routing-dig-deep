import { Injectable } from '@angular/core';

import { ProductResolved} from './product'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class ProductResolver implements Resolve<ProductResolved>{
    constructor(private productService:ProductService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>  {
      const id=route.paramMap.get('id');
          if(isNaN(+id)){
              const message=`product id ${id} is not a number `;
              return of({product:null,error:message});
          } 

     return this.productService.getProduct(+id)
     .pipe(
         map(product=>({product:product})),
         catchError(err=>{
             const message=`can't resolve ${err}`
             return of({product:null,error:message})
         })
     );
              
           
    

    }

}