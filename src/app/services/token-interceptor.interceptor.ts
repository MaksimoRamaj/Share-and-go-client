import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request is on its way');
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('loginToken') || ''),
  });
  return next(reqWithHeader);
};
