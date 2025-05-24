import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { hisAdded } from "../../store/reducers/NotificationSlice";

function VideoPlayer({ data, videoAvailable }) {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("MOVIE_HISTORY")) || []
  );

  const defaultVideo =
    info?.videos?.find((elem) => elem.type === "Trailer") ||
    info?.videos?.[0] ||
    {};
  const URL =
    data.key || defaultVideo?.key
      ? `https://youtube.com/watch?v=${data.key || defaultVideo?.key}`
      : "";

  const historyCreate = () => {
    const currentId = info?.detail?.id;
    if (!currentId) return;
    if (history.some((elem) => elem?.detail?.id === currentId)) {
      return;
    }

    const newHistory = [...history, info].slice(-3);
    setHistory(newHistory);
    localStorage.setItem("MOVIE_HISTORY", JSON.stringify(newHistory));
    dispatch(hisAdded(info.detail));
  };

  return (
    <div
      className={
        videoAvailable ? "videoContainer" : "videoContainer noVideo-vc"
      }
    >
      {videoAvailable ? (
        <>
          <h2>{data.type || defaultVideo?.type}</h2>

          <div className="videoPlayer">
            <ReactPlayer
              onPlay={() => historyCreate()}
              height={450}
              width={900}
              loop={true}
              controls={true}
              light={true}
              url={URL}
            />
          </div>
        </>
      ) : (
        <h2>No Video Available</h2>
      )}
    </div>
  );
}

export default VideoPlayer;
