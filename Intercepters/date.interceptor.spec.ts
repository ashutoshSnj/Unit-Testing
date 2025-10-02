import { CallHandler, ExecutionContext } from '@nestjs/common';
import { DateInterceptor } from './date.interceptor';
import { lastValueFrom, of } from 'rxjs';

describe('DateInterceptor', () => {
   let interceptor: DateInterceptor;

  beforeEach(() => {
    interceptor = new DateInterceptor();
  });

  it('should be defined', () => {
    expect(new DateInterceptor()).toBeDefined();
  });

    it('add timestamp in responce', async () => {
    const requ: Partial<ExecutionContext> = {};
    const controler: Partial<CallHandler> = {
      handle:()=>of({message:'Hello'}),
    };

    const result = await lastValueFrom(
      interceptor.intercept(requ as ExecutionContext, controler as CallHandler),
    );

    expect(result).toHaveProperty('data');       
    expect(result).toHaveProperty('timestamp');  
    expect(result.data).toEqual({ message: 'Hello' });
  });


   it('transform array response', async () => {
    const requ: Partial<CallHandler> = {
      handle: () => of([1, 2, 3]),
    };

    const result = await lastValueFrom(
      interceptor.intercept({} as ExecutionContext, requ as CallHandler),
    );

    expect(result).toHaveProperty('data', [1, 2, 3]);
    expect(result).toHaveProperty('timestamp');
  });

});
