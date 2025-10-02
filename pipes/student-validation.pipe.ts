import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';


export interface StudentDto {
  name: string;
  age: number;
}

@Injectable()
export class StudentValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata):StudentDto {
   if (typeof value !== 'object' || value === null) {
      throw new BadRequestException('Invalid student data');
    }
    const { name, age } = value;
    if (!name||typeof name!=='string'
      ||name.trim().length < 3) {
      throw new BadRequestException('Name must be at least 3 characters long');
    }

    if (typeof age!=='number'||age<5) {
      throw new BadRequestException('Age must be a number and at least 5');
    }
    return { name: name.trim(), age };
  }
}
