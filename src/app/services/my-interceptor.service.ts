import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
    if (req.url.includes('user')) {
      return next.handle(req);
    }
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer my-token')
    });
    return next.handle(clonedRequest);
  }
}
