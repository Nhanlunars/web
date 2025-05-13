import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllNotifications,
  getAllNotificationsByOwwnerId,
  createNewNotificationService,
  deleteNotificationService,
  editNotificationService,
} from "../../services/userService";

export const createNewNotification = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewNotificationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new notification success!");
        dispatch(saveNotificationSuccess());
        dispatch(fetchAllNotificationsStart());
      } else {
        toast.error("create a new notification faild!!");
        dispatch(saveNotificationFailed());
        console.log("createNotificationFailed", res);
      }
    } catch (e) {
      dispatch(saveNotificationFailed());
      console.log("saveNotificationFailed", e);
    }
  };
};

export const createNewNotificationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewNotificationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new notification success!");
        dispatch(saveNotificationSuccess());
        dispatch(fetchAllNotificationsByOwnerIdStart(data.userId));
      } else {
        toast.error("create a new notification faild!!");
        dispatch(saveNotificationFailed());
        console.log("createNotificationFailed", res);
      }
    } catch (e) {
      dispatch(saveNotificationFailed());
      console.log("saveNotificationFailed", e);
    }
  };
};

export const saveNotificationSuccess = () => ({
  type: actionTypes.CREATE_NOTIFICATION_SUCCESS,
});

export const saveNotificationFailed = () => ({
  type: actionTypes.CREATE_NOTIFICATION_FAILED,
});

export const fetchAllNotificationsStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllNotifications("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllNotificationsSuccess(res.notifications.reverse()));
      } else {
        toast.error("fetch all notification error!");
        dispatch(fetchAllNotificationsFailed());
        console.log("fetchAllNotificationsFailed", res);
      }
    } catch (e) {
      toast.error("fetch all notification error!!");
      dispatch(fetchAllNotificationsFailed());
      console.log("fetchAllNotificationsFailed!!", e);
    }
  };
};

export const fetchAllNotificationsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_NOTIFICATIONS_SUCCESS,
  notifications: data,
});

export const fetchAllNotificationsFailed = () => ({
  type: actionTypes.FETCH_ALL_NOTIFICATIONS_FAILED,
});

export const fetchAllNotificationsByOwnerIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllNotificationsByOwwnerId(userId);
      if (res && res.errCode === 0) {
        dispatch(
          fetchAllNotificationsByOwnerIdSuccess(res.notifications.reverse())
        );
      } else {
        toast.error("fetch all notification by ownerid error!");
        dispatch(fetchAllNotificationsByOwnerIdFailed());
        console.log("fetchAllNotificationsByOwnerIdFailed", res);
      }
    } catch (e) {
      toast.error("fetch all notification by ownerid error!!");
      dispatch(fetchAllNotificationsByOwnerIdFailed());
      console.log("fetchAllNotificationsByOwnerIdFailed!!", e);
    }
  };
};

export const fetchAllNotificationsByOwnerIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_NOTIFICATIONS_BY_USERID_SUCCESS,
  notifications: data,
});

export const fetchAllNotificationsByOwnerIdFailed = () => ({
  type: actionTypes.FETCH_ALL_NOTIFICATIONS_BY_USERID_FAILED,
});

export const deleteANotification = (notificationId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteNotificationService(notificationId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the notification success!");
        dispatch(deleteNotificationSuccess());
        dispatch(fetchAllNotificationsStart());
      } else {
        toast.error("delete the notification error!");
        dispatch(deleteNotificationFailed());
      }
    } catch (e) {
      toast.error("delete the notification error!");
      dispatch(deleteNotificationFailed());
      console.log("saveNotificationFailed", e);
    }
  };
};

export const deleteANotificationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteNotificationService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the notification success!");
        dispatch(deleteNotificationSuccess());
        dispatch(fetchAllNotificationsByOwnerIdStart(data.userId));
      } else {
        toast.error("delete the notification error!");
        dispatch(deleteNotificationFailed());
      }
    } catch (e) {
      toast.error("delete the notification error!");
      dispatch(deleteNotificationFailed());
      console.log("saveNotificationFailed", e);
    }
  };
};

export const deleteNotificationSuccess = () => ({
  type: actionTypes.DELETE_NOTIFICATION_SUCCESS,
});

export const deleteNotificationFailed = () => ({
  type: actionTypes.DELETE_NOTIFICATION_FAILED,
});

export const editANotification = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editNotificationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the notification success!");
        dispatch(editNotificationSuccess());
        dispatch(fetchAllNotificationsStart());
      } else {
        toast.error("Update the notification error!");
        dispatch(editNotificationFailed());
        console.log("editNotificationFailed", res);
      }
    } catch (e) {
      toast.error("Update the notification error!!");
      dispatch(editNotificationFailed());
      console.log("editNotificationFailed", e);
    }
  };
};

export const editANotificationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editNotificationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the notification success!");
        dispatch(editNotificationSuccess());
        dispatch(fetchAllNotificationsByOwnerIdStart(data.userId));
      } else {
        toast.error("Update the notification error!");
        dispatch(editNotificationFailed());
        console.log("editNotificationFailed", res);
      }
    } catch (e) {
      toast.error("Update the notification error!!");
      dispatch(editNotificationFailed());
      console.log("editNotificationFailed", e);
    }
  };
};

export const editNotificationSuccess = () => ({
  type: actionTypes.EDIT_NOTIFICATION_SUCCESS,
});

export const editNotificationFailed = () => ({
  type: actionTypes.EDIT_NOTIFICATION_FAILED,
});
