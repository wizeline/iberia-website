import Header from '@/components/header/header';
import { DESTINATIONS, PROFILES } from '@/constants';
import { FormEvent, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageImgUrls, Profile } from '@/types';
import { addUrl } from '@/utils';
import styles from './index.module.css';
import { useRouter } from 'next/router';
import { retrieveVideoApiRequest, RetrieveResponse } from '@/pages/api/retrievevideo';


const AdminPage = () => {
  const [videos, setVideos] = useState([]);

  const router = useRouter();
  const { destination, profile } = router.query;
  const handleBackClick = () => {
          router.push(`/`);
  };
  
  function retrieveVideo() {
      retrieveVideoApiRequest()
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setVideos(
                data
              );
            });
          } 
        });
        
  }
  
  useEffect(() => {
    retrieveVideo();
  },[]);
  
  console.log("profile:",profile);
  console.log("destination:",destination);
  console.log("url:",videos.filter(item => item.tag === profile && item.destination === destination)[0]);
     
  const backgroundVideo = videos.filter(item => item.tag === profile && item.destination === destination)[0]?.url
                                                                 

  return (
  <div>
    <Header />
    <button onClick={handleBackClick}
          style={{
            position: 'absolute',
            top:'80px',
            right:'130px',
            zIndex:'200',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#333',
            color: 'white',
            cursor: 'pointer'    
          }}
        >
      Back
    </button>
                  
    <div style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
                {
                <video
                     src={
                        backgroundVideo  || ""
                     } 
                     autoPlay
                     loop
                     muted
                     style={{
                       width: '100%',
                       height: 'auto',
                       objectFit: 'cover',
                       zIndex: '-1',
                       backgroundColor: "white"
                     }}
                />
                }
                
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '1',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px 20px',
                borderRadius: '5px'
              }}>
                <h1>Cheap flights to {destination} 42€</h1>
                <div style={{ marginTop: '20px' }}>
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      border: 'none',
                      marginRight: '10px',
                      width: '250px'
                    }}
                  />
                  <button
                    style={{
                      padding: '10px 20px',
                      borderRadius: '5px',
                      border: 'none',
                      backgroundColor: 'red',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Search
                  </button>
                  
                </div>
              </div>
            </div>
  </div>
  );
};

export default AdminPage;

