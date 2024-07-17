import Header from '@/components/header/header';
import { DESTINATIONS, ENGINES, PROFILES } from '@/constants';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Engine, LocalStorageImgUrls, Profile } from '@/types';
import { addUrl } from '@/utils';
import styles from './index.module.css';
import { saveApiRequest } from '@/pages/api/save';
import { generateApiRequest } from '@/pages/api/generate';

function getPrompt(profileKey: Profile, destination: string): string {
  const profile = PROFILES[profileKey];
  return `Generate a high-definition, photorealistic image of a ${profile} enjoying ${destination}. The image should show ${profile} engaging in activities typical for their profile, in a scene that captures the unique essence and vibrant atmosphere of ${destination}. Include identifiable landmarks, local architecture, and cultural elements to ensure the destination is easily recognizable. The image should be in HD quality with a natural style, reflecting the energy and ambiance of the location.`;
}

const AdminPage = () => {
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [profile, setProfile] = useState<Profile>(
    Object.keys(PROFILES)[0] as Profile,
  );
  const [engine, setEngine] = useState<Engine>(
    Object.keys(ENGINES)[0] as Engine,
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
  const [successfullySaved, setSuccessfullySaved] = useState(false);

  useEffect(() => {
    setPrompt(getPrompt(profile, destination));
  }, [destination, profile]);

  useEffect(() => {
    if (generatedImgUrl.length > 0) {
      setLoading(false);
    }
  }, [generatedImgUrl]);

  async function onGenerateClick() {
    setLoading(true);
    setGeneratedImgUrl('');

    /*const formData = { engine, prompt };
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify(formData),
    });*/
    const response = await generateApiRequest(prompt, engine);
    if (response.status === 200) {
      const data = await response.json();
      setGeneratedImgUrl(data.imageData);
    } else {
      console.error('Error generating image', await response.text());
    }
  }

  async function onSaveClick() {
    const response = await saveApiRequest(
      generatedImgUrl,
      profile,
      destination,
    );
    const newSavedUrls = addUrl(
      profile,
      destination,
      generatedImgUrl,
      savedUrls,
    );
    setSavedUrls(newSavedUrls);
    setSuccessfullySaved(true);
    setTimeout(() => {
      setSuccessfullySaved(false);
    }, 3000);
    console.log('Response: ', response);
  }

  return (
    <>
      <Header />
      <div className="w-[1200px] m-auto pt-2">
        <h1>Página de administración de Gen-AI</h1>
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
                <option key={profile} value={profile}>
                  {PROFILES[profile as Profile]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="mr-4">Modelo de IA:</label>
          <select
            className="border-2 p-2"
            name="e"
            onChange={(e) => setEngine(e.currentTarget.value as Engine)}
          >
            {Object.keys(ENGINES).map((engine) => (
              <option key={engine} value={engine}>
                {ENGINES[engine as Engine]}
              </option>
            ))}
          </select>
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
          <button>Generar Vídeo</button>
          <button onClick={onGenerateClick}>Generar Imagen</button>
        </div>
        <div className="mt-4">
          {loading && (
            <div className="text-center loading-image">
              <p>Generando imagen...</p>
              <img className={styles.loading} src="/plane.svg" alt="Avión" />
            </div>
          )}
          {generatedImgUrl.length > 0 && (
            <div className="border-2 iberia-border-color p-2">
              <img src={generatedImgUrl} alt="Imagen generada con IA" />
              <div className="flex justify-end gap-2 mt-2">
                {successfullySaved && (
                  <p className="text-green-500">
                    Imagen guardada correctamente
                  </p>
                )}
                <button onClick={onSaveClick}>Guardar imagen</button>
                <button onClick={onGenerateClick}>Re-generar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
