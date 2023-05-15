import{HttpInterceptor,HttpRequest,HttpHandler, }from '@angular/common/http'

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) {
     
        let token = localStorage.getItem('token');
        if(token!==null){
            const modifiedRequest=req.clone({
                headers:req.headers.append('Authorization',`${token}`)
            })
            return next.handle(modifiedRequest);
        }
        else{
            return next.handle(req);
        }
       
    }
}