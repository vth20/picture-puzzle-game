import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ImageGrid from "./components/ImageGrid";
import GameControls from "./components/GameControls";
import { IMAGE_URLS, GRID_OPTIONS } from "./constants";
import OriginalImagePopup from "./components/OriginalImagePopup";

const App: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(GRID_OPTIONS[2]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [revealedTiles, setRevealedTiles] = useState<boolean[][]>([]);
  const [isOriginalVisible, setIsOriginalVisible] = useState<boolean>(false);
  // --- NEW STATE to manage image change requests ---
  const [imageChangeRequest, setImageChangeRequest] = useState<'next' | 'back' | null>(null);

  const createInitialGrid = (size: number): boolean[][] => {
    return Array.from({ length: size }, () => Array(size).fill(false));
  };

  // Effect to reset the grid ONLY when grid size changes
  useEffect(() => {
    setRevealedTiles(createInitialGrid(gridSize));
  }, [gridSize]);

  // --- NEW EFFECT to handle the image change sequence ---
  useEffect(() => {
    if (imageChangeRequest) {
      // Step 1: Immediately reset the grid to be fully opaque.
      setRevealedTiles(createInitialGrid(gridSize));

      // Use a short timeout to allow React to render the opaque grid FIRST
      const timer = setTimeout(() => {
        // Step 2: After the grid is rendered opaque, change the image index
        if (imageChangeRequest === 'next') {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGE_URLS.length);
        } else if (imageChangeRequest === 'back') {
          setCurrentImageIndex((prevIndex) => (prevIndex - 1 + IMAGE_URLS.length) % IMAGE_URLS.length);
        }
        // Reset the trigger so the effect can run again on the next click
        setImageChangeRequest(null);
      }, 500); // 50ms is enough for the UI to update but short enough to be unnoticeable

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [imageChangeRequest, gridSize]);


  const handleTileClick = (row: number, col: number) => {
    const newRevealedTiles = revealedTiles.map((r) => [...r]);
    newRevealedTiles[row][col] = true;
    setRevealedTiles(newRevealedTiles);
  };

  // --- MODIFIED HANDLERS: They now only set a request flag ---
  const handleNextImage = () => {
    if (!imageChangeRequest) { // Prevent multiple clicks while transitioning
      setImageChangeRequest('next');
    }
  };

  const handleBackImage = () => {
    if (!imageChangeRequest) { // Prevent multiple clicks while transitioning
      setImageChangeRequest('back');
    }
  };

  const handleResetGrid = () => {
    setRevealedTiles(createInitialGrid(gridSize));
  };

  const handleGridSizeChange = (newSize: number) => {
    if (GRID_OPTIONS.includes(newSize)) {
      setGridSize(newSize);
    }
  };

  const handleShowOriginal = () => {
    setIsOriginalVisible(true);
  };

  const handleCloseOriginal = () => {
    setIsOriginalVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent key actions when the popup is visible
      if (isOriginalVisible) return;

      if (event.key === 'ArrowRight') {
        handleNextImage();
      } else if (event.key === 'ArrowLeft') {
        handleBackImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextImage, handleBackImage, isOriginalVisible]);

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
              onBackImage={handleBackImage}
              onShowOriginal={handleShowOriginal}
            />
          </div>
        </main>
      </div>

      {isOriginalVisible && (
        <OriginalImagePopup imageUrl={IMAGE_URLS[currentImageIndex]} onClose={handleCloseOriginal} />
      )}
    </div>
  );
};

export default App;
