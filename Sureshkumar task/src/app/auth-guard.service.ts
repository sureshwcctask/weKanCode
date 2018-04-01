import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    private isLoggedIn = false;
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        debugger
        const userName = JSON.parse(localStorage.getItem('userDetails'));
        if (userName) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}
