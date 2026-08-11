/** The ambient soundtrack: quiet royalty-free instrumentals (Pixabay Music).
 *  Add a track by importing its file from src/assets/audio and giving it a src. */

import type { Track } from '@/types';
import loungeNight from '@/assets/audio/lounge-night.mp3';
import magicNight from '@/assets/audio/magic-night.mp3';
import nightJazz from '@/assets/audio/night-jazz.mp3';
import podcastJazz from '@/assets/audio/podcast-jazz.mp3';

export const tracks: Track[] = [
  { title: 'Lounge Night', artist: 'Keyframe_Audio', src: loungeNight },
  { title: 'Podcast Jazz', artist: 'Denis-Pavlov-Music', src: podcastJazz },
  { title: 'Magic Night', artist: 'Keyframe_Audio', src: magicNight },
  { title: 'Night Jazz', artist: 'Pixabay', src: nightJazz },
];
