import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartGuardGuard implements CanActivate {
  constructor(private api: ServicesService,
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.api.loggedIn.pipe(map(loggedIn => {
      if (loggedIn) {
        return true
      } else {
        this.router.navigate(['/'])
        return false
      }
    }))
  }

}
