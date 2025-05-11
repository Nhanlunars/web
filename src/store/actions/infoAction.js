import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllInfos,
  createNewInfoService,
  getAllInfosByUserId,
  deleteInfoService,
  editInfoService,
} from "../../services/userService";

export const createNewInfo = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewInfoService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new history success!");
        dispatch(saveInfoSuccess());
        dispatch(fetchAllInfosStart());
      } else {
        toast.error("create a new history faild!!");
        dispatch(saveInfoFailed());
        console.log("createInfoFailed", res);
      }
    } catch (e) {
      dispatch(saveInfoFailed());
      console.log("saveInfoFailed", e);
    }
  };
};

export const createNewInfoo = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewInfoService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new history success!");
        dispatch(saveInfoSuccess());
        dispatch(fetchAllInfosByUserIdStart(data.userId));
      } else {
        toast.error("create a new history faild!!");
        dispatch(saveInfoFailed());
        console.log("createInfoFailed", res);
      }
    } catch (e) {
      dispatch(saveInfoFailed());
      console.log("saveInfoFailed", e);
    }
  };
};

export const saveInfoSuccess = () => ({
  type: actionTypes.CREATE_INFO_SUCCESS,
});

export const saveInfoFailed = () => ({
  type: actionTypes.CREATE_INFO_FAILED,
});

export const fetchAllInfosStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllInfos("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllInfosSuccess(res.infos.reverse()));
      } else {
        toast.error("fetch all info error!");
        dispatch(fetchAllInfosFailed());
        console.log("fetchAllInfosFailed", res);
      }
    } catch (e) {
      toast.error("fetch all info error!!");

      dispatch(fetchAllInfosFailed());
      console.log("fetchAllInfosFailed", e);
    }
  };
};

export const fetchAllInfosSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_INFOS_SUCCESS,
  infos: data,
});

export const fetchAllInfosFailed = () => ({
  type: actionTypes.FETCH_ALL_INFOS_FAILED,
});

export const fetchAllInfosByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllInfosByUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(fetchAllInfosByUserIdSuccess(res.infos.reverse()));
      } else {
        toast.error("fetch all info by userid error!");
        dispatch(fetchAllInfosByUserIdFailed());
        console.log("fetchAllInfosByUserIdFailed", res);
      }
    } catch (e) {
      toast.error("fetch all info by userid error!!");

      dispatch(fetchAllInfosByUserIdFailed());
      console.log("fetchAllInfosByUserIdFailed", e);
    }
  };
};

export const fetchAllInfosByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_INFOS_BY_USERID_SUCCESS,
  infos: data,
});

export const fetchAllInfosByUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_INFOS_BY_USERID_FAILED,
});

export const deleteAInfo = (infoId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteInfoService(infoId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the info success!");
        dispatch(deleteInfoSuccess());
        dispatch(fetchAllInfosStart());
      } else {
        toast.error("delete the info error!");
        dispatch(deleteInfoFailed());
      }
    } catch (e) {
      toast.error("delete the info error!");
      dispatch(deleteInfoFailed());
      console.log("saveInfoFailed", e);
    }
  };
};

export const deleteAInfoo = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteInfoService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the info success!");
        dispatch(deleteInfoSuccess());
        dispatch(fetchAllInfosByUserIdStart(data.userId));
      } else {
        toast.error("delete the info error!");
        dispatch(deleteInfoFailed());
      }
    } catch (e) {
      toast.error("delete the info error!");
      dispatch(deleteInfoFailed());
      console.log("saveInfoFailed", e);
    }
  };
};

export const deleteInfoSuccess = () => ({
  type: actionTypes.DELETE_INFO_SUCCESS,
});

export const deleteInfoFailed = () => ({
  type: actionTypes.DELETE_INFO_FAILED,
});

export const editAInfo = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editInfoService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the info success!");
        dispatch(editInfoSuccess());
        dispatch(fetchAllInfosStart());
      } else {
        toast.error("Update the info error!");
        dispatch(editInfoFailed());
        console.log("editInfoFailed", res);
      }
    } catch (e) {
      toast.error("Update the info error!!");
      dispatch(editInfoFailed());
      console.log("editInfoFailed", e);
    }
  };
};

export const editAInfoo = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editInfoService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the info success!");
        dispatch(editInfoSuccess());
        dispatch(fetchAllInfosByUserIdStart(data.userId));
      } else {
        toast.error("Update the info error!");
        dispatch(editInfoFailed());
        console.log("editInfoFailed", res);
      }
    } catch (e) {
      toast.error("Update the info error!!");
      dispatch(editInfoFailed());
      console.log("editInfoFailed", e);
    }
  };
};

export const editInfoSuccess = () => ({
  type: actionTypes.EDIT_INFO_SUCCESS,
});

export const editInfoFailed = () => ({
  type: actionTypes.EDIT_INFO_FAILED,
});
