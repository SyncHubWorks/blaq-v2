import type { IImage } from "./common";

type UserRole = "user" | "business" | "admin";

export interface IUser {
  profilePic: IImage;
  _id: string;
  fullName: string;
  email: string;
  onBoarded: true;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  ageRange?: string;
  location?: string;
  mobileNo?: string;
}

export interface AuthResponse {
  message: string;
  user: IUser;
  token?: string;
}

export interface LogoutResponse {
  message: string;
}
