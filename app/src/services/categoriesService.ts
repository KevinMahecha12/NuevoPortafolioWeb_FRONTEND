import { CategoriesResponse } from "../types/categories";

export async function getCategories() {
  const url = process.env.NEXT_PUBLIC_API_URL_GET_CATEGORIES;
  
  if (!url) throw new Error("API URL not defined");

  const res = await fetch(url, { 
    cache: 'no-store' 
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const result: CategoriesResponse = await res.json();
  return result; 
}