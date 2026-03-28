# Roadmap

This roadmap keeps the product direction aligned with the current implementation reality:

- `Now`: practical EQ fitting and sharing
- `Next`: stronger export and parametric fitting
- `Later`: measurement-driven matching and room correction

## Product framing

TRACE (`Tonal Response Analysis and Correction Engine`) is currently an:

- `EQ recommendation / fitting tool`

It is not yet a full:

- `single-mic room correction engine`
- `impulse-response measurement suite`
- `FIR convolution correction system`

## v0.2

Status: shipped in the current workspace

Included:

- Unified `Car Tuning` and `Player Match` flows
- Target curve generation
- 10-band EQ output
- Constrained parametric EQ export
- Local audio preview in the browser
- Preset persistence with `localStorage`
- Share links with encoded state

Files:

- [index.html](D:\Code\audio-app-1\index.html)
- [styles.css](D:\Code\audio-app-1\styles.css)
- [app.js](D:\Code\audio-app-1\app.js)

## v0.3

Goal: make the output easier to trust and easier to carry into real playback systems

Planned work:

1. Replace the heuristic parametric projection with a real constrained parametric fitter for `Fc`, `Gain`, and `Q`.
   Current status: implemented in the current workspace as a browser-side constrained search.
2. Add preset file import/export so settings are not trapped in one browser.
   Current status: implemented in the current workspace as browser-side JSON download/import.
3. Add target export formats for common workflows such as generic biquad text, Equalizer APO text, and car-EQ-friendly summaries.
   Current status: partially implemented with generic parametric text, Equalizer APO text, and 10-band summary output.
4. Add stronger solver controls such as `max boost`, `max Q`, `prefer cuts`, and `limit correction range`.
5. Improve result verification views so users can compare measured, target, and corrected responses more clearly.

## v0.4

Goal: move from manual response import to measurement-assisted workflows

Planned work:

1. Generate a browser-side live stepped sweep and estimate a relative response curve.
   Current status: implemented in the current workspace with microphone capture, sync-pulse alignment, and CSV export.
2. Import recorded sweep captures and estimate response curves offline in the browser.
3. Support separate left and right speaker measurements for same-room matching.
4. Add delay and level alignment suggestions before EQ fitting.
5. Add multi-position input sets such as single-point, 3-point, and 9-point averaging.

## v0.5

Goal: support the first true single-microphone dual-speaker matching workflow

Planned work:

1. Add a guided measurement session flow for `Left`, `Right`, and optional extra positions.
2. Support two optimization modes:
   - `Match one speaker to the other`
   - `Match both speakers to a shared target`
3. Add stronger regularization rules:
   - avoid narrow null chasing
   - reduce aggressive treble boosts
   - cap unstable low-frequency inversion
4. Add verification metrics by band so users can quantify improvement.

## v0.6+

Goal: evolve into a lightweight correction platform without over-promising laboratory-grade control

Possible directions:

1. FIR export and convolution-ready output.
2. Minimum-phase-aware correction options.
3. Measurement session history and comparison.
4. Separate product tracks:
   - `Car`: target-driven tuning
   - `Home`: measurement-driven matching and correction

## Decision rules

These rules should guide implementation choices:

1. Prefer robust, broad corrections over mathematically aggressive inversion.
2. Avoid chasing narrow dips, especially in the upper bands.
3. Keep the current product honest about what it measures versus what it estimates.
4. Add measurement capability only when the result is stable enough to improve user trust.
