export interface UserModel {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface UserStorageModel {
  id: string;
  accessToken: string;
  exp: number;
  roleName: string;
  username: string;
  email: string;
}
