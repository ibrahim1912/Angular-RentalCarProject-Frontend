import { Component, Input, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { Payment2 } from 'src/app/models/payment2';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import{FormGroup,FormBuilder,FormControl,Validators, NumberValueAccessor} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment2ServiceService } from 'src/app/services/payment2-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-payment2',
  templateUrl: './payment2.component.html',
  styleUrls: ['./payment2.component.css']
})
export class Payment2Component implements OnInit {

  creditCard: string;
  expirationDate: string;
  securityCode: string;
  creditCardId:number;
  haveCreditCard:boolean = false;
  saveCard:boolean;
  selectedCard:number;
  PaymentForm:FormGroup;
  CreditCardForm:FormGroup;
  card:CreditCard;
  tempCard:CreditCard;
  creditCards:CreditCard[] = [];
  isDifferent:boolean = false;

  @Input() rentForPayment: Rental;
  constructor(
    private rentalService: RentalService,
    private paymentService: Payment2ServiceService,
    private toastrService: ToastrService,
    // private userService:UserService,
    private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    // this.getUserCreditCardList();
    this.createPaymentForm();
  }

  createPaymentForm()
  {
    this.PaymentForm = this.formBuilder.group({
      customerID:[""],
      creditCardNumber:["", Validators.required],
      expirationDate:["", Validators.required],
      CVV:["", Validators.required],
      price:[""]
    });
  }

  addPayment() {
    let id = this.localStorageService.getIdDecodeToken();
    let rent: Rental = this.rentForPayment;
    rent.customerId = id;
    let paymentModel:Payment2
   
    if(this.haveCreditCard == true && this.isDifferent == true)
    {
      // this.saveCreditCard();
      paymentModel = this.paymentWithNewCreditCardModel();
    }
    else if(this.haveCreditCard == true)
    {
       paymentModel = this.paymentWithSelectedCreditCardModel();
    }
    else{
      // this.saveCreditCard();
      paymentModel = this.paymentWithNewCreditCardModel();
    }
    this.paymentService.addPayment(paymentModel).subscribe((response) => {
      this.toastrService.success(
        'Your payment transaction has been completed successfully', "success"
      );
    });

    this.rentalService.add(rent).subscribe((response) => {   //add e  bak bir daha 
      this.toastrService.success(
        'Car rental process has been completed successfully', "success"
      );
    });

  }

  // saveCreditCard()
  // {
  //   if(this.saveCard == true)
  //   {
  //     let card:CreditCard ={
  //       customerId:this.localStorageService.getIdDecodeToken(),
  //       ownerName: this.localStorageService.getUserNameDecodeToken(),
  //       creditCardNumber: this.creditCard,
  //       expirationDate:this.expirationDate,
  //       CVV:this.CVV
  //     }
  //     this.userService.addCreditCard(card).subscribe(response_2 => {
  //       this.toastrService.success(
  //         'Your credit card information has been successfully saved', "success"
  //       );
  //     })
  //   }
  // }

  paymentWithSelectedCreditCardModel()
  {
    let id = this.localStorageService.getIdDecodeToken();
    let paymentModel:Payment2 = {
      customerId : id,
      price : this.rentForPayment.dailyPrice,
      creditCardNumber: this.tempCard.creditCardNumber,
      expirationDate : this.tempCard.expirationDate,
      CVV : this.tempCard.CVV,
    }
    return paymentModel;
  }

  paymentWithNewCreditCardModel()
  {
    let id = this.localStorageService.getIdDecodeToken();
    let paymentModel:Payment2 =  Object.assign({}, this.PaymentForm.value);
    paymentModel.customerId = id;
    paymentModel.price = this.rentForPayment.dailyPrice;
    return paymentModel;
  }

  // getUserCreditCardList()
  // {
  //   let id = this.localStorageService.getIdDecodeToken();
  //   this.userService.getAllCreditCard(id).subscribe(response => {
  //     this.creditCards = response.data;
  //     if(this.creditCards.length > 0) 
  //     {
  //       this.haveCreditCard = true;
  //     }
  //   });
  // }

  getSelectedCreditCard(card:CreditCard)
  {
    this.tempCard = card;
  }

  addNewCard()
  {
    this.isDifferent = true;
  }
}