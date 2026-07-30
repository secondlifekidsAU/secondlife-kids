import { useSeo } from "@/hooks/use-seo";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE = "https://secondlifekids.zero2seventeen.com";

export default function HowItWorksPage() {
  useSeo({
    title: "How It Works | Kids Item Pickup | Second Life Kids",
    description: "Book online, pack the bags, leave them outside. Second Life Kids collects outgrown kids' items from your door across the Mornington Peninsula and sorts everything by hand. Here's how.",
    canonical: `${BASE}/how-it-works`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
          { "@type": "ListItem", "position": 2, "name": "How It Works", "item": `${BASE}/how-it-works` }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to book a kids item pickup with Second Life Kids",
        "description": "Book online, pack outgrown kids items, leave outside by 8:30 AM, and we collect and sort everything by hand.",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Book online in 2 minutes", "text": "Pick a collection size, choose a Monday, Wednesday or Friday pickup, confirm your address and pay securely online." },
          { "@type": "HowToStep", "position": 2, "name": "Pack up what they've outgrown", "text": "Clothes, shoes, toys, books, baby gear and bedding — all in bags or boxes. Keep them clean and dry." },
          { "@type": "HowToStep", "position": 3, "name": "Leave it outside", "text": "Pop the bags by your front door or gate before 8:30 AM on your collection day. No need to be home." },
          { "@type": "HowToStep", "position": 4, "name": "We collect and sort everything by hand", "text": "Our team picks up your bags and sorts every item by condition. Nothing gets lumped together." },
          { "@type": "HowToStep", "position": 5, "name": "Every item finds a better ending", "text": "Good condition items go to resale or local families in need. The rest is recycled. Very little reaches landfill." }
        ]
      }
    ]
  });

  const steps = [
    {
      number: 1,
      title: "Book online in 2 minutes",
      detail: "Choose a collection size — Small, Medium, Large or XL — and pick a day. We collect on Mondays, Wednesdays and Fridays. Enter your address, confirm the details, and pay securely online. That's it. No phone calls, no waiting on hold.",
    },
    {
      number: 2,
      title: "Pack up what they've outgrown",
      detail: "Gather everything into bags or boxes. Clothing, shoes, toys, board games, books, baby gear, bedding — anything kids use from newborn through to primary school age. Keep items clean and dry and you're set. You don't need to sort by type or size.",
    },
    {
      number: 3,
      title: "Leave it outside before 8:30 AM",
      detail: "On your pickup day, place the bags by your front door, porch, or gate before 8:30 AM. Then forget about it. You don't need to be home. Just add a note at booking to tell us where to look, especially if you live in a unit or apartment.",
    },
    {
      number: 4,
      title: "We collect and sort everything by hand",
      detail: "Our team comes to your address, collects the bags, and takes them back to be sorted. Every item is assessed individually by condition. Nothing is lumped together or tipped out. Each category — clothing, toys, books, baby gear — is sorted separately.",
    },
    {
      number: 5,
      title: "Every item finds a better ending",
      detail: "Best-condition items go to resale or directly to local families in need. Remaining usable items go through redistribution channels. What genuinely can't be reused is recycled. Very little reaches landfill — that's the whole point of Second Life Kids.",
    },
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
              <span className="text-foreground">How It Works</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight">How Second Life Kids Works</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five steps. No selling, no drop-offs, no need to be home. You pack the bags and leave them outside. We handle everything else.
            </p>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-12 px-8 shadow-sm hover:bg-primary/90 transition-colors mt-2"
            >
              Book my pickup · from $45
            </a>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl mx-auto space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow">
                  {step.number}
                </div>
                <div className="space-y-2 pt-1">
                  <h2 className="text-xl font-bold tracking-tight">{step.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's included */}
        <section className="py-16 px-4 bg-primary/5 border-y">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-6">What's included in every collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Door-to-door pickup — no drop-off required",
                "Collection on Mon, Wed or Fri",
                "No need to be home during pickup",
                "Items sorted individually by hand",
                "Usable items go to resale or redistribution",
                "Non-reusable items recycled where possible",
                "Booking confirmed within 24 hours",
                "Full refund if cancelled 24+ hours before pickup",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing summary */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Pricing</h2>
            <p className="text-muted-foreground mb-8">One flat fee per collection. No hidden costs. No surprises.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
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
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base h-12 px-8 shadow-sm hover:bg-primary/90 transition-colors"
              >
                Book your pickup <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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

        {/* FAQ */}
        <section className="py-16 px-4 bg-primary/5 border-t">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Common questions</h2>
            <div className="space-y-6">
              {[
                { q: "Do I need to be home for the pickup?", a: "No. Leave everything outside by 8:30 AM at your front door, porch, or gate. We collect while you're out. Just add a note in the booking about where to find the bags." },
                { q: "What suburbs do you service?", a: "We service 40+ suburbs across the Mornington Peninsula, Casey Shire and Frankston City Council. Monday pickups cover Mornington Peninsula Shire, Wednesday covers Casey Shire, and Friday covers Frankston City Council." },
                { q: "How quickly can I get a booking?", a: "Most bookings are confirmed within 24 hours and scheduled within the same week, depending on availability. We recommend booking a few days in advance to secure your preferred week." },
                { q: "What if I have more than I booked for?", a: "Book up a size. If you end up with more on the day, our team will do their best, but vehicle capacity may be a limit. It's always better to book a larger size upfront." },
              ].map(({ q, a }) => (
                <div key={q} className="bg-card rounded-xl border border-border p-5">
                  <p className="font-semibold mb-2">{q}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              More questions? See the <a href="/faq" className="text-primary hover:underline">full FAQ page</a> or email <a href="mailto:secondlifekids@zero2seventeen.com" className="text-primary hover:underline">secondlifekids@zero2seventeen.com</a>.
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
