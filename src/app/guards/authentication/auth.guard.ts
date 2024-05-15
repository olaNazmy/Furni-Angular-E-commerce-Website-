import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => 
{
  const router = inject(Router);
  const localData = localStorage.getItem('LoginTokn');
  if(localData != null)
  {
      return true;
  }
  else
  {
    alert('You have to login');
    router.navigateByUrl('/login');
    return false;
  }
}; 

