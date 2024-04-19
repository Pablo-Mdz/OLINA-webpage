import { Helmet } from 'react-helmet';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Olina - Blog | Home</title>
      </Helmet>
      <div className="bg-violet-800 font-pop">
        <div
          className="h-screen bg-center bg-cover "
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/be-chef/image/upload/v1678816068/pnvfo46fuze8vxng5aea.jpg')",
          }}
        >
          <div className="h-full flex items-center justify-center">
            <h1 className="text-white font-bold text-5xl ml-32">OLINA</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
