import { ProfileResponse } from "../types/profile";

export async function getProfileData() {
  const url = process.env.NEXT_PUBLIC_API_URL_GET_PROFILE_DATA;
  if (!url) throw new Error("API URL for profile not defined");

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch profile");

  const result: ProfileResponse = await res.json();
  return result;
}