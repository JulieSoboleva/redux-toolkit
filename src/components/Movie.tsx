import { Card } from 'antd';

import { addFavorite, removeFavorite } from '../redux/slices/moviesSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { MovieItem } from '../models';

interface IMovieProps {
    movie: MovieItem,
}

const { Meta } = Card;

export default function Movie({ movie }: IMovieProps) {
    const favoriteId = useAppSelector((state) => state.data.favoritesId);

    const isFavorite = favoriteId.indexOf(movie.imdbID) != -1;
    const dispatch = useAppDispatch();

    return (
        <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt='' src={movie.Poster} />}
        >
            <Meta 
                title={movie.Title}
                description={<>
                    <span>Год : {movie.Year}</span>
                    <br></br>
                    <span>Тип : {movie.Type}</span>
                </>}
            />
            <button
                className={['movie__favorite', isFavorite ? 'movie__favorite-active' : null]
                    .filter(Boolean)
                    .join(' ')}
                onClick={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    dispatch(isFavorite ? removeFavorite(movie) : addFavorite(movie));
                }}
            >
                <div className="star">
                    <svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10,1.375 L12.982,7.57 L19.659,7.864 L14.531,12.433 L16.402,18.625 L10,15.244 L3.598,18.625 L5.469,12.433 L0.341,7.864 L7.018,7.57 L10,1.375 Z"
                        />
                    </svg>
                </div>
            </button>
        </Card>
    );
}