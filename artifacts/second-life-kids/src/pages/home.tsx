import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Check, Info, Loader2, MapPin, Star, Menu, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useGetTiers,
  useGetImpactStats,
  useSubmitQuoteRequest
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import whatWeTakeBg from "@assets/site_photos/what_we_take_bg.jpg";
import ctaBg from "@assets/image_1778095074608.png";
import carousel1 from "@assets/website_1_1778651187819.PNG";
import carousel2 from "@assets/website_2_1778651187818.PNG";
import carousel3 from "@assets/website_3_1778651187818.PNG";
import carousel4 from "@assets/website_4_1778651187817.PNG";
import carousel5 from "@assets/website_5_1778651187815.PNG";
import howStep1 from "@assets/image_1778652572236.png";
import howStep2 from "@assets/image_1778652593562.png";
import howStep3 from "@assets/image_1778652620836.png";
import howStep4 from "@assets/image_1778652947652.png";
import howStep5 from "@assets/image_1778652655609.png";
import heroBg from "@assets/secondlife_kids_photo_1779675759012.png";

const carouselImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

const quoteSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Phone required"),
  suburb: z.string().min(2, "Suburb required"),
  postcode: z.string().min(4, "Postcode required"),
  description: z.string().min(10, "Please describe what needs collecting")
});

const SERVICED_SUBURBS = [
  "mornington","mount martha","mount eliza","dromana","rosebud","somerville",
  "tyabb","tuerong","moorooduc","baxter","frankston","frankston south",
  "langwarrin","skye","carrum downs","seaford","seaford heights","safety beach",
  "arthurs seat","main ridge","red hill","red hill south","shoreham","flinders",
  "balnarring","balnarring beach","bittern","merricks","merricks north","hastings",
  "pearcedale","cranbourne","cranbourne south","cranbourne north","cranbourne west",
  "cranbourne east","narre warren","narre warren south","berwick","hampton park",
  "endeavour hills","hallam","clyde","karingal","sandhurst",
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const { data: tiers, isLoading: loadingTiers } = useGetTiers();
  const { toast } = useToast();
  const { data: impactStats } = useGetImpactStats();
  const [suburbInput, setSuburbInput] = useState("");
  const [suburbResult, setSuburbResult] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(i => (i + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  function checkSuburb() {
    const input = suburbInput.trim().toLowerCase();
    if (!input) return;
    setSuburbResult(SERVICED_SUBURBS.includes(input) ? "yes" : "no");
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-primary leading-tight">Second Life Kids</span>
            <span className="text-[0.68rem] tracking-wide text-muted-foreground leading-none mt-1 hidden sm:block">Kids item collection · Mornington Peninsula</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
            <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
            <a href="#what-we-take" className="text-foreground/80 hover:text-foreground transition-colors">What we take</a>
            <a href="#pickup-schedule" className="text-foreground/80 hover:text-foreground transition-colors">Pickup schedule</a>
            <a href="#faq" className="text-foreground/80 hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={() => setLocation("/book")} className="rounded-full shadow-sm hover:shadow-md transition-all">Book my pickup</Button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/98 px-4 py-4 flex flex-col gap-1">
            {[
              { href: "#how-it-works", label: "How it works" },
              { href: "#pricing", label: "Pricing" },
              { href: "#what-we-take", label: "What we take" },
              { href: "#pickup-schedule", label: "Pickup schedule" },
              { href: "#faq", label: "FAQ" },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* HERO */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: "92vh" }}
          aria-label="Hero section"
        >
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/60" aria-hidden="true" />

          <div className="relative z-10 container max-w-4xl mx-auto text-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 text-sm text-white/90 font-medium">
                <MapPin className="h-4 w-4 text-green-400 shrink-0" aria-hidden="true" />
                Mornington Peninsula · Casey · Frankston, Victoria
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-lg">
                You've walked past those bags a hundred times. Today they go.
              </h1>

              <p className="text-xl text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow">
                That spare room is two minutes away from being yours again. Book online, pack what they've outgrown, and leave the bags outside. We collect every item, sort it by hand, and make sure nothing ends up in landfill.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <div className="flex flex-col items-center gap-1.5">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full text-base h-14 px-8 shadow-lg bg-white text-primary hover:bg-white/90 font-bold"
                    onClick={() => setLocation("/book")}
                    aria-label="Book my kids item pickup starting from $45"
                  >
                    Book my pickup · from $45
                  </Button>
                  <p className="text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" aria-hidden="true" />
                    Pickup slots this week filling. Secure yours now.
                  </p>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-white/60 text-white hover:bg-white/15 bg-white/10 backdrop-blur-sm"
                  onClick={() => {
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  See how it works ↓
                </Button>
              </div>

              {/* Social proof trust bar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-2 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <span className="flex gap-0.5" aria-label="Five stars">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />)}
                  </span>
                  <span>"Bags were gone by noon" · Charlotte M., Mornington</span>
                </span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                <span className="flex items-center gap-2">
                  <span className="flex gap-0.5" aria-label="Five stars">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />)}
                  </span>
                  <span>"Wish I'd done it sooner" · Jess T., Frankston</span>
                </span>
              </div>

              {/* Suburb checker */}
              <div className="mt-2 max-w-md mx-auto">
                <p className="text-white/70 text-sm mb-2">We cover 40+ suburbs. Check if yours is included:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={suburbInput}
                    onChange={e => { setSuburbInput(e.target.value); setSuburbResult(null); }}
                    onKeyDown={e => e.key === "Enter" && checkSuburb()}
                    placeholder="Enter your suburb…"
                    className="flex-1 rounded-full px-4 py-2 text-sm bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 outline-none focus:border-white/60 transition-colors"
                    aria-label="Enter your suburb to check availability"
                  />
                  <Button size="sm" onClick={checkSuburb} className="rounded-full bg-primary hover:bg-primary/90 text-white px-5 shrink-0">
                    Check
                  </Button>
                </div>
                {suburbResult === "yes" && (
                  <p className="mt-2 text-green-400 text-sm font-medium flex items-center gap-1.5">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Yes, we service {suburbInput.trim()}. Book now and we can pick up this week.
                  </p>
                )}
                {suburbResult === "no" && (
                  <p className="mt-2 text-white/60 text-sm">
                    We don't currently service that suburb but we're expanding. <a href="#pickup-schedule" className="underline text-white/80">See our full area.</a>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-5 pt-2 text-sm font-medium text-white/80">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-400" aria-hidden="true" /> From $45</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-400" aria-hidden="true" /> Takes 2 minutes to book</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-400" aria-hidden="true" /> No need to be home</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-400" aria-hidden="true" /> Mon, Wed and Fri pickups</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STORY */}
        <section className="py-0 overflow-hidden" aria-label="About Second Life Kids">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
            <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden order-2 lg:order-1" aria-hidden="true">
              {carouselImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: i === carouselIndex ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${i === carouselIndex ? "bg-white scale-125" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 flex items-center bg-secondary/30 px-8 md:px-16 py-20">
              <div className="max-w-lg space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">The stuff piles up. The guilt piles up with it.</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  One season it's newborn onesies and a bouncer. Then toddler clothes, board books, a play kitchen. Then shoes in four sizes, school bags, bikes, and a cupboard full of things they swear they still love. You tell yourself you'll list it on Marketplace. You'll donate it. You'll do a market stall "one day". Instead it sits in bags in the spare room, because selling takes forever, drop-off trips never happen, and putting perfectly good kids' stuff in the bin feels awful.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  That's exactly what Second Life Kids is for. You book in 2 minutes, pack what they've outgrown, and leave it at the door. We collect it, sort every item by hand, and make sure it reaches the best possible second life. The bags disappear. The guilt disappears with them.
                </p>
                <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5" onClick={() => setLocation("/book")}>
                  Book my pickup. 2 minutes. <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-4" aria-labelledby="how-it-works-heading">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tight mb-4">Five steps and the clutter's gone</h2>
              <p className="text-lg text-muted-foreground">No selling. No drop-offs. No need to be home.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  img: howStep1,
                  title: "Book online in 2 minutes",
                  desc: "Pick a size, pick a day: Monday, Wednesday, or Friday. Confirm your address. Done."
                },
                {
                  img: howStep2,
                  title: "Pack up what they've outgrown",
                  desc: "Clothes, shoes, bags, toys, books, baby gear, bedding. Everything kids use from newborn to school age. Keep it dry and you're set."
                },
                {
                  img: howStep3,
                  title: "Leave it outside. You don't need to be home.",
                  desc: "Pop the bags by your front door or gate before 8:30 AM. Then forget about it."
                },
                {
                  img: howStep4,
                  title: "We collect and sort everything by hand",
                  desc: "Our team picks up your bags and sorts every item by condition. Nothing gets lumped together."
                },
                {
                  img: howStep5,
                  title: "Every item finds a better ending",
                  desc: "Good condition goes to resale or local families. The rest is recycled. Very little reaches landfill."
                }
              ].map((step, i) => (
                <article key={i} className="relative flex flex-col bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={step.img}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow" aria-hidden="true">
                      {i + 1}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <h3 className="font-semibold leading-snug">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 px-4 bg-primary/5" aria-labelledby="testimonials-heading">
          <div className="container max-w-5xl mx-auto">
            <p id="testimonials-heading" className="text-xs font-bold uppercase tracking-widest text-primary mb-8 text-center">Still on the fence? These families were too, then booked anyway.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "I'd had four bags sitting in the spare room for six months. Booked on a Tuesday night, left them outside Wednesday morning, and by noon they were gone. Couldn't believe how easy it was.",
                  name: "Charlotte M.",
                  suburb: "Mornington"
                },
                {
                  quote: "I kept telling myself I'd do a school market one day. Booked this instead. Took two minutes online, they came Friday, and I didn't have to lift a finger. Wish I'd done it sooner.",
                  name: "Jess T.",
                  suburb: "Frankston"
                },
                {
                  quote: "The kids' cupboards were overflowing. I love that everything goes somewhere useful instead of a bin. Really easy to deal with and the team were lovely.",
                  name: "Kate R.",
                  suburb: "Cranbourne"
                },
              ].map((t, i) => (
                <blockquote key={i} className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4">
                  <div className="flex gap-1" aria-label="Five star rating">
                    {[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />)}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm flex-1">"{t.quote}"</p>
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

        {/* PRICING */}
        <section id="pricing" className="py-24 bg-primary/5 px-4 relative" aria-labelledby="pricing-heading">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight mb-4">Pick your size. We do the rest.</h2>
              <p className="text-lg text-muted-foreground">One flat fee. No hidden costs. No need to be home.</p>
            </div>

            {loadingTiers ? (
              <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading pricing options" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                {tiers?.map(tier => (
                  tier.popular ? (
                    <div key={tier.id} className="relative flex flex-col rounded-2xl overflow-hidden bg-primary text-primary-foreground shadow-2xl ring-4 ring-primary/40 scale-[1.06] z-10">
                      <div className="py-2 text-center text-xs font-bold uppercase tracking-widest bg-white/20">
                        ⭐ Most Popular
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-base font-semibold text-primary-foreground/80 mb-1">{tier.name}</p>
                        <p className="text-sm text-primary-foreground/60 min-h-[3rem] leading-snug mb-4">{tier.description}</p>
                        <div className="mb-5">
                          <span className="text-5xl font-extrabold tracking-tight">${tier.priceCents / 100}</span>
                          <span className="text-sm text-primary-foreground/50 ml-1">AUD</span>
                        </div>
                        <div className="text-sm space-y-2 flex-1">
                          <p className="font-semibold text-primary-foreground/80">Best for:</p>
                          <p className="text-primary-foreground/70">{tier.bestFor}</p>
                          <div className="pt-3 space-y-1.5 border-t border-white/20">
                            <p className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0" aria-hidden="true" /> Up to {tier.estimatedBags} bags or boxes</p>
                            <p className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0" aria-hidden="true" /> Est. {tier.estimatedKg}kg</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setLocation(`/book?tier=${tier.id}`)}
                          className="mt-6 w-full rounded-xl bg-white text-primary font-bold py-3 text-sm hover:bg-white/90 transition-colors shadow-md"
                        >
                          Book this pickup
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={tier.id} className="relative flex flex-col rounded-2xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-md transition-all">
                      <div className="h-2 bg-primary w-full" aria-hidden="true" />
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-base font-semibold text-foreground mb-1">{tier.name}</p>
                        <p className="text-sm text-muted-foreground min-h-[3rem] leading-snug mb-4">{tier.description}</p>
                        <div className="mb-5 pb-4 border-b border-border">
                          <span className="text-4xl font-extrabold text-foreground tracking-tight">
                            {tier.isQuoteOnly ? `From $${tier.priceCents / 100}` : `$${tier.priceCents / 100}`}
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">AUD</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-2 flex-1">
                          <p className="font-semibold text-foreground">Best for:</p>
                          <p>{tier.bestFor}</p>
                          <div className="pt-3 space-y-1.5 border-t border-border">
                            <p className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" aria-hidden="true" /> Up to {tier.estimatedBags} bags or boxes</p>
                            <p className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" aria-hidden="true" /> Est. {tier.estimatedKg}kg</p>
                          </div>
                        </div>
                        <button
                          onClick={() => tier.isQuoteOnly ? setQuoteModalOpen(true) : setLocation(`/book?tier=${tier.id}`)}
                          className="mt-6 w-full rounded-xl bg-primary text-primary-foreground font-bold py-3 text-sm hover:bg-primary/90 transition-colors"
                        >
                          {tier.isQuoteOnly ? "Request a quote" : "Book this pickup"}
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Bulky Item Add-ons */}
            <div className="mt-12">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Bulky Item Add-ons</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Small Bulky", price: "+ $20", isQuote: false },
                  { label: "Medium Bulky", price: "+ $40", isQuote: false },
                  { label: "Large Bulky", price: "Quote required", isQuote: true },
                ].map(addon => (
                  <div key={addon.label} className="rounded-xl border border-border bg-white p-4 text-center">
                    <p className="font-semibold text-foreground text-sm mb-1">{addon.label}</p>
                    <p className="font-bold text-sm text-primary">{addon.price}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Bulky items include prams, cots, high chairs, and large play equipment. Add-ons are confirmed at time of booking.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE ACCEPT */}
        <section id="what-we-take" className="relative py-24 px-4 overflow-hidden" aria-labelledby="what-we-take-heading">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${whatWeTakeBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-white/90" aria-hidden="true" />
          <div className="relative z-10 container max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 id="what-we-take-heading" className="text-3xl font-bold tracking-tight mb-4">From their first onesie to their school bag. We take it all.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything kids use from newborn through to primary school age. If it's for a child and it's in good enough condition to be reused, we want it.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {[
                {
                  emoji: "👕",
                  category: "Clothing and Wearables",
                  items: ["Newborn and baby clothing", "Toddler and kids' clothing", "School uniforms", "Shoes and boots", "Hats, socks and accessories", "Bags and backpacks", "Swimwear and wetsuits", "Winter jackets and coats"],
                },
                {
                  emoji: "🧸",
                  category: "Toys and Play",
                  items: ["Soft toys and stuffed animals", "Board games and puzzles", "Building blocks and LEGO", "Dolls and action figures", "Outdoor and garden toys", "Ride-ons, bikes and scooters", "Play kitchens and pretend play", "Arts, crafts and activity kits"],
                },
                {
                  emoji: "🍼",
                  category: "Baby and Nursery Gear",
                  items: ["Bouncers, swings and rockers", "Baby carriers and wraps", "Baby baths and change accessories", "Playmats and activity gyms", "Baby monitors and small electronics", "Feeding gear (bottles, sterilisers)", "Sleeping bags and swaddles"],
                },
                {
                  emoji: "📚",
                  category: "Books, Bedding and Linen",
                  items: ["Picture books and board books", "Early readers and chapter books", "Educational and activity books", "School readers", "Cot bedding and sheets", "Kids' doona covers and pillowcases", "Blankets and quilts", "Towels and bath accessories"],
                },
              ].map((group) => (
                <div key={group.category} className="bg-primary/5 rounded-2xl border border-primary/15 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-bold text-foreground">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white border border-primary/20 text-foreground font-medium">
                        <Check className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-amber-900">Bulky Items</h3>
              </div>
              <p className="text-xs text-amber-700 font-medium mb-4">An add-on fee applies, quoted separately at booking</p>
              <div className="flex flex-wrap gap-2">
                {["Prams and strollers", "Cots and portacots", "High chairs", "Baby swings (full size)", "Convertible car seats (non-expired)"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-800 font-medium">
                    <Check className="h-3 w-3 shrink-0 text-amber-600" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-destructive/5 rounded-2xl p-6 border border-destructive/20">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-destructive">We do not take</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Wet or mouldy items", "Broken or unsafe items", "Expired car seats", "Mattresses", "Beds and bed frames", "General rubbish", "Hazardous items", "Adult clothing or furniture"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white border border-destructive/20 text-destructive font-medium">
                    ✕ {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Not sure if we'll take it? Add a note in the booking and we'll assess on collection day.</p>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="py-24 bg-secondary text-secondary-foreground px-4" aria-labelledby="impact-heading">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 id="impact-heading" className="text-3xl font-bold tracking-tight">A better ending for the things they've outgrown.</h2>
                <p className="text-lg opacity-90">
                  From newborn onesies to school bags, board games to baby bouncers. Every item that goes through Second Life Kids gets a proper sort. The best pieces go to resale or local redistribution. The rest is recycled. Very little reaches landfill, and that's exactly how we want it.
                </p>
                <Button variant="outline" className="bg-background hover:bg-background/90 text-foreground" onClick={() => setLocation("/book")}>
                  Book my pickup now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{impactStats?.estimatedBagsCollected?.toLocaleString() || "63"}+</p>
                  <p className="text-sm font-medium text-muted-foreground">Bags Collected</p>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{impactStats?.estimatedKgDiverted?.toLocaleString() || "246"}kg</p>
                  <p className="text-sm font-medium text-muted-foreground">Diverted from Landfill</p>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{impactStats?.estimatedItemsSorted?.toLocaleString() || "504"}+</p>
                  <p className="text-sm font-medium text-muted-foreground">Items Sorted by Hand</p>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{impactStats?.estimatedCo2eAvoided?.toLocaleString() || "517"}kg</p>
                  <p className="text-sm font-medium text-muted-foreground">CO2e Avoided</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center lg:text-right">
              <p className="text-xs opacity-70 flex items-center justify-center lg:justify-end gap-1">
                <Info className="h-3 w-3" aria-hidden="true" /> Impact figures are estimates based on booked collection size and may change after sorting.
              </p>
            </div>
          </div>
        </section>

        {/* PICKUP SCHEDULE */}
        <section id="pickup-schedule" className="py-24 px-4 bg-background" aria-labelledby="schedule-heading">
          <div className="container max-w-4xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Pickup Schedule</p>
            <h2 id="schedule-heading" className="text-3xl font-bold tracking-tight mb-3">Three days a week. Your bags are never far from gone.</h2>
            <p className="text-muted-foreground mb-10">
              We run dedicated routes across South-East Melbourne and the Mornington Peninsula every Monday, Wednesday, and Friday. There's almost always a pickup day coming up this week.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Monday</p>
                <p className="font-semibold text-foreground mb-3">Mornington Peninsula Shire</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Mornington, Mount Eliza, Mount Martha, Somerville, Tyabb, Hastings, Baxter, Pearcedale and surrounds</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Wednesday</p>
                <p className="font-semibold text-foreground mb-3">Casey Shire</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Cranbourne, Berwick, Narre Warren, Clyde, Hampton Park, Endeavour Hills, Hallam and surrounds</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Friday</p>
                <p className="font-semibold text-foreground mb-3">Frankston City Council</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Frankston, Seaford, Carrum Downs, Langwarrin, Skye, Sandhurst, Karingal and surrounds</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Your specific pickup day will be confirmed within 24 hours of booking. Outside this area? Get in touch and we may still be able to help.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-primary/5 px-4" aria-labelledby="faq-heading">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="faq-heading" className="text-3xl font-bold tracking-tight">Questions before you book?</h2>
              <p className="text-muted-foreground mt-3">Every common one is answered below. Still unsure? Email us at <a href="mailto:secondlifekids@zero2seventeen.com" className="text-primary hover:underline">secondlifekids@zero2seventeen.com</a></p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-card rounded-xl border p-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">Where does everything actually go?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Every item is sorted by hand. The best-condition pieces go to resale or directly to local families who need them. Remaining usable items go through other reuse channels. What genuinely can't be reused gets recycled where possible. Nothing is lumped together and nothing is just tipped in a bin — that's the whole point.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">Do I need to wash everything first?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Yes. Clothing, bedding, and fabric items need to be clean and dry before we collect. Wet or mouldy items can't be accepted because they contaminate everything around them. If something has been sitting in a damp bag, give it a wash first. If you're not sure, just add a note in the booking and we'll assess on the day.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">What if I end up with more than I booked for?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  It happens. Once you start, you always find more. If you think you've significantly exceeded your booked size, just reach out before your pickup day and we'll adjust. On the day, our team will do their best, but vehicle capacity means we may not be able to take everything if it's a big difference. When in doubt, book up a size.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">Do I need to be home?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Nope. That's one of the best parts. Leave everything outside by 8:30 AM, at your front porch, front gate, or wherever is safe and dry. We'll collect it while you're at work, at school drop-off, or still in bed. Just add a note at booking so our team knows where to look.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">What if I need to cancel?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Cancel more than 24 hours before your pickup and you get a full refund. No questions asked. Cancel within 24 hours and a booking fee applies, because by then our route is already planned around your address. If something comes up, just get in touch as early as you can and we'll do what we can to help.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">Are you a charity?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  No. We're a paid collection and sorting service. Think of us as the part between your spare room and the items' second life that nobody has time to do themselves. We charge a flat fee for coming to you, handling the logistics, and making sure everything is sorted responsibly. No guilt, no hassle, no landfill.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">How do I know which day you collect in my area?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  We run three routes each week. Monday for Mornington Peninsula Shire, Wednesday for Casey Shire, and Friday for Frankston City Council. When you book, we'll confirm your exact collection day within 24 hours based on your suburb.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">How quickly can I get a collection booked?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Most bookings are confirmed within 24 hours and scheduled within the same week, depending on availability. We recommend booking a few days in advance to secure your preferred week.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">Do you accept school uniforms?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Yes. Clean, good-condition school uniforms are welcome. They're often in high demand through second-life channels and can be a great way to help other local families.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">Can I include baby gear like a cot, high chair, or pram?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Bulky items like cots, prams, and high chairs are handled as add-ons and quoted separately. They require more space and handling than a standard collection. See our Bulky Items section when booking or get in touch before you book.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-11">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">What if I live in a unit or apartment?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  No problem. You can leave items in your building's foyer, near the entrance, or at another agreed spot. Just add a note in the booking with access instructions so our team knows where to go.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">My suburb isn't listed. Can I still book?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  We're actively expanding our service area across South-East Melbourne and the Mornington Peninsula. If your suburb isn't listed yet, get in touch. Depending on your location, we may still be able to help or add you to our waitlist.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-13">
                <AccordionTrigger className="text-left px-4 hover:no-underline hover:text-primary">Can I mix clothing, toys, and bedding in the same collection?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                  Absolutely. Most collections are a mix. Pack everything into bags or boxes and we'll sort it all at our end. Just make sure items are clean, dry, and safe to handle.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-32 px-4 overflow-hidden" aria-label="Book your pickup now">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${ctaBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/50" aria-hidden="true" />
          <div className="container max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">Those bags aren't going to move themselves.</h2>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto drop-shadow">
              Book in two minutes. Leave the bags outside. We do everything else and nothing goes to waste.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full text-base h-14 px-10 shadow-lg bg-white text-primary hover:bg-white/90 font-bold"
                onClick={() => setLocation("/book")}
              >
                Book my pickup · from $45 <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <p className="text-white/60 text-sm pt-2">No phone calls. No waiting. Pickup confirmed within 24 hours.</p>
          </div>
        </section>

      </main>

      {/* REVIEW PROMPT */}
      {(() => {
        const GOOGLE_REVIEW_URL = ""; // Paste your Google Business review link here when approved
        const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61590213497786";
        return (
          <section className="py-16 px-4 bg-muted/30 border-t border-border/60">
            <div className="container max-w-2xl mx-auto text-center space-y-5">
              <p className="text-2xl">⭐️⭐️⭐️⭐️⭐️</p>
              <h2 className="text-2xl font-bold tracking-tight">Happy with your pickup?</h2>
              <p className="text-muted-foreground text-base max-w-md mx-auto">
                A quick review helps other Mornington Peninsula families find us — and it means everything to a small local business.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                {GOOGLE_REVIEW_URL && (
                  <a
                    href={GOOGLE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#2d6a4f] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#255c43] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Leave a Google Review
                  </a>
                )}
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1877f2] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#166fe5] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Recommend on Facebook
                </a>
              </div>
            </div>
          </section>
        );
      })()}

      {/* FOOTER */}
      <footer className="bg-background py-12 px-4 border-t">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center md:text-left">
            <span className="font-bold text-lg">Second Life Kids</span>
            <span className="text-sm text-muted-foreground mt-0.5">Kids item collection · Mornington Peninsula, Victoria</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms and Conditions</a>
            <a href="mailto:secondlifekids@zero2seventeen.com" className="text-muted-foreground hover:text-foreground transition-colors">secondlifekids@zero2seventeen.com</a>
            <a
              href="https://www.facebook.com/profile.php?id=61590213497786"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
          </div>
        </div>
        <div className="container max-w-6xl mx-auto mt-6 pt-6 border-t border-border/40">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Second Life Kids · Mornington Peninsula, Victoria, Australia · ABN pending
          </p>
        </div>
      </footer>

      {/* XL Quote Modal */}
      <QuoteModal open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

    </div>
  );
}

function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const submitQuote = useSubmitQuoteRequest();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { customerName: "", email: "", phone: "", suburb: "", postcode: "", description: "" }
  });

  const onSubmit = async (data: z.infer<typeof quoteSchema>) => {
    try {
      await submitQuote.mutateAsync({ data });
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { onClose(); setSubmitted(false); form.reset(); } }}>
      <DialogContent className="sm:max-w-[520px]">
        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="text-5xl" aria-hidden="true">✅</div>
            <DialogTitle className="text-2xl">Got it. We'll be in touch!</DialogTitle>
            <p className="text-muted-foreground">We'll reach out within 24 hours with a custom quote. Check your inbox (and your junk folder just in case).</p>
            <Button className="w-full" onClick={() => { onClose(); setSubmitted(false); form.reset(); }}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Request a Custom Quote</DialogTitle>
              <DialogDescription>For XL collections or anything out of the ordinary. Tell us what you've got and we'll get back to you within 24 hours.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
                <FormField control={form.control} name="customerName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-3">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input type="tel" placeholder="04XX XXX XXX" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField control={form.control} name="suburb" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suburb</FormLabel>
                      <FormControl><Input placeholder="Mornington" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="postcode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl><Input placeholder="3931" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you looking to clear out?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. 15+ bags of mixed kids clothing (newborn to size 8), a cot, a high chair, and large box of toys and books..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full rounded-xl" disabled={submitQuote.isPending}>
                  {submitQuote.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : "Send my quote request"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
