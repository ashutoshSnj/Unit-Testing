// role-base/role-base.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from './decorater'; // relative path

@Injectable()
export class RoleBaseGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles||requiredRoles.length === 0) {
      return true;
    }
    const req=context.switchToHttp().getRequest<{headers?:Record<string, string>}>();
    const userRole = req.headers?.['user-role'] as Role;
    return requiredRoles.includes(userRole);
  }
}
