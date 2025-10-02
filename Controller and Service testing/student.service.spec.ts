import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 
  it("contain city present or not", () => {
  const result = service.findOne(1);
  expect(result).toHaveProperty("city");
});

it("name present", () => {
  const result = service.findOne(1);
  expect(result).toMatchObject({ name: expect.any(String) });
});

 it(' age 23 in students array', () => {
    const ages = service.studentdata().map(s=>s.age)
    expect(ages).toContain(23);
  });

  it('return a truthy value for students', () => {
    const students = service.allstudent();
    expect(students.length > 0).toBeTruthy();
  });

  it("check age <23",()=>{
    const students = service.studentdata();
  const agesAbove23 = students.filter(s => s.age > 23);
  expect(agesAbove23.length).toBeGreaterThan(0);
  })
 
    it('students array should not be empty', () => {
    const students = service.findAll();
    expect(students).not.toEqual([]);
  });
});
