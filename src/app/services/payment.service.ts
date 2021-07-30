import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44333/api/';
  
  constructor(private httpClient: HttpClient) {}

  payment(payment:Payment):Observable<ResponseModel>{
    let newUrl = this.apiUrl+'rentals/payment';
    return this.httpClient.post<ResponseModel>(newUrl,payment);
  }


}
