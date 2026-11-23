# Huruf CAD — 3D tiles of the 28 Arabic letters

Text-to-CAD pipeline: each letter's glyph outline (Amiri Bold) is extruded with
build123d (OpenCascade) onto a rounded tile, giving real B-rep solids.

| Setting | Value |
|---|---|
| Tile | 50 × 50 mm, 4 mm corner radius |
| Base plate | 3 mm thick |
| Letter relief | 4 mm (total height 7 mm) |
| Letter fit | 38 mm max (6 mm margin) |

Output
- `out/step/NN_name.step` — editable CAD (Fusion, FreeCAD, SolidWorks, Onshape)
- `out/stl/NN_name.stl` — ready to slice and 3D-print (flat, no supports)
- `out/huruf_all.step` — all 28 tiles on one sheet, 7 per row, right-to-left
- `preview.png` — render of every tile

Regenerate (change the constants at the top of the script to resize):

    pip install build123d fonttools brotli
    python make_huruf.py --font Amiri-Bold.ttf --out out

Font: Amiri by Khaled Hosny, SIL Open Font License 1.1.
