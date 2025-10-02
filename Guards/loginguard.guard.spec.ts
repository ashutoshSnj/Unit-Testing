import { ExecutionContext } from '@nestjs/common';
import { LoginguardGuard } from './loginguard.guard';
import { Reflector } from '@nestjs/core';

describe('LoginguardGuard', () => {
  let gurd:LoginguardGuard;
  beforeEach(()=>{
    gurd=new LoginguardGuard();
  })
  it('should be defined', () => {
    expect(new LoginguardGuard()).toBeDefined();
  });

  it('check authorization header is valid', () => {
    const mockContext: Partial<ExecutionContext> = {
      switchToHttp:():any =>({
        getRequest:()=>({headers:{authorization:'Bearer my-outh'} }),
        getResponse:()=>({}), 
        getNext:()=>({}),    
      }),
    };
    expect(gurd.canActivate(mockContext as ExecutionContext)).toBe(true);
  });

  it("check wrong header",()=>{
    const req:Partial<ExecutionContext>={
     switchToHttp:():any=>{           
      return{
         getRequest:()=>({headers:{authorization:'Bearer outh'} }),
        getResponse:()=>({}), 
        getNext:()=>({}), 
      }
     }
    
    }
    expect(gurd.canActivate(req as ExecutionContext)).toBe(false)
  })

   it("header missing",()=>{
    const req:Partial<ExecutionContext>={
     switchToHttp:():any=>{           
      return{
         getRequest:()=>({}),
        getResponse:()=>({}), 
        getNext:()=>({}), 
      } 
     }
    
    }
    expect(gurd.canActivate(req as ExecutionContext)).toBe(false)
  })

});
