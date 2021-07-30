import { Component, Input,OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;

  // sonradan geldi
  rentals: Rental[] = [];
  customers: Customer[];
  cars:Car;
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  rentBeginDate: Date;
  rentEndDate: Date;
  isRented=false;
  rental: Rental;
  // @Input() car: Car;
  // sonradan geldi bitiş
  
  


  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router,  //sonraadn
    private customerService: CustomerService,//sonradan
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
    // this.getCustomers(); //sonradn
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['',Validators.required ],
    });
  }

  
   

  add() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      this.rentalService.add(rentalModel).subscribe(
        response => {
          this.isRented = true; //sonradan
          this.toastrService.success(response.message, 'Başarılı');
          this.toastrService.info("Navigate to  Payment Page");//sonradan
          this.router.navigate(['/car']);//sonradan
        }, responseError => {
          //console.info(responseError);
          //this.toastrService.error(responseError.error);
          this.toastrService.error(responseError.error);
          if(responseError.error.length > 0) {
            this.toastrService.error(responseError.error);
          }
         
          else if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
          
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10)
  }

  // sonradan gelenler

  // getCustomers() {
  //   this.customerService.getCustomers().subscribe(response => {
  //     this.customers = response.data;
  //   })
  // }

  // getDate(day: number) {
  //   var today = new Date();
  //   today.setDate(today.getDate() + day);
  //   return today.toISOString().slice(0, 10)
  // }

  // create() {
  //   let rental: Rental =
  //   {
  //     carId: this.car.carId,
  //     customerId: parseInt(this.customerId.toString()),
  //     rentDate: this.rentDate,
  //     returnDate: this.returnDate
  //   }
  //   this.rentalService.add(rental).subscribe(repsonse=>{
  //     this.toastrService.info("Navigate to  Payment Page");
  //     this.toastrService.success("RENT OK");
  //     this.router.navigate(['/payment', JSON.stringify(rental)]);
  //   },error=>{
  //     console.info(error)
  //     this.toastrService.error(error.error)
  //     this.toastrService.error(error.error.Message)
  //   })
  // }





}


