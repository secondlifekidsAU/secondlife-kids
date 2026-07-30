import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

declare global {
  interface Window { fbq?: Function; }
}

export default function Navbar() {
  const [location, setLocation] = useLocation();

  const goToBook = () => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
    setLocation("/book");
  };
  const isHome = location === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        <a
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Second Life Kids" className="h-11 w-auto" />
        </a>

        <div className="flex items-center gap-2">
          <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline px-2 py-1">Blog</a>
          {!isHome && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/cancel-request")}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Cancel booking
            </Button>
          )}
          <Button size="sm" onClick={goToBook}>
            Book a pickup
          </Button>
        </div>
      </div>
    </header>
  );
}
