import type { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedDate: string; // YYYY-MM-DD
  category: string;
  excerpt: string;
  readingTimeMinutes: number;
  content: ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-prepare-kids-items-for-collection",
    title: "How to Prepare Your Kids' Items for Collection",
    metaTitle: "How to Prepare Kids' Items for Collection | Second Life Kids",
    metaDescription: "A practical guide to getting your children's clothing, toys, books and baby gear ready for a Second Life Kids pickup. What to wash, what to check, and how to pack.",
    publishedDate: "2026-07-30",
    category: "Preparation Tips",
    excerpt: "A practical checklist covering what to wash, what to check, and how to pack before your pickup day — so nothing gets left behind.",
    readingTimeMinutes: 5,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          The hardest part of clearing out kids' stuff isn't finding the time — it's knowing whether everything is actually ready. Here's a straightforward guide to preparing your items so that collection day goes smoothly and nothing gets left behind.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">Why preparation matters</h2>
        <p className="text-muted-foreground leading-relaxed">
          When we collect your bags, our team sorts everything by hand. Items that arrive clean, dry, and safe to handle can go straight through the sorting process and on to their next home faster. Items that need extra attention — wet fabrics, unlabelled gear, incomplete sets — slow things down and sometimes can't be redistributed at all.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A little preparation on your end makes a real difference to the outcome for the items you're passing on.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">Clothing and fabric items</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Wash and dry everything before packing.</strong> This is the single most important step. Clothing, bedding, towels, sleeping bags, swaddles — anything made of fabric needs to be clean and completely dry. Damp items develop mould quickly in a sealed bag, and mouldy items contaminate everything around them.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          You don't need to iron or fold anything neatly — just clean and dry. If something has been sitting in a storage bag for a while, pull it out and give it a wash before packing it.
        </p>
        <ul className="space-y-2 mt-4 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Clean and dry: ready to go</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Minor wear, pilling, or fading: still accepted</li>
          <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✗</span> Mouldy, wet, or heavily stained: cannot be accepted</li>
          <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✗</span> Torn or damaged beyond reuse: not suitable</li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight mt-10">Toys and games</h2>
        <p className="text-muted-foreground leading-relaxed">
          For toys, the main thing to check is whether pieces are reasonably complete. A board game with missing cards, a puzzle with a gap, or a building set with most of the parts still has real value — someone will get good use from it. A toy with a broken structural component or sharp edge cannot be safely passed on.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          You don't need to find every last tiny piece. Use your judgment: if you'd feel comfortable giving it to a friend's child, it's probably fine to include.
        </p>
        <ul className="space-y-2 mt-4 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Mostly complete sets: accepted</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Battery toys (dead batteries are fine): accepted</li>
          <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✗</span> Broken parts or sharp edges: not suitable</li>
          <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✗</span> Recalled products: not accepted</li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight mt-10">Books</h2>
        <p className="text-muted-foreground leading-relaxed">
          Kids' books are among the most appreciated items in any collection. Check that pages are intact and the book hasn't been water-damaged. Heavily drawn-in or torn books can't be passed on to other children, but everything else is welcome — even well-loved board books with worn corners.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">Baby gear and nursery items</h2>
        <p className="text-muted-foreground leading-relaxed">
          Baby gear often has safety considerations that clothing and toys don't. A few things to check:
        </p>
        <ul className="space-y-2 mt-4 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Bouncers, swings, carriers: wipe down if sticky or grimy</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Feeding gear: rinse bottles and sterilise if possible</li>
          <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✗</span> Car seats: check the expiry date. Expired car seats cannot be accepted</li>
          <li className="flex items-start gap-2"><span className="text-red-500 mt-1">✗</span> Recalled products: not accepted</li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight mt-10">Packing everything up</h2>
        <p className="text-muted-foreground leading-relaxed">
          Use sturdy bags or boxes. Standard bin bags work fine, but any strong reusable bag or cardboard box is great too. You don't need to sort by category or size — that's what we do at our end. Mix clothing with toys with books if that's how it fits.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If you have bulky items like a pram, cot or high chair booked as add-ons, keep them separate from your bags and note in your booking where they'll be located.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">On collection morning</h2>
        <p className="text-muted-foreground leading-relaxed">
          Leave everything outside by <strong>8:30 AM</strong>. Pop the bags at your front door, porch, or gate. If the weather looks rough, cover them with a tarpaulin or position them undercover. You don't need to be home — just make sure the bags are in a spot our team can safely access and see from the street.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          That's it. The bags go, and so does the guilt about not dealing with it sooner.
        </p>
      </div>
    ),
  },

  {
    slug: "what-happens-to-donated-kids-clothing-australia",
    title: "What Actually Happens to Kids' Clothing When You Donate It in Australia",
    metaTitle: "What Happens to Donated Kids' Clothing in Australia | Second Life Kids",
    metaDescription: "Most donated clothing in Australia doesn't end up where you think. Here's what really happens to kids' items after they're donated — and why hand-sorting makes a difference.",
    publishedDate: "2026-07-28",
    category: "About the Service",
    excerpt: "Most donated kids' clothing in Australia doesn't end up where you think. Here's the truth about where donations go — and why hand-sorting makes a difference.",
    readingTimeMinutes: 6,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          When you drop a bag of kids' clothes at a charity bin or op shop, where does it actually go? For most Australians, the honest answer is: somewhere, probably. Maybe a local family buys it, maybe it gets exported, maybe it ends up in landfill. The reality of donated clothing in Australia is more complicated — and more wasteful — than most people realise.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">The scale of textile waste in Australia</h2>
        <p className="text-muted-foreground leading-relaxed">
          Australia is one of the world's highest consumers of new clothing per capita. The average Australian buys around 27 kilograms of new clothing each year and sends around 23 kilograms to landfill. For children's items specifically, the problem is compounded by the speed at which kids outgrow things — a newborn outfit might be worn four times before it no longer fits.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Most people assume that donating to a charity bin is a clean solution. In reality, charities receive far more donations than they can sell or redistribute. Estimates suggest that only around 15–20% of donated clothing in Australia ends up sold through op shops. The rest is sorted, baled, and exported to developing countries — or sent to landfill.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">What charity bins and op shops actually do with donations</h2>
        <p className="text-muted-foreground leading-relaxed">
          Large charity organisations in Australia process millions of kilograms of donated goods each year. The process typically works like this:
        </p>
        <ul className="space-y-3 mt-4 text-muted-foreground list-none">
          <li className="pl-4 border-l-2 border-primary/30">Donations arrive at processing centres, where they're quickly assessed in bulk. Staff don't have time for item-by-item evaluation at this scale.</li>
          <li className="pl-4 border-l-2 border-primary/30">High-quality items — name brand clothing in good condition, popular toys, furniture — are selected for op shop shelves.</li>
          <li className="pl-4 border-l-2 border-primary/30">Mid-tier items are baled and sold by weight to textile merchants, who export them to countries including Africa, Southeast Asia, and Eastern Europe.</li>
          <li className="pl-4 border-l-2 border-primary/30">Lower-quality items — anything wet, damaged, or too worn — go straight to landfill.</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          This isn't a criticism of charities — it's simply the reality of processing at volume. The system works reasonably well for high-quality donations. For everyday outgrown kids' gear in mixed condition, a lot of it doesn't find a second life at all.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">Why charity bin exports aren't always the win they seem</h2>
        <p className="text-muted-foreground leading-relaxed">
          Exporting donated clothing to developing countries has become increasingly controversial. The volume of donated Western clothing arriving in countries like Kenya, Ghana, and Bangladesh has suppressed local textile industries and contributed to vast quantities of low-quality imports that ultimately still end up in landfill — just in a different country.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          It's a long way from "I'm helping someone" to the actual outcome.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">How Second Life Kids sorts differently</h2>
        <p className="text-muted-foreground leading-relaxed">
          The Second Life Kids model is built around hand-sorting — evaluating every item individually, not in bulk. This means:
        </p>
        <ul className="space-y-2 mt-4 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> <span><strong>Best-condition items</strong> go to resale or directly to local families who need them — within the same region, not exported.</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> <span><strong>Good-condition items</strong> that aren't suitable for resale are redistributed through local community channels.</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> <span><strong>Items that can't be reused</strong> go to textile recycling rather than general waste where possible.</span></li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We're not a charity, which means we have different economics. We charge a flat fee for collection and sorting — that fee funds the time it takes to do this properly. The result is a higher proportion of items that actually reach a useful second life, locally.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">What this means for you</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you're clearing out a single bag of outgrown kids' clothing, a charity bin drop-off is probably fine. But if you've got multiple bags of mixed kids' items — clothing in various conditions, some toys, some books, some baby gear — the Second Life Kids model is likely to result in a better outcome for those items.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          You pay for the convenience of collection and the assurance of hand-sorting. The items get a genuine second life. And you don't have to do any of it yourself.
        </p>
      </div>
    ),
  },

  {
    slug: "decluttering-kids-rooms-mornington-peninsula",
    title: "Decluttering Kids' Rooms: A Practical Guide for Mornington Peninsula Families",
    metaTitle: "Decluttering Kids' Rooms | Guide for Mornington Peninsula Families | Second Life Kids",
    metaDescription: "A practical room-by-room guide to decluttering kids' spaces for families across the Mornington Peninsula. When to start, what to keep, and the easiest way to pass items on.",
    publishedDate: "2026-07-25",
    category: "Local Guides",
    excerpt: "A practical room-by-room guide to clearing kids' spaces — when to start, what to keep, what to let go, and the easiest way to pass things on locally.",
    readingTimeMinutes: 7,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Kids' rooms are extraordinary clutter machines. One week it's all newborn gear, then suddenly you're surrounded by size 2 clothes, plastic food sets, board books, and three different baby monitors you no longer need. If you're a family on the Mornington Peninsula — juggling school runs, sport on weekends, and limited storage space — the idea of "decluttering the kids' stuff" can feel like a full project in itself.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          It doesn't have to be. Here's a practical, room-by-room approach that works even in short windows of time.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">When is the right time to declutter?</h2>
        <p className="text-muted-foreground leading-relaxed">
          The short answer: now, if the clutter is bothering you. But there are natural trigger points that make it easier:
        </p>
        <ul className="space-y-2 mt-4 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">→</span> When your child moves from one size bracket to the next (newborn → 00 → 0, etc.)</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">→</span> At the end of each season — winter clothes going into storage are a natural audit moment</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">→</span> When a younger sibling outgrows the hand-me-downs</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">→</span> Before starting school — it's a natural transition point for clearing out the baby and toddler era</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">→</span> When a room changes purpose — nursery becoming a big-kid room</li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight mt-10">The wardrobe</h2>
        <p className="text-muted-foreground leading-relaxed">
          Start here — it's the area that accumulates fastest and has the clearest pass/keep rule: does it fit right now, and will it fit before it goes out of season? If the answer is no to both, it goes.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Be honest about sentimental items. A handful of genuinely special pieces — a first onesie, a favourite jumper — is fine to keep. But if everything is "special", nothing is. Most parents find that photographing a few favourite items is enough.
        </p>
        <ul className="space-y-2 mt-4 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">Keep</span> Items that currently fit and will be worn this season</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">Pass on</span> Outgrown clothing in good condition — clean, dry, no major damage</li>
          <li className="flex items-start gap-2"><span className="text-red-500 mt-1">Bin</span> Clothing that's too stained, torn, or worn to pass on</li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight mt-10">The toy box (and the floor, and the shelf, and that corner…)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Toys are emotionally loaded. Kids often claim to love something they haven't touched in eight months. A good test: put contested items in a box in a cupboard. If they're not asked about within three weeks, they're safe to move on.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For toys you're ready to pass on, the key check is whether pieces are reasonably complete. A puzzle with a missing piece, a game with a dog-eared box but all the cards — these still have real value for another family. Broken or sharp items do not.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">The bookshelf</h2>
        <p className="text-muted-foreground leading-relaxed">
          Books are easy to overkeep. The rule of thumb: if your child is unlikely to reread it before they outgrow the reading level, it's ready to move on. Well-loved board books with bent corners are still welcome at libraries, kindergartens, family resource centres, and through Second Life Kids — there's always a family just starting that stage.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">The nursery</h2>
        <p className="text-muted-foreground leading-relaxed">
          Baby gear is the clutter that tends to sit longest because it's bulky, expensive to replace, and often still feels too good to give away. But a Bumbo seat or a Snugapuppy swing taking up half your garage is doing nobody any good.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The practical question is: will you genuinely use this again within the next 12 months? If you're confident your family is done with this stage, passing it on now means another local family can benefit from it while it's still in good condition — not two years from now when it's developed garage smell and some rubber has cracked.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mt-10">How to make it easy</h2>
        <p className="text-muted-foreground leading-relaxed">
          The biggest barrier to acting on a declutter isn't the decision — it's the logistics. Most parents intend to list things on Facebook Marketplace, do a market stall, or find a specific new home for something. Then it sits in bags in the hallway for six months because none of that actually happens.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For families across the Mornington Peninsula — from Mornington and Mount Martha down to Frankston and Cranbourne — the simplest path is to book a Second Life Kids collection. You pack everything into bags, leave them outside on your collection day, and they're gone. You don't need to photograph, list, negotiate, or drop anything off.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Collections start from $45 and take two minutes to book online. Monday pickups cover Mornington Peninsula Shire, Wednesday covers Casey Shire, and Friday covers Frankston City Council.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The bags disappear. The guilt about not doing it sooner disappears with them.
        </p>
      </div>
    ),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
