import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

import { useRequestCancellation } from "@workspace/api-client-react";

const cancelSchema = z.object({
  bookingId: z.string().min(5, "Valid Booking ID is required"),
  email: z.string().email("Valid email address is required"),
  reason: z.string().min(10, "Please provide a brief reason for cancellation")
});

export default function CancelRequestPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);
  const cancelRequest = useRequestCancellation();

  const form = useForm<z.infer<typeof cancelSchema>>({
    resolver: zodResolver(cancelSchema),
    defaultValues: {
      bookingId: "",
      email: "",
      reason: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof cancelSchema>) => {
    try {
      await cancelRequest.mutateAsync({
        id: data.bookingId,
        data: {
          email: data.email,
          reason: data.reason
        }
      });
      setSuccess(true);
    } catch (error: any) {
      toast({
        title: "Cancellation Request Failed",
        description: error?.message || "Please check your details and try again.",
        variant: "destructive"
      });
    }
  };

  const renderContent = () => {
    if (success) {
      return (
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Request Received</CardTitle>
              <CardDescription>
                We've received your cancellation request. Our team will review it and process any eligible refunds shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setLocation("/")}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-muted/30">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Cancel Booking</h1>
            <p className="text-muted-foreground">Request a cancellation for your scheduled pickup.</p>
          </div>

          <Alert className="bg-card">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Cancellations made more than 24 hours before your pickup day are eligible for a full refund.
              Cancellations within 24 hours will incur a booking fee.
            </AlertDescription>
          </Alert>

          <Card className="shadow-lg border-border">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="bookingId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Reference ID</FormLabel>
                      <FormControl><Input placeholder="e.g. bkg_123456" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="Your booking email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="reason" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Cancellation</FormLabel>
                      <FormControl><Textarea placeholder="Why are you cancelling?" rows={4} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={cancelRequest.isPending}>
                      {cancelRequest.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Submit Request
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
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
