
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageGrid from './components/ImageGrid';
import GameControls from './components/GameControls';
import { IMAGE_URLS, GRID_OPTIONS } from './constants';

const App: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(GRID_OPTIONS[1]); // Default to 4x4
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [revealedTiles, setRevealedTiles] = useState<boolean[][]>([]);

  const createInitialGrid = (size: number): boolean[][] => {
    return Array.from({ length: size }, () => Array(size).fill(false));
  };

  useEffect(() => {
    setRevealedTiles(createInitialGrid(gridSize));
  }, [gridSize, currentImageIndex]);

  const handleTileClick = (row: number, col: number) => {
    const newRevealedTiles = revealedTiles.map(r => [...r]);
    newRevealedTiles[row][col] = true;
    setRevealedTiles(newRevealedTiles);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % IMAGE_URLS.length);
  };

  const handleResetGrid = () => {
    setRevealedTiles(createInitialGrid(gridSize));
  };

  const handleGridSizeChange = (newSize: number) => {
    if (GRID_OPTIONS.includes(newSize)) {
      setGridSize(newSize);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-grow lg:w-2/3">
            <ImageGrid
              imageUrl={IMAGE_URLS[currentImageIndex]}
              gridSize={gridSize}
              revealedTiles={revealedTiles}
              onTileClick={handleTileClick}
            />
          </div>
          <div className="lg:w-1/3 w-full">
            <GameControls
              gridSize={gridSize}
              onGridSizeChange={handleGridSizeChange}
              onNextImage={handleNextImage}
              onResetGrid={handleResetGrid}
              totalImages={IMAGE_URLS.length}
              currentImageIndex={currentImageIndex}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
