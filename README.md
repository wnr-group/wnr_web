# WnR Advisory: website

Creative direction: **"The Living Blueprint"**. WnR as an architect's studio for digital platforms. The signature object is **the Core**, five engineered layers (Foundation → Data → Applications → Intelligence → Experience) that every product WnR ships sits on.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node 18.18+ (Node 20 or 22 recommended).

## Before launch: replace placeholders

Everything editable lives in **`lib/content.ts`**:

- `projects`: **sample portfolio entries**. Replace them with real work, real client permissions and real outcomes.
- `metadataBase` in `app/layout.tsx`: set your real domain
- Budget ranges in `components/sections/ContactForm.tsx`
- The contact form composes an email (`mailto:`). To collect leads, swap `handleSubmit` for an API route or a form service.

## Structure

```
app/                     Routes (App Router)
  page.tsx               Home
  work/page.tsx          Filterable work gallery
  work/[slug]/page.tsx   Case studies (statically generated)
  capabilities/          Anatomy of the Core + each capability
  studio/                About, principles, engagement models
  contact/               Project brief form
components/
  three/Core.tsx         THE CORE: CSS-3D layered object (no WebGL)
  mockups/Mockups.tsx    Six product UI mockups (storefront, dashboard,
                         AI assistant, mobile app, ERP, workflow)
  sections/              Page sections
  ui/                    Header, footer, buttons, reveal helpers
lib/
  content.ts             All copy & data
  motion.ts              Scroll-progress, pointer-tilt, in-view hooks
styles/
  tokens.css             Design tokens (colour, type, space, motion)
  system.css             Type scale, layout, buttons, tags, reveals
  hero.css / sections.css / ai.css / pages.css / mockups.css / chrome.css
```

## Design system (green & white)

| Token | Value | Use |
|---|---|---|
| `--bone` | `#FFFFFF` | Page ground |
| `--paper` / `--sand` | `#F3F8F5` / `#E6F0EA` | Tinted sections, surfaces |
| `--ink` | `#0A1F17` | Type (near-black green) |
| `--ultra` | `#0A8A5C` | **Signature: WnR Emerald.** CTAs, emphasis, the Core's Intelligence layer |
| `--lime` | `#C6F36A` | Small highlights only |
| `--night` | `#052016` | Deep forest: the AI section, contact card, footer |

**Type:** Instrument Sans, Instrument Serif *italic* for emphasis words (and "Advisory" in the logo), JetBrains Mono for labels.

**Logo:** the header uses `public/logo.png` when present, then the logo file on the live Netlify site, then the "WnR *Advisory*" wordmark alone. Copy your `logo.png` into `public/` so it never depends on the old site.

**Content:** company details, services, industries, process, "Why WnR", toolkit, FAQs and contact info come from the current site (wnradvisory.netlify.app). The projects under Work are samples. Replace them with real case studies.

## Signature moments

1. **Hero: the Core.** Slabs drop in as wireframes and fill solid. Five product interfaces are tethered to the layers they depend on. On scroll the Core opens into a labelled exploded view: *Five layers. One platform.*
2. **Capabilities: the ecosystem.** Selecting a capability lifts its layer out of the Core and brings the product it produces into focus (auto-tours until the visitor takes over; keyboard arrows work).
3. **AI & Automation.** The page drops into night. Six disconnected processes drift into orbit, get wired to an agent layer, and resolve into a live operations console.

## 3D and performance

**The Core is rendered in real time with WebGL2** (`components/three/CoreGL.tsx` + `coreShader.ts`). It's a custom raymarcher with no Three.js or other 3D library:
rounded slabs with engraved surfaces, soft shadows, ambient occlusion, an ultramarine light-emitting Intelligence layer and a transparent blueprint floor.

- It renders **on demand**: frames run only while something changes (intro, scroll, pointer, a selected layer), then the GPU idles.
- The march is bounded to the object's volume, and resolution adapts if frames run slow.
- Layer labels are HTML, projected from the same camera so they stay pinned to the geometry.
- If WebGL2 is unavailable, it falls back automatically to the CSS-3D `<Core/>`.

The floating product interfaces are real HTML in CSS perspective, so their text stays crisp. The only dependencies are Next and React.

- Scroll and pointer updates write CSS variables in `requestAnimationFrame`, so they cause no React re-renders. Off-screen sections stop updating.
- `prefers-reduced-motion` disables animation, and every state still reads statically.
- Touch devices skip the pointer tilt. Mobile gets simplified compositions (fewer satellites, no sticky hero, smaller AI field).
- One caveat if you edit the Core: don't put `opacity`, `filter` or `overflow` on any element *between* `.core__rig` and the faces. Browsers flatten 3D there.
