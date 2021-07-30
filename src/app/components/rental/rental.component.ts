import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';

import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: Rental[] = [];
  customers: Customer[];

  customerId: number;
  rentDate: Date;
  returnDate: Date;
  rentBeginDate: Date;
  rentEndDate: Date;

  @Input() car: Car;


  constructor(
    private rentalService: RentalService,
    // private authService:AuthService,
    private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  // isLogOK(){
  //   if(this.authService.isAuthenticated()){
  //     return true;
  //   }else{
  //     this.toastrService.error("Must be Login or Register")
  //     this.router.navigate(['/homepage'])
  //     return false;
  //   }
  // }

  getCustomer() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    })
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10)
  }

  create() {
    let rental: Rental =
    {
      carId: this.car.carId,
      customerId: parseInt(this.customerId.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate
    }
    this.rentalService.add(rental).subscribe(response=>{
      this.toastrService.info("Navigate to  Payment Page");
      this.toastrService.success("RENT OK");
      this.router.navigate(['/payment', JSON.stringify(rental)]);
    },error=>{
      console.info(error)
      this.toastrService.error(error.error)
      this.toastrService.error(error.error.Message)
    })
  }
}