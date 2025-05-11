import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllFeedbacks,
  createNewFeedbackService,
  getAllFeedbackByOwnerId,
  deleteFeedbackService,
  editFeedbackService,
} from "../../services/userService";

export const createNewFeedback = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewFeedbackService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new history success!");
        dispatch(saveFeedbackSuccess());
        dispatch(fetchAllFeedbacksStart());
      } else {
        toast.error("create a new history faild!!");
        dispatch(saveFeedbackFailed());
        console.log("createFeedbackFailed", res);
      }
    } catch (e) {
      dispatch(saveFeedbackFailed());
      console.log("saveFeedbackFailed", e);
    }
  };
};

export const createNewFeedbackk = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewFeedbackService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new history success!");
        dispatch(saveFeedbackSuccess());
        dispatch(fetchAllFeedbacksByUserIdStart(data.userId));
      } else {
        toast.error("create a new history faild!!");
        dispatch(saveFeedbackFailed());
        console.log("createFeedbackFailed", res);
      }
    } catch (e) {
      dispatch(saveFeedbackFailed());
      console.log("saveFeedbackFailed", e);
    }
  };
};

export const saveFeedbackSuccess = () => ({
  type: actionTypes.CREATE_FEEDBACK_SUCCESS,
});

export const saveFeedbackFailed = () => ({
  type: actionTypes.CREATE_FEEDBACK_FAILED,
});

export const fetchAllFeedbacksStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllFeedbacks("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllFeedbacksSuccess(res.feedbacks.reverse()));
      } else {
        toast.error("fetch all feedback error!");
        dispatch(fetchAllFeedbacksFailed());
        console.log("fetchAllFeedbacksFailed", res);
      }
    } catch (e) {
      toast.error("fetch all feedback error!!");

      dispatch(fetchAllFeedbacksFailed());
      console.log("fetchAllFeedbacksFailed", e);
    }
  };
};

export const fetchAllFeedbacksSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_FEEDBACKS_SUCCESS,
  feedbacks: data,
});

export const fetchAllFeedbacksFailed = () => ({
  type: actionTypes.FETCH_ALL_FEEDBACKS_FAILED,
});

export const fetchAllFeedbacksByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllFeedbackByOwnerId(userId);
      if (res && res.errCode === 0) {
        dispatch(fetchAllFeedbacksByUserIdSuccess(res.feedbacks.reverse()));
      } else {
        toast.error("fetch all feedback error!");
        dispatch(fetchAllFeedbacksByUserIdFailed());
        console.log("fetchAllFeedbacksFailed", res);
      }
    } catch (e) {
      toast.error("fetch all feedback error!!");

      dispatch(fetchAllFeedbacksByUserIdFailed());
      console.log("fetchAllFeedbacksFailed", e);
    }
  };
};

export const fetchAllFeedbacksByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_FEEDBACKS_BY_USREID_SUCCESS,
  feedbacks: data,
});

export const fetchAllFeedbacksByUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_FEEDBACKS_BY_USREID_FAILED,
});

export const deleteAFeedback = (feedbackId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteFeedbackService(feedbackId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the feedback success!");
        dispatch(deleteFeedbackSuccess());
        dispatch(fetchAllFeedbacksStart());
      } else {
        toast.error("delete the feedback error!");
        dispatch(deleteFeedbackFailed());
      }
    } catch (e) {
      toast.error("delete the feedback error!");
      dispatch(deleteFeedbackFailed());
      console.log("saveFeedbackFailed", e);
    }
  };
};

export const deleteAFeedbackk = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteFeedbackService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the feedback success!");
        dispatch(deleteFeedbackSuccess());
        dispatch(fetchAllFeedbacksByUserIdStart(data.userId));
      } else {
        toast.error("delete the feedback error!");
        dispatch(deleteFeedbackFailed());
      }
    } catch (e) {
      toast.error("delete the feedback error!");
      dispatch(deleteFeedbackFailed());
      console.log("saveFeedbackFailed", e);
    }
  };
};

export const deleteFeedbackSuccess = () => ({
  type: actionTypes.DELETE_FEEDBACK_SUCCESS,
});

export const deleteFeedbackFailed = () => ({
  type: actionTypes.DELETE_FEEDBACK_FAILED,
});

export const editAFeedback = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editFeedbackService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the feedback success!");
        dispatch(editFeedbackSuccess());
        dispatch(fetchAllFeedbacksStart());
      } else {
        toast.error("Update the feedback error!");
        dispatch(editFeedbackFailed());
        console.log("editFeedbackFailed", res);
      }
    } catch (e) {
      toast.error("Update the feedback error!!");
      dispatch(editFeedbackFailed());
      console.log("editFeedbackFailed", e);
    }
  };
};

export const editAFeedbackk = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editFeedbackService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the feedback success!");
        dispatch(editFeedbackSuccess());
        dispatch(fetchAllFeedbacksByUserIdStart(data.userId));
      } else {
        toast.error("Update the feedback error!");
        dispatch(editFeedbackFailed());
        console.log("editFeedbackFailed", res);
      }
    } catch (e) {
      toast.error("Update the feedback error!!");
      dispatch(editFeedbackFailed());
      console.log("editFeedbackFailed", e);
    }
  };
};

export const editFeedbackSuccess = () => ({
  type: actionTypes.EDIT_FEEDBACK_SUCCESS,
});

export const editFeedbackFailed = () => ({
  type: actionTypes.EDIT_FEEDBACK_FAILED,
});
