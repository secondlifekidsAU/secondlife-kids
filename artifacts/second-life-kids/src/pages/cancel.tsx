import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancelPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <Card className="max-w-md w-full text-center shadow-lg">
          <CardHeader className="pb-2">
            <div className="mx-auto bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">Payment Cancelled</CardTitle>
            <CardDescription>
              Your checkout was cancelled and no payment was taken. Your booking has not been confirmed.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              You can return to the booking page to try again or choose a different collection size.
            </p>
          </CardContent>

          <CardFooter className="flex-col gap-3">
            <Button className="w-full" onClick={() => setLocation("/book")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Booking
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setLocation("/")}>
              Go to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
