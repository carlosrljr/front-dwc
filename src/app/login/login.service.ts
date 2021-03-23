import { Injectable } from '@angular/core';
import { PoPageLogin } from '@po-ui/ng-templates';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(poLogin:PoPageLogin){
    console.log(poLogin)
  }
}
