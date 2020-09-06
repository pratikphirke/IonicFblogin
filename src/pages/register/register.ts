import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public registerForm;
 
  submitAttempt: boolean = false;
  loading: any;

  validation_messages = {
    'fullname': [
      { type: 'required', message: 'Please Enter full Name' },
      { type: 'pattern', message: 'Invalid Name' }
    ],
    'email': [
      { type: 'required', message: 'Please Enter  Email' },
      { type: 'pattern', message: 'Invalid Email' }
    ],
    'password': [
      { type: 'required', message: 'Please Enter the Password' },
      { type: 'minlength', message: 'Enter atleast 6 digits' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Please Enter the confirm Password' },
      { type: 'equalto', message: 'Password does not match' }
    ],
  }
  constructor(public navCtrl: NavController,
     public services: ServicesProvider, 
     public navParams: NavParams, 
     public formBuilder: FormBuilder,
     public alertCtrl: AlertController,
      public loadingCtrl: LoadingController) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, this.equalto('password')]],
      fullname:  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    });
  }
  // get f() { return this.registrationForm.controls; }
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid=control.root.value[field_name]==input
    if(!isValid)
      return { 'equalto': {isValid} }
    else
      return null;
    };
  }
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.services.register(this.registerForm.value.email, this.registerForm.value.password).then( () => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.navCtrl.setRoot(LoginPage);
      this.loading.present();
    }
  }

}