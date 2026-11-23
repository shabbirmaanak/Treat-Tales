"""Text-to-CAD: generate 3D tiles for the 28 Arabic huruf.

Each tile = rounded base plate + the letter (Amiri Bold) extruded on top,
so dots (nuqat) stay attached and the tile prints flat with no supports.
Outputs one STEP + one STL per letter, plus an all-letters STEP sheet.

Usage: python make_huruf.py --font Amiri-Bold.ttf [--out out]
"""
import argparse, pathlib
from build123d import *

HURUF = [
    ("01_alif", "ا"), ("02_ba", "ب"), ("03_ta", "ت"), ("04_tha", "ث"),
    ("05_jim", "ج"), ("06_ha", "ح"), ("07_kha", "خ"), ("08_dal", "د"),
    ("09_dhal", "ذ"), ("10_ra", "ر"), ("11_zay", "ز"), ("12_sin", "س"),
    ("13_shin", "ش"), ("14_sad", "ص"), ("15_dad", "ض"), ("16_tta", "ط"),
    ("17_zza", "ظ"), ("18_ayn", "ع"), ("19_ghayn", "غ"), ("20_fa", "ف"),
    ("21_qaf", "ق"), ("22_kaf", "ك"), ("23_lam", "ل"), ("24_mim", "م"),
    ("25_nun", "ن"), ("26_ha2", "ه"), ("27_waw", "و"), ("28_ya", "ي"),
]

TILE = 50.0      # mm, square tile
BASE_H = 3.0     # mm, plate thickness
LETTER_H = 4.0   # mm, letter relief height
MARGIN = 6.0     # mm, clear border around the letter
CORNER = 4.0     # mm, tile corner radius


def letter_tile(ch: str, font: str) -> Part:
    # Letter outline, then scale so its larger side fits inside the margin.
    sk = Text(ch, font_size=40, font_path=font)
    bb = sk.bounding_box()
    scale_f = (TILE - 2 * MARGIN) / max(bb.size.X, bb.size.Y)
    sk = scale(sk, scale_f)
    bb = sk.bounding_box()
    sk = Pos(-bb.center().X, -bb.center().Y) * sk   # centre on tile

    with BuildPart() as p:
        with BuildSketch():
            RectangleRounded(TILE, TILE, CORNER)
        extrude(amount=BASE_H)
        with BuildSketch(Plane.XY.offset(BASE_H)):
            add(sk)
        extrude(amount=LETTER_H)
    return p.part


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--font", required=True)
    ap.add_argument("--out", default="out")
    a = ap.parse_args()
    out = pathlib.Path(a.out); (out / "step").mkdir(parents=True, exist_ok=True)
    (out / "stl").mkdir(exist_ok=True)

    sheet, gap = [], TILE + 5
    for i, (name, ch) in enumerate(HURUF):
        part = letter_tile(ch, a.font)
        export_step(part, str(out / "step" / f"{name}.step"))
        export_stl(part, str(out / "stl" / f"{name}.stl"))
        # sheet laid out right-to-left, 7 per row
        row, col = divmod(i, 7)
        sheet.append(Pos((6 - col) * gap, -row * gap) * part)
        print("ok", name, ch)
    export_step(Compound(sheet), str(out / "huruf_all.step"))


if __name__ == "__main__":
    main()
