import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {
  submitted = false;
  registrationForm: FormGroup;
  
  validation_messages = {
    'firstName': [
    { type: 'required', message: 'Please Enter Name' },
    { type: 'pattern', message: 'Invalid Name' }
    ],
    'lastName': [
      { type: 'required', message: 'Please Enter lastName' },
      { type: 'pattern', message: 'Invalid Name' }
    ],
    'email': [
      { type: 'required', message: 'Please Enter  Email' },
      { type: 'email', message: 'Invalid Email' }
    ],
    'mobile': [
      { type: 'required', message: 'Please Enter Mobile Number' },
      { type: 'minlength', message: 'Invalid mobile number' }
    ],
    'address': [
      { type: 'required', message: 'Please Enter Address' }
    ],
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public services: ServicesProvider, 
    public formBuilder: FormBuilder,
    ) {
     this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]]
    });
  }
  

  register() {
   if (this.registrationForm.invalid) {
      return;
    }
    this.services.addCustomer(this.registrationForm.value)     
    this.showAlert()
    this.navCtrl.setRoot(HomePage)
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'successfull...',
      subTitle: 'ADD Customer ' + this.registrationForm.value.firstName,
      buttons: ['OK']
    });
    
    alert.present();

  }

}
