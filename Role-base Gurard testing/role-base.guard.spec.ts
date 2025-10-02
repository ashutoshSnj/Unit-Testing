import { Reflector } from '@nestjs/core';
import { RoleBaseGuard } from './role-base.guard';
import { ExecutionContext } from '@nestjs/common';
import { Role } from './decorater';

describe('RoleBaseGuard', () => {
  let guard: RoleBaseGuard;
  let reflector: Reflector;
beforeEach(() => {
    // Mock reflector
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;
 guard = new RoleBaseGuard(reflector);
  });

   it('should be defined', () => {
    expect(guard).toBeDefined();
  });

    it('iff not use Role', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(undefined);
    const requ:Partial<ExecutionContext> = {
      switchToHttp:():any => ({
        getRequest:()=>({}),
      }),
      getHandler:()=>jest.fn(),
      getClass:()=>jest.fn(),
    };
    expect(guard.canActivate(requ as ExecutionContext)).toBe(true);
  });

  it('if user role matched', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue([Role.Admin]);

    const req:Partial<ExecutionContext> = {
      switchToHttp:():any => ({
        getRequest:()=>({headers:{'user-role':Role.Admin}}),
      }),
      getHandler: () =>jest.fn(),
      getClass: () =>jest.fn(),
    };
  expect(guard.canActivate(req as ExecutionContext)).toBe(true);
  });

  
  it('iff user role does not match required role', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue([Role.Admin]);
    const requ: Partial<ExecutionContext> = {
      switchToHttp: ():any => ({
        getRequest:() =>({headers:{'user-role':Role.User } }),
      }),
      getHandler:()=>jest.fn(),
      getClass:()=>jest.fn(),
    };

    expect(guard.canActivate(requ as ExecutionContext)).toBe(false);
  });

  it('should deny access if header missing', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue([Role.Admin]);

    const req: Partial<ExecutionContext> = {
      switchToHttp:():any=>({
        getRequest:()=>({}),
      }),
      getHandler:()=>jest.fn(),
      getClass:()=>jest.fn(),
    };
    expect(guard.canActivate(req as ExecutionContext)).toBe(false);
  });

  });


