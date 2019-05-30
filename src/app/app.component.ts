import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Firebase - Docker and Heroku';
  user: any;
  token: any;
  isAuth = false;
  constructor(public afAuth: AngularFireAuth) {

  }

  GoogleSignIn(): void {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth.signInWithPopup(provider)
    .then( (data) => {
      this.token = data.credential;
      this.user = data.user;
      this.isAuth = true;
    })
    .catch( err => {
      window.alert(`Unable to complete sign in: ${err.message}`);
    });
  }

  SignOut(): void {
    this.afAuth.auth.signOut();
  }
}
