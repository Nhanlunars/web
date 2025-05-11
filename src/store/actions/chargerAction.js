import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllChargers,
  createNewChargerService,
  getAllChargerByUserId,
  deleteChargerService,
  editChargerService,
} from "../../services/userService";

export const createNewCharger = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewChargerService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new charger success!");
        dispatch(saveChargerSuccess());
        dispatch(fetchAllChargersStart());
      } else {
        toast.error("create a new charger faild!");
        dispatch(saveChargerFailed());
        console.log("createChargerFailed", res);
      }
    } catch (e) {
      dispatch(saveChargerFailed());
      console.log("saveChargerFailed", e);
    }
  };
};

export const createNewChargerr = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewChargerService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new charger success!");
        dispatch(saveChargerSuccess());
        dispatch(fetchAllChargerByUserIdStart(data.userId));
      } else {
        toast.error("create a new charger faild!");
        dispatch(saveChargerFailed());
        console.log("createChargerFailed", res);
      }
    } catch (e) {
      dispatch(saveChargerFailed());
      console.log("saveChargerFailed", e);
    }
  };
};

export const saveChargerSuccess = () => ({
  type: actionTypes.CREATE_CHARGER_SUCCESS,
});

export const saveChargerFailed = () => ({
  type: actionTypes.CREATE_CHARGER_FAILED,
});

export const fetchAllChargersStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllChargers("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllChargersSuccess(res.chargers.reverse()));
        //  dispatch(fetchAllTypesSuccess(res.types.reverse()));
      } else {
        toast.error("fetch all charger error!");
        dispatch(fetchAllChargersFailed());
        console.log("fetchAllChargersFailed", res);
      }
    } catch (e) {
      toast.error("fetch all charger error!!");

      dispatch(fetchAllChargersFailed());
      console.log("fetchAllChargersFailed", e);
    }
  };
};

export const fetchAllChargersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CHARGERS_SUCCESS,
  chargers: data,
});

export const fetchAllChargersFailed = () => ({
  type: actionTypes.FETCH_ALL_CHARGERS_FAILED,
});

export const fetchAllChargerByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllChargerByUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(fetchAllChargerByLocationIdSuccess(res.chargers.reverse()));
      } else {
        toast.error("fetch all charger error!");
        dispatch(fetchAllChargerByLocationIdFailed());
        console.log("fetchAllChargersFailed", res);
      }
    } catch (e) {
      toast.error("fetch all charger error!!");

      dispatch(fetchAllChargerByLocationIdFailed());
      console.log("fetchAllChargersFailed", e);
    }
  };
};

export const fetchAllChargerByLocationIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CHARGER_BY_LOCATIONID_SUCCESS,
  chargers: data,
});

export const fetchAllChargerByLocationIdFailed = () => ({
  type: actionTypes.FETCH_ALL_CHARGER_BY_LOCATIONID_FAILED,
});

export const deleteACharger = (chargerId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteChargerService(chargerId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the charger success!");
        dispatch(deleteChargerSuccess());
        dispatch(fetchAllChargersStart());
      } else {
        toast.error("delete the charger error!");
        dispatch(deleteChargerFailed());
      }
    } catch (e) {
      toast.error("delete the charger error!");
      dispatch(deleteChargerFailed());
      console.log("saveChargerFailed", e);
    }
  };
};

export const deleteAChargerr = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteChargerService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the charger success!");
        dispatch(deleteChargerSuccess());
        dispatch(fetchAllChargerByUserIdStart(data.userId));
      } else {
        toast.error("delete the charger error!");
        dispatch(deleteChargerFailed());
      }
    } catch (e) {
      toast.error("delete the charger error!");
      dispatch(deleteChargerFailed());
      console.log("saveChargerFailed", e);
    }
  };
};

export const deleteChargerSuccess = () => ({
  type: actionTypes.DELETE_CHARGER_SUCCESS,
});

export const deleteChargerFailed = () => ({
  type: actionTypes.DELETE_CHARGER_FAILED,
});

export const editACharger = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editChargerService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the charger success!");
        dispatch(editChargerSuccess());
        dispatch(fetchAllChargersStart());
      } else {
        toast.error("Update the charger error!");
        dispatch(editChargerFailed());
        console.log("editChargerFailed", res);
      }
    } catch (e) {
      toast.error("Update the charger error!!");
      dispatch(editChargerFailed());
      console.log("editChargerFailed", e);
    }
  };
};

export const editAChargerr = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editChargerService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the charger success!");
        dispatch(editChargerSuccess());
        dispatch(fetchAllChargerByUserIdStart(data.userId));
      } else {
        toast.error("Update the charger error!");
        dispatch(editChargerFailed());
        console.log("editChargerFailed", res);
      }
    } catch (e) {
      toast.error("Update the charger error!!");
      dispatch(editChargerFailed());
      console.log("editChargerFailed", e);
    }
  };
};

export const editChargerSuccess = () => ({
  type: actionTypes.EDIT_CHARGER_SUCCESS,
});

export const editChargerFailed = () => ({
  type: actionTypes.EDIT_CHARGER_FAILED,
});
