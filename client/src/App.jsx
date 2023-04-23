import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { Words } from './pages/Words/Words';
import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';
import GalleryPage from './pages/GalleryPage';
import AddPicture from './components/Gallery/AddPicture';
import TopicPage from './pages/TopicPage';
import CreateAPost from './components/Blog/CreateAPost';
import CreateATopic from './components/Topic/CreateATopic';
import TopicDetails from './components/Topic/TopicDetails';
import { ContactMe } from './pages/ContactMe/ContactMe';
import { AboutMe } from './pages/AboutMe/AboutMe';
import { SinglePost } from './components/Blog/SinglePost';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/word" element={<Words />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/add-picture" element={<AddPicture />} />
        <Route path="/topics" element={<TopicPage />} />
        <Route path="/topics/:id" element={<TopicDetails showAllPosts />} />
        <Route path="/create-post" element={<CreateAPost />} />
        <Route path="/post/:id" element={<SinglePost/>} />
        <Route path="/create-topic" element={<CreateATopic />} />
        <Route path="/contact-me" element={<ContactMe />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
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
      </Routes>
    </div>
  );
}

export default App;
