import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent2',
  templateUrl: './rent2.component.html',
  styleUrls: ['./rent2.component.css']
})
export class Rent2Component implements OnInit {

  rentalAddForm: FormGroup;
  rentals: Rental[] = [];
  rentalDtos: RentalDetail[] = [];
  rental: Rental;
  isRented: boolean = false;


  // @Input() carforrental2: CarDetail;
  @Input() carforrental: Car;
 
  constructor( 
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.getRentals();
    this.createRentalAddForm();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }

 
  

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [''],
    });
  }

 

  createRent() {
    if(this.rentalAddForm.valid){
    //let customerID= Number(this.localStorageService.getLocalStorage('id'));
    let rent: Rental = {
      carId: this.carforrental.carId,
      customerId: this.rental.customerId,
      rentDate: this.rentalAddForm.controls['rentDate'].value,
      returnDate: this.rentalAddForm.controls['returnDate'].value,
      dailyPrice: this.carforrental.dailyPrice,
    };
    this.rental = rent;
    this.isRented = true;
    this.toastrService.success(
      'Your rental request has been received. You are redirected to the payment page.'
    );
    }
    else{
      this.toastrService.error(
        'Please select the date to rent a car', 'Error'
      );
    }
  }
}
