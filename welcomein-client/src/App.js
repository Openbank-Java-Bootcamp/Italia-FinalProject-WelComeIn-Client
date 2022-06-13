import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import GalleriesPage from './pages/GalleriesPage';
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import GalleryContentPage from './pages/GalleryContentPage';

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
          path="/api/artists/:artistId"
          element={
            <IsPrivate> 
              <ProfilePage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
