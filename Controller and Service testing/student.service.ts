import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  create(createStudentDto: CreateStudentDto) {
  }

  findAll() {
    return {"name":"ashutosh",
      "city":"pune",
      "age":23
    };
  }

  findOne(id: number) {
    return {
      "id":12,
      "name":"ash",
       "city":"nashik"
    }
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
  allstudent(){
    return [{"name":"ashutosh"},{"name":"shelke"}]
  }
 
studentdata() {
  return [
    { name: "ashutosh", city: "pune", age: 23 },
    { name: "shelke", city: "nashik", age: 25 }
  ];
}

}
