import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import GalleriesPage from './pages/GalleriesPage';
import GalleryContentPage from './pages/GalleryContentPage';
import GalleryEditPage from './pages/GalleryEditPage';
import ImagesPage from './pages/ImagesPage';
import ImageContentPage from './pages/ImageContentPage';
import ImageEditPage from './pages/ImageEditPage';
import LinksPage from './pages/LinksPage';
import LinkContentPage from './pages/LinkContentPage';
import LinkEditPage from './pages/LinkEditPage';
import SoundsPage from './pages/SoundsPage';
import SoundContentPage from './pages/SoundContentPage';
import SoundEditPage from './pages/SoundEditPage';
import VideosPage from './pages/VideosPage';
import VideoContentPage from './pages/VideoContentPage';
import VideoEditPage from './pages/VideoEditPage';
import UploadingPage from './pages/UploadingPage';

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route
          path="/"
          element={
              <HomePage />
          }
        />
      <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path="/artists/:artistId"
          element={
            <IsPrivate> 
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/artists/:artistId/edit"
          element={
            <IsPrivate> 
              <ProfileEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/galleries"
          element={
            <IsPrivate> 
              <GalleriesPage />
            </IsPrivate>
          }
        />

        <Route
          path="/galleries/:galleryId"
          element={
            <IsPrivate> 
              <GalleryContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/galleries/:galleryId/edit"
          element={
            <IsPrivate> 
              <GalleryEditPage />
            </IsPrivate>
          }
        />
        
        <Route
          path="/images"
          element={
            <IsPrivate> 
              <ImagesPage />
            </IsPrivate>
          }
        />
        <Route
          path="/images/:imageId"
          element={
            <IsPrivate> 
              <ImageContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/images/:imageId/edit"
          element={
            <IsPrivate> 
              <ImageEditPage />
            </IsPrivate>
          }
        />
          
        <Route
          path="/links"
          element={
            <IsPrivate> 
              <LinksPage />
            </IsPrivate>
          }
        />
        <Route
          path="/links/:linkId"
          element={
            <IsPrivate> 
              <LinkContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/links/:linkId/edit"
          element={
            <IsPrivate> 
              <LinkEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/sounds"
          element={
            <IsPrivate> 
              <SoundsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/sounds/:soundId"
          element={
            <IsPrivate> 
              <SoundContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/sounds/:soundId/edit"
          element={
            <IsPrivate> 
              <SoundEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/videos"
          element={
            <IsPrivate> 
              <VideosPage />
            </IsPrivate>
          }
        />
        <Route
          path="/videos/:videoId"
          element={
            <IsPrivate> 
              <VideoContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/videos/:videoId/edit"
          element={
            <IsPrivate> 
              <VideoEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/upload"
          element={
            <IsPrivate> 
              <UploadingPage />
            </IsPrivate>
          }
        />


      </Routes>
    </div>
  );
}

export default App;
