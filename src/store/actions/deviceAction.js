import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllDevices,
  createNewDeviceService,
  getAllDevicesByUserId,
  deleteDeviceService,
  editDeviceService,
} from "../../services/userService";

export const createNewDevice = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewDeviceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new device success!");
        dispatch(saveDeviceSuccess());
        dispatch(fetchAllDevicesStart());
      } else {
        toast.error("create a new device faild!!");
        dispatch(saveDeviceFailed());
        console.log("createDeviceFailed", res);
      }
    } catch (e) {
      dispatch(saveDeviceFailed());
      console.log("saveDeviceFailed", e);
    }
  };
};

export const createNewDevicee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewDeviceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new device success!");
        dispatch(saveDeviceSuccess());
        dispatch(fetchAllDevicesByUserIdStart(data.userId));
      } else {
        toast.error("create a new device faild!!");
        dispatch(saveDeviceFailed());
        console.log("createDeviceFailed", res);
      }
    } catch (e) {
      dispatch(saveDeviceFailed());
      console.log("saveDeviceFailed", e);
    }
  };
};

export const saveDeviceSuccess = () => ({
  type: actionTypes.CREATE_DEVICE_SUCCESS,
});

export const saveDeviceFailed = () => ({
  type: actionTypes.CREATE_DEVICE_FAILED,
});

export const fetchAllDevicesStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllDevices("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllDevicesSuccess(res.devices.reverse()));
      } else {
        toast.error("fetch all device error!");
        dispatch(fetchAllDevicesFailed());
        console.log("fetchAllDevicesFailed", res);
      }
    } catch (e) {
      toast.error("fetch all device error!!");

      dispatch(fetchAllDevicesFailed());
      console.log("fetchAllDevicesFailed", e);
    }
  };
};

export const fetchAllDevicesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DEVICES_SUCCESS,
  devices: data,
});

export const fetchAllDevicesFailed = () => ({
  type: actionTypes.FETCH_ALL_DEVICES_FAILED,
});

export const fetchAllDevicesByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllDevicesByUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(fetchAllDevicesByUserIdSuccess(res.devices.reverse()));
      } else {
        toast.error("fetch all device error!");
        dispatch(fetchAllDevicesByUserIdFailed());
        console.log("fetchAllDevicesFailed", res);
      }
    } catch (e) {
      toast.error("fetch all device error!!");

      dispatch(fetchAllDevicesByUserIdFailed());
      console.log("fetchAllDevicesFailed", e);
    }
  };
};

export const fetchAllDevicesByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DEVICES_BY_USERID_SUCCESS,
  devices: data,
});

export const fetchAllDevicesByUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_DEVICES_BY_USERID_FAILED,
});

export const deleteADevice = (deviceId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteDeviceService(deviceId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the device success!");
        dispatch(deleteDeviceSuccess());
        dispatch(fetchAllDevicesStart());
      } else {
        toast.error("delete the device error!");
        dispatch(deleteDeviceFailed());
      }
    } catch (e) {
      toast.error("delete the device error!");
      dispatch(deleteDeviceFailed());
      console.log("saveDeviceFailed", e);
    }
  };
};

export const deleteADevicee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteDeviceService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the device success!");
        dispatch(deleteDeviceSuccess());
        dispatch(fetchAllDevicesByUserIdStart(data.userId));
      } else {
        toast.error("delete the device error!");
        dispatch(deleteDeviceFailed());
      }
    } catch (e) {
      toast.error("delete the device error!");
      dispatch(deleteDeviceFailed());
      console.log("saveDeviceFailed", e);
    }
  };
};

export const deleteDeviceSuccess = () => ({
  type: actionTypes.DELETE_DEVICE_SUCCESS,
});

export const deleteDeviceFailed = () => ({
  type: actionTypes.DELETE_DEVICE_FAILED,
});

export const editADevice = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editDeviceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the device success!");
        dispatch(editDeviceSuccess());
        dispatch(fetchAllDevicesStart());
      } else {
        toast.error("Update the device error!");
        dispatch(editDeviceFailed());
        console.log("editDeviceFailed", res);
      }
    } catch (e) {
      toast.error("Update the device error!!");
      dispatch(editDeviceFailed());
      console.log("editDeviceFailed", e);
    }
  };
};

export const editADevicee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editDeviceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the device success!");
        dispatch(editDeviceSuccess());
        dispatch(fetchAllDevicesByUserIdStart(data.userId));
      } else {
        toast.error("Update the device error!");
        dispatch(editDeviceFailed());
        console.log("editDeviceFailed", res);
      }
    } catch (e) {
      toast.error("Update the device error!!");
      dispatch(editDeviceFailed());
      console.log("editDeviceFailed", e);
    }
  };
};

export const editDeviceSuccess = () => ({
  type: actionTypes.EDIT_DEVICE_SUCCESS,
});

export const editDeviceFailed = () => ({
  type: actionTypes.EDIT_DEVICE_FAILED,
});
