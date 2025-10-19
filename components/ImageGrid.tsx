import React, { useState, useRef, useEffect } from 'react';
import { FullscreenEnterIcon, FullscreenExitIcon } from './icons';
import { TData } from '@/constants';

interface ImageGridProps {
  imageUrl: TData;
  gridSize: number;
  revealedTiles: boolean[][];
  onTileClick: (row: number, col: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ imageUrl, gridSize, revealedTiles, onTileClick }) => {
  const gridTemplate = `repeat(${gridSize}, minmax(0, 1fr))`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-2xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10 bg-black">
      <img src={imageUrl.image} alt="Puzzle" className="absolute inset-0 w-full h-full object-contain" />
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: gridTemplate, gridTemplateRows: gridTemplate }}
      >
        {Array.from({ length: gridSize }).map((_, rowIndex) =>
          Array.from({ length: gridSize }).map((_, colIndex) => {
            const isRevealed = revealedTiles[rowIndex]?.[colIndex] ?? false;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onTileClick(rowIndex, colIndex)}
                className={`flex items-center justify-center text-xl sm:text-2xl font-bold text-cyan-400
                            bg-slate-800 backdrop-blur
                            transition-all duration-500 ease-in-out cursor-pointer
                            hover:bg-slate-700
                            ${isRevealed ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
              >
                {!isRevealed && (rowIndex * gridSize + colIndex + 1)}
              </div>
            );
          })
        )}
      </div>
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
      </button>
    </div>
  );
};

export default ImageGrid;