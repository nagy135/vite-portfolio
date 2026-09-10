# Portfolio design direction

The audience is a potential collaborator or employer. Introduce Viktor, show real working software, and make experience and contact details easy to find.

## Tokens

- Porcelain `#F5F7FA`: page background.
- Ink `#182B3A`: text and strong controls.
- Slate `#566779`: secondary text.
- Workshop blue `#315DCB`: links and focus indicators.
- Sky `#DCE8F7`: the robot's stage.
- Brass `#B78336`: the existing robot's material.
- Trebuchet MS: display and headings, chosen for its open, distinctive shapes. System sans-serif: body and controls. No font network requests.
- Content width: 1200px. Body: 16–18px, 1.65 line-height, at most 68 characters per line. Headings follow a roughly 1.33 scale, with the name as the focal typographic gesture.

## Layout

A left-aligned introduction pairs with a single playful 3D object; real screenshots lead into a quiet, readable résumé.

```text
Name / home               Work  Experience  About   Theme
--------------------------------------------------------
Full-stack developer         [                         ]
Viktor Nagy.                 [   Interactive robot     ]
Introduction + actions       [   on a blue stage       ]
--------------------------------------------------------
Selected work                          Project filters
[ Product preview ]          [ Product preview ]
Title, purpose, technologies  Title, purpose, technologies

Experience       Current work + expandable responsibilities
                 Earlier work
About            Personal context + grouped toolkit
                 Education + languages
Contact          Email, phone, GitHub, LinkedIn
```

## Review and principles

The initial direction included floating technology badges and numerical career highlights. Removed both: they compete with the robot and could belong to any developer template. The existing robot, product recordings, mechanical interests, and hands-on infrastructure work ground the workshop concept in Viktor's actual content.

Viktor prefers direct copy: use plain section names and descriptive links. Omit taglines, decorative subtitles, and repeated introductory claims. Keep project descriptions and interaction instructions.

The hero title is “CV”, with “Viktor Nagy” as its subtitle. Keep GitHub and LinkedIn together in the top contact strip. Avoid repeating the name in the header.

The hero now uses the exact portal gun 3DS model selected by Viktor from the Three.js examples, replacing the robot direction above. Preserve its original color and normal textures and the manual rotation controls.

Latest direction: show Viktor's white, two-piece logo as an extruded, beveled 3D object by default. The portal gun remains available through an explicit switch inside the stage. Add a gentle idle spin and inertia after dragging; respect reduced motion and allow pausing the spin.

Keep the robot as the expressive centerpiece. At Viktor's explicit request, preserve the moving background stars: a subtle viewport-sized canvas, with a pause control and reduced-motion support. No morphing names, repeated entrance animations, fabricated metrics, or invented availability claims. Other interactions reveal work or respond to a visitor. Preserve employment dates and qualifications. Load videos only when played and experiments only when requested. Respect keyboard navigation, small screens, print, and both themes.
