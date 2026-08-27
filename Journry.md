# Backboard Ambassador Portal Redesign Journey

## Project context

Backboard.io is a Canadian AI technology company based in Ottawa. Its Campus
Ambassador Program gives students a place to represent the product, create and
submit work, organize or attend events, make referrals, collaborate with other
ambassadors, discover opportunities, access resources, and redeem earned
points for rewards.

This redesign was started by a McMaster University student who joined the
program after applying with CodeRot, described as "brainrot for your codebase."
CodeRot reacts when an AI coding agent modifies a project and presents those
reactions through humorous themes such as Emoji Rot, Corporate Rot, and
Medieval Rot. That application established the desired personality for this
portal: technically credible, playful, and willing to have character.

## The assignment

The challenge is to redesign or rebuild the existing Backboard Campus
Ambassador Portal interface while preserving its required workflows.

The existing portal includes:

- Work submission and review status
- Admin-created challenges with point rewards
- A shared events calendar
- Referral tracking and referral links
- A points-based reward store
- An ambassador directory
- Ambassador-only opportunities and resources

The redesign should make the program feel more motivating without turning it
into a childish game or obscuring the work ambassadors need to complete.

## Product principles

The portal is an ambassador workspace first and a game layer second.

The primary hierarchy is:

1. Understand what needs attention.
2. Submit and track ambassador work.
3. See active missions, deadlines, and point values.
4. Understand XP, rank, streak, and reward progress.
5. Find events, referrals, people, opportunities, and resources.
6. Encounter optional playful moments that make the program memorable.

Gamification is used to improve clarity and motivation:

- XP communicates contribution and progression.
- Levels and ranks make longer-term growth visible.
- Missions turn available work into actionable objectives.
- Streaks reward consistent participation.
- Achievements and unlocks recognize meaningful milestones.
- Leaderboards provide optional community comparison.
- Pixel art gives the product a distinctive game language.

## Visual direction

The visual identity combines Backboard's blue, navy, white, and neutral colors
with selective pixel-game details. Gradients are intentionally avoided.

Pixel art is reserved for:

- Streak and achievement sprites
- XP, reward, and unlock indicators
- Seasonal or celebratory feedback
- The hockey welcome animation
- Optional mini-game scenes

Standard line icons are used for navigation and routine actions so the product
remains immediately understandable.

Ottawa and Canadian culture inform the playful layer. Hockey appears in the
welcome sequence, while a future Rideau Canal typing challenge would use a
skater avatar and rank ambassadors by typing speed.

## Design references

The local workspace contains screenshots of the current Ambassador Portal,
pixel-dashboard inspiration, and a Figma community dashboard reference. These
references were studied for information architecture, density, typography,
color blocking, pixel feedback, and dashboard rhythm.

The reference folders are intentionally excluded from the public repository.
Some include third-party artwork, personal information visible in screenshots,
or licenses that do not permit redistribution.

## Iteration 1: dark season dashboard

Folder: `portal-ui`

The first prototype introduced the "Backboard Season" direction:

- Dark Backboard visual identity
- XP and rank progression
- Active missions
- Streak tracking
- Community standings
- Upcoming events
- Referral progress
- Reward unlocks
- A replayable pixel-hockey welcome sequence

This version established the strongest overall product structure and proved
that hockey could add personality without renaming every portal concept.

## Iteration 2: light house edition

Folder: `portal-ui-house-edition`

The second prototype explored a lighter, more colorful interface and an
experimental international club system:

- Rideau Ravens
- Atlantic Puffins
- Redwood Foxes
- Hudson Hawks

It included an animated onboarding draft and persistent club assignment. The
experiment was useful, but it placed too much emphasis on clubs and too little
on the portal's main purpose: tracking ambassadors and their work.

The folder is preserved as a design exploration rather than the recommended
core product direction.

## Iteration 3: game edition

Folder: `portal-ui-game-edition`

The third prototype studied a pixel-gaming Figma dashboard and initially
introduced a large game scene, compact pixel navigation, and layered cyan and
yellow perimeter frames.

After review, the concept was refined:

- The decorative Figma perimeter frames were removed.
- A familiar text sidebar was restored.
- Standard line icons replaced overly pixelated utility icons.
- XP and status summaries were moved to the top.
- Active missions became the largest dashboard surface.
- Season progress and weekly goals became visible beside missions.
- Recent work and review status remained prominent.
- The hockey game was removed from the primary dashboard area.
- A smaller optional Rideau Sprint card was placed beside recent submissions.
- An original pixel fire sprite was created for ambassador streaks.
- The hockey welcome animation was retained.

This refined game edition is the current recommended direction.

## Asset decisions

The Tiny Ski pack by Kenney is licensed under Creative Commons Zero (CC0).
Selected sprites and a copy of the license are stored under:

`portal-ui-game-edition/public/assets/tiny-ski`

The local Pixel Spaces pack was not used. Its included license prohibits
commercial use, redistribution, and use as a basis for AI-generated content.

Original project assets currently include:

- A reusable crisp-edged pixel icon component
- An original pixel fire sprite
- An original hockey welcome animation
- CSS-built rink and interface elements

Production-quality future assets should include:

- A Backboard pixel mascot or ambassador avatar system
- Hockey puck, stick, skate, helmet, and goal sprites
- XP coins, rank badges, achievement badges, and reward chests
- Ottawa skyline and Rideau Canal scenery
- Submission-approved, level-up, and reward-unlocked animations

## Technical approach

Each design iteration is an independent React, TypeScript, and Vite
application using mock data. There is no backend integration in these
prototypes.

Run any version from its folder:

```powershell
npm install
npm run dev
```

Validate a version with:

```powershell
npm run build
npm run lint
```

## Current status

All three design iterations are preserved. The refined game edition is
responsive from small mobile widths through desktop layouts, respects reduced
motion, avoids gradients, and keeps the ambassador workflow above the optional
game layer.

The next phase should refine the chosen dashboard direction before expanding
the other portal screens or building the Rideau Sprint interaction.
