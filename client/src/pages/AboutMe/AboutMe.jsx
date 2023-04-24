import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import CreateAboutMe from '../../components/AboutMe/CreateAboutMe';
import axios from 'axios';
import DeleteAboutMe from '../../components/AboutMe/DeleteAboutMe';
import aboutMe from '../../images/aboutMeLogo.jpg';
import 'react-quill/dist/quill.snow.css';

export const AboutMe = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [aboutMes, setAboutMes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/about-me`)
      .then((response) => {
        setAboutMes(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <section className="bg-violet-400 h-full py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-white mb-8">
                {aboutMes.map((aboutMe) => (
                  <div key={aboutMe._id}>
                  <div dangerouslySetInnerHTML={{ __html: aboutMe?.textBody }}></div>
                  
                    {isLoggedIn && (
                      <DeleteAboutMe key={aboutMe._id} aboutMe={aboutMe} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                className="w-full h-auto rounded-lg shadow-lg"
                src={aboutMe}
                alt="about me logo"
              />
            </div>
          </div>
        </div>
      </section>
      {isLoggedIn && <CreateAboutMe />}
    </div>
  );
};
