import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private service:AuthServiceService,private router:Router,private route:ActivatedRoute){}
      
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ):Observable<boolean>|Promise<boolean>|boolean{
        if(this.service.isLoggedIn()){
            return true;
        }
        else{
          if( confirm('you are not loggedIn Please Login first!')){
            this.router.navigate(['login'],{relativeTo:this.route});
          }
       else{
        this.router.navigate(['home'],{relativeTo:this.route});
       }
            return false;
        }
      }
}