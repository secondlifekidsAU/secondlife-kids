import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container max-w-6xl mx-auto flex h-16 items-center px-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Second Life Kids" className="h-11 w-auto" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-md">
          <p className="text-7xl font-black text-primary/20 leading-none mb-6">404</p>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Page not found</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Sorry — we couldn't find that page. It may have moved or the link might be wrong.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setLocation("/")}>Go to Homepage</Button>
            <Button variant="outline" onClick={() => setLocation("/book")}>Book a Pickup</Button>
          </div>
        </div>
      </main>

      <footer className="py-8 px-4 border-t text-center text-sm text-muted-foreground">
        <span>© Second Life Kids · Mornington Peninsula, Victoria</span>
      </footer>
    </div>
  );
}
