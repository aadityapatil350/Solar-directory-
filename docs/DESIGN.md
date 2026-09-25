# GoSolarIndex.in — Design System

**Idea in one line:** the site should look like a trusted public register of Indian solar, not a startup landing page. Calm, clear, and full of real numbers.

It borrows from two things every Indian solar buyer already knows:
- **Daylight:** a white, bright, calm page, with one warm sun colour for the action that matters.
- **The electricity bill:** label on the left, amount on the right, dotted line between them, total at the bottom. This is the **fact panel**, the one signature element on every data page.

Everything else stays quiet.

---

## 1. Colours: 3 only, light theme

| Name | Hex | Use |
|---|---|---|
| **Ink** | `#1F2A37` | All text, headings, icons, lines, outline buttons |
| **Paper** | `#FFFFFF` | Page background, panels, header, footer |
| **Sun** | `#F2A30F` | Primary action button, featured edge, the logo sun. Nothing else. |

That's the whole palette. Every other shade is **Ink or Sun at lower opacity**, never a new hue:

| Token | Value | Use |
|---|---|---|
| `--ink-2` | Ink at 68% | Secondary text, sources, captions (passes AA on white) |
| `--line` | Ink at 14% | Borders, dividers, table lines |
| `--wash` | Ink at 4% | Alternate section background, table header, hover |
| `--sun-wash` | Sun at 14% | Tool result box, highlighted row |

**Rules**
- Light theme only. Set `color-scheme: light`, with no dark mode.
- **One Sun button per screen.** Everything else is an Ink outline button or an Ink underlined link.
- No red or green. Savings are shown with words and a sign ("You save ₹2,600/month"). Errors are shown in Ink bold with a warning icon, plus text saying what to fix.
- No gradients, no textures, no coloured section backgrounds apart from `--wash`.
- The logo is a Sun-coloured sun mark with the wordmark in Ink.

```css
:root{
  color-scheme: light;
  --ink:#1F2A37; --paper:#FFFFFF; --sun:#F2A30F;
  --ink-2:rgba(31,42,55,.68); --line:rgba(31,42,55,.14);
  --wash:rgba(31,42,55,.04); --sun-wash:rgba(242,163,15,.14);
  --radius-sm:4px; --radius-md:8px;
}
```

---

## 2. Type

Both fonts are from Indian type foundries and support Devanagari, so Hindi and Hinglish pages later will match.

| Role | Font | Weights |
|---|---|---|
| Headings, big numbers, nav | **Anek Latin** (Ek Type), set a little narrow (`font-stretch: 87.5%` if the variable font is loaded) | 600, 700 |
| Body, forms, tables | **Mukta** (Ek Type) | 400, 500, 600 |
| Hindi pages later | Anek Devanagari + Mukta | same |

Fallback stack: `"Mukta", "Segoe UI", Roboto, system-ui, sans-serif`.

**Scale** (mobile → desktop):

| Token | Size | Line height | Use |
|---|---|---|---|
| display | 34 → 52px | 1.05 | Home hero only |
| h1 | 28 → 40px | 1.15 | Page title |
| h2 | 22 → 28px | 1.25 | Section |
| h3 | 18 → 20px | 1.35 | Sub-section, listing name |
| body | 17px | 1.6 | Text |
| small | 14px | 1.5 | Sources, captions, meta |

**Rules**
- Sentence case everywhere. **No ALL-CAPS labels.**
- No coloured or italic word inside a headline. The headline is one colour.
- Numbers in tables and fact panels use `font-variant-numeric: tabular-nums`. Check that Mukta renders it; if not, use Anek Latin for those numbers.
- Indian number format everywhere: ₹1,20,000, not ₹120,000. Use `Intl.NumberFormat('en-IN')`.
- Reading width is at most 70 characters (about 680px).

---

## 3. Shape, space, depth

- **Radius has a hierarchy:** inputs and buttons get 4px, panels 8px, pills (the only pill is the city chip in search) full. It's not the same radius on everything.
- **Shadows:** none on cards. One shadow only, on things that float (sticky mobile bar, dropdowns): `0 6px 24px rgba(20,38,74,.14)`.
- Separate things with **space and `--line` dividers**, not boxes inside boxes.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 72. Sections are 48px apart on mobile and 72px on desktop.
- **Grid:** 12 columns, 1200px max on directory pages, 680px text column on articles, 24px gutters, **left aligned.** Centred text is only for the home hero line and empty states.

---

## 4. Signature: the fact panel

It appears at the top of every state, DISCOM, city, price, and subsidy page, and it answers the page's main question in one glance.

```
┌──────────────────────────────────────────────┐
│ Solar in Pune, Maharashtra                   │
│ Checked 25 Sep 2026                          │
├──────────────────────────────────────────────┤
│ DISCOM ..................... MSEDCL          │
│ Net metering limit ......... up to X kW      │
│ Central subsidy (3 kW) ..... ₹78,000         │
│ Typical 3 kW cost .......... ₹1.8–2.2 lakh   │
│ Generation per kW .......... ~1,450 kWh/yr   │
├──────────────────────────────────────────────┤
│ Payback .................... 4–5 years (bold)│
├──────────────────────────────────────────────┤
│ Sources: PM Surya Ghar portal, MERC, NASA    │
│ POWER. How we calculate →                    │
└──────────────────────────────────────────────┘
```

- It is white, with an 8px radius, a 1px `--line` border, a bold Ink title with a 2px Ink rule under it, and dotted leaders between label and value (like a bill).
- The last row is the "total", shown bold with a 1.5px Ink line above it.
- The source line is mandatory, in `--ink-2` at 14px.
- On mobile it is full width, with the same layout.
- The values are placeholders. Real values come from the data layer.

---

## 5. Components

**Buttons**
- **Primary:** Sun background with Ink text, 600 weight, 48px tall, 4px radius. The label says exactly what happens: "Get 3 quotes", "Calculate savings", "Search".
- **Secondary:** white background, 1.5px Ink border, Ink text.
- **Text link:** Ink, always underlined (1px, 3px offset). **No "→" added to buttons or links.**
- **Focus:** 3px Ink outline, 2px offset, on everything.

**Listing row** (the directory is a list, **not** a grid of identical cards)
```
Gridstone Solar Solutions                      [ Call ] [ WhatsApp ]
Commercial and residential installer, Amritsar
Owner verified   ★ 4.8 from 12 GoSolarIndex reviews
Services: rooftop, commercial, AMC, net metering   ·  opp. DAV College
──────────────────────────────────────────────────────────────── line
```
- The name is h3 in Ink, and it's the link.
- The one-line description is built from data.
- Badges are text, not pills: "Owner verified" in Ink 600 weight with a small check icon. Unverified listings show nothing, and the page footer explains "Listed from public data".
- Featured listings get a 4px Sun left border and the word "Featured" in small `--ink-2` text. No gold banner.
- On mobile, the actions go below the text in a full-width 2-button row.

**Data table:** a white panel, `--line` row lines, a `--wash` header row, no zebra stripes, a sticky first column on mobile with horizontal scroll inside the panel, and numbers right-aligned.

**FAQ:** native `<details>`, a `--line` between items, and a plus/minus icon. No card per question.

**Steps:** only for real sequences (apply for PM Surya Ghar, net metering application). This is the only place numbered markers are allowed.

**Forms:** 48px inputs, the label above the field (never placeholder-only), errors in Ink bold with a warning icon below the field saying what to fix ("Enter a 10-digit mobile number").

**Sticky mobile bar** (city, listing, and price pages): a white bar with a shadow, holding the one Sun "Get 3 quotes" button and a secondary "Call" button on listings.

**Empty states:** tell people what to do. For example: "No cleaning services listed in Bikaner yet. See Jodhpur (180 km) or add your business."

**Icons:** Lucide at a 1.75px stroke, 20px, Ink or `--ink-2`. **No emoji in the UI.**

**Images:** real photos only (owner-uploaded or our own). No stock "happy family on roof" images and no AI images. Where there is no photo, show nothing rather than a placeholder avatar with initials.

---

## 6. Page layouts

**Home**
```
[Header: logo · Learn · Plan · Find · For installers ········ [Get quotes]]

HERO (white, left aligned, big Ink headline, no background image)
  Go solar with the right numbers and the right installer.
  Subsidy, cost and trusted installers for your city.
  [ City ▾ ][ What do you need? ▾ ][ Search ]      ← one Sun button

"Where do you want to start?" — 6 plain tiles in a 3x2 (mobile 2x3):
  Check your subsidy · Know the cost · Find an installer
  Compare panel brands · Cleaning and AMC · Solar for business

Fact panel: "Solar in India today" (PM Surya Ghar amount, avg cost/kW, 
  installs this year) with sources

Pick your state — 36 names as a plain text list in columns (not cards)

Tools — 4 rows: name, one-line what it does, link

Directory preview — 5 listing rows from the user's detected/popular city

Latest guides — 3 text rows: title, 1 line, date

For installers strip — plain text + secondary button
[Footer: `--wash` background, Ink text, 4 link columns, data sources note, author]
```

**City hub** (`/pune/`): breadcrumb → h1 "Solar in Pune: installers, cost and subsidy" → fact panel on the left with a short intro on the right (stacked on mobile) → service tabs as links (Installers · Cleaning · Inverter & battery · Commercial) → listing rows → "How to get solar in Pune" steps (a real sequence) → DISCOM section → FAQ → nearby cities as a text list.

**Listing** (`/listing/...`): name h1, one-line description, and the verification line → action row (Call, WhatsApp, Website, plus a Sun "Get quote") → a two-column layout on desktop (details on the left, a small contact/quote box on the right) → services as a plain comma list → photos (only if real) → reviews (our own; the empty state says "Be the first to review") → map → "Other installers in Pune" (3 rows).

**State hub:** fact panel → a DISCOM table → subsidy (central plus state) → net metering rules → steps to apply → a cities list → FAQ.

**Tool page:** h1, then a one-line explainer → inputs on the left, the result on the right (stacked on mobile), with the result in a `--sun-wash` box and big Anek numbers → "How this is calculated", with sources → the next step ("Get 3 quotes for this size").

**Article:** a 680px column, with author, "Last reviewed" date, and a table of contents for long posts → body → sources → related links.

---

## 7. Motion

- The only built-in motion is the tool result counting up once after the user taps Calculate.
- Everything else moves only in response to the user: dropdown open, accordion, form feedback. Use 150–200ms ease-out.
- No fade-up on scroll, no hover lift on cards, and no auto-carousels.
- Respect `prefers-reduced-motion`.

---

## 8. Banned (the "AI sloppy" list)

- Any colour beyond Ink, Paper and Sun. No dark sections.
- Gradient hero washes, glassmorphism, and blurred blobs.
- Emoji as icons (🏠 🔋 ⚡), as the site uses now.
- A grid of identical rounded cards with the same soft shadow.
- Big-number stats bars ("1,712+ companies · 78+ cities · 4.8 rating").
- ALL-CAPS eyebrow labels above headings, and "01 / 02 / 03" on things that aren't steps.
- "→" appended to every link or button.
- Fake testimonials ("Rajesh M., Pune"). Show real reviews only, or no testimonials.
- "Your Company Here" placeholder slots.
- Hype words: premier, best-in-class, seamless, revolutionary, "in minutes".
- Placeholder avatars with initials (the current "GR", "MP", "CR" circles).
