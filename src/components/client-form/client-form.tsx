import Header from '@/components/header/header';
import { PROFILES } from '@/constants';
import { Profile } from '@/types';
import { useEffect, useState } from 'react';
import { retrieveApiRequest, RetrieveResponse } from '@/pages/api/retrieve';
import Card from '../card/card';
import Portal from '../portal/portal';

const ClientForm = () => {
  const [profile, setProfile] = useState<Profile>(
    Object.keys(PROFILES)[0] as Profile,
  );
  const [destinations, setDestinations] = useState<RetrieveResponse[]>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function retrieveRelevantDestinations() {
    retrieveApiRequest().then((response) => {
      if (response.status === 200) {
        response.json().then((data) => setDestinations(data));
      }
    });
  }

  useEffect(() => {
    retrieveRelevantDestinations();
  }, []);

  useEffect(() => {
    retrieveRelevantDestinations();
  }, [profile]);

  return (
    <>
      <Header />
      <div className="w-[1200px] m-auto pt-2 flex justify-between">
        <div className="w-fit">
        {isMounted && (
            <Portal>
                <select
                    className="mb-2 iberia-bg-color text-white font-bold"
                    onChange={(e) => setProfile(e.currentTarget.value as Profile)}
                >
                {Object.entries(PROFILES).map((profile) => (
                  <option key={profile[0]} value={profile[0]}>
                    {profile[1]}
                  </option>
                ))}
                </select>
            </Portal>)}
        </div>
      </div>
      {destinations != null && (
        <div className="w-[1200px] mt-4 m-auto flex gap-4">
          {destinations
            .filter((destination2) => destination2.tag === profile)
            .map((destination1: RetrieveResponse) => (
              <Card
                image={destination1.url}
                title={destination1.destination}
                price={42}
                profile={profile}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default ClientForm;
