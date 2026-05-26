export interface PricingTier {
  id: string;
  name: string;
  priceCents: number;
  description: string;
  bestFor: string;
  popular: boolean;
  isQuoteOnly: boolean;
  estimatedBags: number;
  estimatedKg: number;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "small",
    name: "Small Collection",
    priceCents: 4500,
    description:
      "A quick clear-out of outgrown clothes, shoes, small toys, books, or bedding.",
    bestFor: "1 to 2 bags, up to roughly 12kg",
    popular: false,
    isQuoteOnly: false,
    estimatedBags: 2,
    estimatedKg: 12,
  },
  {
    id: "medium",
    name: "Medium Collection",
    priceCents: 6500,
    description:
      "Ideal when the kids' cupboards, toy baskets, and linen shelves need a proper reset.",
    bestFor: "3 to 5 bags, full family wardrobe clear-out",
    popular: true,
    isQuoteOnly: false,
    estimatedBags: 4,
    estimatedKg: 18,
  },
  {
    id: "large",
    name: "Large Collection",
    priceCents: 7400,
    description:
      "For bigger declutters across clothing, toys, shoes, books, and bedding.",
    bestFor: "6 to 10 bags",
    popular: false,
    isQuoteOnly: false,
    estimatedBags: 8,
    estimatedKg: 22,
  },
  {
    id: "xl",
    name: "XL Collection",
    priceCents: 13500,
    description:
      "For large declutters across multiple categories. We will confirm the final price after your quote request.",
    bestFor: "10 or more bags",
    popular: false,
    isQuoteOnly: true,
    estimatedBags: 14,
    estimatedKg: 45,
  },
];

export const MAX_BOOKINGS_PER_DAY = 12;

export const IMPACT_BASELINE = {
  bags: 63,
  kg: 246,
};

export const PICKUP_DAYS = [1, 3, 5];

export const ALLOWED_SUBURBS = [
  "mornington",
  "mount martha",
  "mount eliza",
  "dromana",
  "rosebud",
  "somerville",
  "tyabb",
  "tuerong",
  "moorooduc",
  "baxter",
  "frankston",
  "frankston south",
  "langwarrin",
  "skye",
  "carrum downs",
  "seaford",
  "seaford heights",
  "safety beach",
  "arthurs seat",
  "main ridge",
  "red hill",
  "red hill south",
  "shoreham",
  "flinders",
  "balnarring",
  "balnarring beach",
  "bittern",
  "merricks",
  "merricks north",
  "hastings",
  "pearcedale",
  "cranbourne",
  "cranbourne south",
  "cranbourne north",
  "cranbourne west",
  "cranbourne east",
  "narre warren",
  "narre warren south",
];

export const ALLOWED_POSTCODES = [
  "3931", "3936", "3930", "3981", "3939", "3977",
  "3913", "3909", "3912", "3911", "3199", "3201",
  "3910", "3182", "3201", "3198", "3197", "3936",
  "3936", "3937", "3937", "3937", "3937", "3937",
  "3921", "3921", "3918", "3921", "3912", "3930",
  "3978", "3978", "3977", "3977", "3977", "3977",
  "3805", "3806",
];
