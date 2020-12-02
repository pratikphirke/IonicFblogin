import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {
  submitted = false;
  registrationForm: FormGroup;
  
  validation_messages = {
    'firstName': [
    { type: 'required', message: 'Please Enter Name' },
    { type: 'pattern', message: 'Invalid Name' }
    ]
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public services: ServicesProvider,
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder,
    ) {
     // Create the form and define fields and validators.
     this.registrationForm = this.formBuilder.group({
      location: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
     
    });
  }
  

  register() {
   if (this.registrationForm.invalid) {
      return;
    }
    this.services.addlocation(this.registrationForm.value)     
    this.showAlert()
    this.navCtrl.setRoot(HomePage)  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Add Location',
      //subTitle: 'Customer ADD successfully..!!',
      buttons: ['OK']
    });
    alert.present();
  }

}
