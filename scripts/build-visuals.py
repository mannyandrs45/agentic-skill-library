"""Generate outlined SVG artwork from the catalog and the portfolio reference.

Requires fontTools (pip install fonttools). PNG rendering is a separate Node step.
No browser, remote fonts, or live services are used during rendering.
"""
import base64
import json
from collections import Counter
from html import escape
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
CATALOG = json.loads((ROOT / "registry/catalog.json").read_text())
COUNTS = Counter(skill["collection"] for skill in CATALOG["skills"])
TOTAL = CATALOG["count"]
PERSONAL = COUNTS["perplexity-user"]
DOMAINS = len({skill["domain"] for skill in CATALOG["skills"]})
RECIPES = (ROOT / "docs/WORKFLOWS.md").read_text().count("\n## ")
ADDED = len(json.loads((ROOT / "registry/personal-snapshots.json").read_text())["skills"])
BG, SURFACE, WHITE, MUTED, LINE = "#1b1b1b", "#262626", "#ffffff", "#9e9e9e", "#3b3b3b"
OFFICE = base64.b64encode((ASSETS / "agentcraft-office.png").read_bytes()).decode()
FONTS = {}
for weight in (400, 600, 700):
    font = instantiateVariableFont(TTFont(ASSETS / "fonts/Figtree.ttf"), {"wght": weight})
    FONTS[weight] = (font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm)


def text(value, x, y, size=24, color=WHITE, weight=400, tracking=0):
    """Outline Figtree so GitHub and local rasterizers cannot substitute fonts."""
    glyphs, cmap, units = FONTS[weight]
    cursor = 0
    pieces = []
    for char in str(value):
        name = cmap.get(ord(char), ".notdef")
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        pieces.append(f'<path transform="translate({cursor:.3f} 0)" d="{pen.getCommands()}"/>')
        cursor += glyphs[name].width + tracking * units / size
    return (f'<g aria-label="{escape(str(value), quote=True)}" fill="{color}" '
            f'transform="translate({x} {y}) scale({size / units} {-size / units})">'
            + "".join(pieces) + "</g>")


def rule(x1, y, x2, color=LINE):
    return f'<path d="M{x1} {y}H{x2}" fill="none" stroke="{color}"/>'


def rect(x, y, width, height, color, radius=0):
    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="{radius}" fill="{color}"/>'


def save(name, width, height, title, description, content):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
           f'viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">'
           f'<title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>'
           + rect(0, 0, width, height, BG) + content + "</svg>\n")
    (ASSETS / f"{name}.svg").write_text(svg)


def office(x, y, width, height):
    # Soft edges blend the existing artwork into the charcoal page, not a new card.
    return (f'<defs><radialGradient id="edge"><stop offset=".65" stop-color="white"/>'
            '<stop offset="1" stop-color="black"/></radialGradient>'
            f'<mask id="blend"><rect x="{x}" y="{y}" width="{width}" height="{height}" fill="url(#edge)"/></mask></defs>'
            f'<image x="{x}" y="{y}" width="{width}" height="{height}" href="data:image/png;base64,{OFFICE}" mask="url(#blend)"/>')


def hero(mobile=False):
    width, height = (800, 1080) if mobile else (1440, 650)
    x = 48 if mobile else 64
    content = text("MANNY RODRIGUEZ-LAPIDO", x, 64, 17, MUTED, 600, 1.6)
    content += rule(x, 88, width-x)
    if mobile:
        content += text("Agentic", x, 208, 100, WHITE, 700, -2.5)
        content += text("Skill Library.", x, 308, 100, WHITE, 700, -2.5)
        content += text("Workflows, without the busywork.", x, 370, 32, MUTED)
        content += office(100, 390, 600, 450)
        y, step = 944, 184
    else:
        content += text("PERSONAL + COMMUNITY", x, 152, 17, MUTED, 600, 1.6)
        content += text("Agentic", x-3, 270, 114, WHITE, 700, -3)
        content += text("Skill Library.", x-3, 382, 114, WHITE, 700, -3)
        content += text("Workflows, without the busywork.", x, 448, 30, MUTED)
        content += office(778, 96, 600, 450)
        y, step = 566, 340
    content += rule(x, y-42, width-x)
    for index, (value, label) in enumerate([
        (TOTAL, "skills"), (PERSONAL, "personal"), (len(COUNTS), "collections"), (RECIPES, "workflows"),
    ]):
        left = x + index * step
        content += text(value, left, y+12, 44, WHITE, 600)
        content += text(label, left, y+47, 19, MUTED)
    save("hero-mobile" if mobile else "hero", width, height,
         "Agentic Skill Library",
         f"{TOTAL} skills, {PERSONAL} Personal skills, {len(COUNTS)} collections and {RECIPES} workflow recipes. "
         "Charcoal Astryx styling with the portfolio's monochrome voxel office.", content)


def collection_mix(mobile=False):
    width, height, x = (800, 890, 48) if mobile else (1440, 670, 64)
    content = text("THE COLLECTIONS", x, 62, 17, MUTED, 600, 1.6)
    content += text("One library. Four sources.", x, 126, 42 if mobile else 52, WHITE, 600, -1)
    content += text(f"{TOTAL} skills. All {ADDED} additions live in Personal.", x, 171, 23, MUTED)
    rows = [("gstack", "gstack"), ("HyperFrames", "hyperframes"),
            ("Personal", "perplexity-user"), ("no-ai-slop", "no-ai-slop")]
    content += rule(x, 202, width-x)
    for index, (label, key) in enumerate(rows):
        y = 258 + index * (143 if mobile else 93)
        count = COUNTS[key]
        highlight = key == "perplexity-user"
        color = WHITE if highlight else MUTED
        content += text(label, x, y, 30, color, 600 if highlight else 400)
        if mobile:
            left, top, full = x, y+25, width-2*x-100
            content += text(f"{count:02d}", width-x-62, y+3, 34, color, 600)
        else:
            left, top, full = 394, y-19, 828
            content += text(f"{count:02d}", 1276, y+2, 34, color, 600)
        content += rect(left, top, full, 18, SURFACE, 3)
        content += rect(left, top, full * count / 60, 18, color, 3)
        if highlight:
            content += text("User-owned / skills/personal/", x if mobile else left,
                            y+78 if mobile else y+36, 19, MUTED)
    content += rule(x, height-77, width-x)
    content += text("Bar lengths use a shared 0–60 skill scale.", x, height-34, 20, MUTED)
    save("collection-mix-mobile" if mobile else "collection-mix", width, height,
         "Skills by collection",
         f"gstack {COUNTS['gstack']}; HyperFrames {COUNTS['hyperframes']}; "
         f"Personal {PERSONAL}; no-ai-slop {COUNTS['no-ai-slop']}. Shared linear count scale; Personal highlighted.",
         content)


def architecture(mobile=False):
    width, height, x = (800, 1030, 48) if mobile else (1440, 720, 64)
    content = text("HOW IT FITS TOGETHER", x, 62, 17, MUTED, 600, 1.6)
    content += text("Find. Run. Keep it honest.", x, 126, 44 if mobile else 52, WHITE, 600, -1)
    content += text("One skill tree. One generated index.", x, 171, 23, MUTED)
    rows = [
        ("01", "Find a skill.", "CATALOG.md", "registry/catalog.json", f"{TOTAL} skills / {DOMAINS} task domains"),
        ("02", "Run the workflow.", "skills/personal/", "skills/community/", f"{PERSONAL} Personal / {TOTAL-PERSONAL} community"),
        ("03", "Verify the source.", "registry/", "scripts/ + tests/", "Provenance / integrity / approval gates"),
    ]
    for index, (number, title, file_a, file_b, note) in enumerate(rows):
        y = 234 + index * (250 if mobile else 151)
        content += rule(x, y-24, width-x)
        content += text(number, x, y+17, 20, MUTED, 600)
        content += text(title, x+63, y+22, 34, WHITE, 600, -.6)
        if mobile:
            content += text(file_a, x+63, y+81, 26)
            content += text(file_b, x+63, y+121, 26, MUTED)
            content += text(note, x+63, y+168, 22, MUTED)
        else:
            content += text(note, x+63, y+66, 22, MUTED)
            content += text(file_a, 870, y+17, 26)
            content += text(file_b, 870, y+61, 24, MUTED)
    save("architecture-mobile" if mobile else "architecture", width, height,
         "Discover, execute and verify",
         f"Find {TOTAL} workflows in the generated catalog; run skills from Personal or community; "
         "verify provenance and integrity with registry, scripts and tests. This is a repository flow, not a runtime service.",
         content)


for mobile in (False, True):
    hero(mobile)
    collection_mix(mobile)
    architecture(mobile)

(ASSETS / "visuals-manifest.json").write_text(json.dumps({
    "catalogCount": TOTAL,
    "personalCount": PERSONAL,
    "collectionCounts": dict(sorted(COUNTS.items())),
    "domainCount": DOMAINS,
    "workflowCount": RECIPES,
    "palette": {"background": BG, "surface": SURFACE, "foreground": WHITE, "muted": MUTED, "border": LINE},
    "font": "Figtree",
    "reference": "manny-portfolio@38ddf7b",
    "artwork": "Same monochrome voxel office used on the portfolio",
}, indent=2) + "\n")
print("Generated six outlined SVG assets and current catalog metadata.")
