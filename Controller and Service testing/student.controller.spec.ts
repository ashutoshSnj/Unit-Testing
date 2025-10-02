import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { create } from 'domain';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service:StudentService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{provide:StudentService,
      useValue:{
          create:jest.fn().mockImplementation(dto=>({age:23,...dto})),
            findAll: jest.fn().mockReturnValue([
             { id:1,name:'Ashutosh',city:'Pune',age:23 },
            { id:2,name:'Shelke',city:'Mumbai',age:24 },
            ]),
               findOne:jest.fn().mockImplementation(id =>({id,name:'Ashutosh',city:'Pune',age: 23 })),
               update: jest.fn().mockImplementation((id, dto) => ({id, ...dto })),
            remove: jest.fn().mockReturnValue({ deleted: true }),
        }
      }],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service= module.get<StudentService>(StudentService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("check exact data",()=>{
    const data=new CreateStudentDto();
  data.Address="pune",data.name="Ashutosh"
       expect(controller.create(data)).toEqual({"age":23,"Address":"pune","name":"Ashutosh"})
  })


  it("check the create func",()=>{
     const dto = new CreateStudentDto();
  dto.name = "Ashutosh";
  dto.Address = "Pune";
   controller.create(dto);
     expect(service.create).toHaveBeenCalledWith(dto);
  expect(service.create).toHaveBeenCalledTimes(1);
  })

  it('findAll once', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    });
   
    it(' remove student', () => {
    const result = controller.remove('1');
      expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(service.remove).toHaveBeenCalledTimes(1);
  });
   

  it('check student by id', () => {
    const student = controller.findOne('1');
    expect(student).toEqual({ id:1,name:'Ashutosh',city:'Pune',age:23 });
      expect(service.findOne).toHaveBeenCalledWith(1);
    expect(service.findOne).toHaveBeenCalledTimes(1);
  });

  
  it(' update student ', () => {
    const dto = new UpdateStudentDto();
      dto.name = 'Ashutosh Shelke';
     const updated = controller.update('1', dto);
    expect(updated).toEqual({ id: 1, ...dto });
       expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(service.update).toHaveBeenCalledTimes(1);
  });

});
