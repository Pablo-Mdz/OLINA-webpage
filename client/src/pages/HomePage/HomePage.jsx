import './HomePage.css';

function HomePage() {
  return (
    <div className="bg-violet-800 font-pop">
      <div
        className="h-screen bg-center bg-cover "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/be-chef/image/upload/v1678816068/pnvfo46fuze8vxng5aea.jpg')",
        }}
      >
        <div className="h-full flex  flex-col items-center justify-center">
          <div>
            <h1 className="text-white font-bold text-5xl ml-32">OLINA</h1>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl ml-32">
              como sube y baja
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
