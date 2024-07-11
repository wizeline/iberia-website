import Header from '@/components/header/header';
import { DESTINATIONS, PROFILES } from '@/constants';
import { FormEvent, useEffect, useState } from 'react';

function getPrompt(profile: string, destination: string): string {
  switch (profile) {
    case 'Familia':
      return `Generate a photorealistic image of a travelling family enjoying a ${destination} destination. The image should depict a family with parents and young children, engaging in activities suitable for all ages.\n\nExamples:\n\nIf at the beach, show them building sandcastles, swimming, or having a picnic. In a city, depict them visiting family-friendly attractions, such as parks, museums, or landmarks. For a mountain destination, illustrate them hiking on an easy trail, having a family picnic, or enjoying a cozy cabin. The atmosphere should be warm and joyful, emphasizing family bonding and child-friendly activities.`;
    case 'Joven (Erasmus)':
      return `Generate a photorealistic image of a youth traveler (Erasmus) enjoying a ${destination} destination. The image should capture the vibrant and adventurous spirit of a young adult, aged 18-25, often dressed casually and stylishly. If at the beach, show them having fun with friends, participating in beach sports or enjoying a lively party. In a city, depict them exploring cultural landmarks, hanging out in trendy cafes or nightlife spots. For a mountain destination, illustrate them hiking or engaging in outdoor activities, surrounded by nature. The scene should be dynamic and energetic, reflecting a sense of exploration and social interaction.`;
    case 'Negocios':
      return `Generate a photorealistic image of a business traveler enjoying a ${destination} destination. The image should reflect a professional and sophisticated lifestyle, with the traveler dressed in business attire. If in a city, show them in a modern business district, perhaps using a laptop or smartphone in a stylish cafe or at a conference. If at the beach, depict them relaxing with a touch of luxury, such as a high-end resort setting. For a mountain destination, illustrate them enjoying a serene retreat, maybe working from a chic mountain lodge with scenic views. The overall atmosphere should be refined and elegant, emphasizing productivity and relaxation.`;
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
          <div className="text-right">
            <button type="submit">Generar</button>
          </div>
        </form>
        <div className="mt-4">
          {loading && (
            <div className="text-center">
              <p>Generating image...</p>
            </div>
          )}
          {generatedImgUrl && (
            <img src={generatedImgUrl} alt="Image generated by OpenAI" />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
