# Backboard Ambassador Portal Asset Requirements

## Purpose

This is the collection and upload checklist for the Backboard Campus Ambassador
Portal redesign.

The portal is an ambassador workspace first and a game system second. Assets
should make progress, contribution, Ottawa, hockey, and friendly competition
feel distinctive without making normal workflows difficult to understand.

Use this document when:

- Requesting official files from Backboard.
- Searching licensed asset libraries.
- Briefing a designer, illustrator, 3D artist, or pixel artist.
- Uploading candidate assets for review.
- Checking whether a downloaded pack is legally and technically usable.

## Upload instructions

Place collected assets under:

`assests/incoming/`

Use these subfolders when possible:

```text
assests/incoming/
  brand/
  houses/
    rideau-ravens/
    atlantic-puffins/
    redwood-foxes/
    hudson-hawks/
  signup-3d/
  hockey/
  ottawa/
  dashboard/
  achievements/
  rewards/
  rideau-sprint/
  audio/
  references/
  licenses/
```

The existing folder is spelled `assests`, so use that spelling for now. It can
be normalized later when the final production asset structure is established.

For every downloaded third-party asset, also upload:

- The original archive when permitted.
- The source URL.
- The creator name.
- A copy or screenshot of the license.
- Any required attribution text.
- A note describing whether the file was modified.

Do not rename original downloaded files until their license information has
been recorded.

---

## Collection priority

### Priority 0 - collect first

These assets have the greatest effect on the signup and house-assignment
screens currently being developed.

- [ ] Official Backboard vector brand kit.
- [ ] Four coherent house crest systems.
- [ ] Four house mascot portraits.
- [ ] Ottawa skyline and landmark references.
- [ ] Low-poly hockey player or skater model with usable animation.
- [ ] Low-poly hockey rink, goal, puck, boards, and sticks.
- [ ] Mobile fallback render of the Ottawa hockey scene.

### Priority 1 - collect next

- [ ] XP symbol or coin.
- [ ] Rank badge set.
- [ ] Streak fire animation.
- [ ] Achievement badge set.
- [ ] Submission-status sprites.
- [ ] Reward crate and locker animations.
- [ ] Ambassador avatar system.
- [ ] Leaderboard medal set.

### Priority 2 - collect after the main portal screens

- [ ] Rideau Sprint skater sprite sheet.
- [ ] Rideau Canal tile set.
- [ ] Ottawa parallax scenery.
- [ ] Typing-game HUD assets.
- [ ] Optional sound effects.
- [ ] Real event, reward, opportunity, and resource imagery.

---

## 1. Official Backboard brand assets

### Required files

| Asset | Preferred format | Variants needed | Used for |
| --- | --- | --- | --- |
| Full Backboard wordmark | SVG | Dark, light, one-colour | Header, signup, dashboard |
| Backboard waveform/mark | SVG | Dark, light, one-colour | Puck, favicon, XP symbol concepts |
| Compact logo lockup | SVG | Horizontal and stacked if official | Narrow navigation and mobile |
| Brand guidelines | PDF or link | Latest approved version | Colour, spacing, typography |
| Official colour values | HEX, RGB, CMYK | Primary and secondary palette | Design tokens and physical rewards |
| Official type guidance | Font files or links | Web licensing information | Brand consistency |

### Questions for Backboard

- Which logo is current and approved?
- Can the waveform mark appear separately from the wordmark?
- Can the logo be placed on a hockey puck, jersey patch, rink board, or fictional
  building sign?
- Are there minimum clear-space and minimum-size rules?
- Are there official secondary colours beyond blue, navy, black, and white?
- Is there an approved product screenshot or UI imagery library?

### Current status

PNG logo variants already exist in the prototype. We still need the official
SVG sources and confirmation that the supplied logo is the current approved
version.

---

## 2. House identity system

The four houses require one shared visual system. Do not download four unrelated
animal icons and treat them as finished logos.

The crests should share:

- The same shield, pennant, or badge geometry.
- The same line weight.
- The same level of detail.
- The same mascot pose direction.
- The same pixel grid.
- A recognizable Backboard connection.
- Strong legibility at 24 px.

These are original fictional ambassador houses. Do not use Harry Potter house
names or imagery, NHL logos, professional team uniforms, or existing sports
mascots.

### House 1 - Rideau Ravens

**Role:** strategists, systems thinkers, and playmakers.

**Symbol direction:**

- Primary animal: raven.
- Regional element: Rideau Canal bridge arch, canal curve, or skating line.
- Optional supporting element: compass point or passing-lane diagram.
- Avoid: Baltimore Ravens styling, gothic sports typography, or a generic
  shield with only a bird silhouette.

**Colour direction:**

- Deep violet.
- Backboard blue.
- Ice white.
- Dark navy for one-colour applications.

### House 2 - Atlantic Puffins

**Role:** communicators, community builders, and team catalysts.

**Symbol direction:**

- Primary animal: Atlantic puffin.
- Regional element: ocean wave, coastline, or lighthouse beam.
- Optional supporting element: speech ripple or connected group.
- Avoid: copying tourism logos or using a detailed realistic bird illustration
  that cannot scale down.

**Colour direction:**

- Coral.
- Ocean blue.
- Warm cream.
- Dark navy for one-colour applications.

### House 3 - Redwood Foxes

**Role:** builders, craftspeople, and problem solvers.

**Symbol direction:**

- Primary animal: fox.
- Regional element: redwood silhouette, leaf, or tree rings.
- Optional supporting element: construction grid or code bracket shape.
- Avoid: Mozilla Firefox styling or copying esports fox logos.

**Colour direction:**

- Evergreen.
- Warm orange.
- Sand.
- Dark forest green for one-colour applications.

### House 4 - Hudson Hawks

**Role:** finishers, opportunity makers, and ambitious leaders.

**Symbol direction:**

- Primary animal: hawk.
- Regional element: Hudson River line, skyline angle, or upward current.
- Optional supporting element: goal target or forward chevron.
- Avoid: Atlanta Hawks styling, military eagle imagery, or aggressive talons
  that make the house feel hostile.

**Colour direction:**

- Navy.
- Gold.
- Clear sky blue.
- Dark navy for one-colour applications.

### Required deliverables for each house

- [ ] Primary full-colour crest in SVG.
- [ ] One-colour crest in SVG.
- [ ] Reversed crest for dark backgrounds in SVG.
- [ ] Compact monogram in SVG.
- [ ] 24 px navigation test export in PNG.
- [ ] 32 x 32 pixel badge in transparent PNG.
- [ ] 64 x 64 pixel badge in transparent PNG.
- [ ] 256 x 256 or 512 x 512 mascot portrait in WebP or transparent PNG.
- [ ] Horizontal banner in SVG, approximately 1600 x 400.
- [ ] Seamless repeating pattern in SVG or 512 x 512 PNG.
- [ ] Jersey or merchandise patch version in SVG.
- [ ] Light and dark background usage examples.
- [ ] Original editable source file in Figma, Illustrator, or Affinity Designer.

### House reveal assets

- [ ] Scouting-board frame.
- [ ] Player-card frame shared by all houses.
- [ ] Crest-stamp animation with 4-8 frames.
- [ ] House-colour snow or confetti particle sheet.
- [ ] Four short house reveal backgrounds.
- [ ] Trait symbols for strategy, community, craft, and follow-through.
- [ ] Draft ticker or scoreboard numerals.

---

## 3. Signup 3D Ottawa hockey scene

The signup scene should look like a miniature Ottawa hockey diorama, not a
generic winter game or abstract 3D landing page.

### Ottawa environment

- [ ] Simplified Parliament Centre Block.
- [ ] Peace Tower silhouette with a readable clock shape.
- [ ] Optional East and West Block silhouettes.
- [ ] Rideau Canal or outdoor rink geometry.
- [ ] Recognizable Ottawa skyline silhouette.
- [ ] Canal lamp posts.
- [ ] Snow banks.
- [ ] Evergreen and deciduous trees.
- [ ] Small bridge or canal railing section.
- [ ] Fictional Backboard Ottawa lab/HQ building facade.
- [ ] Backboard sign texture for the fictional building.

The landmark models should be stylized and simplified. We do not need
photorealistic scans.

### Hockey environment

- [ ] Hockey rink or frozen canal surface.
- [ ] Rink boards with replaceable branding panels.
- [ ] Goal net with clean geometry.
- [ ] Hockey puck with optional Backboard waveform mark.
- [ ] Hockey sticks.
- [ ] Centre line, blue lines, face-off circle, and goal crease decals.
- [ ] Score light or goal lamp.
- [ ] Small bench or equipment box.

### Hockey players

We need one coherent low-poly player system, not four models from different
packs.

**Player roles:**

- [ ] Blue user-controlled skater.
- [ ] Red opponent.
- [ ] Yellow teammate.
- [ ] Green or neutral goalie.

**Required animation clips:**

- [ ] Idle.
- [ ] Skate forward.
- [ ] Skate left and right or directional blend.
- [ ] Hold stick.
- [ ] Pass.
- [ ] Shoot.
- [ ] Receive puck.
- [ ] Goal celebration.
- [ ] Goalie idle.
- [ ] Goalie slide or save.
- [ ] Optional stumble reaction.

### Seasonal scene variants

**Summer:**

- [ ] Green foliage.
- [ ] Warm daylight sky.
- [ ] Water or synthetic rink surface treatment.
- [ ] Light pollen or sun particle.

**Fall:**

- [ ] Orange, coral, and brown foliage.
- [ ] Falling leaf particle sheet.
- [ ] Warm overcast or sunset sky.
- [ ] Damp or early-ice surface treatment.

**Winter:**

- [ ] Snow-covered foliage.
- [ ] Ice and snow material textures.
- [ ] Snowfall particle sheet.
- [ ] Cold daylight and optional night lighting.
- [ ] Optional restrained aurora texture for special moments.

### 3D technical requirements

- Format: GLB.
- Use glTF-compatible PBR materials.
- Use embedded or clearly referenced textures.
- Keep the complete initial scene target below 2 MB when practical.
- Keep each hero model below approximately 25,000 triangles unless justified.
- Use baked lighting where possible.
- Set useful object origins and pivots.
- Use metres and consistent scale.
- Name meshes and animations clearly.
- Remove hidden geometry and unused materials.
- Prefer 512 or 1024 px WebP textures.
- Provide Draco-compressed and editable source versions when possible.
- Test in a web GLB viewer before uploading.

### Static and mobile fallbacks

- [ ] Light-mode signup render at 1920 x 1080.
- [ ] Dark-mode signup render at 1920 x 1080.
- [ ] Mobile crop at 1080 x 1350.
- [ ] Loading poster at 1600 x 900.
- [ ] Reduced-motion poster without particle effects.

Preferred format: WebP or AVIF. Keep each fallback under approximately 350 KB
when visual quality allows.

---

## 4. Dashboard game-state assets

Common navigation and form actions already use a normal line-icon system. We do
not need a large pixel pack for common UI icons.

Pixel assets should be reserved for progress, rewards, achievements, status,
and celebration.

### XP and progression

- [ ] XP token or coin in SVG.
- [ ] XP token at 16 x 16 and 32 x 32 in PNG.
- [ ] Small XP gain burst with 4-6 frames.
- [ ] Progress-bar end cap or level marker.
- [ ] Level-up flash or star-burst sprite.

### Rank badges

Create one scalable badge system with increasing detail.

Working rank names are placeholders until Backboard confirms them:

1. Rookie.
2. Builder I.
3. Builder II.
4. Playmaker.
5. Captain.
6. All-Star.

For every confirmed rank:

- [ ] Full badge in SVG.
- [ ] 32 x 32 transparent PNG.
- [ ] 64 x 64 transparent PNG.
- [ ] Locked silhouette.
- [ ] Light and dark variants.

### Streak asset

- [ ] Small fire sprite with 4-6 animation frames.
- [ ] Resting state.
- [ ] Active state.
- [ ] Milestone state for 7, 30, or 100 days.
- [ ] Extinguished or missed-state symbol.

The prototype includes an original CSS/pixel flame. A final sprite should retain
its clarity at 16-24 px.

### Achievement badges

Use a consistent outer badge shape and icon grid.

Recommended first set:

- [ ] First Shift - first approved contribution.
- [ ] Shipped It - first technical build.
- [ ] Storyteller - approved educational content.
- [ ] Community Builder - meaningful community contribution.
- [ ] Event Host - first approved event.
- [ ] Referral Assist - first verified referral.
- [ ] Hat Trick - three approved contributions in one period.
- [ ] Seven-Day Streak.
- [ ] Mentor - helped another ambassador.
- [ ] Campus MVP - campus leaderboard milestone.
- [ ] Bug Hunter - useful product feedback.
- [ ] Early Adopter - joined during the first season.

For each badge:

- [ ] Unlocked full-colour SVG.
- [ ] Locked one-colour SVG.
- [ ] 32 x 32 PNG.
- [ ] 64 x 64 PNG.
- [ ] Optional 4-frame unlock shine.

### Workflow-status sprites

- [ ] Draft.
- [ ] Submitted.
- [ ] In review.
- [ ] Approved.
- [ ] Needs revision.
- [ ] Rejected or not approved.
- [ ] XP awarded.
- [ ] Reward unlocked.

These must support the written status label, not replace it.

### Reward assets

- [ ] Closed supply crate.
- [ ] Opening crate animation with 6-10 frames.
- [ ] Locked locker.
- [ ] Unlocked locker.
- [ ] Reward ticket or voucher.
- [ ] Pixel sparkle and item-reveal particles.
- [ ] Placeholder sticker sheet.
- [ ] Placeholder hoodie or shirt.
- [ ] Empty reward-shelf illustration.

### Ambassador avatars

- [ ] Neutral base avatars.
- [ ] Skin tone options.
- [ ] Hair options.
- [ ] Glasses and accessibility-related options.
- [ ] Backboard apparel.
- [ ] Four optional house patches.
- [ ] 48, 64, and 128 px exports.
- [ ] Circular and square framing tests.

Avatar pieces should be inclusive and must not rely on stereotyped traits.

---

## 5. Assets by portal screen

### Submit Work

- [ ] Upload-zone illustration.
- [ ] Contribution category symbols: content, event, referral, technical build,
  community support, and product feedback.
- [ ] Submission-success stamp.
- [ ] Review timeline markers.
- [ ] Revision-request illustration.
- [ ] Approved-work celebration sprite.

### Missions

- [ ] Featured mission banner template.
- [ ] Mission difficulty markers.
- [ ] XP reward marker.
- [ ] Time-limited mission marker.
- [ ] Completed mission stamp.
- [ ] Empty mission-board illustration.

### Calendar and Events

- [ ] Event thumbnail template.
- [ ] Virtual, campus, workshop, meetup, and deadline symbols.
- [ ] RSVP-confirmed marker.
- [ ] Event-complete stamp.
- [ ] Real approved event photos when available.

### Referrals

- [ ] Referral assist symbol.
- [ ] Verified referral marker.
- [ ] Five-step assist progress graphic.
- [ ] Bonus-XP celebration.
- [ ] Share-card template for social use.

### Ambassador Directory

- [ ] Avatar frames.
- [ ] Campus badge template.
- [ ] Skill or interest chips.
- [ ] Online or available state.
- [ ] House affiliation marker.

### Leaderboards

- [ ] Gold, silver, and bronze medals.
- [ ] Current-user row marker.
- [ ] Rank-up arrow animation.
- [ ] Campus leaderboard trophy.
- [ ] Weekly-reset marker.

### Reward Shop

- [ ] Product images on transparent backgrounds.
- [ ] Sticker, shirt, hoodie, notebook, and other approved merchandise imagery.
- [ ] Front, back, and detail views when applicable.
- [ ] Locked-item overlay.
- [ ] Sold-out state.
- [ ] Shipping package illustration.

### Opportunities and Resources

- [ ] Opportunity company logos with permission.
- [ ] Resource thumbnail template.
- [ ] Video, article, repository, toolkit, and workshop symbols.
- [ ] Empty and expired-opportunity illustrations.

---

## 6. Rideau Sprint typing game

Rideau Sprint is an optional typing race across Ottawa's frozen Rideau Canal.
The racer should be a skater. Hockey items can appear as props but should not
replace the skater.

### Main skater sprite

Preferred source frame: 48 x 48 or 64 x 64 transparent PNG.

Required animation rows:

- [ ] Idle: 2-4 frames.
- [ ] Ready/start pose: 2-4 frames.
- [ ] Skating loop: 6-8 frames.
- [ ] Speed boost: 4-6 frames.
- [ ] Mistake or stumble: 3-5 frames.
- [ ] Recovery: 2-4 frames.
- [ ] Finish-line celebration: 4-8 frames.

Optional palette variants:

- [ ] Backboard blue.
- [ ] Rideau Ravens.
- [ ] Atlantic Puffins.
- [ ] Redwood Foxes.
- [ ] Hudson Hawks.

### Canal environment tiles

- [ ] Repeatable ice tile.
- [ ] Ice crack variations.
- [ ] Lane marker.
- [ ] Snow-bank edge pieces.
- [ ] Canal wall or railing.
- [ ] Bridge supports.
- [ ] Lamp posts.
- [ ] Evergreen and bare winter trees.
- [ ] Benches.
- [ ] Warming hut.
- [ ] Backboard flags and checkpoint banners.
- [ ] Starting line.
- [ ] Finish arch.

Recommended tile size: 32 x 32 or 64 x 64. Use one grid consistently.

### Ottawa parallax layers

- [ ] Far sky.
- [ ] Distant Ottawa skyline.
- [ ] Parliament and Peace Tower layer.
- [ ] Chateau Laurier-inspired silhouette.
- [ ] Midground trees and buildings.
- [ ] Canal railings and lamps.
- [ ] Foreground snow banks.

Deliver at a minimum width of 1920 px or as repeatable vector layers. Each layer
must have transparent separation suitable for independent movement.

### Typing-game HUD

- [ ] Three-two-one-go countdown digits.
- [ ] WPM symbol.
- [ ] Accuracy target.
- [ ] Personal-best marker.
- [ ] Current-place marker.
- [ ] Progress flag.
- [ ] Combo or clean-typing indicator.
- [ ] Finish-time panel.
- [ ] Weekly leaderboard medal set.

### Typing feedback

- [ ] Correct-character spark.
- [ ] Error snow puff.
- [ ] Speed-boost trail.
- [ ] Finish confetti or snow burst.
- [ ] Personal-best celebration.

---

## 7. Optional audio

Sound is not required for the first visual prototype. If collected, it must be
muted by default until the user interacts and must include a persistent mute
control.

- [ ] Soft UI select.
- [ ] UI confirm.
- [ ] Puck hit.
- [ ] Skate loop.
- [ ] Goal horn or goal chime.
- [ ] Scouting result reveal.
- [ ] Achievement unlock.
- [ ] XP gain.
- [ ] Reward crate opening.
- [ ] Typing error.
- [ ] Personal-best celebration.

Preferred delivery:

- OGG for the web build.
- MP3 fallback.
- WAV source master when available.
- Short clips with clean starts and ends.
- No copyrighted arena music or broadcast samples.

---

## 8. File specifications

### SVG

- Include a valid `viewBox`.
- Convert unsupported effects into paths or simple fills.
- Avoid embedded raster images when possible.
- Avoid unnecessary clipping masks and thousands of points.
- Do not embed unlicensed fonts.
- Include light, dark, and one-colour variants when requested.

### Pixel PNG and sprite sheets

- Use transparent PNG.
- Use an integer pixel grid.
- Do not use anti-aliased edges.
- Do not blur or automatically vectorize pixel art.
- Keep equal frame dimensions and consistent anchor points.
- Include a frame-order note or JSON metadata.
- State the intended frames per second.
- Provide a standalone first-frame preview.

Example naming:

```text
skater-blue-skate-64x64-8f.png
streak-fire-active-24x24-6f.png
house-rideau-ravens-badge-32.png
reward-crate-open-64x64-8f.png
```

### GLB

- Use `.glb`, not a loose set of `.gltf`, `.bin`, and texture files.
- Name meshes, armatures, materials, and animation clips.
- Apply transforms before export.
- Use consistent real-world scale.
- Place the origin where the model should rotate or move.
- Remove unused animation takes.
- Compress textures and geometry for the web.
- Include the editable Blender or Spline source when possible.

### WebP and AVIF

- Provide the largest useful source and an optimized web export.
- Avoid baked text unless the image is purely decorative.
- Maintain enough contrast for overlays.
- Provide light and dark crops when the composition changes.

### Audio

- Normalize levels across clips.
- Remove long silence.
- Avoid clipping.
- Looping audio must have seamless loop points.

---

## 9. Naming convention

Use lowercase kebab-case:

```text
category-subject-variant-size-state.ext
```

Examples:

```text
brand-backboard-wordmark-light.svg
house-hudson-hawks-crest-primary.svg
house-redwood-foxes-mascot-512.webp
ottawa-peace-tower-low-poly.glb
hockey-player-blue-shoot.glb
achievement-first-shift-unlocked.svg
rideau-sprint-skater-blue-skate-64x64-8f.png
audio-achievement-unlock.ogg
```

Do not use filenames such as:

```text
final.png
final-final-2.png
image123.svg
new-logo-real.svg
```

---

## 10. License checklist

Before an asset is used, confirm:

- [ ] The license is explicit.
- [ ] Commercial use is allowed.
- [ ] Modification is allowed.
- [ ] Web distribution is allowed.
- [ ] AI-assisted use is not prohibited for this project.
- [ ] Attribution requirements are documented.
- [ ] The original creator and source URL are recorded.
- [ ] The asset does not copy a protected team, game, film, or character.

Preferred licenses:

- CC0.
- Public domain.
- CC BY with manageable attribution.
- A purchased commercial license that covers web redistribution inside the
  product.
- Original work owned by the team or commissioned with appropriate rights.

### Do not use

- NHL logos, uniforms, mascots, trophies, or broadcast graphics.
- Harry Potter house names, symbols, crests, or sorting-hat imagery.
- Ripped sprites from commercial games.
- Google Images or Pinterest images without a traceable license.
- Marketplace preview images instead of licensed source files.
- Assets marked personal-use-only.
- Assets whose licenses prohibit AI-assisted use in this environment.

The local `SpacesPack` must not be used. Its included license is incompatible
with this project and AI-assisted development.

The existing Kenney Tiny Ski pack is CC0 and may remain as a prototype
placeholder. Custom Backboard and Ottawa assets should replace it for the final
competition presentation.

---

## 11. Recommended sources

### Good places to search

- Kenney: <https://kenney.nl/assets>
  - CC0 game and UI assets.
  - Useful for temporary props, particles, and tile-set structure.
- Poly Haven: <https://polyhaven.com/>
  - CC0 textures, HDRIs, and some 3D models.
  - Useful for snow, ice, and environment materials.
- Quaternius: <https://quaternius.com/>
  - Low-poly model packs.
  - Check the license included with each pack.
- Game-icons.net: <https://game-icons.net/>
  - Useful for temporary badge concepts.
  - CC BY 3.0 attribution is required.
- OpenGameArt: <https://opengameart.org/>
  - Mixed licenses; filter carefully and prefer CC0 or CC BY.

### Better assets to create ourselves

- Four house crest systems.
- Four mascot portraits.
- Backboard XP and rank language.
- Achievement badges.
- Ottawa skyline layers.
- The final Rideau Sprint skater.
- Backboard-branded hockey equipment.
- Reveal, approval, and reward animations.

### Suggested creation tools

- Figma: house crests, banners, badges, and interface illustrations.
- Blender: hockey players, rink, puck, goal, and Ottawa landmarks.
- Spline: quick interactive 3D exploration.
- Aseprite: final pixel sprites and sprite-sheet animation.
- Pixelorama: open-source pixel animation alternative.

---

## 12. What we do not need to collect

Avoid spending time on:

- Generic navigation icons; the application already uses Lucide.
- Generic abstract gradients or floating 3D shapes.
- Large unrelated pixel UI packs.
- Generic admin-dashboard illustrations.
- Full-screen gaming backgrounds that compete with ambassador work.
- Multiple inconsistent hockey player packs.
- Photorealistic assets that do not match the stylized direction.

---

## 13. First upload batch

To move fastest, upload these items first:

1. Official Backboard SVG logos and brand guide.
2. Any existing official Backboard visual or mascot assets.
3. Two or three visual references for the desired house crest style.
4. Candidate raven, puffin, fox, and hawk sketches or licensed references.
5. One coherent low-poly hockey-player pack with its license.
6. One low-poly hockey-rink/equipment pack with its license.
7. Ottawa skyline, Parliament, Rideau Canal, and Peace Tower reference images.
8. Any custom pixel skater or hockey sprite candidates.

We can review this first batch before the team spends time collecting lower
priority reward, game, and audio assets.
