import { UserModel } from '../user/user.model';

export interface StudentModel extends UserModel {
  id: string;
  userId: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
