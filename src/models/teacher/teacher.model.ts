import { UserModel } from '../user/user.model';

export interface TeacherModel extends UserModel {
  id: string;
  userId: string;
  name: string;
  avatarImageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
