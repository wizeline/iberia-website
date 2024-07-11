import Header from '@/components/header/header';
import { DESTINATIONS, PROFILES } from '@/constants';
import { FormEvent, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageImgUrls } from '@/types';
import { addUrl } from '@/utils';

function getPrompt(profile: string, destination: string): string {
  switch (profile) {
    case 'Familia':
      return `Generate a photorealistic image of a travelling family enjoying a ${destination} destination. The image should depict a family with parents and young children, engaging in activities suitable for all ages. The atmosphere should be warm and joyful, emphasizing family bonding and child-friendly activities.`;
    case 'Joven (Erasmus)':
      return `Generate a photorealistic image of a youth traveler (Erasmus) enjoying a ${destination} destination. The image should capture the vibrant and adventurous spirit of a young adult, aged 18-25, often dressed casually and stylishly. The scene should be dynamic and energetic, reflecting a sense of exploration and social interaction.`;
    case 'Negocios':
      return `Generate a photorealistic image of a business traveler enjoying a ${destination} destination. The image should reflect a professional and sophisticated lifestyle, with the traveler dressed in business attire. The overall atmosphere should be refined and elegant, emphasizing productivity and relaxation.`;
    default:
      return '';
  }
}

const AdminPage = () => {
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [profile, setProfile] = useState(PROFILES[0]);
  const [prompt, setPrompt] = useState(getPrompt(PROFILES[0], DESTINATIONS[0]));
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
                onChange={(event) => setProfile(event.currentTarget.value)}
              >
                {PROFILES.map((profile) => (
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
