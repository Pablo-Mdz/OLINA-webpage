import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../context/auth.context';
import { CreateAboutMe, DeleteAboutMe } from '../components';
import axios from 'axios';

export const AboutMe = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [aboutMes, setAboutMes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/about-me`)
      .then((response) => {
        console.log('this is response', response.data);
        setAboutMes(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Olina - Blog | About Me</title>
      </Helmet>
      <section className="h-full py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-black mb-8">
                {aboutMes.map((aboutMe) => (
                  <div key={aboutMe._id}>
                    <div dangerouslySetInnerHTML={{ __html: aboutMe.body }} />
                    {isLoggedIn && (
                      <DeleteAboutMe key={aboutMe._id} aboutMe={aboutMe} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {isLoggedIn && <CreateAboutMe />}
    </>
  );
};
