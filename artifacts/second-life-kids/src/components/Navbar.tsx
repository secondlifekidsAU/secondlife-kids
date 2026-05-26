import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        <button
          onClick={() => setLocation("/")}
          className="flex flex-col text-left hover:opacity-80 transition-opacity"
        >
          <span className="text-xl font-bold tracking-tight text-primary">Second Life Kids</span>
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
  );
}
