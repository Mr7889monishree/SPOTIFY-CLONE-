import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addsong from './pages/Addsong.jsx';
import AddAlbum from './pages/AddAlbum.jsx';
import Listsong from './pages/Listsong.jsx';
import Listalbum from './pages/Listalbum.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Navbar from './Components/Navbar.jsx';

export const url = "http://localhost:3800";

const App = () => {
  return (
    <div className='flex item-start min-h-screen'>
      <ToastContainer /> 
      <Sidebar />
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Navbar />
        <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path='/add-song' element={<Addsong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<Listsong />} />
            <Route path='/list-album' element={<Listalbum />} />
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
