import { Routes, Route } from 'react-router-dom';
import {
  NotFoundPage,
  AboutMe,
  ContactMe,
  LoginPage,
  SignupPage,
  ProfilePage,
  HomePage,
  PostsPage,
} from './pages';
import {
  Words,
  Navbar,
  IsPrivate,
  IsAnon,
  GalleryPage,
  AddPicture,
  CreateAPost,
  CreateATopic,
  PostResults,
  SinglePost,
} from './components';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/word" element={<Words />} /> */}
        {/* <Route path="/gallery" element={<GalleryPage />} /> */}
        {/* <Route path="/gallery/add-picture" element={<AddPicture />} /> */}
        <Route path="/topics/:id" element={<PostResults />} />
        <Route path="/create-post" element={<CreateAPost />} />
        <Route path="/posts" element={<PostsPage />} />
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
    </>
  );
}

export default App;
