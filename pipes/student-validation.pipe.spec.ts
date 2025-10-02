import { StudentValidationPipe } from './student-validation.pipe';
import { BadRequestException, ArgumentMetadata } from '@nestjs/common';

describe('StudentValidationPipe', () => {
  let pipe:StudentValidationPipe;
  const metadata:ArgumentMetadata={type:'body',metatype:Object,data:'' };

  beforeEach(() => {
    pipe=new StudentValidationPipe();
  });

  it('should be defined', () => {
    expect(new StudentValidationPipe()).toBeDefined();
  });

  it("return valid student", () => {
    const student = { name:'Ashutosh',age:23};
    const result = pipe.transform(student, metadata);
    expect(result).toEqual({name:'Ashutosh',age:23 });
  });

  it("throw error if input is null", () => {
    expect(()=>pipe.transform(null,metadata))
    .toThrow(BadRequestException);
    expect(()=>pipe.transform('string',metadata))
    .toThrow(BadRequestException);
  });

  it('throw error if name is invalid', () => {
    expect(() => pipe.transform({ age:10 },metadata))
    .toThrow(BadRequestException);
    expect(() => pipe.transform({ name:'Al',age: 10 },metadata))
    .toThrow(BadRequestException);
  });

  it('throw error if age is invalid', () => {
    expect(() =>pipe.transform({name:'Ashutosh',age:3},metadata))
    .toThrow(BadRequestException);
    expect(() =>pipe.transform({name:'Ashutosh',age:'ten'as any }, metadata))
    .toThrow(BadRequestException);
  });
});
