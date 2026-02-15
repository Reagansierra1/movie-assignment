import MovieGrid from '../components/MovieGrid';
import { useMovieContext } from '../contexts/MovieContext';

function MovieWatchList() {
  const { watchList } = useMovieContext();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Want to Watch</h2>
        <p>Movies you're planning to watch</p>
      </div>
      {watchList.length > 0 ? (
        <MovieGrid movies={watchList} />
      ) : (
        <div className="empty-state">
          <p>No movies in your watch list yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default MovieWatchList;