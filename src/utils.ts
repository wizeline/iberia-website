import { LocalStorageImgUrls } from '@/types';

export function getLocalStorageKey(profile: string, destination: string) {
  return `${profile}-${destination}`;
}

export function addUrl(
  profile: string,
  destination: string,
  url: string,
  obj: LocalStorageImgUrls,
) {
  const key = getLocalStorageKey(profile, destination);
  const currentUrls = obj[key] || [];
  if (currentUrls.length > 0) {
    currentUrls.push(url);
  } else {
    obj[key] = [url];
  }

  return obj;
}
