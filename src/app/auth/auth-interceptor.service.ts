import{HttpInterceptor,HttpRequest,HttpHandler, }from '@angular/common/http'

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const userData:any = localStorage.getItem('token');
        const data = JSON.parse(userData);
        
        if(data){
            const modifiedRequest=req.clone({
                headers:req.headers.append('Authorization',`Bearer ${data}`)
            })
            return next.handle(modifiedRequest);
        }
        else{
            return next.handle(req);
        }
       
    }
}