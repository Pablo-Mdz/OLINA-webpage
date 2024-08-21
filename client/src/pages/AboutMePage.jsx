import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../context/auth.context';
import { CreateAboutMe, DeleteAboutMe } from '../components';
import { useAboutMe } from '../hooks';

export const AboutMePage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const { data, isFetching } = useAboutMe();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Olina - Blog | About Me</title>
      </Helmet>
      <section className="h-full py-16 bg-plum-400">
        <div className="sm:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-black mb-8">
                {data.map((aboutMe) => (
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
