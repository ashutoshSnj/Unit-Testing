import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("check user id",async()=>{
    const user=await service.findUserById(1);
    expect(user).toEqual({id:1,name:"Ashutosh"})
  })

  it("if user not found",async()=>{
    const user =await service.findUserById(99);
    expect(user).toBeNull();
  });

  it("delete user successfully" , async () => {
    const message = await service.deleteUser(2);
    expect(message).toBe('User deleted');
  })

  it("if user not found for delete", async () => {
    await expect(service.deleteUser(99))
    .rejects.toThrow('User not found');
  });

  
  it("should add new user", async()=>{
    const newUser = await service.addUser("sk");
    expect(newUser).toEqual({id:4,name:"sk"});
  });
});
