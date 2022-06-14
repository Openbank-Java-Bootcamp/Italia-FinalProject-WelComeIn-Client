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
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


function App() {
  return (
    <div className="App">
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
          path="/api/artists/:artistId"
          element={
            <IsPrivate> 
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/artists/:artistId/edit"
          element={
            <IsPrivate> 
              <ProfileEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/galleries"
          element={
            <IsPrivate> 
              <GalleriesPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/galleries/:galleryId"
          element={
            <IsPrivate> 
              <GalleryContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/galleries/:galleryId/edit"
          element={
            <IsPrivate> 
              <GalleryEditPage />
            </IsPrivate>
          }
        />
        
        <Route
          path="/api/images"
          element={
            <IsPrivate> 
              <ImagesPage />
            </IsPrivate>
          }
        />
        <Route
          path="/api/images/:imageId"
          element={
            <IsPrivate> 
              <ImageContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/images/:imageId/edit"
          element={
            <IsPrivate> 
              <ImageEditPage />
            </IsPrivate>
          }
        />
          
        <Route
          path="/api/links"
          element={
            <IsPrivate> 
              <LinksPage />
            </IsPrivate>
          }
        />
        <Route
          path="/api/links/:linkId"
          element={
            <IsPrivate> 
              <LinkContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/links/:linkId/edit"
          element={
            <IsPrivate> 
              <LinkEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/sounds"
          element={
            <IsPrivate> 
              <SoundsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/api/sounds/:soundId"
          element={
            <IsPrivate> 
              <SoundContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/sounds/:soundId/edit"
          element={
            <IsPrivate> 
              <SoundEditPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/videos"
          element={
            <IsPrivate> 
              <VideosPage />
            </IsPrivate>
          }
        />
        <Route
          path="/api/videos/:videoId"
          element={
            <IsPrivate> 
              <VideoContentPage />
            </IsPrivate>
          }
        />

        <Route
          path="/api/videos/:videoId/edit"
          element={
            <IsPrivate> 
              <VideoEditPage />
            </IsPrivate>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
