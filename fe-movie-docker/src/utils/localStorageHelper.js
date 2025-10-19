// Get Data Movie Yang Tersimpan
export const getMyList = () => {
  const stored = localStorage.getItem("myList");
  return stored ? JSON.parse(stored) : [];
};

// Add Data Movie
export const addToMyList = (movie) => {
  const currentList = getMyList();
  // Cegah duplikat
  const exists = currentList.some((item) => item.id === movie.id);
  if (!exists) {
    currentList.push(movie);
    localStorage.setItem("myList", JSON.stringify(currentList));
  }
};

// Remove Data Movie
export const removeFromMyList = (id) => {
  const currentList = getMyList().filter((item) => item.id !== id);
  localStorage.setItem("myList", JSON.stringify(currentList));
};
