import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService,
    private router: Router) {}
  canLoad():  boolean   {
    if(this.auth.isAuth()) {
      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
