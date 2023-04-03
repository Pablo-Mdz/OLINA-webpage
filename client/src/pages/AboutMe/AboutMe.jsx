import React from 'react'

export  const AboutMe = () => {
  return (
    <div>
      
    <section className="bg-violet-400 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">About me</h2>
            <p className="text-white mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
              leo sit amet enim faucibus blandit. Integer euismod, eros quis
              egestas feugiat, tortor quam consectetur justo, quis facilisis
              sapien enim a neque.
            </p>
            <p className="text-white mb-8">
              Integer nec lorem vitae est luctus ullamcorper euismod sit amet
              odio. Maecenas malesuada enim in purus tempus, vitae lacinia ex
              porttitor. Etiam lacinia eros id quam interdum, sit amet ultrices
              magna viverra.
            </p>
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
 



    </div>
  )
}

