export interface ISelectData {
  amenities?: (AmenitiesEntity)[] | null;
  cities?: (CitiesEntity)[] | null;
}

export interface AmenitiesEntity {
  id: number;
  name: string;
  icon: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface CitiesEntity {
  id: number;
  name: string;
  slug: string;
  content?: null;
  banner?: null;
  seo?: null;
  state_id?: null;
  status: string;
  deleted_at?: null;
  created_at: string;
  updated_at: string;
}
