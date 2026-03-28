# TRACE

TRACE stands for `Tonal Response Analysis and Correction Engine`.

TRACE is a static browser app for two related workflows:

- `Car Tuning`: import or choose a measured response, build a car-friendly target curve, and turn the delta into a constrained EQ suggestion.
- `Player Match`: approximate how player `A` should be EQ'd to move closer to player `B` on the same headphone or speaker chain.

Project roadmap:

- [ROADMAP.md](D:\Code\audio-app-1\ROADMAP.md)

## What this app does

- Runs fully client-side with no server dependency
- Runs a browser-side live stepped sweep measurement with microphone capture and relative response extraction
- Accepts simple CSV response curves: `frequency,db`
- Generates a 10-band graphic EQ and a shorter hybrid summary
- Generates a constrained parametric EQ export with generic filter text and JSON
- Supports multiple export views, including generic parametric text, Equalizer APO text, and 10-band summaries
- Lets you preview the current correction on a local audio file through the Web Audio API
- Stores named presets in browser local storage and restores the last session automatically
- Downloads and imports preset files as JSON
- Creates shareable URLs that encode the current state, including uploaded curve data
- Ships as plain static files, so it can be hosted directly on Cloudflare Pages

## Local use

Open [index.html](./index.html) in a browser, or serve the folder with any static server.

Expected CSV format:

```csv
20,-6.8
31,-3.4
40,-1.1
62,0.9
125,1.2
250,0.4
500,0.1
1000,0
2000,-0.6
4000,-1.5
8000,-2.6
16000,-4.8
```

## Cloudflare Pages

1. Create a Git repo from this folder.
2. Push it to GitHub or GitLab.
3. In Cloudflare Pages, create a new project from that repo.
4. Use these settings:
   - Framework preset: `None`
   - Build command: leave empty
   - Build output directory: `/`
5. Deploy.

Because there is no build step, the repository root is already the published site.

## Product direction

The app still intentionally avoids pretending that it can discover a perfect target automatically.

- Car targets are parameterized house curves with practical biases for cabin type, seat focus, and road noise.
- Player matching treats the problem as a response-delta fit and exposes a few reference signatures for quick exploration.
- Live measurement currently produces a practical relative curve for broad EQ work. It is not yet a full impulse-response or room-correction workflow.

Next logical steps:

1. Add stronger solver controls and better verification for the constrained parametric fitter.
2. Add offline sweep import and decoded recording analysis in addition to live capture.
3. Add separate left/right guided measurement sessions plus delay and level alignment.
4. Optionally add a worker or API layer for more advanced fitting and preset search.
