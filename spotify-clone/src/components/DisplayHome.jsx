import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import Navbar from './Navbar';

const DisplayHome = () => {
  const { songsData = [], albumsData = [] } = useContext(PlayerContext);

  // Log data to check if it's being received correctly

  return (
    <>
      <Navbar />
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
          {albumsData.length > 0 ? (
            albumsData.map((item,ind) => (
              <AlbumItem
                key={ind}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))
          ) : (
            <p>No albums available</p>
          )}
        </div>
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'>
          {songsData.length > 0 ? (
            songsData.map((item,it) => (
              <SongItem
                key={it}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))
          ) : (
            <p>No songs available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
