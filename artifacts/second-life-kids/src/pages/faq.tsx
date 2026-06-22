import { useLocation } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const categories = [
  {
    label: "The basics",
    items: [
      {
        q: "Where does everything actually go?",
        a: "Every item is sorted by hand. The best-condition pieces go to resale or directly to local families who need them. Remaining usable items go through other reuse channels. What genuinely can't be reused gets recycled where possible. Nothing is lumped together and nothing is just tipped in a bin — that's the whole point.",
      },
      {
        q: "Are you a charity?",
        a: "No. We're a paid collection and sorting service. Think of us as the part between your spare room and the items' second life that nobody has time to do themselves. We charge a flat fee for coming to you, handling the logistics, and making sure everything is sorted responsibly. No guilt, no hassle, no landfill.",
      },
      {
        q: "Can I mix clothing, toys, and bedding in the same collection?",
        a: "Absolutely. Most collections are a mix. Pack everything into bags or boxes and we'll sort it all at our end. Just make sure items are clean, dry, and safe to handle.",
      },
    ],
  },
  {
    label: "Preparing your items",
    items: [
      {
        q: "Do I need to wash everything first?",
        a: "Yes. Clothing, bedding, and fabric items need to be clean and dry before we collect. Wet or mouldy items can't be accepted because they contaminate everything around them. If something has been sitting in a damp bag, give it a wash first. If you're not sure, just add a note in the booking and we'll assess on the day.",
      },
      {
        q: "Do you accept school uniforms?",
        a: "Yes. Clean, good-condition school uniforms are welcome. They're often in high demand through second-life channels and can be a great way to help other local families.",
      },
      {
        q: "Can I include baby gear like a cot, high chair, or pram?",
        a: "Bulky items like cots, prams, and high chairs are handled as add-ons and quoted separately. They require more space and handling than a standard collection. See our Bulky Items section when booking or get in touch before you book.",
      },
    ],
  },
  {
    label: "On the day",
    items: [
      {
        q: "Do I need to be home?",
        a: "Nope. That's one of the best parts. Leave everything outside by 8:30 AM, at your front porch, front gate, or wherever is safe and dry. We'll collect it while you're at work, at school drop-off, or still in bed. Just add a note at booking so our team knows where to look.",
      },
      {
        q: "What if I end up with more than I booked for?",
        a: "It happens. Once you start, you always find more. If you think you've significantly exceeded your booked size, just reach out before your pickup day and we'll adjust. On the day, our team will do their best, but vehicle capacity means we may not be able to take everything if it's a big difference. When in doubt, book up a size.",
      },
      {
        q: "What if I live in a unit or apartment?",
        a: "No problem. You can leave items in your building's foyer, near the entrance, or at another agreed spot. Just add a note in the booking with access instructions so our team knows where to go.",
      },
    ],
  },
  {
    label: "Scheduling & service area",
    items: [
      {
        q: "How do I know which day you collect in my area?",
        a: "We run three routes each week. Monday for Mornington Peninsula Shire, Wednesday for Casey Shire, and Friday for Frankston City Council. When you book, we'll confirm your exact collection day within 24 hours based on your suburb.",
      },
      {
        q: "How quickly can I get a collection booked?",
        a: "Most bookings are confirmed within 24 hours and scheduled within the same week, depending on availability. We recommend booking a few days in advance to secure your preferred week.",
      },
      {
        q: "My suburb isn't listed. Can I still book?",
        a: "We're actively expanding our service area across South-East Melbourne and the Mornington Peninsula. If your suburb isn't listed yet, get in touch. Depending on your location, we may still be able to help or add you to our waitlist.",
      },
    ],
  },
  {
    label: "Cancellations & refunds",
    items: [
      {
        q: "What if I need to cancel?",
        a: "Cancel more than 24 hours before your pickup and you get a full refund. No questions asked. Cancel within 24 hours and a booking fee applies, because by then our route is already planned around your address. If something comes up, just get in touch as early as you can and we'll do what we can to help.",
      },
    ],
  },
];

export default function FaqPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Second Life Kids" className="h-11 w-auto" />
          </button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/cancel-request")} className="text-muted-foreground hover:text-foreground text-sm">
              Cancel booking
            </Button>
            <Button size="sm" onClick={() => setLocation("/book")}>Book a pickup</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 px-4 bg-primary/5 border-b">
          <div className="container max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">Frequently asked questions</h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know before booking. Can't find your answer?{" "}
              <a href="mailto:secondlifekids@zero2seventeen.com" className="text-primary hover:underline">
                Email us
              </a>{" "}
              and we'll get back to you.
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto space-y-12">
            {categories.map((cat) => (
              <div key={cat.label}>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">{cat.label}</h2>
                <Accordion type="single" collapsible className="w-full bg-card rounded-xl border p-2">
                  {cat.items.map((item, i) => (
                    <AccordionItem key={i} value={`${cat.label}-${i}`}>
                      <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary font-medium">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-primary/5 border-t">
          <div className="container max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-bold tracking-tight">Ready to clear the clutter?</h2>
            <p className="text-muted-foreground">Book online in under two minutes. No phone calls, no waiting.</p>
            <Button size="lg" onClick={() => setLocation("/book")} className="px-8">
              Book a pickup · from $45
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t text-center text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Second Life Kids · Mornington Peninsula, Victoria, Australia</span>
      </footer>
    </div>
  );
}
