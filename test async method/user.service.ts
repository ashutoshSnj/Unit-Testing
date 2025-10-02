import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
}
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
 private users:User[]=[
    { id:1,name:"Ashutosh" },
    { id:2,name:"Sanjay" },
    { id:3,name:"Shelke" },
  ];

  async findUserById(id: number): Promise<User|null> {
    const user = this.users.find(u=>u.id===id)||null;
     return user;
  }


  async deleteUser(id:number):Promise<string> {
    const index=this.users.findIndex(u=>u.id===id);
     if (index=== -1) throw new Error('User not found');
     this.users.splice(index, 1);
    return 'User deleted';
  }

  async addUser(name:string): Promise<User> {
    const newUser:User = { id:this.users.length+1,name };
    this.users.push(newUser);
    return newUser;
  }
}
