import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App.jsx';
import { toast } from 'react-toastify';

const Listsong = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSong = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data) {
        setData(response.data.songs);
      } else {
        toast.error("Failed to fetch songs!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const removesong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data) {
        toast.success(response.data.message);
        await fetchSong(); // Refresh the song list after removal
      } else {
        toast.error("Failed to remove song!");
      }
    } catch (error) {
      toast.error("Error occurred!");
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>All Song List</p>
      <br />
      <div className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
        <b>Image</b>
        <b>Name</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>
      {data.map((item, index) => (
        <div key={index} className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
          <img className='w-12' src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.album}</p>
          <p>{item.duration}</p>
          <p onClick={() => removesong(item._id)} className="cursor-pointer text-red-500">x</p>
        </div>
      ))}
    </div>
  );
};

export default Listsong;
