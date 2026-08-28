# Backboard Ambassador League Design Direction

## Purpose

This document is the working design reference for the Backboard Campus
Ambassador Portal redesign.

The goal is to create a competition-worthy experience that is:

- Unique to Backboard
- Connected to Ottawa and Canadian culture
- Clearly gamified
- Easy to understand and operate
- Capable of expanding across every existing portal workflow

The product is an ambassador workspace first and a game system second.

## Core concept

### Backboard Ambassador League

Backboard Ambassador League presents the ambassador program as a Canadian
tech-sports season.

Every ambassador has:

- A player profile
- XP and a current rank
- Active missions
- A contribution history
- Weekly goals and streaks
- Achievements and rewards
- A house affiliation
- Individual, campus, and optional house standings

The core loop is:

**Choose mission -> submit work -> receive approval -> earn XP -> increase
rank -> unlock rewards -> help the community**

Sports language is supporting flavor. Functional labels remain explicit:

- "Submit work" stays "Submit work."
- "Missions" can be introduced as "Your next shift."
- "Referral progress" can mention assists.
- "Leaderboard" can be presented as standings.

The interface must never require users to understand hockey terminology before
they can use the portal.

### Readability guardrails

The August signup review exposed a readability failure: functional labels and
supporting copy were styled like decorative scoreboard micro-type. That made
the right-side form particularly difficult to read.

Apply these rules to every new screen:

- Body and helper copy should normally be at least 12 px, with 14-16 px
  preferred for form guidance and important supporting text.
- Form labels should be at least 14 px and form inputs at least 16 px.
- Primary controls should be at least 14 px with a minimum 44 px target height.
- Text below 11 px is reserved for nonessential decorative data only.
- Pixel fonts are for display moments, scores, badges, and celebrations; they
  are not for instructions, form guidance, or required actions.
- Judge readability at the actual rendered width, not only in an isolated
  design canvas.

## Experience sequence

The recommended implementation order is:

1. Signup and login
2. Scouting Combine
3. House reveal
4. First dashboard arrival
5. Dashboard refinement
6. Submit Work
7. Missions
8. Calendar and events
9. Referrals
10. Ambassador directory and leaderboards
11. Reward shop
12. Opportunities and resources
13. Rideau Sprint mini-game

This creates the memorable entry experience first, then expands the practical
product surfaces.

---

## Screen 1: Signup - "Enter the League"

### Objective

The signup screen should be the first competition-winning moment. It must
communicate Backboard, Ottawa, hockey, technology, and product quality before
the user completes the form.

Confirmed scope:

- Public-facing account signup for accepted ambassadors
- Frontend-only visual prototype
- Mock authentication controls
- No backend, account persistence, or real OAuth integration

### Layout

Desktop:

- Left 55-60%: interactive 3D Ottawa winter diorama
- Right 40-45%: focused signup card
- Backboard logo in the top-left
- "Already an ambassador? Sign in" in the top-right

Mobile:

- Signup card first
- Cropped or simplified diorama below the card
- Static poster fallback for low-power devices

### 3D scene: "The Frozen Portal"

Do not use generic floating glass objects, abstract spheres, or decorative
blobs.

Build a recognizable miniature scene:

- Frozen outdoor rink or Rideau Canal section
- Backboard-branded rink boards
- Hockey puck with the Backboard waveform
- Goal net
- Simplified Ottawa skyline
- Peace Tower-inspired silhouette
- Snow banks
- Canal lamps
- Small skater silhouettes
- Light snowfall

The scene should react to the signup process:

- Pointer movement creates subtle camera parallax.
- Focusing a form field moves the puck toward the goal.
- Completing a valid field lights one rink marker.
- Submitting the form sends the puck into the goal.
- Success flashes the goal light and transitions into onboarding.

The interaction makes the 3D scene part of the product rather than background
decoration.

### Two signup-scene outcomes

The signup prototype supports two complementary presentations:

1. **Season Story**
   - Automatically cycles through summer, fall, and winter.
   - Changes sky, ground, rink surface, foliage, and particles.
   - Uses multiple autonomous hockey players to keep the scene active.
   - Remains the default signup presentation.

2. **Play the Rink**
   - Desktop-only keyboard interaction.
   - WASD or arrow keys move the blue player.
   - Space shoots the puck.
   - A CPU opponent responds to the puck.
   - The first side to three goals wins.
   - The email field ignores game controls while focused.

Mobile devices use the animated seasonal illustration rather than loading the
WebGL game mode.

### Signup card

Recommended content:

- Backboard Campus Ambassadors
- "Join the next generation of builders."
- Continue with Google
- Continue with GitHub
- Email option
- Invite or ambassador code if required
- Terms and privacy acknowledgement
- Existing-account sign-in link

The exact authentication methods must be confirmed before production
integration.

### Visual treatment

- Off-white or ice-white page
- Backboard navy signup card
- Backboard blue primary action
- Flat color surfaces
- Crisp borders
- Very limited pixel typography
- Pixel details on the rink scoreboard and success feedback
- No gradients

### Technical approach

Fast prototype:

- Spline can build and embed an interactive scene quickly.
- Use a static WebP fallback for mobile and reduced motion.

Production-controlled approach:

- React Three Fiber for rendering and interaction
- GLB models built in Blender or exported from Spline
- Draco-compressed geometry
- WebP textures
- A strict performance budget

Suggested limits:

- Initial 3D payload under 2 MB
- One main light plus baked lighting where possible
- No large uncompressed textures
- Target 60 FPS desktop and 30 FPS mobile
- Respect `prefers-reduced-motion`

---

## Screen 2: House assignment - "The Scouting Combine"

### Objective

House assignment should feel earned and personal without becoming a long
personality quiz or a copy of Harry Potter.

### Recommended mechanic

Use a 45-60 second Scouting Combine with four situational questions.

Example questions:

1. Which mission would you choose first?
   - Build a technical demo
   - Explain a difficult concept
   - Organize a campus event
   - Introduce new people to the product

2. A project is falling behind. What do you do?
   - Simplify the plan
   - Rally the team
   - Solve the hardest blocker
   - Improve how the story is communicated

3. What do teammates usually rely on you for?
   - Strategy
   - Energy
   - Craft
   - Follow-through

4. What would make your ambassador season successful?
   - Shipping useful projects
   - Growing a community
   - Becoming a stronger communicator
   - Creating new opportunities

### Assignment model

Do not make the result completely random.

Recommended logic:

1. Answers score four contribution archetypes.
2. The top two compatible houses are identified.
3. One of the top two is selected using light randomness and roster balancing.
4. The reveal explains two reasons for the match.

This makes the result feel meaningful while keeping house populations balanced.

For a frontend prototype, the scoring and balancing can use mock local data.

### Reveal sequence

- Combine finishes.
- A scouting board displays the top traits.
- House crests cycle like a draft board.
- A puck reaches center ice.
- The assigned crest is stamped onto a player card.
- Confetti or snow particles appear briefly.
- The ambassador receives a welcome message and house banner.

The sequence should last 4-6 seconds and be skippable.

---

## House identity system

Current working houses:

### Rideau Ravens

- Region: Ottawa / Rideau
- Archetype: strategy and playmaking
- Symbol: raven plus canal bridge or skating line
- Suggested palette: deep violet, Backboard blue, ice white
- Motto direction: "See the lane before it opens."

### Atlantic Puffins

- Region: Atlantic Canada
- Archetype: community energy and communication
- Symbol: puffin plus wave
- Suggested palette: coral, ocean blue, cream
- Motto direction: "Bring energy to every shift."

### Redwood Foxes

- Region: Silicon Valley / Northern California
- Archetype: building and problem solving
- Symbol: fox plus redwood leaf or tree rings
- Suggested palette: evergreen, warm orange, sand
- Motto direction: "Build smart. Move fast."

### Hudson Hawks

- Region: Hudson River / New York
- Archetype: ambition and finishing
- Symbol: hawk plus river line or skyline angle
- Suggested palette: navy, gold, sky blue
- Motto direction: "Find the opening. Finish strong."

These names are independent fictional ambassador houses. Do not use
professional sports team logos, uniforms, or trademarked visual systems.

## How to create house logos

Do not build final crests by downloading four unrelated animal icons.

Use one shared crest system:

1. Create a common shield or pennant grid in Figma.
2. Sketch 8-12 animal silhouettes for each house.
3. Combine each mascot with one regional symbol.
4. Simplify every crest to work at 24 px.
5. Draw the master version as vector paths.
6. Draw the pixel version manually on a 32 x 32 grid.
7. Test every crest in navigation, profile cards, standings, merchandise, and
   the reveal animation.

Required deliverables per house:

- Primary full-color crest in SVG
- One-color crest in SVG
- Compact monogram in SVG
- 32 x 32 pixel badge in PNG
- 64 x 64 pixel badge in PNG
- 256 x 256 mascot portrait in PNG or WebP
- Horizontal banner in SVG
- Repeating house pattern in SVG
- Jersey patch version in SVG
- Light and dark background variants

Temporary concept silhouettes may use a clearly licensed library such as
Game-icons.net with attribution. Final competition assets should be original
or commissioned.

---

## Dashboard direction

The dashboard is the ambassador command center, not a full-screen game.

### Priority order

1. Greeting and urgent actions
2. Submit Work
3. XP, rank, streak, approved work, and ranking
4. Active missions
5. Weekly goals and next unlock
6. Recent submissions and review status
7. Upcoming event
8. Referral progress
9. Leaderboard preview
10. Optional Rideau Sprint card

### Gamification rules

Use normal line icons for:

- Navigation
- Search
- Forms
- Calendar controls
- Common actions

Use pixel assets for:

- XP and points
- Streak fire
- Rank badges
- Achievements
- Rewards
- House crests
- Celebrations
- Seasonal game scenes
- Empty-state illustrations

Pixel art should identify game-state feedback, not make every control harder to
recognize.

### Signature micro-interactions

- Approved submission: puck enters a net and XP appears
- Level up: rank badge flips or stamps onto the player card
- Streak continued: fire sprite gains a frame
- Reward unlocked: locker or supply crate opens
- House points earned: crest receives a temporary score marker
- Referral verified: assist indicator moves forward

Every animation must be short, optional, and compatible with reduced motion.

---

## Rideau Sprint

Rideau Sprint is a separate optional mini-game, not the main dashboard.

### Concept

A typing race across Ottawa's frozen Rideau Canal.

### Racer

The racer is a skater avatar only.

Hockey pucks and sticks may appear as environmental props, but they are not
alternate racer types.

### Metrics

- Words per minute
- Accuracy
- Personal best
- Weekly rank
- Campus rank
- Global ambassador rank

### Required game assets

- Skater idle sprite
- Skating loop with 4-8 frames
- Starting pose
- Finish or celebration pose
- Falling or error reaction
- Canal ice tile set
- Lane markers
- Snow banks
- Ottawa skyline
- Peace Tower-inspired silhouette
- Canal lamps
- Bridges
- Trees
- Finish arch
- Countdown numbers
- WPM and accuracy HUD
- Gold, silver, and bronze medals
- Snow particle sheet

The included Kenney Tiny Ski pack is CC0 and can be used for prototypes.
Custom skater and Ottawa assets should replace generic placeholders for the
final presentation.

---

## Asset collection checklist

### Priority 0: collect before signup implementation

| Asset | Format | Why it is needed |
| --- | --- | --- |
| Official Backboard logo variants | SVG | Crisp branding on light, dark, and 3D surfaces |
| Official brand colors | Tokens or values | Prevent inconsistent approximations |
| Official typeface guidance | Font files or links | Keep the redesign connected to Backboard |
| 3D hockey puck | GLB | Main interactive signup object |
| 3D goal net | GLB | Signup completion target |
| 3D rink or canal surface | GLB | Foundation of the signup diorama |
| Rink boards | GLB | Holds Backboard branding and frames the scene |
| Simplified Ottawa skyline | GLB or SVG | Makes the experience location-specific |
| Peace Tower-inspired landmark | GLB | Immediate Ottawa recognition |
| Canal lamps and snow banks | GLB | Adds atmosphere without generic sci-fi effects |
| Ice and snow textures | WebP | Gives the scene material detail |
| Static signup fallback | WebP or AVIF | Mobile, loading, and reduced-motion support |

### Priority 0: create for house assignment

| Asset | Format | Why it is needed |
| --- | --- | --- |
| Four vector house crests | SVG | Primary house identity |
| Four pixel house badges | PNG | Reveal, profile, and standings |
| Four mascot portraits | WebP or PNG | Player cards and onboarding |
| Four house banners | SVG | Reveal and community pages |
| Four house patterns | SVG | Reusable identity without large artwork |
| Scouting board frame | SVG | Houses the assignment results |
| Draft/reveal animation elements | SVG or sprite sheet | Creates the memorable assignment moment |
| Snow/confetti particles | PNG sprite sheet | Short success feedback |

### Priority 1: dashboard assets

| Asset | Format | Why it is needed |
| --- | --- | --- |
| XP coin | SVG and 16/32 px PNG | Consistent point language |
| Streak fire | 4-frame PNG sprite sheet | Shows streak strength and progression |
| Rank badge set | SVG and PNG | Rookie through top ambassador ranks |
| Achievement badges | SVG and PNG | Recognizes different contribution types |
| Reward chest or supply crate | PNG sprite sheet | Reward unlock animation |
| Locked and unlocked locker | PNG sprite sheet | Store and progression feedback |
| Submission-approved effect | PNG sprite sheet | Celebrates completed work |
| Review and pending status sprites | PNG | Adds game character to workflow status |
| Ambassador avatar bases | PNG sprite sheets | Profile identity and leaderboards |
| Empty-state illustrations | SVG or WebP | Prevents blank portal screens |

### Priority 2: Rideau Sprint assets

| Asset | Format | Why it is needed |
| --- | --- | --- |
| Custom skater animation | PNG sprite sheet | Main racer |
| Canal tiles | PNG tile sheet | Repeatable race background |
| Ottawa skyline layers | PNG or SVG | Parallax scenery |
| Bridges and lamp posts | PNG | Recognizable canal environment |
| Starting and finish markers | PNG | Race structure |
| Countdown digits | PNG sprite sheet | Game start sequence |
| WPM HUD icons | SVG or PNG | Readable race statistics |
| Leaderboard medals | SVG or PNG | Weekly rankings |
| Snow effects | PNG sprite sheet | Winter atmosphere |

### Priority 2: sound

| Asset | Format | Why it is needed |
| --- | --- | --- |
| UI click | OGG or MP3 | Tactile controls |
| Skate loop | OGG or MP3 | Rideau Sprint feedback |
| Puck hit | OGG or MP3 | Signup and approval feedback |
| Goal sound | OGG or MP3 | Signup success |
| Achievement chime | OGG or MP3 | Reward feedback |

Sound must be muted by default until the user interacts and must have a
persistent mute control.

### Priority 3: real portal content

- Product images for stickers, shirts, hoodies, and other rewards
- Approved event thumbnails
- Campus or university logos with permission
- Ambassador profile photography or avatar consent
- Opportunity company logos with permission
- Resource thumbnails
- Real rank names and XP thresholds
- Real submission categories and point values

## Asset format rules

- Use SVG for logos, crests, icons, and scalable interface art.
- Use PNG sprite sheets for true pixel animation.
- Use GLB for web 3D.
- Use WebP or AVIF for static artwork and fallback renders.
- Keep pixel sprites on an integer grid.
- Use `image-rendering: pixelated` for pixel assets.
- Do not automatically downscale vector art to create pixel art.
- Keep source files in Figma, Blender, Aseprite, or Pixelorama.
- Store a license file or source URL beside every third-party asset pack.

## Recommended asset sources

### Safe starting points

- Kenney: https://kenney.nl/assets
  - CC0 game and UI assets
  - Good for prototypes and winter-game building blocks

- Poly Haven: https://polyhaven.com/
  - CC0 HDRIs, textures, and some models
  - Good for ice, snow, lighting, and environment materials

- Quaternius: https://quaternius.com/
  - Low-poly asset packs
  - Verify the included license with every downloaded pack

- Game-icons.net: https://game-icons.net/
  - Strong temporary achievement and crest concepts
  - CC BY 3.0; attribution is required

- OpenGameArt: https://opengameart.org/
  - Large game-asset collection
  - Licenses differ per item; prefer CC0 or CC BY

### Creation tools

- Figma for crest systems and interface assets
- Blender for custom 3D rink, puck, goal, and Ottawa geometry
- Spline for rapid interactive 3D exploration: https://spline.design/
- React Three Fiber for production-controlled 3D:
  https://r3f.docs.pmnd.rs/getting-started/introduction
- Aseprite for commercial pixel animation
- Pixelorama for an open-source pixel workflow

## Do not download or use

- NHL team logos, jerseys, mascots, or broadcast graphics
- Harry Potter names, houses, symbols, or sorting-hat art
- Ripped sprites from commercial games
- Assets without an explicit license
- Packs that prohibit commercial use
- Packs that prohibit AI-assisted use when working in this environment
- Marketplace preview images instead of the licensed source files
- Large 3D models that cannot meet the performance budget

The local Pixel Spaces pack must not be used. Its included license prohibits
commercial use, redistribution, and use as a basis for AI-generated content.

---

## Additional design inspiration

### Existing Backboard portal

Preserve:

- Clear text navigation
- Direct primary actions
- Visible point values
- Straightforward submission and review states
- Familiar page names

Improve:

- Information hierarchy
- Empty states
- Progress visibility
- Visual feedback
- Motivation between submissions

### Provided UI inspiration

Borrow the principles, not the pixels:

- Compact workload and ranking cards
- A prominent task table
- Pixel achievement collections
- Strong modal leaderboard presentation
- Profile cards with stats, activity, and achievements
- A recognizable pixel fire used as a streak symbol

### Duolingo

Reference: https://design.duolingo.com/

Study:

- Streak visibility
- Short celebratory feedback
- Clear progress goals
- Character without sacrificing usability

Do not copy:

- Mascot style
- Green palette
- Exact reward mechanics

### Playdate

Reference: https://play.date/

Study:

- One memorable signature interaction
- Strong seasonal framing
- Restrained palette
- Product personality built from deliberate details

The lesson is important: not every screen needs a gimmick. One distinctive
mechanic can carry the identity.

### Bruno Simon

Reference: https://bruno-simon.com/

Study:

- 3D interaction as navigation and feedback
- Immediate playfulness
- Physical response to user input

Do not make the signup scene a full game that blocks authentication.

---

## Fast execution plan

### Phase 1: signup prototype

1. Confirm authentication fields and required legal copy.
2. Collect the Priority 0 signup assets.
3. Create a simple grey-box 3D rink composition.
4. Build the signup card and responsive layout.
5. Connect form progress to puck movement.
6. Add the goal transition.
7. Add mobile and reduced-motion fallbacks.

Target: one polished screen before expanding scope.

### Phase 2: Scouting Combine

1. Finalize house archetypes.
2. Finalize four questions and scoring.
3. Design the shared crest grid.
4. Produce first-pass house logos.
5. Build the question flow.
6. Build the draft reveal.
7. Persist the assigned house.

### Phase 3: dashboard

1. Reuse the refined game-edition hierarchy.
2. Replace placeholder metrics with confirmed data.
3. Add final XP, rank, streak, and achievement assets.
4. Add the house badge as a secondary profile element.
5. Add production loading, empty, error, and approval states.

### Phase 4: remaining portal

Implement in workflow order:

1. Submit Work
2. Missions
3. Calendar
4. Referrals
5. Ambassador directory
6. Leaderboards
7. Reward shop
8. Opportunities
9. Resources

### Phase 5: Rideau Sprint

Build the mini-game only after the main workflows are coherent.

---

## Immediate next actions

### Team

1. Obtain the official Backboard SVG logo and brand guidance.
2. Confirm signup authentication methods.
3. Confirm whether signup is public, invite-only, or ambassador-code gated.
4. Collect or create the Priority 0 3D assets.
5. Choose whether the first 3D prototype will use Spline or React Three Fiber.
6. Begin house crest sketches in one shared Figma file.

### Implementation

The next coded screen should be the signup page.

It should include:

- Working responsive form states
- The 3D diorama area
- A temporary low-poly rink
- Form-to-puck interaction
- Success goal animation
- Static fallback
- Reduced-motion behavior

Do not redesign more dashboard modules until this entry experience is tested.

## Open decisions before signup implementation

Confirmed:

- This is public account creation for accepted ambassadors.
- The prototype is frontend-only.
- Authentication methods are visual mock interactions.
- No backend behavior is required.

Still to decide during the visual implementation:

- Whether to show a mock ambassador code field
- Whether school and graduation year belong on signup or later
- Whether to use Spline or React Three Fiber for the 3D scene
- Whether to include optional sound after user interaction
