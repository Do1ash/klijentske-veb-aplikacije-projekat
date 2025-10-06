import axios from 'axios';

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'KVA/2025'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class MovieService {
    static async getMovies(page: number = 0, size: number = 10) {
        const rsp = await client.request({
            url: '/movie',
            method: 'GET'
        });
        const allMovies = rsp.data;
        const start = page * size;
        const end = start + size;
        return {
            ...rsp,
            data: allMovies.slice(start, end)
        };
    }

    static async getMovieById(id: number) {
        return client.get(`/movie/${id}`);
    }
    static async searchMovies(params: {
        search?: string,
        actor?: number,
        genre?: number,
        director?: number,
        runtime?: number
    }) {
        return client.get('/movie', { params });
    }
    static async getActors(search?: string) {
        return client.get('/actor', { params: search ? { search } : {} });
    }
    static async getGenres(search?: string) {
        return client.get('/genre', { params: search ? { search } : {} });
    }
    static async getDirectors(search?: string) {
        return client.get('/director', { params: search ? { search } : {} });
    }
    static async getRuntimes() {
        return client.get('/movie/runtime');
    }
}
