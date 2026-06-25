import { useState, useEffect } from "react";

declare global {
  interface Window { fbq?: Function; }
}
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation, useSearch } from "wouter";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import {
  useGetTiers,
  useGetAvailableDates,
  useCreateBooking,
  useCreateCheckoutSession,
  useSubmitQuoteRequest
} from "@workspace/api-client-react";
import type { PricingTier } from "@workspace/api-client-react";

// ... Suburb validation
const ALLOWED_SUBURBS = [
  "mornington", "mount martha", "mount eliza", "dromana", "rosebud", "somerville", "tyabb", "tuerong", "moorooduc", "baxter", "frankston", "frankston south", "langwarrin", "skye", "carrum downs", "seaford", "seaford heights", "safety beach", "arthurs seat", "main ridge", "red hill", "red hill south", "shoreham", "flinders", "balnarring", "balnarring beach", "bittern", "merricks", "merricks north", "hastings", "pearcedale", "cranbourne", "cranbourne south", "cranbourne north", "cranbourne west", "cranbourne east", "narre warren", "narre warren south"
];

// ... schemas
const detailsSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  suburb: z.string().min(2, "Suburb is required"),
  state: z.string().default("VIC"),
  postcode: z.string().min(4, "Postcode is required"),
  safePlaceInstructions: z.string().optional(),
  itemNotes: z.string().optional()
});

const rulesSchema = z.object({
  ruleClean: z.boolean().refine(val => val === true, "You must agree to this condition"),
  ruleRejected: z.boolean().refine(val => val === true, "You must agree to this condition"),
  ruleProperty: z.boolean().refine(val => val === true, "You must agree to this condition"),
  ruleCancel: z.boolean().refine(val => val === true, "You must agree to the cancellation policy"),
  ruleTerms: z.boolean().refine(val => val === true, "You must agree to the terms")
});

const quoteSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  suburb: z.string().min(2, "Suburb is required"),
  postcode: z.string().min(4, "Postcode is required"),
  description: z.string().min(10, "Please describe what needs collecting")
});

export default function BookPage() {
  const search = useSearch();
  const tierParam = new URLSearchParams(search).get("tier");
  const [step, setStep] = useState(tierParam ? 2 : 1);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [detailsData, setDetailsData] = useState<z.infer<typeof detailsSchema> | null>(null);
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: tiers, isLoading: loadingTiers } = useGetTiers();

  // Pre-select tier from URL param once tiers are loaded
  useEffect(() => {
    if (tierParam && tiers && !selectedTier) {
      const found = tiers.find(t => t.id === tierParam);
      if (found) setSelectedTier(found);
    }
  }, [tierParam, tiers]);
  
  const createBooking = useCreateBooking();
  const createSession = useCreateCheckoutSession();
  const submitQuote = useSubmitQuoteRequest();

  const handleNext = () => setStep(s => Math.min(5, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  // Step 1: Select Tier
  const renderStep1 = () => {
    if (loadingTiers) return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-foreground">What do you need collected?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiers?.map(tier => (
            <Card 
              key={tier.id} 
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50",
                selectedTier?.id === tier.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""
              )}
              onClick={() => {
                if (tier.isQuoteOnly) {
                  // open quote modal handled in UI
                } else {
                  setSelectedTier(tier);
                }
              }}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {tier.name}
                  {tier.popular && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Most Popular</span>}
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {tier.isQuoteOnly ? "From $" + (tier.priceCents / 100) : "$" + (tier.priceCents / 100)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Best for: {tier.bestFor}</p>
              </CardContent>
              <CardFooter>
                {tier.isQuoteOnly ? (
                  <QuoteModal tier={tier} />
                ) : (
                  <Button 
                    variant={selectedTier?.id === tier.id ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => {
                      setSelectedTier(tier);
                      handleNext();
                    }}
                  >
                    Select this size
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-end">
          <Button disabled={!selectedTier} onClick={handleNext}>Continue</Button>
        </div>
      </div>
    );
  };

  // Step 2: Date
  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Choose a pickup date</h2>
        <p className="text-center text-muted-foreground">We collect on Mondays, Wednesdays, and Fridays between 8:30 AM – 5:00 PM.</p>
        
        <div className="flex justify-center">
          <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handleBack}>Back</Button>
          <Button disabled={!selectedDate} onClick={handleNext}>Continue</Button>
        </div>
      </div>
    );
  };

  // Step 3: Details
  const renderStep3 = () => {
    return (
      <DetailsForm 
        defaultValues={detailsData || undefined}
        onBack={handleBack}
        onSubmit={(data) => {
          setDetailsData(data);
          handleNext();
        }}
      />
    );
  };

  // Step 4: Rules
  const renderStep4 = () => {
    return (
      <RulesForm 
        onBack={handleBack}
        onSubmit={(rulesData) => {
          handleNext(); // go to step 5
          processBooking();
        }}
      />
    );
  };

  // Step 5: Loading
  const renderStep5 = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Confirming your booking...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you to secure payment.</p>
      </div>
    );
  };

  const processBooking = async () => {
    if (!selectedTier || !selectedDate || !detailsData) return;

    try {
      const booking = await createBooking.mutateAsync({
        data: {
          tierId: selectedTier.id,
          tierName: selectedTier.name,
          priceCents: selectedTier.priceCents,
          pickupDate: format(selectedDate, "yyyy-MM-dd"),
          customerName: detailsData.customerName,
          email: detailsData.email,
          phone: detailsData.phone,
          addressLine1: detailsData.addressLine1,
          addressLine2: detailsData.addressLine2,
          suburb: detailsData.suburb,
          state: detailsData.state,
          postcode: detailsData.postcode,
          safePlaceInstructions: detailsData.safePlaceInstructions,
          itemNotes: detailsData.itemNotes,
          termsAccepted: true
        }
      });

      const session = await createSession.mutateAsync({
        data: { bookingId: booking.id }
      });

      if (typeof window.fbq === "function") {
        window.fbq("track", "InitiateCheckout");
      }

      window.location.href = session.url;
    } catch (error) {
      toast({
        title: "Error creating booking",
        description: "Please try again later.",
        variant: "destructive"
      });
      setStep(4);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
    <Navbar />

    {/* Selected tier summary strip */}
    {selectedTier && step > 1 && (
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              {selectedTier.name}
            </div>
            <span className="text-sm text-muted-foreground">
              Up to {selectedTier.estimatedBags} bags · Est. {selectedTier.estimatedKg}kg
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-primary">${selectedTier.priceCents / 100} AUD</span>
            <button
              onClick={() => { setSelectedTier(null); setStep(1); }}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                step === s ? "bg-primary text-primary-foreground" : 
                step > s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "25%" }}
            animate={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
}

function DatePicker({ selected, onSelect }: { selected?: Date, onSelect: (d?: Date) => void }) {
  const { data: availableData } = useGetAvailableDates();

  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    // Only Mon (1), Wed (3), Fri (5)
    if (day !== 1 && day !== 3 && day !== 5) return true;
    
    // Disable past dates and today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date <= today) return true;

    // Check fully booked
    if (availableData?.fullyBookedDates) {
      const dateStr = format(date, "yyyy-MM-dd");
      if (availableData.fullyBookedDates.includes(dateStr)) return true;
    }

    return false;
  };

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={isDateDisabled}
      className="rounded-md border shadow"
    />
  );
}

function DetailsForm({ defaultValues, onBack, onSubmit }: { defaultValues?: any, onBack: () => void, onSubmit: (data: any) => void }) {
  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    defaultValues: defaultValues || {
      customerName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      suburb: "",
      state: "VIC",
      postcode: "",
      safePlaceInstructions: "",
      itemNotes: ""
    }
  });

  const suburb = form.watch("suburb");
  const isSuburbValid = !suburb || ALLOWED_SUBURBS.includes(suburb.toLowerCase().trim());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="customerName" render={({ field }) => (
            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Collection Address</h3>
          <FormField control={form.control} name="addressLine1" render={({ field }) => (
            <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="addressLine2" render={({ field }) => (
            <FormItem><FormLabel>Address Line 2 (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={form.control} name="suburb" render={({ field }) => (
              <FormItem><FormLabel>Suburb</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} readOnly className="bg-muted" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="postcode" render={({ field }) => (
              <FormItem><FormLabel>Postcode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          {!isSuburbValid && suburb.length > 2 && (
            <div className="p-4 bg-amber-50 text-amber-900 rounded-lg flex gap-3 border border-amber-200">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-medium mb-2">Looks like you may be outside our current pickup area.</p>
                <p className="text-sm mb-4">Send us your details and we'll confirm whether we can collect from you.</p>
                <QuoteModal trigger={<Button variant="outline" size="sm" className="bg-white">Request a quote instead</Button>} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Collection Instructions</h3>
          <FormField control={form.control} name="safePlaceInstructions" render={({ field }) => (
            <FormItem>
              <FormLabel>Safe Place / Access Instructions</FormLabel>
              <FormDescription>Where will the items be left? (e.g. "On the front porch behind the pot plant")</FormDescription>
              <FormControl><Textarea {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="itemNotes" render={({ field }) => (
            <FormItem>
              <FormLabel>Item Notes (Optional)</FormLabel>
              <FormDescription>Anything specific we should know about the items?</FormDescription>
              <FormControl><Textarea {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>Back</Button>
          <Button type="submit" disabled={!isSuburbValid && suburb?.length > 2}>Continue</Button>
        </div>
      </form>
    </Form>
  );
}

function RulesForm({ onBack, onSubmit }: { onBack: () => void, onSubmit: (data: any) => void }) {
  const form = useForm<z.infer<typeof rulesSchema>>({
    resolver: zodResolver(rulesSchema),
    defaultValues: {
      ruleClean: false,
      ruleRejected: false,
      ruleProperty: false,
      ruleCancel: false,
      ruleTerms: false
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Almost there</h2>
        <p className="text-muted-foreground">Please confirm the following to proceed with your booking.</p>

        <div className="space-y-4">
          <FormField control={form.control} name="ruleClean" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Items will be clean, dry, safe, and accepted under the item rules</FormLabel>
              </div>
            </FormItem>
          )} />
          <FormField control={form.control} name="ruleRejected" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Rejected items may be left behind or result in a follow-up fee</FormLabel>
              </div>
            </FormItem>
          )} />
          <FormField control={form.control} name="ruleProperty" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Items become property of Second Life Kids once collected</FormLabel>
              </div>
            </FormItem>
          )} />
          <FormField control={form.control} name="ruleCancel" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I understand the cancellation policy: full refund if cancelled more than 24 hours before pickup; no refund if cancelled within 24 hours</FormLabel>
              </div>
            </FormItem>
          )} />
          <FormField control={form.control} name="ruleTerms" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to the terms and privacy policy</FormLabel>
              </div>
            </FormItem>
          )} />
        </div>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>Back</Button>
          <Button type="submit">Proceed to Payment</Button>
        </div>
      </form>
    </Form>
  );
}

function QuoteModal({ tier, trigger }: { tier?: PricingTier, trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const submitQuote = useSubmitQuoteRequest();
  
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      customerName: "", email: "", phone: "", suburb: "", postcode: "", description: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof quoteSchema>) => {
    try {
      await submitQuote.mutateAsync({ data });
      toast({ title: "Quote requested", description: "We will be in touch shortly." });
      setOpen(false);
      form.reset();
    } catch (e) {
      toast({ title: "Error", description: "Failed to submit quote request.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" className="w-full">Request a Quote</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            For large collections or out-of-area pickups, tell us what you need and we'll provide a custom quote.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="customerName" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="suburb" render={({ field }) => (
                <FormItem><FormLabel>Suburb</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="postcode" render={({ field }) => (
                <FormItem><FormLabel>Postcode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>What needs collecting?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={submitQuote.isPending}>
              {submitQuote.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Submit Request
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
