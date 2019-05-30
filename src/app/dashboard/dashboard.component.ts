import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;
  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    if (!localStorage.getItem('isauth')) {
      this.router.navigate(['/login']);
    }
    this.user = JSON.parse( localStorage.getItem('user') );
  }

  SignOut(): void {
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
