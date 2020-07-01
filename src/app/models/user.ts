import {Role} from './role';

export class User {
  id: number;
  login = '';
  password = '';
  firstName = '';
  lastName = '';
  email = '';
  role: Role;
}
