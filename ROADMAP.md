# Backboard Ambassador Portal Roadmap

## Product goal

Create a competition-worthy Campus Ambassador Portal that makes ambassador
work easier to understand and more motivating to complete.

The experience should combine:

- Backboard's existing brand identity.
- Clear work tracking and program operations.
- Ottawa and Canadian character.
- Hockey-inspired energy.
- XP, levels, achievements, streaks, and rewards.
- Optional house competition.
- A memorable but optional Rideau Canal typing game.

The portal is an ambassador workspace first and a game system second.

## Product principles

1. **Work comes first.** Submitting work, checking review status, finding
   missions, attending events, and making referrals must remain obvious.
2. **Gamification explains progress.** XP and ranks should show what an
   ambassador accomplished and what to do next.
3. **Hockey provides character.** Hockey language and animation add energy but
   must not replace clear functional labels.
4. **Houses create belonging.** Houses support friendly collaboration and
   competition without becoming the portal's primary purpose.
5. **Pixel art is an accent.** Use it for progression, celebrations, badges,
   rewards, and mini-games rather than every interface control.
6. **Readability is non-negotiable.** Functional copy cannot be reduced to
   decorative micro-type.
7. **No visual filler.** Avoid gradients, generic glass cards, floating blobs,
   and unrelated game assets.
8. **Prototype safely.** The current build is frontend-only and uses mock data;
   future backend integration should not require redesigning the interface.

---

## Current baseline

### Completed

- [x] Preserved the first portal prototype.
- [x] Preserved the light house-focused prototype.
- [x] Created the refined game edition.
- [x] Restored a conventional and intuitive dashboard hierarchy.
- [x] Recentered the dashboard on ambassador work.
- [x] Added responsive desktop and mobile layouts.
- [x] Added a light-first signup screen with dark mode.
- [x] Added the interactive 3D Ottawa hockey scene.
- [x] Added summer, fall, and winter scene changes.
- [x] Added an optional keyboard-controlled rink mode.
- [x] Added email-only mock signup.
- [x] Added a four-question Scouting Combine.
- [x] Added scored house assignment and a house reveal.
- [x] Added readability guardrails.
- [x] Created a detailed asset collection guide.
- [x] Validated lint and production builds.

### Current prototype folders

| Folder | Purpose |
| --- | --- |
| `portal-ui/` | Original dark dashboard direction |
| `portal-ui-house-edition/` | Light house-focused exploration |
| `portal-ui-game-edition/` | Current primary implementation |

New product development should continue in `portal-ui-game-edition/` unless an
experiment is deliberately isolated.

---

## Roadmap at a glance

| Phase | Scope | Status | Outcome |
| --- | --- | --- | --- |
| 0 | Research and product direction | Complete | Clear design principles and preserved references |
| 1 | Dashboard foundation | Complete | Intuitive ambassador command centre |
| 2 | Signup and onboarding | Prototype complete | Signup, Scouting Combine, and house reveal |
| 3 | Alternate UI taste experiment | Next | A separate feedback-driven visual option |
| 4 | Core ambassador work loop | Planned | Missions, Submit Work, and review tracking |
| 5 | Program participation | Planned | Events, calendar, and referrals |
| 6 | Community and competition | Planned | Directory, leaderboards, and house standings |
| 7 | Progression and rewards | Planned | Achievements, ranks, reward shop, and profile |
| 8 | Opportunities and resources | Planned | Useful program content and external opportunities |
| 9 | Rideau Sprint | Later | Optional Ottawa typing mini-game |
| 10 | Production readiness | Later | Accessibility, performance, integration contracts, and QA |

---

## Phase 3 - Alternate UI taste experiment

### Objective

Explore a meaningfully different visual direction based on new feedback without
destabilizing the approved work on `main`.

### Branch strategy

- Create the experiment from the latest clean `main`.
- Keep all experimental design changes on a dedicated branch.
- Do not overwrite or remove the existing game edition.
- Prefer a new isolated project folder if the experiment changes the full
  design language.
- Reuse functional logic only when it does not force the experiment to resemble
  the current direction.
- Compare both versions against the same ambassador workflows.

### Inputs required

- [ ] Specific feedback on the current design.
- [ ] Three to five examples of interfaces that represent the desired taste.
- [ ] Elements from the current design that must be preserved.
- [ ] Elements that should be removed or substantially changed.
- [ ] Preferred light, dark, or adaptive colour mode.
- [ ] Desired balance between polished software and expressive game UI.
- [ ] Any new brand or asset references.

### Experiment deliverables

- [ ] A written visual hypothesis.
- [ ] Updated design tokens.
- [ ] One complete dashboard concept.
- [ ] One signup or onboarding concept.
- [ ] Desktop and mobile layouts.
- [ ] Functional states rather than a static screenshot.
- [ ] A side-by-side comparison with the current game edition.
- [ ] A recommendation to adopt, reject, or combine the experiment.

### Decision gate

Do not expand the alternate taste across every screen until the dashboard and
one onboarding screen have been reviewed.

The review should answer:

1. Is it more distinctive than the current direction?
2. Is ambassador work still immediately understandable?
3. Does the new taste feel connected to Backboard?
4. Does it use game character intentionally rather than decoratively?
5. Is it readable at the actual target viewport?
6. Is it practical to extend across all portal workflows?

---

## Phase 4 - Core ambassador work loop

This is the highest-priority functional phase after the UI direction is chosen.

### 4.1 Submit Work

#### User goal

An ambassador can submit a contribution confidently and understand what
happens next.

#### Required interface

- [ ] Contribution category selector.
- [ ] Title.
- [ ] Description.
- [ ] Proof URL.
- [ ] Optional file-upload placeholder for the frontend prototype.
- [ ] Campus or project association.
- [ ] Completion date.
- [ ] Relevant campaign or mission.
- [ ] Estimated XP preview.
- [ ] Clear required-field validation.
- [ ] Draft preservation in local storage.
- [ ] Submission confirmation.
- [ ] Link to the new submission's status.

#### Categories

- Technical build.
- Educational content.
- Social or awareness content.
- Campus event.
- Community support.
- Referral.
- Product feedback.
- Other approved contribution.

#### Acceptance criteria

- The primary action is visible without searching.
- Validation identifies the exact field that needs attention.
- A user does not need hockey terminology to complete the form.
- The success state explains review status and expected next steps.
- The form works at mobile and desktop widths.
- Keyboard and screen-reader navigation are supported.

### 4.2 Work History

#### Required interface

- [ ] All submissions list.
- [ ] Status filters.
- [ ] Contribution category filters.
- [ ] Sort by date or XP.
- [ ] Submission detail drawer or page.
- [ ] Review notes.
- [ ] Revision action.
- [ ] Approved XP record.
- [ ] Empty state.

#### Statuses

- Draft.
- Submitted.
- In review.
- Needs revision.
- Approved.
- Not approved.

Written labels must always accompany visual status assets.

### 4.3 Missions

#### Required interface

- [ ] Mission directory.
- [ ] Featured mission.
- [ ] Mission category filters.
- [ ] Difficulty or expected-effort indicator.
- [ ] XP reward.
- [ ] Deadline.
- [ ] Eligibility.
- [ ] Mission detail.
- [ ] Start or save mission.
- [ ] Link mission to Submit Work.
- [ ] Completed mission state.

#### Acceptance criteria

- Ambassadors can identify the best next action quickly.
- Mission requirements and rewards are explicit.
- Starting a mission changes its visible state.
- The dashboard reflects active mission progress.

---

## Phase 5 - Program participation

### 5.1 Calendar and events

- [ ] Monthly and list views.
- [ ] Upcoming event card.
- [ ] Event details.
- [ ] Time zone display.
- [ ] Virtual or in-person marker.
- [ ] RSVP state.
- [ ] Calendar export placeholder.
- [ ] Event completion and attendance state.
- [ ] Empty month state.

### 5.2 Referrals

- [ ] Personal referral link.
- [ ] Copy and share interactions.
- [ ] Referral progress.
- [ ] Verified and pending states.
- [ ] Bonus XP milestone.
- [ ] Referral history.
- [ ] Clear privacy guidance.

The hockey "assist" metaphor may support the referral experience, but the word
"referral" must remain visible.

---

## Phase 6 - Community and competition

### 6.1 Ambassador directory

- [ ] Search.
- [ ] Campus filter.
- [ ] Region filter.
- [ ] Skill and interest filters.
- [ ] Ambassador profile preview.
- [ ] House affiliation.
- [ ] Contact or collaboration action.
- [ ] Privacy and visibility settings.

### 6.2 Leaderboards

- [ ] Individual standings.
- [ ] Campus standings.
- [ ] Optional house standings.
- [ ] Weekly, monthly, and all-season views.
- [ ] Current-user location.
- [ ] Rank movement.
- [ ] Scoring explanation.
- [ ] Tie and reset rules.

### 6.3 House integration

- [ ] Replace temporary house symbols with approved crests.
- [ ] Add house identity to the ambassador profile.
- [ ] Add shared house goals.
- [ ] Add house standings.
- [ ] Add house activity.
- [ ] Add optional house challenges.

Houses must not restrict access to normal missions, events, resources, or
rewards.

---

## Phase 7 - Progression and rewards

### 7.1 Profile and progression

- [ ] Ambassador profile.
- [ ] Campus and region.
- [ ] Skills and interests.
- [ ] XP history.
- [ ] Current rank.
- [ ] Rank progression.
- [ ] Streak calendar.
- [ ] Achievement collection.
- [ ] House identity.
- [ ] Profile completion.

### 7.2 Achievement system

- [ ] Define the first achievement set.
- [ ] Define exact unlock conditions.
- [ ] Add locked and unlocked states.
- [ ] Add an achievement detail view.
- [ ] Add subtle unlock feedback.
- [ ] Avoid awarding badges for meaningless repeated clicks.

### 7.3 Reward shop

- [ ] Reward catalogue.
- [ ] XP or point cost.
- [ ] Locked and available items.
- [ ] Product detail.
- [ ] Size or variant selection.
- [ ] Shipping information placeholder.
- [ ] Redemption confirmation.
- [ ] Redemption history.
- [ ] Sold-out state.

Reward economics and fulfilment rules must be confirmed before backend
integration.

---

## Phase 8 - Opportunities and resources

### Opportunities

- [ ] Search and filters.
- [ ] Opportunity type.
- [ ] Eligibility.
- [ ] Deadline.
- [ ] External application action.
- [ ] Saved opportunities.
- [ ] Expired state.

### Resources

- [ ] Search.
- [ ] Topic filters.
- [ ] Video, article, repository, toolkit, and workshop types.
- [ ] Saved resources.
- [ ] Recently viewed.
- [ ] Recommended resources.

These screens should feel like useful program infrastructure, not filler tabs.

---

## Phase 9 - Rideau Sprint

### Objective

Create an optional typing race across Ottawa's frozen Rideau Canal that rewards
practice and friendly competition without blocking portal work.

### Core gameplay

- [ ] Typing prompt.
- [ ] Live character validation.
- [ ] Words per minute.
- [ ] Accuracy.
- [ ] Progress calculation.
- [ ] Animated skater.
- [ ] Mistake reaction.
- [ ] Finish state.
- [ ] Personal best.
- [ ] Weekly standings.
- [ ] Restart interaction.

### Visual environment

- [ ] Ottawa skyline parallax.
- [ ] Peace Tower silhouette.
- [ ] Canal lamps and bridges.
- [ ] Snow banks.
- [ ] Starting line and finish arch.
- [ ] Backboard flags and checkpoints.
- [ ] Reduced-motion treatment.

### Rules

- The mini-game remains optional.
- Game scores do not determine access to normal ambassador opportunities.
- Typing prompts should use appropriate Backboard, software, and community
  content.
- The interface must remain usable without sound.

---

## Phase 10 - Production readiness

### Accessibility

- [ ] Keyboard navigation.
- [ ] Logical focus order.
- [ ] Visible focus indicators.
- [ ] Screen-reader labels.
- [ ] Form error announcements.
- [ ] Sufficient colour contrast.
- [ ] Reduced-motion support.
- [ ] Text zoom to 200%.
- [ ] Touch targets of at least 44 px.
- [ ] No required interaction based only on colour, animation, or sound.

### Responsive quality

Test at:

- 320 px.
- 375 px.
- 430 px.
- 768 px.
- 1024 px.
- 1280 px.
- 1440 px and above.

### Performance

- [ ] Lazy-load the 3D signup scene.
- [ ] Provide static fallbacks.
- [ ] Compress GLB geometry.
- [ ] Use WebP or AVIF for raster artwork.
- [ ] Keep pixel sprite sheets compact.
- [ ] Avoid loading mini-game assets on normal dashboard visits.
- [ ] Check low-power mobile behaviour.
- [ ] Check slow-network loading states.

### Future backend integration contracts

Define typed frontend interfaces for:

- Authentication.
- Ambassador profile.
- Contributions.
- Review statuses.
- Missions.
- Events and RSVPs.
- Referrals.
- XP ledger.
- Ranks.
- Achievements.
- Leaderboards.
- Houses.
- Rewards and redemptions.
- Opportunities.
- Resources.
- Rideau Sprint scores.

The prototype should continue using mock adapters until real API requirements
are provided.

---

## Asset production track

Asset collection can run in parallel with functional development.

Use `ASSET_REQUIREMENTS.md` as the detailed production and upload brief.

### First asset review

- [ ] Official Backboard SVG brand files.
- [ ] House crest style references.
- [ ] Initial crest sketches.
- [ ] Low-poly hockey-player candidates.
- [ ] Hockey-rink and equipment candidates.
- [ ] Ottawa landmark references.

### Second asset review

- [ ] Final house crest system.
- [ ] Mascot portraits.
- [ ] XP and rank system.
- [ ] Achievement badge set.
- [ ] Streak fire and workflow sprites.

### Third asset review

- [ ] Reward imagery.
- [ ] Rideau Sprint skater.
- [ ] Canal tiles.
- [ ] Ottawa parallax layers.
- [ ] Optional audio.

No downloaded asset should enter the production UI until its source and license
have been reviewed.

---

## Content and program decisions required

The following information will eventually be needed from Backboard:

- Official authentication method.
- Ambassador approval and invitation rules.
- Contribution categories.
- Submission evidence requirements.
- Review workflow.
- XP values.
- Rank names and thresholds.
- Mission definitions.
- Event data.
- Referral rules.
- House scoring rules.
- Achievement conditions.
- Reward inventory and costs.
- Shipping and fulfilment rules.
- Leaderboard periods and reset rules.
- Privacy expectations for ambassador profiles.
- Real campus and ambassador data.

These decisions do not block visual prototyping, but they must be resolved
before production integration.

---

## Recommended implementation order

1. Create and review the alternate UI taste experiment.
2. Select the primary visual direction.
3. Build Submit Work.
4. Build Work History and review states.
5. Build Missions and mission details.
6. Connect those screens to the dashboard.
7. Build Calendar and Events.
8. Build Referrals.
9. Build the Ambassador Directory and Leaderboards.
10. Integrate final house identities.
11. Build Profile, Ranks, and Achievements.
12. Build the Reward Shop.
13. Build Opportunities and Resources.
14. Build Rideau Sprint.
15. Complete accessibility, responsive, performance, and integration QA.

---

## Definition of done for every screen

A screen is complete only when:

- [ ] Its primary user goal is obvious.
- [ ] Empty, loading, success, and error states exist where relevant.
- [ ] All controls work with mock data.
- [ ] Navigation connects it to the rest of the portal.
- [ ] It works at mobile and desktop widths.
- [ ] Required copy is readable.
- [ ] Keyboard interaction works.
- [ ] Reduced motion is respected.
- [ ] Pixel art supports rather than replaces functional information.
- [ ] No gradients or unlicensed visual assets were introduced.
- [ ] Lint and production build pass.
- [ ] The rendered outcome was inspected, not only the source code.

---

## Immediate next checkpoint

The next checkpoint is the **alternate UI taste experiment**.

Before implementation, capture:

1. The feedback that motivated the alternate direction.
2. The desired emotional qualities.
3. Reference interfaces.
4. What must remain from the current portal.
5. What should visibly change.

Once that direction is reviewed, the team should either:

- Adopt the experiment.
- Keep the current game edition.
- Combine clearly identified strengths from both.

The selected direction then becomes the foundation for the core ambassador work
loop.
