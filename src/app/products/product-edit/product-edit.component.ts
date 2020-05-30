import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string;

  product: Product;

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private route:ActivatedRoute,
              private router:Router) { }
  ngOnInit(): void {
    //let id=+this.route.snapshot.paramMap.get('id');    
    // this.route.paramMap.subscribe({
    //   next:param=>{
    //    let id= +param.get('id')
    //     this.getProduct(id);
    //   }
    // })
   
    /* incase the rout data will not change you could use the snapshot property without issue */
    // const productResolved:ProductResolved= this.route.snapshot.data['productResolved']

    // this.onProductRetrieved(productResolved.product);
    // this.errorMessage=productResolved.error;

    this.route.data.subscribe(data=>{
       const productResolved:ProductResolved= data['productResolved']
       this.onProductRetrieved(productResolved.product);
       this.errorMessage=productResolved.error;
    })

  }

  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigateByUrl('/products')
  }
}
