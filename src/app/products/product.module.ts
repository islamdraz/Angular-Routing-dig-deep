import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {path:'products',
      children:[
        {path:'',component:ProductListComponent},
        {
          path:':id',component:ProductDetailComponent,
          resolve:{productResolved:ProductResolver}
        },
        {
          path:':id/edit',component:ProductEditComponent,
          resolve:{productResolved:ProductResolver},
          children:[
            {path:'',redirectTo:'info',pathMatch:'full'},
            {path:'info',component:ProductEditInfoComponent},
            {path:'tags',component:ProductEditTagsComponent},
          ]
          
        }
      ]
      
    },
      
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule { }
