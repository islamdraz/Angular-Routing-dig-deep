import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductResolver } from './product-resolver.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private route:ActivatedRoute) { }
  ngOnInit(): void {
    //let id =+this.route.snapshot.paramMap.get('id')
    //this.getProduct(id);
    const productResolved:ProductResolved=this.route.snapshot.data['productResolved'];
    this.onProductRetrieved(productResolved.product)
    this.errorMessage=productResolved.error;
  }

  // getProduct(id: number) {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

 
}
