import MovieGrid from '../components/MovieGrid';
import { useEffect, useState } from 'react';
import { getPopularMovies } from "../services/movieService";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';


function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const displayMovies = searchResults || movies;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try{
        setLoading(true);
        setError(null);
        const data = await getPopularMovies();
        setMovies(data);
      } 
      catch(error){
        setError('Failed to load Movies. Please try again later.');
        setMovies([]);
      }
      finally{
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if(loading){
    return(
      <main className='main-content'>
        <LoadingSpinner />
      </main>
    );
  }

  if(error){
    return(
      <main className='main-content'>
        <ErrorMessage message={error}/>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>
      <MovieGrid movies={displayMovies} />
    </main>
  );
};

export default Home;