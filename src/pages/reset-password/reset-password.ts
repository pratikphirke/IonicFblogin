import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {


  public resetpwdForm;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  validation_messages = {
   
    'email': [
      { type: 'required', message: 'Please Enter  Email' },
      { type: 'pattern', message: 'Invalid Email' }
    ],
    'password': [
      { type: 'required', message: 'Please Enter the Password' },
      { type: 'minlength', message: 'Enter atleast 6 digits' }
    ],
  
  }
  constructor(public navCtrl: NavController, public services: ServicesProvider,
     public navParams: NavParams, public formBuilder: FormBuilder,
     public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.resetpwdForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  resetPwd() {
    if (!this.resetpwdForm.valid){
      console.log(this.resetpwdForm.value);
    } else {
      this.services.resetPassword(this.resetpwdForm.value.email).then( () => {
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
      this.loading.present();
    }
  }

 

}
