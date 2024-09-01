import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, DescriptionsProps } from 'antd';

import { getMovieDetails } from '../redux/slices/moviesSlice';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function MovieDetails() {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const movieDetails = useAppSelector((state) => state.data.movieDetails);
    const isLoading = useAppSelector((state) => state.data.isLoading);
    const error = useAppSelector((state) => state.data.error);

    useEffect(() => {
        if (id) {
            dispatch(getMovieDetails({ id: id }));
        }
    }, [dispatch, id]);

    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (isLoading || !movieDetails) {
        return <Loading />;
    }

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Год выпуска',
            children: <span>{movieDetails.Year}</span>,
        },
        {
            key: '2',
            label: 'Жанр',
            children: <span>{movieDetails.Genre}</span>,
        },
        {
            key: '3',
            label: 'Продолжительность',
            children: <span>{movieDetails.Runtime}</span>,
        },
        {
            key: '4',
            label: 'Режиссер',
            children: <span>{movieDetails.Director}</span>,
        },
        {
            key: '5',
            label: 'Актеры',
            children: <span>{movieDetails.Actors}</span>,
        },
        {
            key: '6',
            label: 'Рейтинги',
            children: 
                <>
                    {movieDetails &&
                        movieDetails.Ratings.map((rating) => (
                            <Rating data={rating} key={v4()} />
                        ))}
                </>,
        },
    ]

    return (
        <Card
            title={movieDetails.Title}
            bordered={false}
        >
            <div className='details'>
                <img src={movieDetails.Poster} alt='' />
                <Descriptions 
                    className='details__info'
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                    items={items} 
                />
            </div>
        </Card>
    );
}
