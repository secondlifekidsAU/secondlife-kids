import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object | object[];
}

export function useSeo({ title, description, canonical, jsonLd }: SeoOptions) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
    }

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalEl) {
      canonicalEl.setAttribute("href", canonical);
    } else {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      canonicalEl.setAttribute("href", canonical);
      document.head.appendChild(canonicalEl);
    }

    const existingJsonLd = document.querySelector('script[data-seo-jsonld]');
    if (existingJsonLd) existingJsonLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // Restore defaults on unmount
      document.title = "Kids Item Pickup Mornington Peninsula | Second Life Kids";
      const metaD = document.querySelector('meta[name="description"]');
      if (metaD) metaD.setAttribute("content", "Clear outgrown kids' clothes, toys and baby equipment without the stress. Second Life Kids collects children's items across the Mornington Peninsula for resale, reuse, donation and recycling.");
      const canon = document.querySelector('link[rel="canonical"]');
      if (canon) canon.setAttribute("href", "https://secondlifekids.zero2seventeen.com/");
      const jld = document.querySelector('script[data-seo-jsonld]');
      if (jld) jld.remove();
    };
  }, [title, description, canonical, JSON.stringify(jsonLd)]);
}
