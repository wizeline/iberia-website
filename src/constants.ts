import { Engine, Profile } from '@/types';

export const PROFILES: Record<Profile, string> = {
  family: 'Family traveler',
  youth: 'Youth traveler (Erasmus)',
  business: 'Business traveler',
};
export const DESTINATIONS = [
  'Amsterdam',
  'Barcelona',
  'London',
  'Paris',
  'Rome',
];

export const ENGINES: Record<Engine, string> = {
  open: 'OpenAI Dall-E 3',
  free: 'FreePik',
};
