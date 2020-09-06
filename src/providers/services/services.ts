
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';




@Injectable()
export class ServicesProvider {
  public fireAuth: any;
  public userData: any;

  constructor() {
    console.log('Hello ServicesProvider Provider');
 
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userData');
  }

  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
 
  register(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userData.child(newUser.uid).set({email: email});
      });
  }
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
  doLogout(): any {
    return this.fireAuth.signOut();
  }
}