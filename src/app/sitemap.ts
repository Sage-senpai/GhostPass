import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ghostpass.vercel.app";

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/marketplace`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/privileges`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/sessions`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/tee`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/docs`, lastModified: new Date(), priority: 0.6 },
  ];
}
