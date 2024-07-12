import Header from '@/components/header/header';
import { DESTINATIONS, PROFILES } from '@/constants';
import { Profile } from '@/types';
import { useEffect, useState } from 'react';
import { retrieveApiRequest, RetrieveResponse } from '@/pages/api/retrieve';

const ClientForm = () => {
  /*const [savedUrls] = useLocalStorage<LocalStorageImgUrls>(
    'iberiaPoc-imgUrls',
    {},
  );*/
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [profile, setProfile] = useState<Profile>(
    Object.keys(PROFILES)[0] as Profile,
  );
  const [relevantUrls, setRelevantUrls] = useState<string[]>([]);

  function retrieveRelevantUrls() {
    retrieveApiRequest().then((response) => {
      response.json().then((data) => {
        setRelevantUrls(
          data
            .filter(
              (obj: RetrieveResponse) =>
                obj.tag === profile && obj.destination === destination,
            )
            .map((obj: RetrieveResponse) => obj.url),
        );
      });
    });
  }

  useEffect(() => {
    retrieveRelevantUrls();
  }, []);

  useEffect(() => {
    //setRelevantUrls(savedUrls[getLocalStorageKey(profile, destination)] || []);
    retrieveRelevantUrls();
  }, [destination, profile]);

  return (
    <>
      <Header />
      <div className="w-[1200px] m-auto pt-2 flex justify-between">
        <div className="w-fit">
          <label className="mr-4">Destino:</label>
          <select
            className="border-2 p-2"
            onChange={(e) => setDestination(e.currentTarget.value)}
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
            onChange={(e) => setProfile(e.currentTarget.value as Profile)}
          >
            {Object.keys(PROFILES).map((profile) => (
              <option key={profile}>{profile}</option>
            ))}
          </select>
        </div>
      </div>
      {relevantUrls.length > 0 && (
        <div className="w-[1200px] mt-4 m-auto flex flex-col gap-4">
          {relevantUrls.map((url) => (
            <img key={url} src={url} alt="Imagen generada" />
          ))}
        </div>
      )}
    </>
  );
};

export default ClientForm;
