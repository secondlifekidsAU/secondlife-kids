import { useSeo } from "@/hooks/use-seo";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";

const BASE = "https://secondlifekids.zero2seventeen.com";

export default function WhatWeCollectPage() {
  useSeo({
    title: "What We Collect | Kids Clothing, Toys & Baby Gear | Second Life Kids",
    description: "We collect children's clothing, toys, books, baby gear and nursery equipment from newborn through primary school age across the Mornington Peninsula. See the full list of accepted items.",
    canonical: `${BASE}/what-we-collect`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
        { "@type": "ListItem", "position": 2, "name": "What We Collect", "item": `${BASE}/what-we-collect` }
      ]
    }
  });

  const categories = [
    {
      title: "Clothing and Wearables",
      items: [
        "Newborn and baby clothing",
        "Toddler and kids' clothing (all sizes)",
        "School uniforms",
        "Shoes and boots",
        "Hats, socks and accessories",
        "Bags and backpacks",
        "Swimwear and wetsuits",
        "Winter jackets and coats",
      ],
    },
    {
      title: "Toys and Play",
      items: [
        "Soft toys and stuffed animals",
        "Board games and puzzles",
        "Building blocks and LEGO",
        "Dolls and action figures",
        "Outdoor and garden toys",
        "Ride-ons, bikes and scooters",
        "Play kitchens and pretend play",
        "Arts, crafts and activity kits",
      ],
    },
    {
      title: "Baby and Nursery Gear",
      items: [
        "Bouncers, swings and rockers",
        "Baby carriers and wraps",
        "Baby baths and change accessories",
        "Playmats and activity gyms",
        "Baby monitors and small electronics",
        "Feeding gear (bottles, sterilisers)",
        "Sleeping bags and swaddles",
      ],
    },
    {
      title: "Books, Bedding and Linen",
      items: [
        "Picture books and board books",
        "Early readers and chapter books",
        "Educational and activity books",
        "School readers",
        "Cot bedding and sheets",
        "Kids' doona covers and pillowcases",
        "Blankets and quilts",
        "Towels and bath accessories",
      ],
    },
  ];

  const doNotAccept = [
    "Wet or mouldy items",
    "Broken or unsafe items",
    "Expired child car seats",
    "Mattresses and bed frames",
    "General household rubbish",
    "Hazardous materials",
    "Adult clothing or non-kids items",
  ];

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
          <div className="container max-w-3xl mx-auto text-center space-y-4">
            <nav aria-label="Breadcrumb" className="flex justify-center text-sm text-muted-foreground gap-2 mb-2">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <span aria-hidden="true">›</span>
              <span className="text-foreground">What We Collect</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight">What We Collect</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything kids use from newborn through to primary school age. Clothing, toys, baby gear, books, bedding — if it's for a child and in usable condition, we'll take it.
            </p>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-12 px-8 shadow-sm hover:bg-primary/90 transition-colors mt-2"
            >
              Book a pickup · from $45
            </a>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Accepted items</h2>
            <p className="text-muted-foreground mb-10">All items must be clean, dry, and safe to handle. If you're unsure, add a note at booking and we'll assess on the day.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <div key={cat.title} className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-4">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bulky items */}
        <section className="py-12 px-4 bg-amber-50 border-y border-amber-100">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-amber-900 mb-2">Bulky items — add-on fee applies</h2>
            <p className="text-amber-700 text-sm mb-5">Prams, cots, high chairs and similar large items can be added to any booking at an additional cost. The add-on fee is confirmed at booking.</p>
            <div className="flex flex-wrap gap-2">
              {["Prams and strollers", "Cots and portacots", "High chairs", "Baby swings (full size)", "Convertible car seats (non-expired)"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white border border-amber-200 text-amber-800 font-medium">
                  <Check className="h-3 w-3 text-amber-600" aria-hidden="true" /> {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Do not accept */}
        <section className="py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-destructive mb-2">Items we cannot accept</h2>
            <p className="text-muted-foreground text-sm mb-5">The following items will not be collected under any circumstances:</p>
            <div className="flex flex-wrap gap-2">
              {doNotAccept.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-destructive/5 border border-destructive/20 text-destructive font-medium">
                  ✕ {item}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Not sure whether an item will be accepted? Add a note in the booking and we'll assess it on the day.</p>
          </div>
        </section>

        {/* Condition guide */}
        <section className="py-12 px-4 bg-primary/5 border-t">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-xl font-bold tracking-tight mb-4">Condition guide</h2>
            <div className="space-y-4">
              {[
                { label: "Clothing and fabric items", rule: "Must be clean and dry. If an item has been sitting in a damp bag, wash it first. Clothing with minor wear is fine — stained, torn or damaged items cannot be accepted." },
                { label: "Toys and games", rule: "Should have all major pieces present. Broken parts or sharp edges are not acceptable. Battery-operated items don't need to have working batteries." },
                { label: "Books", rule: "Acceptable if pages are intact and not damaged by water. Heavily drawn-in or torn books cannot be redistributed." },
                { label: "Baby gear", rule: "Items should be clean and functional. Car seats must not be expired (check the expiry date on the base or seat). Recalled products cannot be accepted." },
              ].map(({ label, rule }) => (
                <div key={label} className="bg-card rounded-xl border border-border p-5">
                  <p className="font-semibold text-sm mb-1">{label}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="container max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-bold tracking-tight">Ready to clear the clutter?</h2>
            <p className="text-muted-foreground">Book online in under two minutes. No phone calls, no waiting.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-12 px-8 shadow-sm hover:bg-primary/90 transition-colors"
              >
                Book a pickup · from $45 <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground font-medium text-base h-12 px-8 hover:bg-muted transition-colors"
              >
                How it works
              </a>
            </div>
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
