import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { url } from '../App.jsx';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
const Addsong = () => {
  
  {/**to manage the state of page use the usestate hook */}
  const navigate = useNavigate();
  const [image,setImage] = useState(false);
  const [song,setsong] = useState(false);
  const [name,setname] =useState('');
  const [desc,setdesc]=useState('');
  const [album,setalbum] = useState("none");
  const [loading,setLoading]=useState(false); {/**for loading animation when we add the song */}
  const [albumdata,setAlbumdata] = useState([]); {/**store all the albumdata that we get from the backend */}
  const onSubmitHandler=async(e)=>{
    e.preventDefault(); {/**this will prevent from everytime reloading of our page when we click the submit button in the form */}
    {/**we will create form data and store the image song name desc and album */}
    setLoading(true);

    try {
      const formData= new FormData(); 
      formData.append('name',name);
      formData.append('desc',desc);
      formData.append('image',image);
      formData.append('audio',song);
      formData.append('album',album);
      const response=await axios.post(`${url}/api/song/add`,formData);
      if(response.data.success){
        toast.success("Song Added");
        setname('');
        setdesc('');
        setalbum("none");
        setImage(false);
        setsong(false);
        navigate(window.location.href="http://localhost:5173/")
      }
      else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured")
    }
    setLoading(false);

  }
  const loadAlbumdata=async()=>{
    try {
      const response=await axios.get(`${url}/api/album/list`);
      if(response.data.success){
        setAlbumdata(response.data.album);
      }
      else{
        toast.error("Unable to load album data!");
      }
    } catch (error) {
      toast.error("Error Occured!");
      
    }
  }
  useEffect(()=>{
    loadAlbumdata();
  },[])
  return loading ? (<div className='grid place-items-center min-h-[80vh]'>
    <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
  </div>) : (
    <form className='flex flex-col items-start gap-8 text-gray-600' onSubmit={onSubmitHandler}>
      <div className='flex gap-8 '>
        <div  className='flex flex-col gap-4'>
          <p>Upload Song</p>
          <input onChange={(e)=>setsong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden/> {/**it will accept all the audio files */}
          <label htmlFor="song">
            <img src={song ? assets.upload_added : assets.upload_song} alt="" className='w-24 cursor-pointer' />
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
          <label htmlFor="image">
            <img src={ image ? URL.createObjectURL(image):assets.upload_area} alt="" className='w-24 cursor-pointer' />
          </label>
        </div>
      </div> 
      <div className='flex flex-col gap-2.5'>
        <p>Song Name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} type="text" id='song-name' className='bg-transparent border-2 outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type here...' required/>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input onChange={(e)=>setdesc(e.target.value)} value={desc} type="text" id='song-description' className='bg-transparent border-2 border-gray-400 outline-green-600 p-2.5 w-[max(40vw,250px)]' placeholder='Type here...' required />
      </div>
      <div className='flex flex-col gap-3'>
        <p>Album</p>
        <select onChange={(e)=>setalbum(e.target.value)} defaultValue={album} className='bg-transparent outline-grenn-600 border-2 border-gray-400 p-2.5 w-[150px]'>
          <option value="none">None</option>
          {albumdata.map((item,index)=>(          
            <option key={index} value={item.name}>{item.name}</option>
))}
        </select>
      </div>
      <button type="submit" className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>

    </form>
  )
}

export default Addsong