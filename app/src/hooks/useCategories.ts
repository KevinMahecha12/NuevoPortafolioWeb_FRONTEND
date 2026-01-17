"use client";

import { useFetch } from './useFetch';
import { CategoriesResponse, Category } from '../types/categories';

const API_URL_CATEGORIES = process.env.NEXT_PUBLIC_API_URL_GET_CATEGORIES || "";

export function useCategories() {
  if (!API_URL_CATEGORIES) {
    console.error("ERROR: NEXT_PUBLIC_API_URL_GET_CATEGORIES is not defined in .env");
  }

  const { data, isLoading, error, refetch } = useFetch<CategoriesResponse>(API_URL_CATEGORIES);

  return {
    sucess: data?.success,
    message: data?.message,
    categories: data?.data || [], 
    isLoading,
    error: !API_URL_CATEGORIES ? new Error("API URL missing") : error,
    refresh: refetch
  };
}