import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const isHome = location === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Second Life Kids" className="h-11 w-auto" />
        </button>

        <div className="flex items-center gap-2">
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
          <Button size="sm" onClick={() => setLocation("/book")}>
            Book a pickup
          </Button>
        </div>
      </div>
    </header>
  );
}
