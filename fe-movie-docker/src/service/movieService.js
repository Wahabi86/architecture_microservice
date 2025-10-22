import axios from 'axios';

// Instance Axios khusus untuk Movie Service
const movieApiClient = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL, // Mengambil URL dari .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Menambahkan token Authorization jika ada di local storage
movieApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Menambahkan header Authorization
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Helper untuk Transformasi Data ---
const formatDuration = (minutes) => {
  if (minutes == null || isNaN(minutes)) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let durationString = '';
  if (hours > 0) durationString += `${hours}h `;
  if (remainingMinutes > 0) durationString += `${remainingMinutes}m`;
  return durationString.trim() || 'N/A';
};

const formatImageData = (base64String) => {
  return base64String ? `${base64String}` : null;
};

// Mengubah data dari backend
// ke format yang diharapkan frontend
const transformMovieData = (movie) => {
  if (!movie) return null;
  return {
    id: movie.id,
    title: movie.title || '',
    image: formatImageData(movie.poster_base64 || movie.poster_base_64), // Handle jika nama field beda
    rating: movie.rating != null ? movie.rating : 0,
    views: movie.views != null ? movie.views : 0,
    genre: movie.genres || [], // Ini berisi array ID, perlu mapping ke nama nanti
    year: movie.release_year || null,
    hour: formatDuration(movie.duration_minutes),
    actors: movie.actors || [], // Ini berisi array ID, perlu mapping ke nama nanti
    synopsis: movie.synopsis || '',
  };
};

// --- Fungsi API ---

export const getMovies = async (searchQuery = '') => {
  try {
    const endpoint = searchQuery ? `/movies?search=${encodeURIComponent(searchQuery)}` : '/movies';
    console.log(`Fetching movies from: ${movieApiClient.defaults.baseURL}${endpoint}`);
    const response = await movieApiClient.get(endpoint);
    return Array.isArray(response.data) ? response.data.map(transformMovieData) : [];
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    console.log(`Fetching trending movies from: ${movieApiClient.defaults.baseURL}/movies/trending`);
    const response = await movieApiClient.get('/movies/trending');
    return Array.isArray(response.data) ? response.data.map(transformMovieData) : [];
  } catch (error) {
    console.error("Error fetching trending movies:", error.response?.data || error.message);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    console.log(`Fetching movie by ID from: ${movieApiClient.defaults.baseURL}/movies/${id}`);
    const response = await movieApiClient.get(`/movies/${id}`);
    return transformMovieData(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
     // Tangani error 403 (Subscription Required)
     if (error.response && error.response.status === 403 && error.response.data?.error === 'subscription_required') {
        console.warn(`Subscription required for movie id ${id}`);
        // Melempar error spesifik agar komponen bisa menangani (misal: redirect ke halaman langganan)
        throw new Error('Subscription required');
      }
    console.error(`Error fetching movie by id ${id}:`, error.response?.data || error.message);
    throw error;
  }
};


export const getMovieRecommendations = async (id) => {
  try {
    console.log(`Fetching recommendations for movie ID: ${movieApiClient.defaults.baseURL}/movies/${id}/recommendations`); // Logging URL
    const response = await movieApiClient.get(`/movies/${id}/recommendations`);
    return Array.isArray(response.data) ? response.data.map(transformMovieData) : [];
  } catch (error) {
    console.error(`Error fetching recommendations for movie id ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    console.log(`Fetching genres from: ${movieApiClient.defaults.baseURL}/genres`);
    const response = await movieApiClient.get('/genres');
    // Pastikan response.data adalah array objek {id, name}
    const genresFromAPI = Array.isArray(response.data) ? response.data : [];

    // KEMBALIKAN array objek {id, name} langsung
    return genresFromAPI;

  } catch (error) {
    console.error("Error fetching genres:", error.response?.data || error.message);
    throw error;
  }
};

export const getActors = async () => {
  try {
    console.log(`Fetching actors from: ${movieApiClient.defaults.baseURL}/actors`);
    const response = await movieApiClient.get('/actors');
    // Memastikan response.data adalah array sebelum mapping
    if (Array.isArray(response.data)) {
      // Mengubah setiap objek aktor
      return response.data.map(actor => ({
        id: actor.id,
        name: actor.name || 'Unknown Actor',
        photo: formatImageData(actor.photo_base64)
      }));
    } else {
      // Jika response bukan array, kembalikan array kosong
      console.warn("Received non-array response when fetching actors:", response.data);
      return [];
    }
  } catch (error) {
    // Menampilkan error jika request gagal
    console.error("Error fetching actors:", error.response?.data || error.message);
    // Melempar error lagi agar bisa ditangani oleh komponen yang memanggil
    throw error;
  }
};