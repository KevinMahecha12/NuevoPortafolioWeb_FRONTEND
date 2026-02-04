export interface ProjectDetails {
  id: number;
  slug: string;
  title: string;
  description_short: string;
  description_long: string;
  thumbnail_url: string;
  gallery_urls: string[];
  start_date: string;
  end_date: string | null;
  is_featured: boolean;
  github_url: string | null;
  live_url: string | null;
  order: number;
  is_public: boolean;
  project_category: {
    id: number;
    name: string;
    description: string;
  };
  technologies_used: {
    id: number;
    name: string;
    icon_url: string;
    category: {
      id: number;
      name: string;
    };
  }[];
}

export interface ProjectCategory {
  id: number;
  name: string;
  description: string;
}
