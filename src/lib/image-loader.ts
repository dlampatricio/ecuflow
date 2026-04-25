import type { ImageLoaderProps } from "next/image";

export function supabaseImageLoader({ src, width, quality }: ImageLoaderProps) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const index = src.indexOf("/storage/v1/object/public/");
  const path = index !== -1 ? src.substring(index) : src;
  
  const params = new URLSearchParams();
  params.set("width", width.toString());
  params.set("quality", (quality || 75).toString());
  params.set("format", "webp");
  params.set("resize", "fit");

  return `${supabaseUrl}/storage/v1/image/resize/${path}?${params.toString()}`;
}