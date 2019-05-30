import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Firebase - Docker and Heroku';
  user: any;
  token: any;
  isAuth = false;
  constructor(public afAuth: AngularFireAuth, private router: Router) {

  }

  ngOnInit() {
    if ( localStorage.getItem('isauth') ) {
      this.isAuth = true;
      this.user = JSON.parse( localStorage.getItem('user') );
    }
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
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('isauth', 'success');
      this.router.navigate(['/dashboard']);
    })
    .catch( err => {
      window.alert(`Unable to complete sign in: ${err.message}`);
    });
  }
}
