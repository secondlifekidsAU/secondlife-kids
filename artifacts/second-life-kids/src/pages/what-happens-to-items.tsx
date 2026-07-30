import { useSeo } from "@/hooks/use-seo";
import { Check, ArrowRight } from "lucide-react";

const BASE = "https://secondlifekids.zero2seventeen.com";

export default function WhatHappensToItemsPage() {
  useSeo({
    title: "What Happens to Your Items | Second Life Kids",
    description: "Every item collected by Second Life Kids is sorted by hand. The best pieces go to resale or local families. The rest is recycled. Nothing is tipped in a bin. Here's exactly what we do.",
    canonical: `${BASE}/what-happens-to-your-items`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
        { "@type": "ListItem", "position": 2, "name": "What Happens to Your Items", "item": `${BASE}/what-happens-to-your-items` }
      ]
    }
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
              <span className="text-foreground">What Happens to Your Items</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight">What Happens to the Items We Collect</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every item is sorted by hand. Nothing is lumped together, bagged up as a job lot, or tipped in a bin. Here's exactly what we do with everything we collect.
            </p>
          </div>
        </section>

        {/* The sorting process */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">First: everything is sorted by hand</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When your bags arrive, our team sorts every item individually. Clothing is sorted by size and condition. Toys are checked for completeness and safety. Books are checked for condition. Baby gear is assessed for function and safety.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This hand-sorting step is what separates Second Life Kids from bulk donation drops or charity bins. We know exactly what we have and where it should go.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  heading: "Resale",
                  description: "Best-condition items — well-cared-for clothing, complete toy sets, quality books and baby gear in good working order — go to resale channels. This is the highest-value outcome for items that still have years of life in them.",
                },
                {
                  heading: "Redistribution",
                  description: "Items that are good quality but not suitable for resale go directly to local families in need, through community networks and local organisations across the Mornington Peninsula and surrounding areas.",
                },
                {
                  heading: "Recycling",
                  description: "What genuinely can't be reused goes to textile recycling, material recycling, or responsible disposal channels. We work to minimise what reaches landfill from every single collection.",
                },
              ].map(({ heading, description }) => (
                <div key={heading} className="bg-card rounded-2xl border border-border p-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-foreground">{heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why this matters */}
        <section className="py-16 px-4 bg-secondary/30 border-y">
          <div className="container max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Why this matters</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Kids grow fast. The average Australian child goes through hundreds of items before they reach school age — clothing in five or six sizes, multiple toy phases, books they've read twice, baby gear that was used for eighteen months. Most of it ends up in landfill not because it's rubbish, but because sorting, listing, and donating takes time that busy parents don't have.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Second Life Kids exists to close that gap. We charge a fair fee to come to you, do the logistics, and make sure every item reaches the best possible second life. The result is less landfill, more access to affordable kids' items for local families, and one less thing on your list.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { stat: "63+", label: "Bags collected" },
                { stat: "246kg", label: "Diverted from landfill" },
                { stat: "504+", label: "Items sorted by hand" },
                { stat: "517kg", label: "CO₂e avoided" },
              ].map(({ stat, label }) => (
                <div key={label} className="bg-background rounded-xl p-5 shadow-sm border border-border/50 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">{stat}</p>
                  <p className="text-xs font-medium text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Impact figures are estimates based on booked collection sizes and may change after sorting.</p>
          </div>
        </section>

        {/* What we don't do */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-4">What we don't do</h2>
            <div className="space-y-3">
              {[
                { label: "We don't sell your items back to you", desc: "Once collected, items become property of Second Life Kids. We don't provide itemised lists of what was collected." },
                { label: "We don't guarantee a specific outcome per item", desc: "We aim for the best possible outcome for every item, but the exact path depends on condition and current demand." },
                { label: "We don't accept items that can't be reused", desc: "Wet, broken, or contaminated items are not collected. If an item genuinely can't be given a second life, it shouldn't come to us." },
              ].map(({ label, desc }) => (
                <div key={label} className="bg-card rounded-xl border border-border p-5">
                  <p className="font-semibold text-sm mb-1">{label}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary/5 border-t">
          <div className="container max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-bold tracking-tight">Ready to let it go?</h2>
            <p className="text-muted-foreground">Book in two minutes. We'll handle the rest.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-12 px-8 shadow-sm hover:bg-primary/90 transition-colors"
              >
                Book my pickup · from $45 <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/what-we-collect"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground font-medium text-base h-12 px-8 hover:bg-muted transition-colors"
              >
                See what we collect
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
