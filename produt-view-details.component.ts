import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-produt-view-details',
  templateUrl: './produt-view-details.component.html',
  styleUrls: ['./produt-view-details.component.css']
})
export class ProdutViewDetailsComponent implements OnInit {


  selectedProductIndex =0;
  product!: Product;


  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,
    private productService:ProductService){}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    
  }

  changeIndex(index){
    this.selectedProductIndex=index;


  }
  buyProduct(productId){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,id:productId
    }]);

  }
  addToCart(productId){
this.productService.addToCart(productId).subscribe(
  (response)=>{
    console.log(response); 
  },
  (error)=>{
    console.log(error);
  }
);
  }


}
