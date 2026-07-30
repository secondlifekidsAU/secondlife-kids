import { useState } from "react";
import { useSeo } from "@/hooks/use-seo";
import { Check, MapPin, ArrowRight } from "lucide-react";

const BASE = "https://secondlifekids.zero2seventeen.com";

const areas = [
  {
    day: "Monday",
    council: "Mornington Peninsula Shire",
    description: "We service the Peninsula every Monday, from the bay-side suburbs to the hinterland.",
    suburbs: [
      "Mornington", "Mount Martha", "Mount Eliza", "Dromana", "Rosebud",
      "Somerville", "Tyabb", "Tuerong", "Moorooduc", "Baxter",
      "Safety Beach", "Arthurs Seat", "Main Ridge", "Red Hill", "Red Hill South",
      "Shoreham", "Flinders", "Balnarring", "Balnarring Beach", "Bittern",
      "Merricks", "Merricks North", "Hastings", "Pearcedale",
    ],
  },
  {
    day: "Wednesday",
    council: "Casey Shire",
    description: "Casey suburbs are covered every Wednesday, including the growth corridor from Berwick to Clyde.",
    suburbs: [
      "Cranbourne", "Cranbourne South", "Cranbourne North", "Cranbourne West", "Cranbourne East",
      "Narre Warren", "Narre Warren South", "Berwick", "Hampton Park",
      "Endeavour Hills", "Hallam", "Clyde", "Sandhurst",
    ],
  },
  {
    day: "Friday",
    council: "Frankston City Council",
    description: "Frankston and surrounds are serviced every Friday, from Seaford down to Langwarrin and Skye.",
    suburbs: [
      "Frankston", "Frankston South", "Langwarrin", "Skye",
      "Carrum Downs", "Seaford", "Seaford Heights", "Karingal",
    ],
  },
];

export default function ServiceAreasPage() {
  const [suburbInput, setSuburbInput] = useState("");
  const [suburbResult, setSuburbResult] = useState<"yes" | "no" | null>(null);

  const allSuburbs = areas.flatMap(a => a.suburbs.map(s => s.toLowerCase()));

  function checkSuburb() {
    const v = suburbInput.trim().toLowerCase();
    if (!v) return;
    setSuburbResult(allSuburbs.includes(v) ? "yes" : "no");
  }

  useSeo({
    title: "Service Areas | Mornington Peninsula, Casey & Frankston | Second Life Kids",
    description: "Second Life Kids services 40+ suburbs across the Mornington Peninsula, Casey Shire and Frankston City Council. Monday, Wednesday and Friday pickups. Check if your suburb is covered.",
    canonical: `${BASE}/service-areas`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
        { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": `${BASE}/service-areas` }
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
          <div className="container max-w-3xl mx-auto text-center space-y-5">
            <nav aria-label="Breadcrumb" className="flex justify-center text-sm text-muted-foreground gap-2 mb-2">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <span aria-hidden="true">›</span>
              <span className="text-foreground">Service Areas</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight">Kids Item Pickup Service Areas</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We service 40+ suburbs across the Mornington Peninsula, Casey Shire and Frankston City Council on three days a week. Check if your suburb is included below.
            </p>
            {/* Suburb checker */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={suburbInput}
                  onChange={e => { setSuburbInput(e.target.value); setSuburbResult(null); }}
                  onKeyDown={e => e.key === "Enter" && checkSuburb()}
                  placeholder="Enter your suburb…"
                  className="flex-1 rounded-full px-4 py-2.5 text-sm border border-border bg-background outline-none focus:border-primary transition-colors"
                  aria-label="Enter your suburb to check availability"
                />
                <button
                  onClick={checkSuburb}
                  className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium h-10 px-5 hover:bg-primary/90 transition-colors shrink-0"
                >
                  Check
                </button>
              </div>
              {suburbResult === "yes" && (
                <p className="mt-3 text-green-600 text-sm font-medium flex items-center gap-1.5 justify-center">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Yes! We service {suburbInput.trim()}. <a href="/book" className="underline ml-1">Book your pickup →</a>
                </p>
              )}
              {suburbResult === "no" && (
                <p className="mt-3 text-muted-foreground text-sm text-center">
                  We don't currently service that suburb, but we're expanding. <a href="mailto:secondlifekids@zero2seventeen.com" className="text-primary hover:underline">Get in touch</a> and we may still be able to help.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto space-y-14">
            {areas.map((area) => (
              <div key={area.day}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{area.day}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">{area.council}</h2>
                <p className="text-muted-foreground mb-6">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.suburbs.map((suburb) => (
                    <span key={suburb} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-foreground font-medium">
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {suburb}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How schedule works */}
        <section className="py-16 px-4 bg-primary/5 border-y">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-6">How the pickup schedule works</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We run three dedicated routes each week across South-East Melbourne and the Mornington Peninsula. Once you book, your specific pickup day will be confirmed within 24 hours based on your suburb and current availability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You don't need to be home. Simply leave your bags at your front door, porch, or gate before <strong>8:30 AM</strong> on your collection day. Add a note in the booking about where to find the bags.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We're actively expanding our service area. If your suburb isn't listed, <a href="mailto:secondlifekids@zero2seventeen.com" className="text-primary hover:underline">email us</a> and we'll let you know if we can help or add you to the waitlist.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="container max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-bold tracking-tight">Ready to book?</h2>
            <p className="text-muted-foreground">Book online in under two minutes. No phone calls needed.</p>
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
