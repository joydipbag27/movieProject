import { useSelector } from 'react-redux'

function Videos({ setSelectVideo, videoAvailable }) {
    const {info} = useSelector((state) => state.movie)
  return videoAvailable ? (
    <div className='videos-container'>
        <h2>Videos</h2>
        <div className="allVideos">
            {info?.videos.slice(0, 15).map((elem, index) => (
                <div onClick={() => setSelectVideo(elem)} key={index} className="largeCard">
                   <img src={`https://img.youtube.com/vi/${elem.key}/hqdefault.jpg`} />
                </div>
            ))}
        </div>
    </div>
  ) : null
}

export default Videos