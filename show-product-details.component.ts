import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{
  showLoadMoreProductButton=false;
  showTable =false;
  pageNumber:number=0;
  productDetails:Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price','Actions'];
  constructor(private productService: ProductService,
    public imagesdialog: MatDialog,
    private imageProcessingService:ImageProcessingService,
    private router:Router  ){}

  ngOnInit(): void {

    this.getAllProducts();
    
  }
  searchByKeyword(searchkeyword){
    console.log(searchkeyword);
    this.pageNumber=0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);

  }


  public getAllProducts(searchkeyword:string=""){
    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber,searchkeyword)
    .pipe(
      map((x:Product[], i) => x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp:Product[]) =>{
        console.log(resp);
        resp.forEach(product => this.productDetails.push(product));
        this.showTable=true;

        if(resp.length == 12){
          this.showLoadMoreProductButton = true;
        } else{
          this.showLoadMoreProductButton=false;
        }

        // this.productDetails=resp;
      },(error:HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }


  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(
      (resp) =>{
        this.getAllProducts();
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  showImages(product:Product){
    this.imagesdialog.open(ShowProductImagesDialogComponent,{
      data:{
      images:product.productImages
      },
      height:'500px',
      width:'800px'
    });
  }

  editProductDetails(productId){
   this.router.navigate(['/addNewProduct',{productId:productId}])
  }

  loadMoreProducts(){
   this.pageNumber=this.pageNumber + 1;
   this.getAllProducts();
  }
}
