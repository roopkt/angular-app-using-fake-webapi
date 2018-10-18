
import { UserApi } from './service/user.api';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-app-fake-api-sample';
  users$: Observable<User[]>;

  constructor(private userApi: UserApi) {
    this.users$ = this.userApi.getAllUsers();
  }
}
