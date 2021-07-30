import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { Payment2 } from '../models/payment2';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class Payment2ServiceService {

  apiUrl = 'https://localhost:44333/api/';
  constructor(private httpClient: HttpClient)  {  }

  addPayment(payment:Payment2):Observable<ResponseModel> {
    let newPath = this.apiUrl + "/payments2/add";
    //let newUrl = this.apiUrl+'rentals/payment';
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getCreditCardById(cardId:number):Observable<SingleResponseModel<CreditCard>> {
    let newPath = this.apiUrl + "/creditcards/getbyid?cardId=" + cardId;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }
}


  


 