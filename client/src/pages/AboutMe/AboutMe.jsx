import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import CreateAboutMe from '../../components/AboutMe/CreateAboutMe';
import axios from 'axios';


export const AboutMe = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [ aboutMeInfo, setAboutMeInfo] = useState([]);

  useEffect(() => {
    axios.get(`/api/about-me`)
      .then(response => { 
        console.log(response)
        setAboutMeInfo(response.data)
      })
      .catch(err => console.log(err))
  }, [])



  return (
    <div>
      <section className="bg-violet-400 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">About me</h2>
              <p className="text-white mb-8">{aboutMeInfo.map(aboutMe => (
                <p>{aboutMe.textBody}</p>
              ))}</p>
            </div>
            <div>
              <img
                className="w-full h-auto rounded-lg shadow-lg"
                src="https://source.unsplash.com/random/300x200"
                alt="Foto de perfil"
              />
            </div>
          </div>
        </div>
      </section>
      {isLoggedIn && 
        <CreateAboutMe />
      }
    </div>
  );
};
