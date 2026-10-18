"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial, 
    refreshInterval: 5000, 
  });

  
  if (isLoading) return <p>Loading…</p>;
  if (error?.status === 401) return <p>Your session ended. Please sign in again.</p>;
  if (error?.status === 403 || error?.status === 404) return <p>That order is not available.</p>;
  if (error) return <p>Could not load the order.</p>;

  return <p>Status: {data.status}</p>;
}
