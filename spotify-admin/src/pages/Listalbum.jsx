import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { url } from '../App.jsx';
const Listalbum = () => {
  const [data,setData]=useState([]); {/**will store the data that is comning from the api */}

  const fetchAlbums=async()=>{
    try {
      const response=await axios.get(`${url}/api/album/list`);
      if(response.data.success){
        setData(response.data.album);

      }
    } catch (error) {
      toast.error("Error Occured!");
      
    }
  }
  const removealbum=async(id)=>{
    try {
      const response=await axios.post(`${url}/api/album/remove`,{id});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchAlbums();
      }
      else{
        toast.error("Something went Wrong!");
      }
      
    } catch (error) {
      toast.error("Error Occured!");
      
    }
  };
  useEffect(()=>{
    fetchAlbums();
  },[])
  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
      </div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img className='w-12' src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type="color" value={item.bgcolor} readOnly />
            <p className="cursor-pointer text-red-500" onClick={()=>removealbum(item._id)}>x</p>
          </div>
        ))
      ) : (
        <p>No albums found.</p> // Display a message if no data
      )}
      
    </div>
  )
}

export default Listalbum