import React from 'react';
import { GRID_OPTIONS } from '../constants';
// CHANGED: Thêm BackIcon và OriginalIcon
import { NextIcon, ResetIcon, BackIcon, OriginalIcon } from './icons';

interface GameControlsProps {
  gridSize: number;
  onGridSizeChange: (size: number) => void;
  onNextImage: () => void;
  onResetGrid: () => void;
  totalImages: number;
  currentImageIndex: number;
  // CHANGED: Thêm 2 props mới
  onBackImage: () => void;
  onShowOriginal: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gridSize,
  onGridSizeChange,
  onNextImage,
  onBackImage,
  onResetGrid,
  onShowOriginal,
  totalImages,
  currentImageIndex,
}) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 space-y-6 w-full h-full shadow-lg border border-slate-700">
      <div>
        <h3 className="text-lg font-semibold text-slate-300 mb-3">Grid Size (m x m)</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {GRID_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => onGridSizeChange(size)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                gridSize === size
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {size}x{size}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-300 mb-3">Actions</h3>
        <div className="flex flex-col space-y-3">
           <button
            onClick={onBackImage}
            className="flex items-center justify-center px-4 py-3 rounded-md font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-all duration-200 shadow-md transform hover:scale-105"
          >
            <BackIcon />
            <span>Back Image</span>
          </button>
           <button
            onClick={onNextImage}
            className="flex items-center justify-center px-4 py-3 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-md transform hover:scale-105"
          >
            <NextIcon />
            <span>Next Image</span>
          </button>
          <button
            onClick={onResetGrid}
            className="flex items-center justify-center px-4 py-3 rounded-md font-semibold text-slate-200 bg-slate-600 hover:bg-slate-500 transition-all duration-200 shadow-md transform hover:scale-105"
          >
            <ResetIcon />
            <span>Reset Grid</span>
          </button>
          <button
            onClick={onShowOriginal}
            className="flex items-center justify-center px-4 py-3 rounded-md font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-all duration-200 shadow-md transform hover:scale-105"
          >
            <OriginalIcon />
            <span>Original Image</span>
          </button>
        </div>
      </div>
      <div className="text-center pt-4 border-t border-slate-700">
        <p className="text-slate-400">
          Image <span className="font-bold text-cyan-400">{currentImageIndex + 1}</span> of{' '}
          <span className="font-bold text-cyan-400">{totalImages}</span>
        </p>
      </div>
    </div>
  );
};

export default GameControls;