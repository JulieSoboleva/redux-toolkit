export interface MovieItem {
    Poster: string,
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,    
    favorite?: boolean,
}

export interface MovieDetails {
    Title: string,
    Year: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Actors: string,
    Poster: string,
    Ratings: { 
        Source: string,
        Value: string,
    }[];
    imdbID: string,
    Type: string,
}

export interface DataState {
    movies: MovieItem[],
    favorites: MovieItem[],
    favoritesId: string[],
    movieDetails: MovieDetails | null,
    isLoading: boolean,
    search: string,
    error: string | null,
}
