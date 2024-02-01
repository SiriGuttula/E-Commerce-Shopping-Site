import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{


  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address','Contact No.','Status','Action'];
  dataSource=[];

  status:string='All';

  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    this.getAllOrderdetailsForAdmin(this.status);
  }
  getAllOrderdetailsForAdmin(statusParameter:string){
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp)=>{
        this.dataSource=resp;
        console.log(resp);
      },(error)=>{
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response)=>{
        this.getAllOrderdetailsForAdmin(this.status);
        console.log(response);
      },(error)=>{
        console.log(error);
      }
    );
  }
}
