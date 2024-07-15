import Header from '@/components/header/header';
import { DESTINATIONS, PROFILES } from '@/constants';
import { FormEvent, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageImgUrls, Profile } from '@/types';
import { addUrl } from '@/utils';
import styles from './index.module.css';
import { useRouter } from 'next/router';

function getPrompt(profileKey: Profile, destination: string): string {
  const profile = PROFILES[profileKey];
  return `Generate a high-definition, photorealistic image of a ${profile} enjoying ${destination}. The image should show ${profile} engaging in activities typical for their profile, in a scene that captures the unique essence and vibrant atmosphere of ${destination}. Include identifiable landmarks, local architecture, and cultural elements to ensure the destination is easily recognizable. The image should be in HD quality with a natural style, reflecting the energy and ambiance of the location.`;
}


const AdminPage = () => {
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [profile, setProfile] = useState<Profile>(
    Object.keys(PROFILES)[0] as Profile,
  );
  const [prompt, setPrompt] = useState(
    getPrompt(Object.keys(PROFILES)[0] as Profile, DESTINATIONS[0]),
  );
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [savedUrls, setSavedUrls] = useLocalStorage<LocalStorageImgUrls>(
    'iberiaPoc-imgUrls',
    {},
  );
  
  const router = useRouter();
  const { destinationdetail, profiledetail } = router.query;

  useEffect(() => {
    setPrompt(getPrompt(profile, destination));
  }, [destination, profile]);

  useEffect(() => {
    if (generatedImgUrl) {
      setLoading(false);
    }
  }, [generatedImgUrl]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setGeneratedImgUrl('');

    const formData = { destination, profile, prompt };
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setGeneratedImgUrl(data.imageData);

    const newSavedUrls = addUrl(
      profile,
      destination,
      data.imageData,
      savedUrls,
    );
    setSavedUrls(newSavedUrls);
  }

  return (
    <>
      <Header />
      <div className="w-[1200px] m-auto pt-2">
        <h1>Página Detalle</h1>        
        <h1>{destinationdetail}</h1>  
        <h1>{profiledetail}</h1>  
        <div className="mt-4">
          <video src=""></video>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
