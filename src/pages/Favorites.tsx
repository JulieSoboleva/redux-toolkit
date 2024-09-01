import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';

import Movie from '../components/Movie';
import { Alert } from 'antd';

export default function Favorites() {
    const favoriteList = useAppSelector((state) => state.data.favorites);

    if (!favoriteList.length) {
        return ( 
            <div className='message__container'>
                <Alert message="В избранном нет фильмов." type="warning" />
            </div>
        );
    }

    return (
        <div className='favorites_list'>
            {favoriteList.map((movie) => (
                <Link to={`/movies/${movie.imdbID}`} key={movie.imdbID}>
                    <Movie movie={movie} />
                </Link>
            ))}
        </div>
    );
}
