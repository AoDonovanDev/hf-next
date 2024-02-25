
export default function About(){
  return (
    <div className="hero h-full w-full md:h-full md:w-1/2 aspect-auto" style={{backgroundImage: 'url(/jf-rip.png)'}} >
        <div className="hero-overlay bg-opacity-60 backdrop-blur-sm"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="font-bold">Cake art with a focus on funky color, playful piping, and exciting - sometimes unexpected- flavors with a proclivity for the glittering and feminine.</h1>
            <p className="py-6 font-medium">Lambeth and Lambeth adjacent cakes inspired by birdbaths, Victorian houses, stained glass windows, Petri dishes, flower gardens and more. Eccentricity and maximalism encouraged, simplicity sometimes accepted.</p>
          </div>
        </div>
      </div>
  )
}