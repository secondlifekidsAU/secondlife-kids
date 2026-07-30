import { useSeo } from "@/hooks/use-seo";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Clock, Tag } from "lucide-react";

const BASE = "https://secondlifekids.zero2seventeen.com";

const CATEGORY_COLORS: Record<string, string> = {
  "Preparation Tips": "bg-green-50 text-green-700 border-green-200",
  "About the Service": "bg-blue-50 text-blue-700 border-blue-200",
  "Local Guides": "bg-amber-50 text-amber-700 border-amber-200",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  useSeo({
    title: "Blog & Resources | Kids Items & Decluttering | Second Life Kids",
    description: "Tips for decluttering kids' rooms, preparing items for collection, and making the most of outgrown children's clothing and gear. Resources for Mornington Peninsula families.",
    canonical: `${BASE}/blog`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
      ],
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex flex-col hover:opacity-80 transition-opacity">
            <span className="text-xl font-extrabold tracking-tight text-primary leading-tight">Second Life Kids</span>
            <span className="text-[0.68rem] tracking-wide text-muted-foreground leading-none mt-1 hidden sm:block">Kids item collection · Mornington Peninsula</span>
          </a>
          <nav className="flex items-center gap-3">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">Home</a>
            <a href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">FAQ</a>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium h-9 px-4 shadow-sm hover:bg-primary/90 transition-colors"
            >
              Book a pickup
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 px-4 bg-primary/5 border-b">
          <div className="container max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex text-sm text-muted-foreground gap-2 mb-4">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <span aria-hidden="true">›</span>
              <span className="text-foreground">Blog &amp; Resources</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Blog &amp; Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Practical guides on decluttering kids' spaces, preparing items for collection, and making outgrown children's gear go further — for families across the Mornington Peninsula.
            </p>
          </div>
        </section>

        {/* Post grid */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Hero image or accent bar */}
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.imageAlt ?? post.title}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 to-primary" aria-hidden="true" />
                  )}

                  <div className="p-6 flex flex-col flex-1 gap-4">
                    {/* Category + read time */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                          CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        <Tag className="h-3 w-3" aria-hidden="true" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {post.readingTimeMinutes} min read
                      </span>
                    </div>

                    {/* Title + excerpt */}
                    <div className="flex-1">
                      <h2 className="text-lg font-bold tracking-tight leading-snug mb-2 group-hover:text-primary transition-colors">
                        <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                          {post.title}
                        </a>
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer: date + link */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/60">
                      <time
                        dateTime={post.publishedDate}
                        className="text-xs text-muted-foreground"
                      >
                        {formatDate(post.publishedDate)}
                      </time>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                        Read article <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary/5 border-t">
          <div className="container max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-bold tracking-tight">Ready to clear the clutter?</h2>
            <p className="text-muted-foreground">Book a pickup online in two minutes. We collect across the Mornington Peninsula, Casey and Frankston.</p>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-12 px-8 shadow-sm hover:bg-primary/90 transition-colors"
            >
              Book my pickup · from $45 <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-background py-10 px-4 border-t">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold">Second Life Kids</span>
            <span className="text-sm text-muted-foreground ml-2">· Mornington Peninsula, Victoria</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
            <a href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="/what-we-collect" className="hover:text-foreground transition-colors">What We Collect</a>
            <a href="/service-areas" className="hover:text-foreground transition-colors">Service Areas</a>
            <a href="/faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
