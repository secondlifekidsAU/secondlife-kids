import { useLocation, useSearch } from "wouter";
import Navbar from "@/components/Navbar";
import { useGetBookingBySession } from "@workspace/api-client-react";
import { Loader2, CheckCircle, Calendar, MapPin, Package } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");
  const [, setLocation] = useLocation();

  const { data: booking, isLoading, isError } = useGetBookingBySession(sessionId || "", {
    query: {
      enabled: !!sessionId
    }
  });

  const renderContent = () => {
    if (!sessionId) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <CardTitle>No Session Found</CardTitle>
              <CardDescription>We couldn't find a valid checkout session.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={() => setLocation("/")}>Return Home</Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-2xl font-semibold">Confirming your booking...</h2>
        </div>
      );
    }

    if (isError || !booking) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Card className="max-w-md w-full text-center border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Something went wrong</CardTitle>
              <CardDescription>We couldn't load your booking details. Please contact support.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={() => setLocation("/")}>Return Home</Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg"
        >
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">Booking Confirmed</CardTitle>
              <CardDescription className="text-base">
                Thank you, {booking.customerName}. Your collection is scheduled.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
              <div className="bg-muted rounded-xl p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pickup Date</p>
                    <p className="font-semibold text-foreground">
                      {format(parseISO(booking.pickupDate), "EEEE, do MMMM yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">Between 8:30 AM and 5:00 PM</p>
                  </div>
                </div>

                <div className="h-px bg-border w-full" />

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Collection Address</p>
                    <p className="font-semibold text-foreground">{booking.addressLine1}</p>
                    {booking.addressLine2 && <p className="font-semibold text-foreground">{booking.addressLine2}</p>}
                    <p className="font-semibold text-foreground">{booking.suburb}, {booking.state} {booking.postcode}</p>
                  </div>
                </div>

                <div className="h-px bg-border w-full" />

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Collection Size</p>
                    <p className="font-semibold text-foreground">{booking.tierName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-center">
                <p className="font-medium">Booking Reference: <span className="font-mono bg-muted px-2 py-0.5 rounded">{booking.id}</span></p>
                <p className="text-muted-foreground">We've sent a confirmation email with these details.</p>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button className="w-full" onClick={() => setLocation("/")}>
                Return to Home
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setLocation("/cancel-request")}>
                Need to cancel or change?
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      {renderContent()}
    </div>
  );
}
