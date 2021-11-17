export interface IUser {
  id: number;
  username: string;
  email: string;
  email_verified_at?: null;
  name: string;
  phone?: null;
  status: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
  permissions?: (null)[] | null;
  roles?: (IRoles)[] | null;
}

export interface IRoles {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: IPivot;
}

export interface IPivot {
  model_id: number;
  role_id: number;
  model_type: string;
}
