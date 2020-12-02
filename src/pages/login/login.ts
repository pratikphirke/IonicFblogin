import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  email: string ='admin@gmail.com';
  password: any;
   
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
      public alertCtrl: AlertController
    ) {
      this.loginForm = new FormGroup({
        email: new FormControl(),
        password: new FormControl()
     });
    
  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad LoginPage',this.loginForm);
   
  }
  login(){
   // console.log('email',this.email);
    //console.log('loginform',this.loginForm.value.password);
    //console.log('password',this.password);
    if(this.loginForm.value.email == 'admin@gmail.com' &&  this.loginForm.value.password == '12345') {
      this.navCtrl.setRoot(HomePage);
    }
  }
  }
