import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../role-base/decorater';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoginguardGuard implements CanActivate {
 

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

     const req = context.switchToHttp().getRequest();
  const authHeader = req.headers?.authorization; 
  return authHeader === 'Bearer my-outh';
  
  }
}
