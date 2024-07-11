import Header from '@/components/header/header';
import { DESTINATIONS, PROFILES } from '@/constants';
import { FormEvent, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageImgUrls, Profile } from '@/types';
import { addUrl } from '@/utils';

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
        <h1>Página de administración de Gen-AI</h1>
        <form onSubmit={onSubmit}>
          <div className="pt-2 flex justify-between">
            <div className="w-fit">
              <label className="mr-4">Destino:</label>
              <select
                className="border-2 p-2"
                name="destination"
                onChange={(event) => setDestination(event.currentTarget.value)}
              >
                {DESTINATIONS.map((destination) => (
                  <option key={destination}>{destination}</option>
                ))}
              </select>
            </div>
            <div className="w-fit">
              <label className="mr-4">Perfil usuario:</label>
              <select
                className="border-2 p-2"
                name="profile"
                onChange={(event) =>
                  setProfile(event.currentTarget.value as Profile)
                }
              >
                {Object.keys(PROFILES).map((profile) => (
                  <option key={profile}>{profile}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label>Prompt:</label>
            <textarea
              className="border-2 p-2 w-full"
              name="prompt"
              onChange={(event) => setPrompt(event.currentTarget.value)}
              value={prompt}
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button type="submit">Generar</button>
            <button disabled={generatedImgUrl.length === 0}>
              Guardar imagen
            </button>
          </div>
        </form>
        <div className="mt-4">
          {loading && (
            <div className="text-center">
              <p>Generando imagen...</p>
            </div>
          )}
          {generatedImgUrl && (
            <img src={generatedImgUrl} alt="Imagen generada con IA" />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
