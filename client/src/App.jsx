import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import { Words } from './components/Words/Words';
import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';
import GalleryPage from './components/Gallery/GalleryPage';
import AddPicture from './components/Gallery/AddPicture';
import TopicPage from './components/Topic/TopicPage';
import CreateAPost from './components/BlogPost/CreateAPost';
import CreateATopic from './components/Topic/CreateATopic';
import TopicDetails from './components/Topic/TopicDetails';
import { ContactMe } from './pages/ContactMe';
import { AboutMe } from './pages/AboutMe';
import { SinglePost } from './components/BlogPost/SinglePost';
import NotFoundPage from './pages/NotFoundPage';

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
        <Route path="/post/:id" element={<SinglePost />} />
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
