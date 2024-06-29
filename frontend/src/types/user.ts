export enum Roles {
  USER = "user",
  OWNER = "owner",
  CUSTOMER = "customer",
  ADMIN = "admin",
}

export type Role = "admin" | "customer" | "owner" | "user";

export interface IUser {
  id: number;
  username: string;
  display_name: string;
  email: string;
  role: Role;
  last_login: Date;
}

export type IDonor = {
  id: number;
  user_id: number;
  balance: number;
};

// export type INonprofit = {}

// export type IAdmin = {}
