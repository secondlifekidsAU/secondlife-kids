import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => setLocation("/")}
            className="flex flex-col text-left hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-extrabold tracking-tight text-primary">Second Life Kids</span>
            <span className="text-[0.68rem] tracking-wide text-muted-foreground leading-none mt-1">Kids item collection · Mornington Peninsula</span>
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="flex-1 py-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: May 2025</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-10 text-foreground">

            <section>
              <h2 className="text-xl font-bold mb-3">1. About This Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions govern your use of the Second Life Kids website at secondlifekids.zero2seventeen.com and the kids item collection service operated by Second Life Kids ("we", "us", "our"). By placing a booking through our website, you agree to these terms in full.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Second Life Kids operates as a paid collection and sorting service in Victoria, Australia. We are not a charity, a rubbish removal service, or a recycling facility. Our service involves collecting outgrown children's items from your nominated address, sorting them by condition, and directing items toward resale, redistribution, or responsible recycling.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. Our Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Second Life Kids provides a kerbside collection service for children's outgrown items including clothing, shoes, toys, books, bedding, and baby gear. Our service operates across Mornington Peninsula Shire, Casey Shire, and Frankston City Council areas on scheduled pickup days (Monday, Wednesday, and Friday).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We reserve the right to decline to collect items that do not meet our acceptance criteria, including items that are wet, mouldy, broken, unsafe, or not within the scope of our accepted categories. Items that cannot be reused or recycled responsibly may not be collected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. Bookings and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                All bookings are made through our website and require payment at the time of booking via Stripe. Prices are stated in Australian dollars (AUD) and are inclusive of GST where applicable.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Your booking is confirmed once payment has been successfully processed and you receive a booking confirmation by email. Confirmation of your specific pickup day will be provided within 24 hours of booking.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                XL collection bookings require a quote request and are subject to a separate agreement prior to payment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Collection Requirements</h2>
              <p className="text-muted-foreground leading-relaxed">
                By placing a booking, you agree to the following collection requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                <li>All clothing, bedding, and fabric items must be clean and dry at the time of collection.</li>
                <li>Items must be packed into bags or boxes that are easy to handle and carry.</li>
                <li>Items must be placed outside your property and accessible from the street or front entrance by 8:30 AM on your scheduled pickup day.</li>
                <li>You are responsible for ensuring items are protected from rain or weather on the morning of collection.</li>
                <li>Items must be suitable for reuse or recycling and must not present a safety hazard to our collection team.</li>
                <li>You are responsible for ensuring any items you place out for collection are your property or that you have the right to dispose of them.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                If our team is unable to collect your items because they are inaccessible, in an unsafe condition, or outside the scope of our service, no refund will be issued unless otherwise determined at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Items We Cannot Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not collect the following items under any circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                <li>Wet, mouldy, or contaminated items</li>
                <li>Broken, sharp, or otherwise unsafe items</li>
                <li>Expired child car seats</li>
                <li>Mattresses, bed frames, or adult furniture</li>
                <li>General household rubbish</li>
                <li>Hazardous materials of any kind</li>
                <li>Adult clothing or non-kids items (except as specifically agreed)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                If you are unsure whether an item will be accepted, please note it at the time of booking and we will assess it on collection day. Including items we cannot accept does not entitle you to a refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Cancellation and Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may cancel your booking at any time before your scheduled pickup day. The following policy applies:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                <li><strong>More than 24 hours before pickup:</strong> Full refund, no questions asked.</li>
                <li><strong>Within 24 hours of pickup:</strong> No refund will be issued. The full booking amount will be charged. This is because your pickup day has already been planned and route adjustments are not possible at short notice.</li>
                <li><strong>No-show (items not put out):</strong> No refund will be issued. If you are unable to put items out, please contact us as early as possible and we will do our best to reschedule.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To request a cancellation, use the cancellation form on our website with your Booking ID, or email us at secondlifekids@zero2seventeen.com.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Nothing in this cancellation policy limits your rights under the Australian Consumer Law (Competition and Consumer Act 2010 (Cth)).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Australian Consumer Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services come with consumer guarantees under the Australian Consumer Law (Schedule 2, Competition and Consumer Act 2010 (Cth)). These guarantees cannot be excluded. If our service does not meet a consumer guarantee, you may be entitled to a remedy.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Our services are provided with due care and skill. We will take reasonable steps to ensure your booking is fulfilled on the scheduled pickup day. If we are unable to fulfil a confirmed booking due to circumstances within our control, we will reschedule or provide a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Second Life Kids limits its liability in connection with the service to resupply of the service or a refund of the fee paid, at our election.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We are not liable for any indirect, consequential, incidental, or special loss or damage arising from or in connection with the service, including loss of items placed out for collection that are not covered by our accepted categories.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We are not responsible for damage to items caused by weather or other conditions outside our control after they have been placed outside for collection.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">9. What Happens to Your Items</h2>
              <p className="text-muted-foreground leading-relaxed">
                By placing items out for collection, you transfer ownership of those items to Second Life Kids. We will sort items by condition and direct them toward the most appropriate second life outcome: resale, redistribution to local families, or responsible recycling.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not guarantee a specific outcome for any individual item. We do not provide itemised lists of what was collected or where items were sent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">10. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect personal information (name, email, phone number, and address) for the purpose of processing your booking and contacting you in relation to your collection. We do not sell or share your personal information with third parties except as required to process payment (via Stripe) or comply with legal obligations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We handle your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">11. Service Area</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is currently available to suburbs within Mornington Peninsula Shire, Casey Shire, and Frankston City Council. Bookings placed from outside our service area may be cancelled and refunded in full. If you are unsure whether your suburb is covered, please check on our homepage before booking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">12. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions are governed by the laws of Victoria, Australia. Any disputes arising under these terms will be subject to the exclusive jurisdiction of the courts of Victoria.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">13. Changes to These Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms and Conditions from time to time. The current version will always be available at secondlifekids.zero2seventeen.com/terms. Continued use of our service after any changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">14. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions about these Terms and Conditions, or to exercise any of your rights under the Australian Consumer Law, please contact us at:
              </p>
              <div className="mt-4 bg-primary/5 rounded-xl border border-primary/15 p-6 space-y-2">
                <p className="font-semibold text-foreground">Second Life Kids</p>
                <p className="text-muted-foreground">Mornington Peninsula, Victoria, Australia</p>
                <a href="mailto:secondlifekids@zero2seventeen.com" className="text-primary hover:underline font-medium">
                  secondlifekids@zero2seventeen.com
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      <footer className="bg-background py-10 px-4 border-t mt-16">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col text-center md:text-left">
            <span className="font-bold">Second Life Kids</span>
            <span className="text-sm text-muted-foreground mt-0.5">Mornington Peninsula, Victoria, Australia</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button onClick={() => setLocation("/")} className="text-muted-foreground hover:text-foreground transition-colors">Home</button>
            <a href="mailto:secondlifekids@zero2seventeen.com" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
