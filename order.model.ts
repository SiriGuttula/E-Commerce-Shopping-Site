import { Product } from "./product.model";

export interface MyOrderdetails{
    orderId:number;
    orderFullName:string;
    orderFullAddress:string;
     orderContactNumber:string;
     orderAlternateContactNumber:string;
     orderStatus:string;
     orderAmount:number;
     product:Product;
     user:any
     
}