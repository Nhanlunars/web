import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllOtps,
  createNewOtpService,
  deleteOtpService,
  editOtpService,
} from "../../services/userService";

export const createNewOtp = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewOtpService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new otp success!");
        dispatch(saveOtpSuccess());
        dispatch(fetchAllOtpsStart());
      } else {
        toast.error("create a new otp faild!!");
        dispatch(saveOtpFailed());
        console.log("createOtpFailed", res);
      }
    } catch (e) {
      dispatch(saveOtpFailed());
      console.log("saveOtpFailed", e);
    }
  };
};

export const saveOtpSuccess = () => ({
  type: actionTypes.CREATE_OTP_SUCCESS,
});

export const saveOtpFailed = () => ({
  type: actionTypes.CREATE_OTP_FAILED,
});

export const fetchAllOtpsStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllOtps("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllOtpsSuccess(res.otps.reverse()));
      } else {
        toast.error("fetch all otp error!");
        dispatch(fetchAllOtpsFailed());
        console.log("fetchAllOtpsFailed", res);
      }
    } catch (e) {
      toast.error("fetch all otp error!!");

      dispatch(fetchAllOtpsFailed());
      console.log("fetchAllOtpsFailed", e);
    }
  };
};

export const fetchAllOtpsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_OTPS_SUCCESS,
  otps: data,
});

export const fetchAllOtpsFailed = () => ({
  type: actionTypes.FETCH_ALL_OTPS_FAILED,
});

export const deleteAOtp = (otpId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteOtpService(otpId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the otp success!");
        dispatch(deleteOtpSuccess());
        dispatch(fetchAllOtpsStart());
      } else {
        toast.error("delete the otp error!");
        dispatch(deleteOtpFailed());
      }
    } catch (e) {
      toast.error("delete the otp error!");
      dispatch(deleteOtpFailed());
      console.log("saveOtpFailed", e);
    }
  };
};


export const deleteOtpSuccess = () => ({
  type: actionTypes.DELETE_OTP_SUCCESS,
});

export const deleteOtpFailed = () => ({
  type: actionTypes.DELETE_OTP_FAILED,
});

export const editAOtp = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editOtpService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the otp success!");
        dispatch(editOtpSuccess());
        dispatch(fetchAllOtpsStart());
      } else {
        toast.error("Update the otp error!");
        dispatch(editOtpFailed());
        console.log("editOtpFailed", res);
      }
    } catch (e) {
      toast.error("Update the otp error!!");
      dispatch(editOtpFailed());
      console.log("editOtpFailed", e);
    }
  };
};

export const editOtpSuccess = () => ({
  type: actionTypes.EDIT_OTP_SUCCESS,
});

export const editOtpFailed = () => ({
  type: actionTypes.EDIT_OTP_FAILED,
});


