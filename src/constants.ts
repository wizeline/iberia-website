import { Engine, Profile } from '@/types';

export const PROFILES: Record<Profile, string> = {
  family: 'Family traveler',
  youth: 'Youth traveler (Erasmus)',
  business: 'Business traveler',
};
export const DESTINATIONS = [
  'Amsterdam, Netherlands',
  'Barcelona, Spain',
  'London, United Kingdom',
  'Paris, France',
  'Rome, Italy',
];

export const ENGINES: Record<Engine, string> = {
  open: 'OpenAI Dall-E 3',
  free: 'FreePik',
};
