import type { MetadataRoute } from "next"
import { siteName, siteDescription } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Full Stack Developer`,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#17313c",
    theme_color: "#17313c",
    lang: "en",
    categories: ["portfolio", "technology"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
