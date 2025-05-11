import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllHistorys,
  createNewHistoryService,
  getAllHistorysbyUserId,
  deleteHistoryService,
  editHistoryService,
} from "../../services/userService";

export const createNewHistory = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewHistoryService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new history success!");
        dispatch(saveHistorySuccess());
        dispatch(fetchAllHistorysStart());
      } else {
        toast.error("create a new history faild!!");
        dispatch(saveHistoryFailed());
        console.log("createHistoryFailed", res);
      }
    } catch (e) {
      dispatch(saveHistoryFailed());
      console.log("saveHistoryFailed", e);
    }
  };
};

export const createNewHistoryy = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewHistoryService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new history success!");
        dispatch(saveHistorySuccess());
        dispatch(fetchAllHistorysbyUserId(data.userId));
      } else {
        toast.error("create a new history faild!!");
        dispatch(saveHistoryFailed());
        console.log("createHistoryFailed", res);
      }
    } catch (e) {
      dispatch(saveHistoryFailed());
      console.log("saveHistoryFailed", e);
    }
  };
};

export const saveHistorySuccess = () => ({
  type: actionTypes.CREATE_HISTORY_SUCCESS,
});

export const saveHistoryFailed = () => ({
  type: actionTypes.CREATE_HISTORY_FAILED,
});

export const fetchAllHistorysStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllHistorys("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllHistorysSuccess(res.historys.reverse()));
      } else {
        toast.error("fetch all history error!");
        dispatch(fetchAllHistorysFailed());
        console.log("fetchAllHistorysFailed", res);
      }
    } catch (e) {
      toast.error("fetch all history error!!");

      dispatch(fetchAllHistorysFailed());
      console.log("fetchAllHistorysFailed", e);
    }
  };
};

export const fetchAllHistorysSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_HISTORYS_SUCCESS,
  historys: data,
});

export const fetchAllHistorysFailed = () => ({
  type: actionTypes.FETCH_ALL_HISTORYS_FAILED,
});

export const fetchAllHistorysbyUserId = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllHistorysbyUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(fetchAllHistorysbyUserIdSuccess(res.historys.reverse()));
      } else {
        toast.error("fetch all history error!");
        dispatch(fetchAllHistorysbyUserIdFailed());
        console.log("fetchAllHistorysFailed", res);
      }
    } catch (e) {
      toast.error("fetch all history error!!");

      dispatch(fetchAllHistorysbyUserIdFailed());
      console.log("fetchAllHistorysFailed", e);
    }
  };
};

export const fetchAllHistorysbyUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_HISTORYS_BY_USERID_SUCCESS,
  historys: data,
});

export const fetchAllHistorysbyUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_HISTORYS_BY_USERID_FAILED,
});

export const deleteAHistory = (historyId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteHistoryService(historyId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the history success!");
        dispatch(deleteHistorySuccess());
        dispatch(fetchAllHistorysStart());
      } else {
        toast.error("delete the history error!");
        dispatch(deleteHistoryFailed());
      }
    } catch (e) {
      toast.error("delete the history error!");
      dispatch(deleteHistoryFailed());
      console.log("saveHistoryFailed", e);
    }
  };
};

export const deleteAHistoryy = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteHistoryService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the history success!");
        dispatch(deleteHistorySuccess());
        dispatch(fetchAllHistorysbyUserId(data.userId));
      } else {
        toast.error("delete the history error!");
        dispatch(deleteHistoryFailed());
      }
    } catch (e) {
      toast.error("delete the history error!");
      dispatch(deleteHistoryFailed());
      console.log("saveHistoryFailed", e);
    }
  };
};

export const deleteHistorySuccess = () => ({
  type: actionTypes.DELETE_HISTORY_SUCCESS,
});

export const deleteHistoryFailed = () => ({
  type: actionTypes.DELETE_HISTORY_FAILED,
});

export const editAHistory = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editHistoryService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the history success!");
        dispatch(editHistorySuccess());
        dispatch(fetchAllHistorysStart());
      } else {
        toast.error("Update the history error!");
        dispatch(editHistoryFailed());
        console.log("editHistoryFailed", res);
      }
    } catch (e) {
      toast.error("Update the history error!!");
      dispatch(editHistoryFailed());
      console.log("editHistoryFailed", e);
    }
  };
};

export const editAHistoryy = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editHistoryService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the history success!");
        dispatch(editHistorySuccess());
        dispatch(fetchAllHistorysbyUserId(data.userId));
      } else {
        toast.error("Update the history error!");
        dispatch(editHistoryFailed());
        console.log("editHistoryFailed", res);
      }
    } catch (e) {
      toast.error("Update the history error!!");
      dispatch(editHistoryFailed());
      console.log("editHistoryFailed", e);
    }
  };
};

export const editHistorySuccess = () => ({
  type: actionTypes.EDIT_HISTORY_SUCCESS,
});

export const editHistoryFailed = () => ({
  type: actionTypes.EDIT_HISTORY_FAILED,
});
