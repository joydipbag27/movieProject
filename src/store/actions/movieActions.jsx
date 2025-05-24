export { removeMovie } from "../reducers/movieSlice"
import axios from "../../utils/Axios";
import { loadMovie } from "../reducers/movieSlice";

export const loadMovieDetails = (type, id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/${type}/${id}`);
        const externalId = await axios.get(`/${type}/${id}/external_ids`);
        const recommendations = await axios.get(`/${type}/${id}/recommendations`);
        const similar = await axios.get(`/${type}/${id}/similar`);
        const videos = await axios.get(`/${type}/${id}/videos`);
        const watchProviders = await axios.get(`/${type}/${id}/watch/providers`);
        const credits = await axios.get(`/${type}/${id}/credits`)
        const images = await axios.get(`/${type}/${id}/images`)
        let theUltimateData = {
            detail: detail.data,
            externalId: externalId.data,
            credits: credits.data,
            recommendation: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results,
            watchProviders: watchProviders.data.results.IN,
            images: images.data
        } 
        dispatch(loadMovie(theUltimateData))
        // console.log(theUltimateData);
        return theUltimateData
    } catch (error) {
        console.log("Error: ", error);
    }
}