import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorRolGuard implements CanActivate {

  constructor(private router: Router, private spinner: NgxSpinnerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const rol = localStorage.getItem('rol')
    if (rol == '1' || rol == '5') {
      // this.router.navigate(['/dashboard']);
      return true
    }
    this.spinner.hide()
    return false
  }
}
