import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  console.log("--- INTERCEPTOR TRIGGERED ---");
  const token = localStorage.getItem('token');
  console.log("LOCALSTORAGE TOKEN FOUND:", token);

  if (token) {
    console.log("ADDING HEADER TO REQUEST...");
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  console.warn("NO TOKEN FOUND - SENDING REQUEST WITHOUT AUTH HEADER");
  return next(req);
};