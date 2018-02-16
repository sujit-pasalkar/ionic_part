import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

//import { UserClass } from '../../models/userClass';

import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 user = {} as User;
//userClass:UserClass;

a

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams)
   {
   //  this.userClass=new UserClass();
  }

//
/*   ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  } */

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword("s@gmail.com","123456");//user.email, user.password
      if (result) {

       this.a= user.email;
        this.navCtrl.setRoot('HomePage');
      }  
    }
    catch (e) {
      console.error(e);
    }
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email, 
        user.password
      );
      if (result) {
        this.navCtrl.setRoot('HomePage');
      }
    } catch (e) {
      console.error(e);
    }
  }

}
