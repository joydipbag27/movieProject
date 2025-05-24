import { GiCancel } from "react-icons/gi";
import { RiCheckDoubleLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationDel } from "../store/reducers/NotificationSlice";
import { IoTrashBin } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

function Notification() {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const { notifications } = useSelector((state) => state.notification);

  return (
    <>
      <div
        onClick={() => setShowDrawer((prev) => !prev)}
        className="notification"
      >
        {notifications.length > 0 ? <span>{notifications.length}</span> : null}
        <IoNotificationsOutline />
      </div>
      <div
        style={{ display: showDrawer ? "flex" : "none" }}
        className="notification-panel"
      >
        <div className="np-header">
          <h4>Notifications</h4>
        </div>
        {notifications.length > 0
          ? notifications.map((elem, index) => (
              <div
                key={index}
                style={{
                  backgroundColor:
                    elem.type === "favorite"
                      ? "#3d5336"
                      : elem.type === "remove"
                      ? "#584848"
                      : "#3f3e3e",
                }}
                className="np-items"
              >
                <div className="np-icon">
                  {elem.type === "favorite" ? (
                    <RiCheckDoubleLine />
                  ) : elem.type === "remove" ? (
                    <IoTrashBin />
                  ) : (
                    <FaHistory />
                  )}
                </div>
                <div className="np-content">
                  <h6>{elem.message}</h6>
                </div>
                <div className="np-remove">
                  <GiCancel onClick={() => dispatch(notificationDel(index))} />
                </div>
              </div>
            ))
          : <h4 className="np-nothing">No notifications yet!</h4>}
      </div>
    </>
  );
}

export default Notification;
