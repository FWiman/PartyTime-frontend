const HOST = 'localhost';
const PORT = 7215;
const URL = `https://${HOST}:${PORT}`;

const ENDPOINTS = {
  //UTILITY
  login: `https://${HOST}:${PORT}/auth/login`,
  register: `https://${HOST}:${PORT}/users`,
  checkUsername: (un) => `https://${HOST}:${PORT}/check/username/${un}`,

  //EVENTS
  getEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  getEvents: `https://${HOST}:${PORT}/events/`,
  getEventsByUser: (id) => `https://${HOST}:${PORT}/events/user/${id}`,
  getEventsByCity: (cityId) => `https://${HOST}:${PORT}/events/city/${cityId}`,
  getLocationEvents: (location, locationId) => `https://${HOST}:${PORT}/events/${location}/${locationId}`,
  postEvent: `https://${HOST}:${PORT}/events`,
  putEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  deleteEvent: (id) => `https://${HOST}:${PORT}/events/${id}`,
  getFavoriteEvents:(id) => `https://${HOST}:${PORT}/events/favorites/${id}`,
  getReviewedEvents:(id) => `https://${HOST}:${PORT}/events/reviewed/${id}`,


  //REVIEWS
  getEventReviews: (id) => `${URL}/reviews/event/${id}`,
  getUserReviews: (userId) => `https://${HOST}:${PORT}/reviews/${userId}`,
  postReview: (id) => `https://${HOST}:${PORT}/reviews/${id}`,

  //USER
  getUser: (id) => `${URL}/users/${id}`,
  editUser: (id) => `${URL}/users/${id}`,
  changePassword: `${URL}/users/password/update`,
  deleteUser: `${URL}/users/`,
  // postFavorite: () => `https://${HOST}:${PORT}/favorites/:id`,

  //CITIES
  getCities: `${URL}/cities`,
  getCity: (id) => `${URL}/cities/${id}`,
};

export default ENDPOINTS;
