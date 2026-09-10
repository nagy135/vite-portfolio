# Viktor Nagy’s portfolio

A React + TypeScript portfolio built with Vite and Tailwind CSS v4. The main page presents projects, experience, background, and contact details, with an interactive 3D logo and a switchable portal gun.

## Development

```sh
npm ci
npm run dev
```

`npm run build` type-checks and creates the production site in `dist/`.
`npm run preview` serves that build locally.
`npm run lint` checks the frontend and chat server source.
There is no automated test suite.

## Content and design

- `src/data/`: project descriptions, recordings, work history, education, languages, and skills.
- `src/components/portfolio/`: the main portfolio and separately loaded 3D scene.
- `src/index.css`: Tailwind integration and light/dark design tokens.
- `src/App.css`: responsive layouts and print styles.
- `DESIGN.md`: design direction, token choices, and rationale.

Project videos load when a visitor presses **Watch demo**. Preview images are still frames from the existing recordings. The playground loads only when opened. The default 3D model extrudes the two original logo silhouettes into beveled blocks. A button loads the portal gun using Three.js's TDS loader and local color and normal textures. Asset provenance is recorded in `public/models/portalgun/SOURCE.md`.

Both models rotate gently when visible and use damped orbit controls for drag inertia. A pause button stops the idle spin; reduced motion disables automatic rotation and damping. Rendering returns to demand mode while paused, offscreen, or in a hidden tab.

Theme selection is stored under `vite-ui-theme`. The moving background stars can be paused, stop when the page is hidden, and respect reduced motion. The site also supports the system theme preference, keyboard controls, and a printable résumé that includes the full employment history.

## Optional chat demo

The standalone NestJS chat service lives in `server/`. Set `VITE_CHAT_URL` in a local `.env.local` file to connect the frontend to a deployed chat service. Local development defaults to `http://localhost:3001`; without a configured production URL, the playground shows that chat is unavailable. External playgrounds depend on their own hosted services.

## Verification

Build and lint are the baseline checks. For UI changes, verify desktop and mobile layouts in both themes, project filters, video playback, screenshot switching, experience disclosure, keyboard navigation, and printing. The Three.js dependency is deliberately split away from the main application; Vite may still report its large rendering chunk.
