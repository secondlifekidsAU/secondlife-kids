import { useSeo } from "@/hooks/use-seo";
import { Check, MapPin, ArrowRight, Star } from "lucide-react";

const BASE = "https://secondlifekids.zero2seventeen.com";

export default function KidsItemPickupMorningtonPeninsulaPage() {
  useSeo({
    title: "Kids Item Collection Service Mornington Peninsula | Second Life Kids",
    description: "Second Life Kids collects outgrown children's clothing, toys, books and baby gear from your front door across the Mornington Peninsula. Book online from $45. Mon, Wed & Fri pickups.",
    canonical: `${BASE}/kids-item-pickup-mornington-peninsula`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
          { "@type": "ListItem", "position": 2, "name": "Kids Item Pickup Mornington Peninsula", "item": `${BASE}/kids-item-pickup-mornington-peninsula` }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kids Item Pickup Mornington Peninsula",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Second Life Kids",
          "url": BASE,
          "areaServed": [
            { "@type": "City", "name": "Mornington", "addressRegion": "VIC" },
            { "@type": "City", "name": "Mount Martha", "addressRegion": "VIC" },
            { "@type": "City", "name": "Mount Eliza", "addressRegion": "VIC" },
            { "@type": "City", "name": "Dromana", "addressRegion": "VIC" },
            { "@type": "City", "name": "Rosebud", "addressRegion": "VIC" },
            { "@type": "City", "name": "Somerville", "addressRegion": "VIC" },
            { "@type": "City", "name": "Frankston", "addressRegion": "VIC" },
            { "@type": "City", "name": "Cranbourne", "addressRegion": "VIC" },
            { "@type": "City", "name": "Berwick", "addressRegion": "VIC" }
          ]
        },
        "description": "Door-to-door collection of outgrown kids' clothing, toys, books and baby gear across the Mornington Peninsula. Items are sorted by hand and directed to resale, redistribution or recycling.",
        "offers": {
          "@type": "Offer",
          "price": "45",
          "priceCurrency": "AUD",
          "description": "Starting price for a small collection (1–2 bags)"
        }
      }
    ]
  });

  const suburbs = [
    "Mornington", "Mount Martha", "Mount Eliza", "Dromana", "Rosebud",
    "Safety Beach", "Somerville", "Tyabb", "Hastings", "Bittern",
    "Balnarring", "Shoreham", "Flinders", "Red Hill", "Main Ridge",
    "Pearcedale", "Baxter", "Moorooduc",
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
        <section className="py-20 px-4 bg-primary/5 border-b">
          <div className="container max-w-3xl mx-auto text-center space-y-5">
            <nav aria-label="Breadcrumb" className="flex justify-center text-sm text-muted-foreground gap-2 mb-2">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <span aria-hidden="true">›</span>
              <span className="text-foreground">Mornington Peninsula</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary font-medium">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              Mornington Peninsula Shire — Monday pickups
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Kids Item Pickup Across the Mornington Peninsula
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Second Life Kids collects outgrown children's clothing, toys, books and baby gear from your front door across the Mornington Peninsula every Monday. Book online from $45 — no need to be home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <a
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-13 px-8 shadow-sm hover:bg-primary/90 transition-colors"
              >
                Book my pickup · from $45 <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground font-medium text-base h-12 px-8 hover:bg-muted transition-colors"
              >
                How it works
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-5 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" aria-hidden="true" /> From $45</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" aria-hidden="true" /> Monday pickups</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" aria-hidden="true" /> No need to be home</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" aria-hidden="true" /> Booked in 2 minutes</span>
            </div>
          </div>
        </section>

        {/* What we collect */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-2">What we collect on the Mornington Peninsula</h2>
            <p className="text-muted-foreground mb-8">Everything kids use from newborn through to primary school age. Clean and dry items only.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Baby and toddler clothing",
                "Kids' clothing (all sizes)",
                "School uniforms",
                "Shoes and boots",
                "Bags and backpacks",
                "Soft toys and stuffed animals",
                "Board games and puzzles",
                "Bikes and ride-ons",
                "Baby gear and bouncers",
                "Prams (add-on fee)",
                "Books and readers",
                "Bedding and linen",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Full list: <a href="/what-we-collect" className="text-primary hover:underline">see everything we accept →</a>
            </p>
          </div>
        </section>

        {/* How it works summary */}
        <section className="py-16 px-4 bg-primary/5 border-y">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-8">How it works for Mornington Peninsula families</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { n: "1", title: "Book online", desc: "Choose your size and a Monday pickup slot. Takes 2 minutes." },
                { n: "2", title: "Pack the bags", desc: "Clothing, toys, books, baby gear — all in bags or boxes." },
                { n: "3", title: "Leave outside by 8:30 AM", desc: "Front door or gate. No need to be home." },
                { n: "4", title: "We collect and sort", desc: "Everything sorted by hand. Resale, redistribution, recycling." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="bg-card rounded-2xl border border-border p-5 space-y-3">
                  <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold" aria-hidden="true">{n}</div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              <a href="/how-it-works" className="text-primary hover:underline">Full guide: how it works →</a>
            </p>
          </div>
        </section>

        {/* Suburbs */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-3">Mornington Peninsula suburbs we service</h2>
            <p className="text-muted-foreground mb-6">We pick up from these suburbs every Monday. More suburbs are being added — <a href="mailto:secondlifekids@zero2seventeen.com" className="text-primary hover:underline">get in touch</a> if yours isn't listed.</p>
            <div className="flex flex-wrap gap-2">
              {suburbs.map((suburb) => (
                <span key={suburb} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-foreground font-medium">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {suburb}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              We also service Casey Shire (Wednesdays) and Frankston City Council (Fridays). <a href="/service-areas" className="text-primary hover:underline">See all service areas →</a>
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-primary/5 border-y">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-8">What Mornington Peninsula families say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  quote: "I'd had four bags sitting in the spare room for six months. Booked on a Tuesday night, left them outside Wednesday morning, and by noon they were gone. Couldn't believe how easy it was.",
                  name: "Charlotte M.",
                  suburb: "Mornington"
                },
                {
                  quote: "The kids' cupboards were overflowing. I love that everything goes somewhere useful instead of a bin. Really easy to deal with and the team were lovely.",
                  name: "Kate R.",
                  suburb: "Cranbourne"
                },
              ].map((t, i) => (
                <blockquote key={i} className="bg-card rounded-2xl border border-border p-6 space-y-3">
                  <div className="flex gap-1" aria-label="Five star rating">
                    {[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />)}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">"{t.quote}"</p>
                  <footer>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" aria-hidden="true" /> {t.suburb}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Pricing for Mornington Peninsula pickups</h2>
            <p className="text-muted-foreground mb-8">Same flat fee for all suburbs. No travel surcharge.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Small", desc: "1–2 bags", price: "$45" },
                { name: "Medium", desc: "3–5 bags", price: "$65" },
                { name: "Large", desc: "6–10 bags", price: "$74" },
                { name: "XL", desc: "10+ bags", price: "Quote" },
              ].map((tier) => (
                <div key={tier.name} className="rounded-xl border border-border bg-card p-4 text-center">
                  <p className="font-semibold text-sm mb-1">{tier.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{tier.desc}</p>
                  <p className="text-xl font-bold text-primary">{tier.price}</p>
                </div>
              ))}
            </div>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-12 px-8 shadow-sm hover:bg-primary/90 transition-colors"
            >
              Book now · from $45 <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-primary/5 border-t">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                { q: "Do you cover all of the Mornington Peninsula?", a: "We currently service 18+ suburbs across Mornington Peninsula Shire every Monday, from Mornington and Mount Martha through to Flinders and Hastings. If your suburb isn't listed, get in touch — we're expanding." },
                { q: "Do I need to be home for the Monday pickup?", a: "No. Leave your bags at your front door, porch, or gate before 8:30 AM. Add a note in the booking about where to leave them. We collect while you're at work or school drop-off." },
                { q: "What can I put in the bags?", a: "Kids' clothing (all sizes), shoes, toys, books, baby gear, bedding — anything children use from newborn through to primary school age. Everything must be clean and dry." },
                { q: "How do I cancel or reschedule?", a: "Cancel more than 24 hours before your pickup for a full refund. Cancellations within 24 hours are subject to a booking fee. Use the cancellation form on our website or email us." },
              ].map(({ q, a }) => (
                <div key={q} className="bg-card rounded-xl border border-border p-5">
                  <p className="font-semibold mb-2">{q}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              More questions? See the <a href="/faq" className="text-primary hover:underline">full FAQ page</a>.
            </p>
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
