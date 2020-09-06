import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomePage } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData: any;
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    private facebook: Facebook,
 public loadingCtrl: LoadingController,
    public services: ServicesProvider,
    public alertCtrl: AlertController    ) {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
        password:  ['', [Validators.required, Validators.minLength(6)]],
      });

    }
  
    elementChanged(input){
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
    }
  

    register(){
      //this.navCtrl.push(RegisterPage);
      this.navCtrl.setRoot(RegisterPage);
    }
  
    resetPwd(){
     this.navCtrl.push(ResetPasswordPage);
    }
  
    loginEmail(){
      this.submitAttempt = true;
  
      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
        let alert = this.alertCtrl.create({
          message: 'Enter valid details',
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
    
      } else {
        this.services.doLogin(this.loginForm.value.email, this.loginForm.value.password).then( () => {
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

    loginWithFB() {
      this.facebook.login(['email', 'public_profile']).then((response:FacebookLoginResponse) => {
        this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        });
      });
    }
     
}