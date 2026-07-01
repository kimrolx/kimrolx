/**
 * The /now page: a snapshot of what I'm focused on right now, in the spirit of
 * nownownow.com. Hand-edited; bump `nowUpdated` whenever this changes.
 */

import buildingMachina from '@/assets/now/building_machina.webp';
import freedive from '@/assets/now/freedive.webp';
import gym from '@/assets/now/gym.webp';
import griffin31_team from '@/assets/now/griffin31.webp';
import hiking from '@/assets/now/hiking.webp';

export type NowImage = {
  /** Real asset path. Leave empty to render a labeled placeholder slot. */
  src?: string;
  alt: string;
  /** Short caption under the frame, in the label style. */
  caption?: string;
  /** Frame proportion; varies the rhythm down the page. */
  aspect: 'landscape' | 'portrait' | 'square';
  /** Which side the media sits on at md+. Alternated for editorial rhythm. */
  side?: 'left' | 'right';
};

export type NowEntry = {
  title: string;
  detail: string;
  /** Optional timeframe or status shown beside the title. */
  meta?: string;
  /** Marks an entry as the current primary focus (red tick). */
  active?: boolean;
  /** Optional framed photo woven beside the text. */
  image?: NowImage;
  /** Optional pair/set of photos shown as a row below the text. */
  images?: NowImage[];
};

export type NowGroup = {
  label: string;
  entries: NowEntry[];
};

/** ISO date of the last meaningful edit. Drives the "Updated" line. */
export const nowUpdated = '2026-06-29';

export const nowIntro =
  "What I'm building, learning, and living right now. A small, standing snapshot of my current focus — not a changelog — refreshed whenever and wherever life takes me.";
export const nowGroups: NowGroup[] = [
  {
    label: 'Building',
    entries: [
      {
        title: 'MACHINA: Know Your Ride',
        meta: 'Maintaining',
        detail:
          'Maintaining and improving MACHINA in App Store: service reminders, ownership history, and a smoother day-to-day experience for riders.',
        active: true,
        image: {
          src: buildingMachina,
          alt: 'My MacBook and desk setup while building Machina',
          caption: 'The bench, building Machina',
          aspect: 'landscape',
          side: 'right',
        },
      },
      {
        title: 'The Griffin31 Team',
        meta: 'Day to day',
        detail:
          'Building with a sharp, close-knit team: shipping features together, swapping ideas across system design, NestJS APIs, the React frontend, and Azure delivery. The people make the work.',
        active: true,
        image: {
          src: griffin31_team,
          alt: 'The Griffin31 team',
          caption: 'The Griffin31 team',
          aspect: 'landscape',
          side: 'left',
        },
      },
      {
        title: 'This site',
        detail:
          'Iterating on the portfolio itself: a Swiss, type-led specimen with an interactive hero and a bento About.',
      },
    ],
  },
  {
    label: 'Learning',
    entries: [
      {
        title: 'Distributed systems',
        detail:
          'Going deeper on queues, idempotency, and failure modes so the services I ship hold up under real production load, not just the happy path.',
      },
      {
        title: 'React Native internals',
        detail: 'Sharpening native module and performance work off the back of MACHINA, beyond the framework surface.',
      },
    ],
  },
  {
    label: 'Life',
    entries: [
      {
        title: 'Freediving',
        meta: 'Cebu',
        detail:
          'Training breath-hold and depth off the coast. Equal parts discipline and quiet, a useful counterweight to screen time.',
        active: true,
        image: {
          src: freedive,
          alt: 'Freediving off the Cebu coast',
          caption: 'Depth training, Cebu',
          aspect: 'portrait',
          side: 'right',
        },
      },
      {
        title: 'Gym and Lifestyle',
        meta: 'Most days',
        detail:
          'Strength training and steadier habits: lifting most days, real food, earlier nights. It keeps my energy up for everything else.',
        active: true,
        images: [
          { src: gym, alt: 'A gym training session', caption: 'Lifting', aspect: 'portrait' },
          { src: hiking, alt: 'A hiking session', caption: 'Hiking', aspect: 'portrait' },
        ],
      },
    ],
  },
];
