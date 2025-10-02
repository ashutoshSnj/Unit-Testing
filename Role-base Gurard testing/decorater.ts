import { SetMetadata } from "@nestjs/common";

export enum Role{
    User="user",
    Admin="Admin"
}
export const ROLES_KEY = 'roles';

export const Roles=(...roles :string[])=>SetMetadata(ROLES_KEY,roles);