import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, parseISO } from "date-fns";
import { 
  Loader2, 
  LogOut, 
  Download, 
  RefreshCw,
  Package,
  TrendingUp,
  Ban,
  MessageSquare,
  ClipboardList
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { 
  useAdminLogin, 
  useAdminLogout, 
  useAdminGetStats, 
  useAdminGetBookings, 
  useAdminGetBooking, 
  useAdminUpdateBookingStatus,
} from "@workspace/api-client-react";
import type { BookingStatus } from "@workspace/api-client-react";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required")
});

type QuoteRequest = {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  suburb: string;
  postcode: string;
  description: string;
  preferredDate?: string | null;
  status: "PENDING" | "CONTACTED" | "CLOSED";
};

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

function useAdminQuotes(enabled: boolean) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const refetch = async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/admin/quotes`, { credentials: "include" });
      if (res.ok) setQuotes(await res.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return { quotes, loading, refetch };
}

function useUpdateQuoteStatus() {
  return async (id: string, status: string) => {
    await fetch(`${BASE}/api/admin/quotes/${id}/status`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };
}

function useUpdateCancellationStatus() {
  return async (cancellationId: string, status: "APPROVED" | "REJECTED") => {
    const res = await fetch(`${BASE}/api/admin/cancellations/${cancellationId}/status`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || "Failed to update cancellation");
    }
    return res.json();
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"bookings" | "quotes" | "cancellations">("bookings");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const { toast } = useToast();
  
  const login = useAdminLogin();
  const logout = useAdminLogout();
  const updateStatus = useAdminUpdateBookingStatus();
  
  const { data: stats, refetch: refetchStats } = useAdminGetStats({ 
    query: { enabled: isAuthenticated, retry: false } 
  });
  
  const { data: bookings, refetch: refetchBookings, isLoading: loadingBookings } = useAdminGetBookings(
    statusFilter !== "all" ? { status: statusFilter as any } : undefined,
    { query: { enabled: isAuthenticated, retry: false } }
  );

  const { data: pendingCancellations, refetch: refetchCancellations } = useAdminGetBookings(
    { status: "CANCEL_REQUESTED" as any },
    { query: { enabled: isAuthenticated, retry: false } }
  );

  // Auto-refresh bookings and stats every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      refetchBookings();
      refetchStats();
      refetchCancellations();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, refetchBookings, refetchStats, refetchCancellations]);

  const { data: bookingDetail, isLoading: loadingDetail } = useAdminGetBooking(
    selectedBookingId || "",
    { query: { enabled: isAuthenticated && !!selectedBookingId } }
  );

  const { quotes, loading: loadingQuotes, refetch: refetchQuotes } = useAdminQuotes(isAuthenticated);
  const updateQuoteStatus = useUpdateQuoteStatus();
  const updateCancellationStatus = useUpdateCancellationStatus();
  const [cancellationLoading, setCancellationLoading] = useState<string | null>(null);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" }
  });

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      await login.mutateAsync({ data });
      setIsAuthenticated(true);
      toast({ title: "Logged in successfully" });
    } catch (e) {
      toast({ title: "Login failed", description: "Incorrect password", variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      setIsAuthenticated(false);
      toast({ title: "Logged out" });
    } catch (e) {
      // ignore
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      await updateStatus.mutateAsync({ data: { status: newStatus } });
      toast({ title: "Status updated" });
      refetchBookings();
      refetchStats();
      refetchCancellations();
      if (selectedBookingId === id) setSelectedBookingId(null);
    } catch (e) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const handleCancellationAction = async (cancellationId: string, action: "APPROVED" | "REJECTED") => {
    setCancellationLoading(action);
    try {
      await updateCancellationStatus(cancellationId, action);
      toast({
        title: action === "APPROVED" ? "Cancellation approved" : "Cancellation rejected",
        description: action === "APPROVED"
          ? "Booking cancelled, Stripe refund issued (if eligible), and customer notified."
          : "Booking restored to active. Customer notified.",
      });
      setSelectedBookingId(null);
      refetchBookings();
      refetchStats();
      refetchCancellations();
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "Something went wrong", variant: "destructive" });
    } finally {
      setCancellationLoading(null);
    }
  };

  const handleUpdateQuoteStatus = async (id: string, status: string) => {
    try {
      await updateQuoteStatus(id, status);
      toast({ title: "Quote status updated" });
      refetchQuotes();
    } catch (e) {
      toast({ title: "Error", description: "Failed to update quote", variant: "destructive" });
    }
  };

  const exportBookings = async () => {
    if (!bookings || bookings.length === 0) return;
    const headers = ["ID", "Customer", "Email", "Phone", "Tier", "Price", "Status", "Date", "Address"];
    const rows = bookings.map(b => [
      b.id, b.customerName, b.email, b.phone, b.tierName,
      (b.priceCents / 100).toFixed(2), b.status, b.pickupDate,
      `${b.addressLine1} ${b.suburb} ${b.state} ${b.postcode}`
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter the admin password to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <FormField control={loginForm.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormControl><Input type="password" placeholder="Password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={login.isPending}>
                  {login.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your collections and quote requests.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={exportBookings}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><Package className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <h3 className="text-2xl font-bold">{stats?.totalBookings || 0}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><TrendingUp className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">${((stats?.totalRevenueCents || 0) / 100).toFixed(2)}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full"><RefreshCw className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Diverted (Kg)</p>
                <h3 className="text-2xl font-bold">{stats?.estimatedKgDiverted || 0}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-destructive/10 p-3 rounded-full"><Ban className="h-6 w-6 text-destructive" /></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cancel Requests</p>
                <h3 className="text-2xl font-bold">{stats?.cancelRequests || 0}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "bookings"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Bookings
            {bookings && bookings.length > 0 && (
              <span className="ml-1 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">{bookings.length}</span>
            )}
          </button>
          <button
            onClick={() => { setActiveTab("quotes"); refetchQuotes(); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "quotes"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Quote Requests
            {quotes.filter(q => q.status === "PENDING").length > 0 && (
              <span className="ml-1 bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5 rounded-full">
                {quotes.filter(q => q.status === "PENDING").length} new
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("cancellations")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "cancellations"
                ? "border-destructive text-destructive"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Ban className="h-4 w-4" />
            Cancellations
            {pendingCancellations && pendingCancellations.length > 0 && (
              <span className="ml-1 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full font-semibold">
                {pendingCancellations.length} pending
              </span>
            )}
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
              <CardTitle>Bookings</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="COLLECTED">Collected</SelectItem>
                    <SelectItem value="CANCEL_REQUESTED">Cancel Requested</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingBookings ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                      </TableCell>
                    </TableRow>
                  ) : bookings?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings?.map((booking) => (
                      <TableRow key={booking.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedBookingId(booking.id)}>
                        <TableCell className="font-medium">{format(parseISO(booking.pickupDate), "dd MMM yyyy")}</TableCell>
                        <TableCell>
                          <div>{booking.customerName}</div>
                          <div className="text-xs text-muted-foreground">{booking.email}</div>
                        </TableCell>
                        <TableCell>{booking.suburb}</TableCell>
                        <TableCell>{booking.tierName}</TableCell>
                        <TableCell>
                          <Badge variant={
                            booking.status === 'PAID' ? 'default' : 
                            booking.status === 'COLLECTED' ? 'secondary' : 
                            booking.status === 'CANCELLED' || booking.status === 'CANCEL_REQUESTED' ? 'destructive' : 'outline'
                          }>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedBookingId(booking.id); }}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
              <div>
                <CardTitle>Quote Requests</CardTitle>
                <CardDescription className="mt-1">XL collections and out-of-area enquiries that need a custom quote.</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={refetchQuotes}>
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Received</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>What they need</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingQuotes ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                      </TableCell>
                    </TableRow>
                  ) : quotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                        No quote requests yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    quotes.map((quote) => (
                      <TableRow key={quote.id} className="align-top">
                        <TableCell className="text-sm whitespace-nowrap">
                          {format(new Date(quote.createdAt), "dd MMM yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{quote.customerName}</div>
                          <div className="text-xs text-muted-foreground">{quote.email}</div>
                          <div className="text-xs text-muted-foreground">{quote.phone}</div>
                        </TableCell>
                        <TableCell className="text-sm">{quote.suburb} {quote.postcode}</TableCell>
                        <TableCell className="text-sm max-w-xs">
                          <p className="line-clamp-3 text-muted-foreground">{quote.description}</p>
                          {quote.preferredDate && (
                            <p className="text-xs text-primary mt-1">Preferred: {quote.preferredDate}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            quote.status === "PENDING" ? "outline" :
                            quote.status === "CONTACTED" ? "default" : "secondary"
                          } className={quote.status === "PENDING" ? "border-amber-400 text-amber-700 bg-amber-50" : ""}>
                            {quote.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={quote.status}
                            onValueChange={(val) => handleUpdateQuoteStatus(quote.id, val)}
                          >
                            <SelectTrigger className="w-[130px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="CONTACTED">Contacted</SelectItem>
                              <SelectItem value="CLOSED">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Cancellations Tab */}
        {activeTab === "cancellations" && (
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
              <div>
                <CardTitle>Pending Cancellation Requests</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Bookings awaiting your approval or rejection.</p>
              </div>
              <Button variant="outline" size="sm" onClick={refetchCancellations}>
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Pickup Date</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Refund?</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!pendingCancellations || pendingCancellations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        No pending cancellation requests.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingCancellations.map(b => {
                      const req = (b as any).cancellationRequests?.[0];
                      return (
                        <TableRow key={b.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedBookingId(b.id)}>
                          <TableCell>
                            <p className="font-medium text-sm">{b.customerName}</p>
                            <p className="text-xs text-muted-foreground">{b.email}</p>
                          </TableCell>
                          <TableCell className="text-sm">{format(parseISO(b.pickupDate), "EEE d MMM yyyy")}</TableCell>
                          <TableCell className="text-sm">{b.tierName}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {req ? format(new Date(req.createdAt), "d MMM, h:mm a") : "—"}
                          </TableCell>
                          <TableCell>
                            {req?.eligibleForFullRefund ? (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Full refund</span>
                            ) : (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">No refund</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setSelectedBookingId(b.id); }}>
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Booking Detail Modal */}
        <Dialog open={!!selectedBookingId} onOpenChange={(open) => !open && setSelectedBookingId(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {loadingDetail || !bookingDetail ? (
              <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    Booking Detail
                    <Badge variant={bookingDetail.status === 'PAID' ? 'default' : 'outline'}>{bookingDetail.status}</Badge>
                  </DialogTitle>
                  <DialogDescription>ID: {bookingDetail.id}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Customer</h4>
                      <p className="font-medium">{bookingDetail.customerName}</p>
                      <p className="text-sm">{bookingDetail.email}</p>
                      <p className="text-sm">{bookingDetail.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Collection</h4>
                      <p className="font-medium">{format(parseISO(bookingDetail.pickupDate), "EEEE, do MMMM yyyy")}</p>
                      <p className="text-sm">{bookingDetail.tierName} (${(bookingDetail.priceCents / 100).toFixed(2)})</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Address</h4>
                    <p className="font-medium">{bookingDetail.addressLine1}</p>
                    {bookingDetail.addressLine2 && <p>{bookingDetail.addressLine2}</p>}
                    <p>{bookingDetail.suburb}, {bookingDetail.state} {bookingDetail.postcode}</p>
                  </div>

                  {bookingDetail.safePlaceInstructions && (
                    <div className="bg-muted p-3 rounded-lg">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Safe Place / Access</h4>
                      <p className="text-sm">{bookingDetail.safePlaceInstructions}</p>
                    </div>
                  )}

                  {bookingDetail.itemNotes && (
                    <div className="bg-muted p-3 rounded-lg">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Item Notes</h4>
                      <p className="text-sm">{bookingDetail.itemNotes}</p>
                    </div>
                  )}

                  {/* Cancellation Request Panel */}
                  {bookingDetail.status === "CANCEL_REQUESTED" && bookingDetail.cancellationRequests && bookingDetail.cancellationRequests.length > 0 && (() => {
                    const pending = (bookingDetail.cancellationRequests as any[]).find((r: any) => r.status === "PENDING");
                    if (!pending) return null;
                    return (
                      <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-amber-800">Cancellation Request</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pending.eligibleForFullRefund ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {pending.eligibleForFullRefund ? "Eligible for full refund" : "Within 24 hrs — no refund"}
                          </span>
                        </div>
                        {pending.reason && (
                          <p className="text-sm text-amber-900"><span className="font-medium">Reason:</span> {pending.reason}</p>
                        )}
                        <p className="text-xs text-amber-700">Submitted {format(new Date(pending.createdAt), "dd MMM yyyy, h:mm a")}</p>
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={cancellationLoading !== null}
                            onClick={() => handleCancellationAction(pending.id, "APPROVED")}
                          >
                            {cancellationLoading === "APPROVED" ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                            {pending.eligibleForFullRefund ? "Approve & Refund" : "Approve (no refund)"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                            disabled={cancellationLoading !== null}
                            onClick={() => handleCancellationAction(pending.id, "REJECTED")}
                          >
                            {cancellationLoading === "REJECTED" ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                            Reject
                          </Button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Audit Log */}
                  {(bookingDetail as any).auditLog && (bookingDetail as any).auditLog.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Activity History</h4>
                      <div className="space-y-2">
                        {(bookingDetail as any).auditLog.map((entry: any, i: number) => (
                          <div key={i} className="flex gap-3 text-xs">
                            <div className="flex flex-col items-center">
                              <div className="w-2 h-2 rounded-full bg-primary/50 mt-1 shrink-0" />
                              {i < (bookingDetail as any).auditLog.length - 1 && (
                                <div className="w-px flex-1 bg-border mt-1" />
                              )}
                            </div>
                            <div className="pb-2">
                              <p className="font-medium text-foreground">{entry.action?.replace(/_/g, " ")}</p>
                              {entry.details && <p className="text-muted-foreground">{entry.details}</p>}
                              <p className="text-muted-foreground/70 mt-0.5">{format(new Date(entry.createdAt), "d MMM yyyy, h:mm a")}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4 flex gap-3 justify-end">
                    {bookingDetail.status === "PAID" && (
                      <Button onClick={() => handleUpdateStatus(bookingDetail.id, BookingStatus.COLLECTED)}>
                        Mark as Collected
                      </Button>
                    )}
                    {bookingDetail.status === "PAID" && (
                      <Button variant="destructive" onClick={() => handleUpdateStatus(bookingDetail.id, BookingStatus.CANCELLED)}>
                        Mark as Cancelled
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
