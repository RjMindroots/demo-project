export const base_url = "http://localhost:4000/api"
export const isUserLoggedInToken = () => localStorage.getItem('access_token') ? localStorage.getItem('access_token') : sessionStorage.getItem('access_token')
export const isUserLoggedIn = () => localStorage.getItem('userData') ? localStorage.getItem('userData') : sessionStorage.getItem('userData')
export const userData = () => JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : JSON.parse(sessionStorage.getItem('userData'))