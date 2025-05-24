import axios from "axios";

export const Instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmVmY2JlZmEyNjNkOWFiOGUzNzUzMjYzZTFlNGQwNiIsIm5iZiI6MTc0NTIyODc5OC40NCwic3ViIjoiNjgwNjEzZmVjNWM4MDM1ZmIwOGExMzNmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OKMJuFB1y2eg6Efgx8qwHwjZRn93VvsybUfaCVPHo8k'
      }
})

export default Instance;