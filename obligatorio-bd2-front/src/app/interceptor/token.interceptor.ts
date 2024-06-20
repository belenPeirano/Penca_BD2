import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('x-token');
    if (token) {
      req = req.clone({
        setHeaders: {
          ['x-token']: `${token}`
        }
      });
    }
  }
  return next(req);
};
