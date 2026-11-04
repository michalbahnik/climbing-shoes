# Climbing Shoe Finder

Static page for filtering and comparing climbing shoes. Open `index.html` locally or via GitHub Pages.

Data lives in `data/<brand>.json`: every value comes from the manufacturer's own website, with a verbatim quote and source URL; `null` means the manufacturer does not state it. `shoes.js` is generated from those files with `uv run scripts/build.py`, which also validates them.
