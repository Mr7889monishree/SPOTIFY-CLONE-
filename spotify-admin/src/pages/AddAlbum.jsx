import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { url } from '../App.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddAlbum = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgcolor', colour);

      const response = await axios.post(`${url}/api/album/add`, formData);
      
      if (response.data.success) {
        toast.success("Album added successfully!");
        setDesc('');
        setImage(null);
        setName('');
        setColour("#121212"); // Reset color picker
        navigate(window.location.href="http://localhost:5173/") // Redirect to home
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onsubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex flex-col gap-4'>
        <p>Upload image</p>
        <input 
          onChange={(e) => setImage(e.target.files[0])} 
          type="file" 
          id='image' 
          accept='image/*' 
          hidden 
        />
        <label htmlFor="image">
          <img 
            src={image ? URL.createObjectURL(image) : assets.upload_area} 
            alt="Upload Area" 
            className='w-24 cursor-pointer' 
          />
        </label>
      </div>
      <div className='flex flex-col gap-4'>
        <p>Album Name</p>
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          type="text" 
          placeholder='Type here....' 
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' 
        />
      </div>
      <div className='flex flex-col gap-4'>
        <p>Album Description</p>
        <input 
          onChange={(e) => setDesc(e.target.value)} 
          value={desc} 
          type="text" 
          placeholder='Type here....' 
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' 
        />
      </div>
      <div className='flex flex-col gap-3'>
        <p>Background Color</p>
        <input 
          onChange={(e) => setColour(e.target.value)} 
          value={colour} 
          type="color" 
        />
      </div>
      <button 
        type='submit' 
        className='text-base bg-black text-white py-2.5 px-4 cursor-pointer'>
        Add Album
      </button>
    </form>
  );
};

export default AddAlbum;
