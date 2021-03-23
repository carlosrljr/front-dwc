import { Component, OnInit } from '@angular/core';
import { PoPageLogin } from '@po-ui/ng-templates';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo = '/assets/logo.png';

  constructor(private service:LoginService) { }

  ngOnInit(): void {
  }

  login(poLogin:PoPageLogin): void {
    this.service.login(poLogin)
  }

}
