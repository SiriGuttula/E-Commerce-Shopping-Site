import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderdetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  public addProduct(product:FormData){
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct",product);
  }
  
  public getAllProducts(pageNumber,searchkeyword:string = "" ){
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchkeyword);
  }
  public getproductDetailsById(productId){
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }

  public deleteProduct(productId:Number){
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }

  public getProductDetails(isSingleProductCheckout,productId){
          return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }
  public placeOrder(orderDetails:OrderDetails,isCartCheckout){
   return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout,orderDetails);
  }
  public addToCart(productId){
    return this.httpClient.get("http://localhost:9090/addToCart/"+productId);
  }

  public getCartDetails(){
    return this.httpClient.get("http://localhost:9090/getCartDetails");
  }
  public deleteCartItem(cartId){
   return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }
  public getMyOrders():Observable<MyOrderdetails[]>{
    return this.httpClient.get<MyOrderdetails[]>("http://localhost:9090/getOrderDetails");
  }
  public getAllOrderDetailsForAdmin(status:string):Observable<MyOrderdetails[]>{
    return this.httpClient.get<MyOrderdetails[]>("http://localhost:9090/getAllOrderDetails/"+status);
  }
  public markAsDelivered(orderId){
    return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/"+orderId);
  }
}
