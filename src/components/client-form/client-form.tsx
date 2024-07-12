import Header from '@/components/header/header';
import { DESTINATIONS, PROFILES } from '@/constants';
import { LocalStorageImgUrls, Profile } from '@/types';
import { useEffect, useState } from 'react';
import { retrieveApiRequest, RetrieveResponse } from '@/pages/api/retrieve';
import { useLocalStorage } from 'usehooks-ts';
import { getLocalStorageKey } from '@/utils';
import Card from '../card/card';


const ClientForm = () => {
  const [savedUrls] = useLocalStorage<LocalStorageImgUrls>(
    'iberiaPoc-imgUrls',
    {},
  );
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [profile, setProfile] = useState<Profile>(
    Object.keys(PROFILES)[0] as Profile,
  );
  const [relevantUrls, setRelevantUrls] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<RetrieveResponse[]>();

  function retrieveRelevantUrls() {
    retrieveApiRequest()
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setDestinations(
              data
            );
          });
        } 
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
            {Object.entries(PROFILES).map((profile) => (
              <option key={profile[0]} value={profile[0]} >{profile[1]}</option>
            ))}
          </select>
        </div>
      </div>
      {destinations !=null && (
        <div className="w-[1200px] mt-4 m-auto flex gap-4">
          {destinations
          .filter(destination2=>( destination2.tag===profile))
          .map((destination1:RetrieveResponse) => (
            <Card image={destination1.url} title={destination1.destination} price={42}/>
          ))}
        </div>
      )}
    </>
  );
};

export default ClientForm;
