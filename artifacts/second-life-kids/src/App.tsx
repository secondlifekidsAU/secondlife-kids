import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Book from "@/pages/book";
import Success from "@/pages/success";
import Cancel from "@/pages/cancel";
import CancelRequest from "@/pages/cancel-request";
import Admin from "@/pages/admin";
import Terms from "@/pages/terms";
import Faq from "@/pages/faq";
import HowItWorks from "@/pages/how-it-works";
import WhatWeCollect from "@/pages/what-we-collect";
import ServiceAreas from "@/pages/service-areas";
import WhatHappensToItems from "@/pages/what-happens-to-items";
import KidsItemPickupMorningtonPeninsula from "@/pages/kids-item-pickup-mornington-peninsula";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book" component={Book} />
      <Route path="/success" component={Success} />
      <Route path="/cancel" component={Cancel} />
      <Route path="/cancel-request" component={CancelRequest} />
      <Route path="/admin" component={Admin} />
      <Route path="/terms" component={Terms} />
      <Route path="/faq" component={Faq} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/what-we-collect" component={WhatWeCollect} />
      <Route path="/service-areas" component={ServiceAreas} />
      <Route path="/what-happens-to-your-items" component={WhatHappensToItems} />
      <Route path="/kids-item-pickup-mornington-peninsula" component={KidsItemPickupMorningtonPeninsula} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
