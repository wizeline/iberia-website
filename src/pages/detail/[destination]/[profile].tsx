import Header from '@/components/header/header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  RetrieveResponse,
  retrieveVideoApiRequest,
} from '@/pages/api/retrievevideo';
import { descriptionApiRequest } from '@/pages/api/description';

const AdminPage = () => {
  const router = useRouter();
  const { destination, profile } = router.query;
  const [videos, setVideos] = useState<RetrieveResponse[]>([]);
  const [season, setSeason] = useState('summer');
  const [days, setDays] = useState(1);

  const handleBackClick = () => {
    router.push(`/`);
  };

  const handleSearchClick = async () => {
    const prompt = `Could you recommend activities to do in ${destination} as a ${profile} during ${season} for ${days} days? Please give me the answer in Spanish.`;
    const description = await descriptionApiRequest(prompt);
    console.log('description:', description);
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
      <div className="w-[1200px] m-auto mt-4 z-10">
        <button
          className="iberia-bg-color color-white px-2 py-2 border-0 cursor-pointer"
          onClick={handleBackClick}
        >
          <img
            className="inline mr-2 h-6 w-6"
            src="/chevron-left.svg"
            alt="back"
          />
          <span>Back</span>
        </button>
      </div>

      <div className="relative text-center">
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

        <div className="absolute top-[33%] left-[37%] w-[25%] bg-white shadow-2xl z-10 p-4">
          <h1>Cheap flights to {destination} 42€</h1>
          <div className="mt-2">
            <div>
              <label className="mr-2">¿Cuándo vas?</label>
              <select
                className="border-2 p-2 text-black"
                onChange={(e) => setSeason(e.currentTarget.value)}
              >
                <option value="spring">Primavera</option>
                <option value="summer" selected={true}>
                  Verano
                </option>
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
                className="px-2 py-4 mt-2 border-0 iberia-bg-color color-white cursor-pointer"
                onClick={handleSearchClick}
              >
                <img
                  src="/search.svg"
                  alt="search"
                  className="inline mr-2 h-6 w-6"
                />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
