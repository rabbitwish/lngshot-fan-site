#!/usr/bin/env python3
"""
Fan Art Card Generator v2 for OHYUL from LNGSHOT
Enhanced version with richer decorations, better chibi placeholder, and more visual depth.
"""

import random
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# === Configuration ===
WIDTH, HEIGHT = 800, 1100
FONT_DIR = "/sessions/sleepy-festive-fermi/mnt/.skills/skills/canvas-design/canvas-fonts"
OUTPUT = "/sessions/sleepy-festive-fermi/mnt/project-lng/fanart-ohyul-v2.png"

# Warm sunset palette
SUNSET_RED = (255, 107, 107)
SUNSET_YELLOW = (255, 230, 109)
SUNSET_ORANGE = (244, 162, 97)
SUNSET_DEEP = (231, 111, 81)
SOFT_PINK = (255, 200, 200)
CREAM = (255, 248, 235)
WARM_WHITE = (255, 252, 245)
BLUSH = (255, 182, 185)
PEACH = (255, 218, 185)
LIGHT_CORAL = (255, 160, 140)
DUSTY_ROSE = (220, 140, 150)
GOLDEN = (255, 200, 80)
WARM_BROWN = (140, 80, 60)
DEEP_WARM = (180, 70, 60)
LAVENDER_PINK = (255, 190, 210)
SOFT_GOLD = (255, 220, 140)
PALE_YELLOW = (255, 245, 200)

random.seed(42)


def load_fonts():
    fonts = {}
    fonts['header'] = ImageFont.truetype(f"{FONT_DIR}/Outfit-Bold.ttf", 20)
    fonts['name_large'] = ImageFont.truetype(f"{FONT_DIR}/NothingYouCouldDo-Regular.ttf", 78)
    fonts['subtitle'] = ImageFont.truetype(f"{FONT_DIR}/InstrumentSans-Regular.ttf", 22)
    fonts['quote'] = ImageFont.truetype(f"{FONT_DIR}/InstrumentSans-Italic.ttf", 26)
    fonts['quote_big'] = ImageFont.truetype(f"{FONT_DIR}/NothingYouCouldDo-Regular.ttf", 60)
    fonts['footer'] = ImageFont.truetype(f"{FONT_DIR}/WorkSans-Regular.ttf", 13)
    fonts['deco_text'] = ImageFont.truetype(f"{FONT_DIR}/NothingYouCouldDo-Regular.ttf", 18)
    fonts['tiny'] = ImageFont.truetype(f"{FONT_DIR}/WorkSans-Regular.ttf", 11)
    fonts['sparkle_text'] = ImageFont.truetype(f"{FONT_DIR}/NothingYouCouldDo-Regular.ttf", 16)
    fonts['chibi_label'] = ImageFont.truetype(f"{FONT_DIR}/NothingYouCouldDo-Regular.ttf", 20)
    fonts['role_bold'] = ImageFont.truetype(f"{FONT_DIR}/InstrumentSans-Bold.ttf", 20)
    return fonts


def lerp_color(c1, c2, t):
    t = max(0, min(1, t))
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(min(len(c1), len(c2))))


def draw_gradient_bg(img):
    """Multi-stop warm gradient with subtle texture."""
    draw = ImageDraw.Draw(img)
    stops = [
        (0.0, (255, 243, 230)),
        (0.12, (255, 235, 218)),
        (0.30, (255, 225, 205)),
        (0.50, (255, 215, 195)),
        (0.70, (255, 205, 185)),
        (0.85, (255, 195, 175)),
        (1.0, (255, 185, 165)),
    ]
    for y in range(HEIGHT):
        t = y / HEIGHT
        for i in range(len(stops) - 1):
            if stops[i][0] <= t <= stops[i + 1][0]:
                lt = (t - stops[i][0]) / (stops[i + 1][0] - stops[i][0])
                color = lerp_color(stops[i][1], stops[i + 1][1], lt)
                break
        draw.line([(0, y), (WIDTH, y)], fill=color)

    # Add subtle noise texture
    for _ in range(8000):
        px = random.randint(0, WIDTH - 1)
        py = random.randint(0, HEIGHT - 1)
        base = img.getpixel((px, py))
        noise = random.randint(-4, 4)
        new_color = tuple(max(0, min(255, c + noise)) for c in base)
        img.putpixel((px, py), new_color)
    return img


def radial_glow(img, cx, cy, radius, color, intensity=0.2):
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for r in range(int(radius), 0, -3):
        t = r / radius
        alpha = int((1 - t ** 0.5) * intensity * 255)
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))
    img_rgba = img.convert('RGBA')
    img_rgba = Image.alpha_composite(img_rgba, overlay)
    return img_rgba.convert('RGB')


def draw_heart(draw, cx, cy, size, color, filled=True, rotation=0):
    points = []
    for t_deg in range(360):
        t = math.radians(t_deg)
        x = 16 * math.sin(t) ** 3
        y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
        # Apply rotation
        cos_r = math.cos(rotation)
        sin_r = math.sin(rotation)
        rx = x * cos_r - y * sin_r
        ry = x * sin_r + y * cos_r
        points.append((cx + rx * size / 16, cy + ry * size / 16))
    if filled:
        draw.polygon(points, fill=color)
    else:
        for i in range(len(points) - 1):
            draw.line([points[i], points[i + 1]], fill=color, width=2)


def draw_star(draw, cx, cy, size, color, filled=True, points_count=5):
    pts = []
    for i in range(points_count * 2):
        angle = math.radians(i * (360 / (points_count * 2)) - 90)
        r = size if i % 2 == 0 else size * 0.38
        wobble = random.uniform(-0.8, 0.8)
        x = cx + (r + wobble) * math.cos(angle)
        y = cy + (r + wobble) * math.sin(angle)
        pts.append((x, y))
    if filled:
        draw.polygon(pts, fill=color)
    else:
        pts.append(pts[0])
        for i in range(len(pts) - 1):
            draw.line([pts[i], pts[i + 1]], fill=color, width=2)


def draw_sparkle(draw, cx, cy, size, color, thick=True):
    w = 2 if thick else 1
    # Main cross
    draw.line([(cx, cy - size), (cx, cy + size)], fill=color, width=w)
    draw.line([(cx - size, cy), (cx + size, cy)], fill=color, width=w)
    # Diagonals (shorter)
    ds = size * 0.55
    draw.line([(cx - ds, cy - ds), (cx + ds, cy + ds)], fill=color, width=1)
    draw.line([(cx + ds, cy - ds), (cx - ds, cy + ds)], fill=color, width=1)
    # Center glow dot
    draw.ellipse([cx - 2, cy - 2, cx + 2, cy + 2], fill=(255, 255, 240))
    draw.ellipse([cx - 1, cy - 1, cx + 1, cy + 1], fill=color)


def draw_music_note(draw, cx, cy, size, color):
    nw, nh = size * 0.7, size * 0.5
    # Tilted note head
    draw.ellipse([cx - nw, cy - nh + 2, cx + nw, cy + nh + 2], fill=color)
    stem_x = cx + nw - 1
    draw.line([(stem_x, cy + 2), (stem_x, cy - size * 2.5)], fill=color, width=2)
    # Flag with curve
    flag_top = cy - size * 2.5
    for i in range(int(size * 1.2)):
        t = i / (size * 1.2)
        fx = stem_x + math.sin(t * math.pi) * size * 0.9
        fy = flag_top + i * 0.7
        draw.line([(stem_x, fy), (fx, fy)], fill=color, width=1)


def draw_double_note(draw, cx, cy, size, color):
    spacing = size * 1.5
    for offset in [0, spacing]:
        nw, nh = size * 0.6, size * 0.4
        draw.ellipse([cx + offset - nw, cy - nh, cx + offset + nw, cy + nh], fill=color)
    stem_h = size * 2.8
    draw.line([(cx + size * 0.5, cy), (cx + size * 0.5, cy - stem_h)], fill=color, width=2)
    draw.line([(cx + spacing + size * 0.5, cy), (cx + spacing + size * 0.5, cy - stem_h)], fill=color, width=2)
    beam_y = cy - stem_h
    draw.line([(cx + size * 0.5, beam_y), (cx + spacing + size * 0.5, beam_y)], fill=color, width=3)
    draw.line([(cx + size * 0.5, beam_y + 5), (cx + spacing + size * 0.5, beam_y + 5)], fill=color, width=2)


def draw_flower(draw, cx, cy, size, petal_color, center_color):
    """Draw a cute 5-petal flower."""
    for i in range(5):
        angle = math.radians(i * 72 - 90)
        px = cx + size * 0.7 * math.cos(angle)
        py = cy + size * 0.7 * math.sin(angle)
        r = size * 0.45
        draw.ellipse([px - r, py - r, px + r, py + r], fill=petal_color)
    # Center
    cr = size * 0.3
    draw.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=center_color)


def draw_cloud(draw, cx, cy, size, color):
    """Draw a tiny cute cloud."""
    bumps = [
        (0, 0, size * 0.6),
        (-size * 0.5, size * 0.1, size * 0.45),
        (size * 0.5, size * 0.1, size * 0.45),
        (-size * 0.25, -size * 0.3, size * 0.4),
        (size * 0.25, -size * 0.3, size * 0.4),
    ]
    for bx, by, br in bumps:
        draw.ellipse([cx + bx - br, cy + by - br, cx + bx + br, cy + by + br], fill=color)


def draw_wobbly_border(draw, margin=30, color=DUSTY_ROSE, width=2):
    """Wobbly double border with rounded corner feel."""
    num = 240
    wobble = 3.5

    def make_border_points(m, w):
        pts = []
        # Corners with rounding
        corner_r = 15
        # Each side
        for i in range(num // 4):
            t = i / (num // 4)
            pts.append((m + corner_r + t * (WIDTH - 2 * m - 2 * corner_r), m + random.uniform(-w, w)))
        for i in range(num // 4):
            t = i / (num // 4)
            pts.append((WIDTH - m + random.uniform(-w, w), m + corner_r + t * (HEIGHT - 2 * m - 2 * corner_r)))
        for i in range(num // 4):
            t = i / (num // 4)
            pts.append((WIDTH - m - corner_r - t * (WIDTH - 2 * m - 2 * corner_r), HEIGHT - m + random.uniform(-w, w)))
        for i in range(num // 4):
            t = i / (num // 4)
            pts.append((m + random.uniform(-w, w), HEIGHT - m - corner_r - t * (HEIGHT - 2 * m - 2 * corner_r)))
        pts.append(pts[0])
        return pts

    # Outer border
    outer = make_border_points(margin, wobble)
    for i in range(len(outer) - 1):
        draw.line([outer[i], outer[i + 1]], fill=color, width=width)

    # Inner border
    inner_color = tuple(min(255, c + 35) for c in color)
    inner = make_border_points(margin + 5, wobble * 0.7)
    for i in range(len(inner) - 1):
        draw.line([inner[i], inner[i + 1]], fill=inner_color, width=1)


def draw_corner_flourishes(draw, margin=30):
    """Ornate corner doodles with swirls and dots."""
    corners = [
        (margin + 10, margin + 10, 1, 1),
        (WIDTH - margin - 10, margin + 10, -1, 1),
        (margin + 10, HEIGHT - margin - 10, 1, -1),
        (WIDTH - margin - 10, HEIGHT - margin - 10, -1, -1),
    ]
    for cx, cy, dx, dy in corners:
        col = random.choice([DUSTY_ROSE, LIGHT_CORAL, SUNSET_ORANGE])
        lighter = tuple(min(255, c + 40) for c in col)
        # Spiral
        for t in range(30):
            angle = t * 0.25
            r = 2 + t * 0.6
            x = cx + dx * r * math.cos(angle)
            y = cy + dy * r * math.sin(angle)
            sz = max(0.5, 1.5 - t * 0.03)
            draw.ellipse([x - sz, y - sz, x + sz, y + sz], fill=col)
        # Leaf shapes extending from corner
        for angle_offset in [0.3, 0.8]:
            lx = cx + dx * 22 * math.cos(angle_offset)
            ly = cy + dy * 22 * math.sin(angle_offset)
            draw.ellipse([lx - 3, ly - 1.5, lx + 3, ly + 1.5], fill=lighter)
        # Dots trail
        for i in range(4):
            dot_x = cx + dx * (25 + i * 7)
            dot_y = cy + dy * 3 + random.uniform(-2, 2)
            r = 1.5 - i * 0.3
            draw.ellipse([dot_x - r, dot_y - r, dot_x + r, dot_y + r], fill=col)
        for i in range(4):
            dot_x = cx + dx * 3 + random.uniform(-2, 2)
            dot_y = cy + dy * (25 + i * 7)
            r = 1.5 - i * 0.3
            draw.ellipse([dot_x - r, dot_y - r, dot_x + r, dot_y + r], fill=col)


def draw_washi_tape(draw, x, y, angle_deg, color, w=65, h=16):
    """Cute washi tape strip with pattern."""
    angle = math.radians(angle_deg)
    cos_a, sin_a = math.cos(angle), math.sin(angle)
    corners = [(-w/2, -h/2), (w/2, -h/2), (w/2, h/2), (-w/2, h/2)]
    rotated = [(x + cx * cos_a - cy * sin_a, y + cx * sin_a + cy * cos_a) for cx, cy in corners]

    lighter = tuple(min(255, c + 50) for c in color)
    draw.polygon(rotated, fill=lighter)
    # Edges with slight transparency feel
    for i in range(4):
        draw.line([rotated[i], rotated[(i + 1) % 4]], fill=color, width=1)
    # Dots pattern on tape
    for i in range(5):
        t = (i + 0.5) / 5
        dot_x = x + (-w/2 + t * w) * cos_a
        dot_y = y + (-w/2 + t * w) * sin_a
        draw.ellipse([dot_x - 1.5, dot_y - 1.5, dot_x + 1.5, dot_y + 1.5], fill=color)


def draw_chibi_placeholder(img, draw, cx, cy, radius):
    """Beautiful circular placeholder with warm gradient, doodles, and singing icon."""
    # Outer glow rings
    for r in range(radius + 50, radius + 5, -1):
        t = (r - radius - 5) / 45
        alpha = int((1 - t) * 40)
        glow_col = lerp_color(SUNSET_ORANGE, CREAM, t)
        overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=glow_col + (alpha,))
        img_rgba = img.convert('RGBA')
        img_rgba = Image.alpha_composite(img_rgba, overlay)
        img = img_rgba.convert('RGB')
        draw = ImageDraw.Draw(img)

    # Main circle gradient
    for r in range(radius, 0, -1):
        t = 1 - (r / radius)
        # Warm center gradient: peach edges to creamy center
        color = lerp_color((255, 210, 185), (255, 240, 225), t ** 0.7)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)

    # Subtle radial pattern inside circle (light rays)
    for angle_deg in range(0, 360, 15):
        angle = math.radians(angle_deg)
        inner_r = radius * 0.3
        outer_r = radius * 0.85
        x1 = cx + inner_r * math.cos(angle)
        y1 = cy + inner_r * math.sin(angle)
        x2 = cx + outer_r * math.cos(angle)
        y2 = cy + outer_r * math.sin(angle)
        draw.line([(x1, y1), (x2, y2)], fill=(255, 230, 210), width=1)

    # Wobbly border ring
    ring_r = radius - 4
    for angle_deg in range(0, 360, 1):
        angle = math.radians(angle_deg)
        wobble = random.uniform(-1.5, 1.5)
        x = cx + (ring_r + wobble) * math.cos(angle)
        y = cy + (ring_r + wobble) * math.sin(angle)
        draw.ellipse([x - 1.2, y - 1.2, x + 1.2, y + 1.2], fill=DUSTY_ROSE)

    # Second inner ring (dashed feel)
    ring_r2 = radius - 10
    for angle_deg in range(0, 360, 4):
        if (angle_deg // 4) % 2 == 0:
            angle = math.radians(angle_deg)
            for da in range(3):
                a = math.radians(angle_deg + da)
                x = cx + ring_r2 * math.cos(a)
                y = cy + ring_r2 * math.sin(a)
                draw.ellipse([x - 0.8, y - 0.8, x + 0.8, y + 0.8], fill=BLUSH)

    # === Chibi-style singing character silhouette ===
    head_cy = cy - 20
    # Head (large round)
    head_r = 35
    draw.ellipse([cx - head_r, head_cy - head_r, cx + head_r, head_cy + head_r],
                 fill=LIGHT_CORAL)
    # Lighter face area
    face_r = 30
    draw.ellipse([cx - face_r, head_cy - face_r + 2, cx + face_r, head_cy + face_r + 2],
                 fill=(255, 195, 175))

    # Eyes (closed, happy singing expression - curved lines)
    for ex_offset in [-12, 12]:
        eye_cx = cx + ex_offset
        eye_cy = head_cy - 2
        # Happy closed eye (arc downward)
        draw.arc([eye_cx - 6, eye_cy - 4, eye_cx + 6, eye_cy + 6],
                 start=200, end=340, fill=WARM_BROWN, width=2)

    # Blush circles
    for bx_offset in [-20, 20]:
        bx = cx + bx_offset
        by = head_cy + 6
        draw.ellipse([bx - 6, by - 3, bx + 6, by + 3], fill=BLUSH)

    # Tiny open mouth (singing!)
    draw.ellipse([cx - 4, head_cy + 10, cx + 4, head_cy + 17], fill=SUNSET_DEEP)
    draw.ellipse([cx - 3, head_cy + 10, cx + 3, head_cy + 14], fill=(255, 140, 130))

    # Hair tufts
    for angle_deg in [-40, -20, 0, 20, 40]:
        angle = math.radians(angle_deg - 90)
        hx = cx + (head_r + 3) * math.cos(angle)
        hy = head_cy + (head_r + 3) * math.sin(angle)
        hx2 = cx + (head_r + 12) * math.cos(angle - 0.1)
        hy2 = head_cy + (head_r + 12) * math.sin(angle - 0.1)
        draw.line([(hx, hy), (hx2, hy2)], fill=WARM_BROWN, width=3)

    # Body (simple rounded shape)
    body_top = head_cy + head_r - 5
    draw.rounded_rectangle([cx - 25, body_top, cx + 25, body_top + 40],
                           radius=12, fill=SUNSET_ORANGE)
    # Collar detail
    draw.arc([cx - 12, body_top - 2, cx + 12, body_top + 12],
             start=0, end=180, fill=PEACH, width=2)

    # Arms (one raised holding mic)
    # Left arm
    draw.line([(cx - 25, body_top + 10), (cx - 40, body_top + 25)], fill=SUNSET_ORANGE, width=6)
    draw.ellipse([cx - 44, body_top + 22, cx - 36, body_top + 30], fill=(255, 195, 175))
    # Right arm (raised with mic)
    draw.line([(cx + 25, body_top + 8), (cx + 38, body_top - 10)], fill=SUNSET_ORANGE, width=6)
    draw.ellipse([cx + 34, body_top - 14, cx + 42, body_top - 6], fill=(255, 195, 175))

    # Microphone in raised hand
    mic_x = cx + 42
    mic_y = body_top - 25
    draw.rounded_rectangle([mic_x - 5, mic_y - 18, mic_x + 5, mic_y],
                           radius=5, fill=(180, 180, 190))
    draw.ellipse([mic_x - 7, mic_y - 26, mic_x + 7, mic_y - 14], fill=(160, 160, 170))
    # Mic shine
    draw.ellipse([mic_x - 3, mic_y - 24, mic_x, mic_y - 20], fill=(200, 200, 210))

    # Music notes floating from mic
    draw_music_note(draw, mic_x + 15, mic_y - 30, 5, SUNSET_RED)
    draw_music_note(draw, mic_x + 25, mic_y - 15, 4, SUNSET_ORANGE)
    draw_double_note(draw, mic_x - 20, mic_y - 40, 4, GOLDEN)

    # Floating sparkles around character
    draw_sparkle(draw, cx - 65, cy - 50, 7, GOLDEN)
    draw_sparkle(draw, cx + 70, cy - 40, 6, SUNSET_YELLOW)
    draw_sparkle(draw, cx - 55, cy + 45, 5, SOFT_GOLD)
    draw_sparkle(draw, cx + 60, cy + 50, 6, GOLDEN)

    # Tiny hearts around
    draw_heart(draw, cx - 70, cy + 15, 5, BLUSH, filled=True, rotation=0.2)
    draw_heart(draw, cx + 75, cy + 5, 4, SUNSET_RED, filled=True, rotation=-0.15)
    draw_heart(draw, cx - 50, cy - 70, 4, LAVENDER_PINK, filled=True, rotation=0.3)

    # Small stars
    draw_star(draw, cx + 55, cy - 65, 5, SOFT_GOLD)
    draw_star(draw, cx - 75, cy - 30, 4, SUNSET_YELLOW)

    return img, draw


def draw_scattered_decorations(draw):
    """Place doodle decorations across the card, avoiding main content areas."""

    items = [
        # Left margin
        ('heart', 60, 140, 10, SUNSET_RED),
        ('star', 55, 250, 8, GOLDEN),
        ('sparkle', 70, 370, 7, SUNSET_YELLOW),
        ('music', 50, 500, 7, DUSTY_ROSE),
        ('flower', 65, 630, 9, LAVENDER_PINK, GOLDEN),
        ('heart', 55, 750, 7, BLUSH),
        ('double_note', 70, 850, 5, SUNSET_ORANGE),
        ('star', 60, 960, 6, SOFT_GOLD),
        ('cloud', 55, 1010, 10, (255, 235, 225)),

        # Right margin
        ('heart', 730, 150, 9, BLUSH),
        ('music', 740, 270, 7, SUNSET_ORANGE),
        ('sparkle', 725, 400, 8, GOLDEN),
        ('flower', 735, 520, 8, SOFT_PINK, SUNSET_YELLOW),
        ('star', 740, 650, 7, SUNSET_YELLOW),
        ('heart', 720, 770, 8, SUNSET_RED),
        ('sparkle', 745, 880, 6, SOFT_GOLD),
        ('music', 730, 970, 5, DUSTY_ROSE),
        ('cloud', 725, 1020, 9, (255, 230, 220)),

        # Top area
        ('sparkle', 170, 52, 5, GOLDEN),
        ('heart', 320, 48, 5, BLUSH),
        ('star', 500, 55, 5, SUNSET_YELLOW),
        ('heart', 630, 50, 4, LIGHT_CORAL),

        # Bottom area
        ('star', 180, 1060, 5, GOLDEN),
        ('heart', 350, 1055, 5, SUNSET_RED),
        ('sparkle', 520, 1060, 5, BLUSH),
        ('music', 650, 1055, 4, DUSTY_ROSE),

        # Scattered middle
        ('sparkle', 145, 440, 6, SUNSET_YELLOW),
        ('heart', 655, 450, 5, LIGHT_CORAL),
        ('star', 165, 790, 6, GOLDEN),
        ('sparkle', 635, 790, 5, BLUSH),
        ('heart', 230, 680, 4, SUNSET_RED),
        ('heart', 570, 670, 4, BLUSH),
        ('flower', 180, 920, 6, PEACH, GOLDEN),
        ('flower', 620, 930, 7, LAVENDER_PINK, SUNSET_YELLOW),
        ('star', 250, 550, 4, SOFT_GOLD),
        ('star', 560, 540, 5, SUNSET_YELLOW),
    ]

    for item in items:
        dtype = item[0]
        x = item[1] + random.uniform(-4, 4)
        y = item[2] + random.uniform(-4, 4)
        size = item[3]
        color = item[4]

        if dtype == 'heart':
            rot = random.uniform(-0.3, 0.3)
            draw_heart(draw, x, y, size, color, filled=True, rotation=rot)
        elif dtype == 'star':
            draw_star(draw, x, y, size, color, filled=True)
        elif dtype == 'sparkle':
            draw_sparkle(draw, x, y, size, color)
        elif dtype == 'music':
            draw_music_note(draw, x, y, size, color)
        elif dtype == 'double_note':
            draw_double_note(draw, x, y, size, color)
        elif dtype == 'flower':
            center_col = item[5]
            draw_flower(draw, x, y, size, color, center_col)
        elif dtype == 'cloud':
            draw_cloud(draw, x, y, size, color)


def draw_wavy_line(draw, x1, y1, x2, y2, color, width=1, amp=3, freq=0.08):
    dist = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    steps = max(int(dist), 30)
    angle = math.atan2(y2 - y1, x2 - x1)
    perp = angle + math.pi / 2
    pts = []
    for i in range(steps + 1):
        t = i / steps
        bx = x1 + (x2 - x1) * t
        by = y1 + (y2 - y1) * t
        wave = math.sin(i * freq * 15) * amp
        pts.append((bx + wave * math.cos(perp), by + wave * math.sin(perp)))
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i + 1]], fill=color, width=width)


def draw_divider(draw, y, span=280):
    cx = WIDTH // 2
    x1, x2 = cx - span // 2, cx + span // 2
    draw_wavy_line(draw, x1, y, x2, y, DUSTY_ROSE, width=1, amp=2.5)
    # Center ornament
    draw.ellipse([cx - 4, y - 4, cx + 4, y + 4], fill=SUNSET_ORANGE)
    draw.ellipse([cx - 2, y - 2, cx + 2, y + 2], fill=PALE_YELLOW)
    # Side dots
    for offset in [-25, -50, -80, 25, 50, 80]:
        r = max(0.8, 2.5 - abs(offset) * 0.02)
        col = BLUSH if abs(offset) < 60 else PEACH
        draw.ellipse([cx + offset - r, y - r, cx + offset + r, y + r], fill=col)
    # Tiny hearts at ends
    draw_heart(draw, x1 - 5, y, 3, BLUSH, filled=True, rotation=0.2)
    draw_heart(draw, x2 + 5, y, 3, BLUSH, filled=True, rotation=-0.2)


def draw_banner_ribbon(draw, cx, y, text, font, text_color, ribbon_color, pad_x=25, pad_y=8):
    """Draw text on a cute ribbon/banner shape."""
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    rx1 = cx - tw // 2 - pad_x
    ry1 = y - pad_y
    rx2 = cx + tw // 2 + pad_x
    ry2 = y + th + pad_y

    # Ribbon tails
    tail_w = 14
    tail_h = (ry2 - ry1)
    # Left tail
    left_pts = [(rx1, ry1), (rx1 - tail_w, ry1 + tail_h * 0.2),
                (rx1 - tail_w + 5, ry1 + tail_h * 0.5),
                (rx1 - tail_w, ry1 + tail_h * 0.8), (rx1, ry2)]
    draw.polygon(left_pts, fill=ribbon_color)
    # Right tail
    right_pts = [(rx2, ry1), (rx2 + tail_w, ry1 + tail_h * 0.2),
                 (rx2 + tail_w - 5, ry1 + tail_h * 0.5),
                 (rx2 + tail_w, ry1 + tail_h * 0.8), (rx2, ry2)]
    draw.polygon(right_pts, fill=ribbon_color)

    # Main ribbon body
    draw.rounded_rectangle([rx1, ry1, rx2, ry2], radius=8, fill=ribbon_color)

    # Highlight stripe
    highlight = tuple(min(255, c + 30) for c in ribbon_color)
    draw.rounded_rectangle([rx1 + 3, ry1 + 2, rx2 - 3, ry1 + 5], radius=2, fill=highlight)

    # Text
    tx = cx - tw // 2
    ty = y
    draw.text((tx, ty), text, font=font, fill=text_color)


def create_card():
    print("Creating OHYUL fan art card v2...")

    img = Image.new('RGB', (WIDTH, HEIGHT), WARM_WHITE)

    # 1. Gradient background
    print("  Gradient background...")
    img = draw_gradient_bg(img)

    # 2. Radial glows for depth
    print("  Radial glows...")
    img = radial_glow(img, WIDTH // 2, 330, 320, SUNSET_YELLOW, 0.10)
    img = radial_glow(img, WIDTH // 2, 620, 200, BLUSH, 0.07)
    img = radial_glow(img, WIDTH // 2, 900, 250, SUNSET_ORANGE, 0.06)
    img = radial_glow(img, 120, 150, 150, LAVENDER_PINK, 0.04)
    img = radial_glow(img, 680, 150, 150, PALE_YELLOW, 0.04)

    draw = ImageDraw.Draw(img)
    fonts = load_fonts()

    # 3. Wobbly border
    print("  Wobbly border...")
    draw_wobbly_border(draw, margin=30, color=DUSTY_ROSE, width=2)
    draw_corner_flourishes(draw, margin=30)

    # 4. Header "LNGSHOT" in ribbon
    print("  Header...")
    draw_banner_ribbon(draw, WIDTH // 2, 53, "L N G S H O T", fonts['header'],
                       WARM_WHITE, SUNSET_DEEP, pad_x=28, pad_y=7)

    # 5. Washi tape strips
    draw_washi_tape(draw, WIDTH // 2 - 110, 180, -12, BLUSH)
    draw_washi_tape(draw, WIDTH // 2 + 110, 183, 10, PEACH)

    # 6. Chibi placeholder
    print("  Chibi placeholder...")
    circle_cx, circle_cy, circle_r = WIDTH // 2, 340, 145
    img, draw = draw_chibi_placeholder(img, draw, circle_cx, circle_cy, circle_r)

    # 7. Divider after circle
    draw_divider(draw, 530, span=320)

    # 8. "OHYUL" name - big handwritten with rich styling
    print("  Name text...")
    name_text = "OHYUL"
    bbox = draw.textbbox((0, 0), name_text, font=fonts['name_large'])
    name_tw = bbox[2] - bbox[0]
    name_x = (WIDTH - name_tw) // 2
    name_y = 555

    # Glow behind name
    img = radial_glow(img, WIDTH // 2, name_y + 35, 200, SUNSET_YELLOW, 0.18)
    draw = ImageDraw.Draw(img)

    # Multi-layer text effect
    # Deep shadow
    draw.text((name_x + 3, name_y + 3), name_text, font=fonts['name_large'], fill=(180, 80, 60))
    # Outline
    for ox, oy in [(-2, 0), (2, 0), (0, -2), (0, 2), (-1, -1), (1, -1), (-1, 1), (1, 1)]:
        draw.text((name_x + ox, name_y + oy), name_text, font=fonts['name_large'], fill=(210, 90, 70))
    # Main fill
    draw.text((name_x, name_y), name_text, font=fonts['name_large'], fill=SUNSET_RED)
    # Highlight
    draw.text((name_x - 1, name_y - 1), name_text, font=fonts['name_large'], fill=(255, 145, 135))

    # Sparkle accents near name
    draw_sparkle(draw, name_x - 20, name_y + 20, 8, GOLDEN, thick=True)
    draw_sparkle(draw, name_x + name_tw + 20, name_y + 25, 7, SUNSET_YELLOW, thick=True)
    draw_star(draw, name_x - 10, name_y + 50, 5, SOFT_GOLD)
    draw_star(draw, name_x + name_tw + 10, name_y + 50, 4, SUNSET_YELLOW)

    # 9. Role subtitle in pill
    print("  Subtitle...")
    subtitle_text = "Leader  ·  Lead Vocal"
    bbox = draw.textbbox((0, 0), subtitle_text, font=fonts['subtitle'])
    sub_tw = bbox[2] - bbox[0]
    sub_x = (WIDTH - sub_tw) // 2
    sub_y = 660

    # Pill background
    draw.rounded_rectangle(
        [sub_x - 22, sub_y - 7, sub_x + sub_tw + 22, sub_y + 30],
        radius=16, fill=(255, 220, 200)
    )
    # Pill border
    draw.rounded_rectangle(
        [sub_x - 22, sub_y - 7, sub_x + sub_tw + 22, sub_y + 30],
        radius=16, outline=BLUSH, width=1
    )
    draw.text((sub_x, sub_y), subtitle_text, font=fonts['subtitle'], fill=WARM_BROWN)

    # 10. Divider
    draw_divider(draw, 720, span=260)

    # 11. Fan quote
    print("  Fan quote...")
    # Large decorative opening quote mark
    draw.text((WIDTH // 2 - 140, 730), "\u201c", font=fonts['quote_big'], fill=(255, 200, 190))

    quote_text = "his voice is so warm"
    bbox = draw.textbbox((0, 0), quote_text, font=fonts['quote'])
    qt_tw = bbox[2] - bbox[0]
    qt_x = (WIDTH - qt_tw) // 2
    qt_y = 755

    # Shadow
    draw.text((qt_x + 1, qt_y + 1), quote_text, font=fonts['quote'], fill=(235, 185, 175))
    # Main text
    draw.text((qt_x, qt_y), quote_text, font=fonts['quote'], fill=DUSTY_ROSE)

    # Closing quote mark
    draw.text((WIDTH // 2 + 105, 755), "\u201d", font=fonts['quote_big'], fill=(255, 200, 190))

    # 12. Vibe text with sparkles
    vibe_text = "warm & comforting"
    bbox = draw.textbbox((0, 0), vibe_text, font=fonts['sparkle_text'])
    vt_tw = bbox[2] - bbox[0]
    vt_x = (WIDTH - vt_tw) // 2
    vt_y = 810
    draw_sparkle(draw, vt_x - 18, vt_y + 8, 5, GOLDEN)
    draw.text((vt_x, vt_y), vibe_text, font=fonts['sparkle_text'], fill=SUNSET_ORANGE)
    draw_sparkle(draw, vt_x + vt_tw + 18, vt_y + 8, 5, GOLDEN)

    # 13. Decorative bottom panel
    print("  Decorative panel...")
    panel_y = 860
    panel_h = 130
    panel_mx = 70

    # Panel background
    draw.rounded_rectangle(
        [panel_mx, panel_y, WIDTH - panel_mx, panel_y + panel_h],
        radius=18, fill=(255, 238, 225)
    )
    # Panel wobbly border
    for i in range(150):
        t = i / 150
        if t < 0.25:
            lt = t / 0.25
            x = panel_mx + lt * (WIDTH - 2 * panel_mx)
            y = panel_y
        elif t < 0.5:
            lt = (t - 0.25) / 0.25
            x = WIDTH - panel_mx
            y = panel_y + lt * panel_h
        elif t < 0.75:
            lt = (t - 0.5) / 0.25
            x = WIDTH - panel_mx - lt * (WIDTH - 2 * panel_mx)
            y = panel_y + panel_h
        else:
            lt = (t - 0.75) / 0.25
            x = panel_mx
            y = panel_y + panel_h - lt * panel_h
        wx = x + random.uniform(-1, 1)
        wy = y + random.uniform(-1, 1)
        draw.ellipse([wx - 1, wy - 1, wx + 1, wy + 1], fill=DUSTY_ROSE)

    # Hearts row
    hy = panel_y + 18
    for i in range(9):
        hx = panel_mx + 45 + i * 75
        color = [SUNSET_RED, BLUSH, SUNSET_ORANGE, LAVENDER_PINK, BLUSH,
                 SUNSET_RED, PEACH, LIGHT_CORAL, BLUSH][i]
        size = 5 + random.uniform(-0.5, 1.5)
        rot = random.uniform(-0.2, 0.2)
        draw_heart(draw, hx, hy, size, color, filled=True, rotation=rot)

    # "fan card" label
    label = "~ fan card ~"
    bbox = draw.textbbox((0, 0), label, font=fonts['deco_text'])
    lw = bbox[2] - bbox[0]
    draw.text(((WIDTH - lw) // 2, panel_y + 42), label, font=fonts['deco_text'], fill=DUSTY_ROSE)

    # Stars row
    sy = panel_y + 75
    for i in range(11):
        sx = panel_mx + 35 + i * 60
        s = 4 + random.uniform(-0.5, 1.5)
        c = random.choice([GOLDEN, SUNSET_YELLOW, SOFT_GOLD, SUNSET_ORANGE])
        draw_star(draw, sx, sy, s, c)

    # Dots row
    dy = panel_y + 105
    for i in range(25):
        dx = panel_mx + 20 + i * 27
        r = random.uniform(1, 2.5)
        c = random.choice([BLUSH, PEACH, LIGHT_CORAL, SUNSET_ORANGE, LAVENDER_PINK])
        draw.ellipse([dx - r, dy - r, dx + r, dy + r], fill=c)

    # 14. Scattered decorations
    print("  Scattered doodles...")
    draw_scattered_decorations(draw)

    # 15. Footer
    print("  Footer...")
    footer_y = HEIGHT - 55
    ft = "made with"
    bbox = draw.textbbox((0, 0), ft, font=fonts['footer'])
    ftw = bbox[2] - bbox[0]
    fx = (WIDTH - ftw - 18) // 2
    draw.text((fx, footer_y), ft, font=fonts['footer'], fill=DUSTY_ROSE)
    draw_heart(draw, fx + ftw + 10, footer_y + 7, 5, SUNSET_RED, filled=True)

    tiny = "for ohyul, with warmth"
    bbox = draw.textbbox((0, 0), tiny, font=fonts['tiny'])
    tw = bbox[2] - bbox[0]
    draw.text(((WIDTH - tw) // 2, footer_y + 20), tiny, font=fonts['tiny'], fill=(215, 165, 155))

    # 16. Floating particles
    print("  Final particles...")
    for _ in range(50):
        px = random.randint(45, WIDTH - 45)
        py = random.randint(45, HEIGHT - 45)
        pr = random.uniform(0.3, 1.8)
        c = random.choice([
            (255, 225, 205), (255, 210, 195), (255, 235, 215),
            (255, 215, 200), (255, 195, 180), (255, 230, 220)
        ])
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=c)

    # 17. Soft vignette
    print("  Vignette...")
    vig = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vig)
    max_d = math.sqrt((WIDTH / 2) ** 2 + (HEIGHT / 2) ** 2)
    for ring in range(int(max_d), int(max_d * 0.55), -4):
        t = (ring - max_d * 0.55) / (max_d * 0.45)
        alpha = int((1 - t) * 20)
        vd.ellipse([WIDTH // 2 - ring, HEIGHT // 2 - ring,
                     WIDTH // 2 + ring, HEIGHT // 2 + ring],
                    fill=(80, 40, 30, alpha))
    img_rgba = img.convert('RGBA')
    img_rgba = Image.alpha_composite(img_rgba, vig)
    img = img_rgba.convert('RGB')

    # 18. Final color grading
    r, g, b = img.split()
    r = r.point(lambda x: min(255, int(x * 1.01)))
    img = Image.merge('RGB', (r, g, b))

    # Slight softness
    soft = img.filter(ImageFilter.GaussianBlur(radius=0.4))
    img = Image.blend(img, soft, 0.2)

    # Slight saturation boost
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.05)

    print(f"  Saving to {OUTPUT}...")
    img.save(OUTPUT, 'PNG')
    print(f"  Done! {WIDTH}x{HEIGHT} fan art card saved.")


if __name__ == '__main__':
    create_card()
