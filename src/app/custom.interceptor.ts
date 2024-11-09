import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { error } from 'console';
import { catchError, throwError } from 'rxjs';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const userSrv = inject(UserService);

  let loggedUserData :any;
  let localData: string | null = null;
  if(typeof window !== 'undefined'){

    localData = localStorage.getItem('tokenData');
  }

  if(localData != null){
    loggedUserData = JSON.parse(localData);
  }

  const cloneRequest = req.clone({
    setHeaders  :{
      Authorization: `Bearer ${loggedUserData?.token}`
    }
  })

  return next(cloneRequest).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error.status == 401)
      {
        const isRefresh = confirm('your sesssion is expired do you want to continue ?')
        if(isRefresh)
        {
          userSrv.$refreshToken.next(true);

        }
      }
      return throwError(error);
    })
  );

};
