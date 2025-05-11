import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllMaintenances,
  createNewMaintenanceService,
  getAllMaintenancesByUserId,
  deleteMaintenanceService,
  editMaintenanceService,
} from "../../services/userService";

export const createNewMaintenance = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewMaintenanceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new maintenance success!");
        dispatch(saveMaintenanceSuccess());
        dispatch(fetchAllMaintenancesStart());
      } else {
        toast.error("create a new maintenance faild!!");
        dispatch(saveMaintenanceFailed());
        console.log("createMaintenanceFailed", res);
      }
    } catch (e) {
      dispatch(saveMaintenanceFailed());
      console.log("saveMaintenanceFailed", e);
    }
  };
};

export const createNewMaintenancee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewMaintenanceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new maintenance success!");
        dispatch(saveMaintenanceSuccess());
        dispatch(fetchAllMaintenancesByUserIdStart(data.userId));
      } else {
        toast.error("create a new maintenance faild!!");
        dispatch(saveMaintenanceFailed());
        console.log("createMaintenanceFailed", res);
      }
    } catch (e) {
      dispatch(saveMaintenanceFailed());
      console.log("saveMaintenanceFailed", e);
    }
  };
};

export const saveMaintenanceSuccess = () => ({
  type: actionTypes.CREATE_MAINTENANCE_SUCCESS,
});

export const saveMaintenanceFailed = () => ({
  type: actionTypes.CREATE_MAINTENANCE_FAILED,
});

export const fetchAllMaintenancesStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllMaintenances("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllMaintenancesSuccess(res.maintenances.reverse()));
      } else {
        toast.error("fetch all maintenance error!");
        dispatch(fetchAllMaintenancesFailed());
        console.log("fetchAllMaintenancesFailed", res);
      }
    } catch (e) {
      toast.error("fetch all maintenance error!!");

      dispatch(fetchAllMaintenancesFailed());
      console.log("fetchAllMaintenancesFailed", e);
    }
  };
};

export const fetchAllMaintenancesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_MAINTENANCES_SUCCESS,
  maintenances: data,
});

export const fetchAllMaintenancesFailed = () => ({
  type: actionTypes.FETCH_ALL_MAINTENANCES_FAILED,
});

export const fetchAllMaintenancesByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllMaintenancesByUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(
          fetchAllMaintenancesByUserIdSuccess(res.maintenances.reverse())
        );
      } else {
        toast.error("fetch all maintenance error!");
        dispatch(fetchAllMaintenancesByUserIdFailed());
        console.log("fetchAllMaintenancesFailed", res);
      }
    } catch (e) {
      toast.error("fetch all maintenance error!!");

      dispatch(fetchAllMaintenancesByUserIdFailed());
      console.log("fetchAllMaintenancesFailed", e);
    }
  };
};

export const fetchAllMaintenancesByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_MAINTENANCES_BY_USERID_SUCCESS,
  maintenances: data,
});

export const fetchAllMaintenancesByUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_MAINTENANCES_BY_USERID_FAILED,
});

export const deleteAMaintenance = (maintenanceId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteMaintenanceService(maintenanceId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the maintenance success!");
        dispatch(deleteMaintenanceSuccess());
        dispatch(fetchAllMaintenancesStart());
      } else {
        toast.error("delete the maintenance error!");
        dispatch(deleteMaintenanceFailed());
      }
    } catch (e) {
      toast.error("delete the maintenance error!");
      dispatch(deleteMaintenanceFailed());
      console.log("saveMaintenanceFailed", e);
    }
  };
};

export const deleteAMaintenancee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteMaintenanceService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the maintenance success!");
        dispatch(deleteMaintenanceSuccess());
        dispatch(fetchAllMaintenancesByUserIdStart(data.userId));
      } else {
        toast.error("delete the maintenance error!");
        dispatch(deleteMaintenanceFailed());
      }
    } catch (e) {
      toast.error("delete the maintenance error!");
      dispatch(deleteMaintenanceFailed());
      console.log("saveMaintenanceFailed", e);
    }
  };
};

export const deleteMaintenanceSuccess = () => ({
  type: actionTypes.DELETE_MAINTENANCE_SUCCESS,
});

export const deleteMaintenanceFailed = () => ({
  type: actionTypes.DELETE_MAINTENANCE_FAILED,
});

export const editAMaintenance = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editMaintenanceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the maintenance success!");
        dispatch(editMaintenanceSuccess());
        dispatch(fetchAllMaintenancesStart());
      } else {
        toast.error("Update the maintenance error!");
        dispatch(editMaintenanceFailed());
        console.log("editMaintenanceFailed", res);
      }
    } catch (e) {
      toast.error("Update the maintenance error!!");
      dispatch(editMaintenanceFailed());
      console.log("editMaintenanceFailed", e);
    }
  };
};

export const editAMaintenancee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editMaintenanceService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the maintenance success!");
        dispatch(editMaintenanceSuccess());
        dispatch(fetchAllMaintenancesByUserIdStart(data.userId));
      } else {
        toast.error("Update the maintenance error!");
        dispatch(editMaintenanceFailed());
        console.log("editMaintenanceFailed", res);
      }
    } catch (e) {
      toast.error("Update the maintenance error!!");
      dispatch(editMaintenanceFailed());
      console.log("editMaintenanceFailed", e);
    }
  };
};

export const editMaintenanceSuccess = () => ({
  type: actionTypes.EDIT_MAINTENANCE_SUCCESS,
});

export const editMaintenanceFailed = () => ({
  type: actionTypes.EDIT_MAINTENANCE_FAILED,
});
