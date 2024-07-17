import Header from '@/components/header/header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  RetrieveResponse,
  retrieveVideoApiRequest,
} from '@/pages/api/retrievevideo';
import { descriptionApiRequest } from '@/pages/api/description';
import Markdown from 'markdown-to-jsx';

const AdminPage = () => {
  const router = useRouter();
  const { destination, profile } = router.query;
  const [videos, setVideos] = useState<RetrieveResponse[]>([]);
  const [season, setSeason] = useState('summer');
  const [days, setDays] = useState(1);
  const [description, setDescription] = useState('');
  const [loadingDescription, setLoadingDescription] = useState(false);

  const handleBackClick = () => {
    router.push(`/`);
  };

  const handleSearchClick = async () => {
    setLoadingDescription(true);
    const prompt =
      days === 1
        ? `Could you recommend a list of activities to do in ${destination} as a ${profile} during ${season} for 1 day? Give me just the list of activities, formatted as an unordered Markdown list with asterisks, and respond in Spanish.`
        : `Could you recommend activities to do in ${destination} as a ${profile} during ${season} for ${days} days? Give me just the plan, day by day, and respond in Spanish. Make the lines for the days be a ### header with a title of what the day will be about. Avoid any text before the plan.`;
    const res = await descriptionApiRequest(prompt);
    const desc = await res.text();
    setDescription(desc);
    setLoadingDescription(false);
    console.log('description:', desc);
  };

  function retrieveVideo() {
    retrieveVideoApiRequest().then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setVideos(data);
        });
      }
    });
  }

  useEffect(() => {
    retrieveVideo();
  }, []);

  console.log(
    'url:',
    videos.filter(
      (item) => item.tag === profile && item.destination === destination,
    )[0],
  );

  const backgroundVideo = videos.filter(
    (item) => item.tag === profile && item.destination === destination,
  )[0]?.url;

  return (
    <div>
      <Header />
      <div>
        {
          <video
            src={backgroundVideo || ''}
            autoPlay
            loop
            muted
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              zIndex: '-1',
              backgroundColor: 'white',
            }}
          />
        }
      </div>

      <button
        className="absolute top-24 left-[25%] m-auto z-10 iberia-bg-color color-white px-2 py-2 border-0 cursor-pointer"
        onClick={handleBackClick}
      >
        <img
          className="inline mr-2 h-6 w-6"
          src="/chevron-left.svg"
          alt="back"
        />
        <span>Back</span>
      </button>

      <div
        className={
          description.length > 0
            ? 'absolute top-[25%] left-[33%] w-[33%] bg-white shadow-2xl z-10 py-4 px-12 max-h-[67%] overflow-y-auto'
            : 'absolute top-[25%] left-[37%] w-[25%] bg-white shadow-2xl z-10 p-4'
        }
      >
        {description.length > 0 ? (
          <div>
            <h2>Sugerencias de actividades:</h2>
            <Markdown>{description}</Markdown>
            <button className="mt-8" onClick={() => setDescription('')}>
              Volver al formulario
            </button>
          </div>
        ) : (
          <div>
            <h1>Cheap flights to {destination} 42€</h1>
            <div className="mt-2">
              <div>
                <label className="mr-2">¿Cuándo vas?</label>
                <select
                  className="border-2 p-2 text-black"
                  onChange={(e) => setSeason(e.currentTarget.value)}
                  defaultValue={season}
                >
                  <option value="spring">Primavera</option>
                  <option value="summer">Verano</option>
                  <option value="autumn">Otoño</option>
                  <option value="winter">Invierno</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="mr-2">¿Por cuántos días?</label>
                <input
                  type="number"
                  className="border-2 p-2 text-black w-20"
                  size={2}
                  maxLength={2}
                  value={days}
                  onChange={(e) => setDays(parseInt(e.currentTarget.value))}
                />
              </div>
              <div className="text-right">
                <button
                  className="px-2 py-4 mt-2 border-0 iberia-bg-color color-white cursor-pointer disabled:opacity-50"
                  onClick={handleSearchClick}
                  disabled={loadingDescription}
                >
                  {loadingDescription ? (
                    'Cargando...'
                  ) : (
                    <>
                      <img
                        src="/search.svg"
                        alt="search"
                        className="inline mr-2 h-6 w-6"
                      />
                      ¿Qué hacer?
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
