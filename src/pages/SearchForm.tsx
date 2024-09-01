import { Link } from 'react-router-dom';
import { GetProps, Input } from 'antd';

import Movie from '../components/Movie';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getMovies } from '../redux/slices/moviesSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export default function SearchForm() {
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.data.movies);
    const isLoading = useAppSelector((state) => state.data.isLoading);
    const error = useAppSelector((state) => state.data.error);

    if (isLoading) {
        return <Loading />;
    }

    const onSearch: SearchProps['onSearch'] = (value) => {
        if (value.trim()) {
            dispatch(getMovies(value));
        }
    }

    return (
        <div>
            <Search
                placeholder="поиск по названию"
                allowClear
                enterButton="Найти"
                size="large"
                onSearch={onSearch}
            />
            {error ? (
                <ErrorMessage error={error} />
            ) : (
                <div className='search_list'>
                    {movies.map((movie) => (
                        <Link to={`/movies/${movie.imdbID}`} key={movie.imdbID}>
                            <Movie movie={movie} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
