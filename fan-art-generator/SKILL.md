---
name: fan-art-generator
description: Generate cute, hand-drawn style fan art illustrations as PNG images for music group members or characters. Use this skill whenever the user wants to create fan art, character illustrations, member portraits, idol art, chibi drawings, cute character cards, or any visual art depicting people/characters in an illustrative style. Also trigger when the user mentions creating art for a fan page, fan site, or fan community, or wants to make profile pictures, icons, or visual cards for group members. This skill generates actual face illustrations using AI image generation via Craiyon in the browser, then composites them into beautifully designed fan art cards.
---

# Fan Art Generator

Create cute, simple, hand-drawn style fan art character cards as PNG images. Each card features an AI-generated chibi/anime-style face illustration combined with decorative fan art card design. The art should feel like it was lovingly crafted by a devoted fan — warm, personal, and full of personality.

## What This Skill Creates

Full character fan art cards that include:
1. A cute chibi/anime-style face illustration (generated via Craiyon AI)
2. A decorative card layout with the member's name, role, colors, and doodle elements (built with Python + Pillow)

The final output is a single PNG per character that combines both elements.

## Style Guide: "Sketchbook Love"

The visual language draws from K-pop fan art culture and indie illustration zines. Think of the kind of art fans pin to their walls, share on social media, or paste into their journals.

**Core Aesthetic:**
- Soft, rounded shapes — nothing sharp or angular
- Pastel and warm color palettes with occasional bold accent colors
- Cute proportions: chibi-style with larger heads, expressive features
- Decorative elements: stars, hearts, sparkles, music notes, small doodles
- A feeling of warmth and affection in every piece

**What Makes It Feel "Fan-Made":**
- Personal touches like tiny handwritten-style labels or nicknames
- Decorative borders that look sketched, not geometric
- Color choices that feel emotional rather than corporate
- Small hidden details that reward close looking

## Creation Process

### Step 1: Understand the Character

Before creating anything, gather key details:
- Name and any nicknames
- Role in the group (vocalist, rapper, dancer, etc.)
- Personality keywords or vibe (warm, energetic, cool, playful, etc.)
- A signature color or color palette associated with them
- Any iconic traits, accessories, or symbols fans associate with them
- A fan quote or catchphrase if available

If the user provides character info from an existing site or context, use it. If not, ask.

### Step 2: Generate the Face Illustration via Craiyon

This is the core step that produces the character's face art. Use the browser (Claude in Chrome tools) to generate images on Craiyon.

**2a. Open Craiyon**
Navigate to `https://www.craiyon.com/` in the browser.

**2b. Craft the prompt**
Write a detailed prompt for Craiyon that captures the character's vibe. The prompt should follow this template:

```
cute chibi anime style illustration of a young [gender] [ethnicity] [role description], [expression], [accessories/props], [color palette description], hand drawn style, simple adorable fan art, [mood/atmosphere], white background, centered portrait
```

Example prompts:
- Warm leader/vocalist: "cute chibi anime style illustration of a young Korean male kpop idol singer, warm gentle smile, holding microphone, soft pastel sunset orange and gold colors, hand drawn style, simple adorable fan art, warm golden glow, white background, centered portrait"
- Cool rapper: "cute chibi anime style illustration of a young Korean male kpop rapper, confident smirk, wearing cap and headphones, bold red and dark colors with flame accents, hand drawn style, simple adorable fan art, fiery energy, white background, centered portrait"
- Playful dancer: "cute chibi anime style illustration of a young Korean male kpop dancer, bright happy smile, dynamic pose, fresh green and yellow colors, hand drawn style, simple adorable fan art, energetic and lively, white background, centered portrait"

Key prompt tips:
- Always include "cute chibi anime style illustration" for consistent style
- Always include "hand drawn style, simple adorable fan art" for the right aesthetic
- Include "white background, centered portrait" so the image composites cleanly onto cards
- Match colors and mood to the character's personality
- Mention specific props that relate to their role (microphone, headphones, dance shoes, etc.)

**2c. Enter the prompt and generate**
1. Find the text input box on Craiyon's page
2. Enter the crafted prompt using the form_input tool
3. Click the "Draw now" button
4. Wait approximately 30-60 seconds for generation (use `sleep 30` via Bash, then take a screenshot to check)
5. If still loading, wait another 15-30 seconds

**2d. Save the best result**
Once images appear:
1. Take a screenshot to see the generated options
2. Click on the best image to open it in Craiyon's viewer
3. Extract the image URL using JavaScript:

```javascript
// Find all large images on the page
const allImgs = [...document.querySelectorAll('img')].filter(i => i.naturalWidth > 500);
JSON.stringify(allImgs.map(i => ({src: i.src, w: i.naturalWidth, h: i.naturalHeight})));
```

4. Navigate directly to the image URL (it will be something like `https://img.craiyon.com/2026-xx-xx/xxx.webp`)
5. Once on the direct image URL, use canvas to convert it (same-origin so no CORS issues):

```javascript
(async () => {
  const img = document.querySelector('img');
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chibi-face.png';
    document.body.appendChild(a);
    a.click();
  }, 'image/png');
})();
```

6. If the downloaded file is not accessible from the sandbox filesystem, take a screenshot of the direct image URL page and use Pillow to crop the character from it. The image will be displayed centered on a black background, making it easy to crop.

**Fallback: Screenshot crop approach**
If direct download doesn't work, take a screenshot while on the direct image URL, then crop with Pillow:
```python
from PIL import Image
# Open screenshot, crop the image area (black borders around the centered image)
screenshot = Image.open('screenshot.png')
# Find non-black bounding box
# ... crop to just the character art
```

### Step 3: Build the Fan Art Card with Pillow

Once the face illustration is saved, use Python + Pillow to create the full card.

**Bundled script:** A reference card creation script is available at `scripts/create_card.py` within this skill's directory. Read it for an example of how to build a complete card with gradient backgrounds, wobbly borders, scattered doodles, and proper font usage. Adapt it for each character by changing colors, text, and decorative elements.

**Install Pillow if needed:** `pip install Pillow`

**Card layout (800x1100 pixels portrait):**

```
┌──────────────────────────┐
│     ✨ GROUP NAME ✨      │  ← small header text
│                          │
│   ┌──────────────────┐   │
│   │                  │   │
│   │   CHIBI FACE     │   │  ← AI-generated face centered here
│   │   ILLUSTRATION   │   │     (roughly 500x500 area)
│   │                  │   │
│   └──────────────────┘   │
│                          │
│      ★ MEMBER NAME ★     │  ← large, stylized name
│        Role Title        │  ← smaller role text
│                          │
│    "fan quote here"      │  ← italic quote
│                          │
│  ♪ ♥ ✦  doodles  ♪ ♥ ✦  │  ← scattered decorations
│                          │
│     made with love ♥     │  ← footer credit
└──────────────────────────┘
```

**Building steps:**
1. Create canvas with a soft gradient background in the member's signature colors
2. Draw a decorative hand-drawn style border (wobbly lines, scalloped edges)
3. Place the face illustration in the center-upper area, with a circular or rounded mask and soft shadow
4. Add the member's name in a large, personality-matching font
5. Add role text in a clean complementary font
6. Add a fan quote in italic
7. Scatter decorative doodle elements (hearts, stars, music notes, sparkles) around the card
8. Add a small "made with love" or "fan art" footer
9. Apply subtle paper texture overlay for the sketchbook feel

**Font Selection Guide** (from canvas-fonts directory):
- Cute/playful names: `NothingYouCouldDo-Regular.ttf` (handwritten feel)
- Bold/impactful names: `BigShoulders-Bold.ttf` or `EricaOne-Regular.ttf`
- Elegant names: `Italiana-Regular.ttf` or `Lora-Regular.ttf`
- Modern/clean names: `Outfit-Bold.ttf` or `InstrumentSans-Bold.ttf`
- Role/subtitle text: `InstrumentSans-Regular.ttf` or `WorkSans-Regular.ttf`
- Pixel/retro feel: `PixelifySans-Medium.ttf` or `Silkscreen-Regular.ttf`

Font path: look for canvas-fonts in the skills directory (typically at `mnt/.skills/skills/canvas-design/canvas-fonts/`)

**Drawing techniques for the hand-drawn look:**
- Wobbly lines: draw shapes point-by-point with small random offsets
- Soft gradients: many thin horizontal color bands that blend smoothly
- Sparkle stars: 4-pointed or 6-pointed stars using trigonometry
- Hearts: bezier-curve-like point sequences
- Music notes: small circles + thin lines + curves
- Paper texture: subtle noise or dot patterns at low opacity

**Color palettes:**
- Warm sunset: #FF6B6B, #FFE66D, #F4A261, #E76F51
- Cool ocean: #48CAE4, #90E0EF, #CAF0F8, #023E8A
- Dreamy purple: #C77DFF, #E0AAFF, #7B2CBF, #240046
- Fresh spring: #95D5B2, #D8F3DC, #52B788, #2D6A4F
- Soft pink: #FFB3C6, #FF8FAB, #FB6F92, #FF477E
- Fiery red: #FF4444, #FF6600, #FFB347, #CC0000

### Step 4: Output

Save the final composite PNG to the user's workspace folder. Use a clear naming convention: `fanart-[membername].png`.

If creating art for multiple members, generate each one sequentially (Craiyon needs the browser, so one at a time), but design them as a cohesive set with consistent card layout and complementary color palettes.

## Important Notes

- Every piece should feel made with love — this is fan art, not corporate branding
- Imperfection is a feature: slightly off-center text, hand-drawn edges, organic spacing
- Color choices should evoke emotion and match the member's personality
- The chibi face is the hero element — give it plenty of space and make it the focal point
- The card design should complement, not compete with, the face illustration
- When in doubt, add more sparkles and hearts
- Cards should work both as standalone pieces and as a cohesive set side by side
- If Craiyon is slow or unavailable, fall back to the abstract emblem style (symbolic shapes instead of faces) and let the user know
