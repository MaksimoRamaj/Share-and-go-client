import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request is on its wayy');
  if(req.url.includes('login') || req.url.includes('sign-up') || req.url.includes('forgot-password') || req.url.includes('verify')){
    return next(req);
  }
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('loginToken') || ''),
  });
  return next(reqWithHeader);
};
