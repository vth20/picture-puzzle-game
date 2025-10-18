
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-500 text-transparent bg-clip-text">
        Picture Puzzle Game
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Click a tile to reveal a part of the image. Who is it?
      </p>
    </header>
  );
};

export default Header;
