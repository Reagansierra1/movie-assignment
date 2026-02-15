import { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within Watchlist');
  }
  return context;
};

export function MovieWatchListProvider({ children }) {
  const [watchList, setWatchList] = useState(() => {
        const saved = localStorage.getItem('watchList');
        return saved ? JSON.parse(saved) : [];
    });
  useEffect(() => { 
    localStorage.setItem('watchList', JSON.stringify(watchList)); 
  }, [watchList]);

  const addToWatchList = (movie) => {
    if (!watchList.some(m => m.id === movie.id)) {
      setWatchList(prev => [...prev, movie]);
    }
  };

  const removeFromWatchList = (movieId) => {
    setWatchList(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchList = (movieId) => {
    return watchList.some(movie => movie.id === movieId);
  };

  const value = {
    watchList,
    addToWatchList,
    removeFromWatchList,
    isInWatchList
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};