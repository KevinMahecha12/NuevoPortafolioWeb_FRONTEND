export interface Profile {
  id: number;
  full_name: string;
  bio_short: string;
  bio_long: string;
  photo_url: string;
  location: string;
  email_public: string;
  available_for_work: boolean;
  updated_at: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: Profile[];
}