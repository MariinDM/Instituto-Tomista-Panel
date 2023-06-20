import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRolGuard implements CanActivate {

  constructor(private router: Router, private spinner: NgxSpinnerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const rol = localStorage.getItem('role')
    if (rol == '1') {
      return true
    }
    this.spinner.hide()
    this.router.navigate(['/dashboard']);
    return false
  }

}
