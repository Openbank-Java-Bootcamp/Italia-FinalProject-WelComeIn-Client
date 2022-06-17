import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import GalleriesPage from "./pages/GalleriesPage";
import GalleryContentPage from "./pages/GalleryContentPage";
import GalleryEditPage from "./pages/GalleryEditPage";
import ImagesPage from "./pages/ImagesPage";
import ImageEditPage from "./pages/ImageEditPage";
import UploadingPage from "./pages/UploadingPage";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
          path="/artists/profile"
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
          path="/galleries/:galleryId/images"
          element={
            <IsPrivate>
              <ImagesPage />
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
