import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center text-stone-800 text-center p-4">
      <div className="relative mb-8">
        <img
          src="https://img.icons8.com/color/96/000000/astronaut.png"
          alt="Astronauta"
          className="w-24 h-24 animate-float"
        />
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-stone-500 rounded-full opacity-20 blur-lg"></div>
      </div>

      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-8">Oops! Você se perdeu no espaço...</h2>
      <p className="text-stone-600 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>

      <Link
        to="/"
        className="bg-stone-500 hover:bg-stone-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
      >
        Voltar para a Terra
      </Link>
    </div>
  );
};
