// types/user.ts
export type User = {
  id?: number; 
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  fk_role: number;
  created_at?: Date;
  updated_at?: Date;
};