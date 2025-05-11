import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllLocations,
  createNewLocationService,
  getAllLocationByUserId,
  searchLocations,
  deleteLocationService,
  editLocationService,
} from "../../services/userService";

export const createNewLocation = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewLocationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        dispatch(saveLocationSuccess());
        dispatch(fetchAllLocationsStart());
      } else {
        toast.error(res.errMessage);
        dispatch(saveLocationFailed());
      }
    } catch (e) {
      dispatch(saveLocationFailed());
      console.log("saveLocationFailed", e);
    }
  };
};

export const createNewLocationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewLocationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        dispatch(saveLocationSuccess());
        dispatch(fetchAllLocationByUserIdStart(data.userId));
      } else {
        toast.error(res.errMessage);
        dispatch(saveLocationFailed());
      }
    } catch (e) {
      dispatch(saveLocationFailed());
      console.log("saveLocationFailed", e);
    }
  };
};

export const saveLocationSuccess = () => ({
  type: actionTypes.CREATE_LOCATION_SUCCESS,
});

export const saveLocationFailed = () => ({
  type: actionTypes.CREATE_LOCATION_FAILED,
});

export const fetchAllLocationsStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllLocations("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllLocationsSuccess(res.locations.reverse()));
      } else {
        toast.error("fetch all location error!!!!");
        dispatch(fetchAllLocationsFailed());
      }
    } catch (e) {
      toast.error("fetch all location error!");

      dispatch(fetchAllLocationsFailed());
      console.log("fetchAllLocationsFailed", e);
    }
  };
};

export const fetchAllLocationsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_LOCATIONS_SUCCESS,
  locations: data,
});

export const fetchAllLocationsFailed = () => ({
  type: actionTypes.FETCH_ALL_LOCATIONS_FAILED,
});

export const fetchAllLocationByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllLocationByUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(fetchAllLocationByUserIdSuccess(res.locations.reverse()));
      } else {
        toast.error("fetch all location error!!!!");
        dispatch(fetchAllLocationByUserIdFailed());
      }
    } catch (e) {
      toast.error("fetch all location error!");
      dispatch(fetchAllLocationByUserIdFailed());
      console.log("fetchAllLocationsFailed", e);
    }
  };
};

export const fetchAllLocationByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_LOCATION_BY_USERID_SUCCESS,
  locations: data,
});

export const fetchAllLocationByUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_LOCATION_BY_USERID_FAILED,
});

export const searchLocationsStart = (keyword) => {
  return async (dispatch, getState) => {
    try {
      let res = await searchLocations(keyword);
      if (res && res.errCode === 0) {
        dispatch(fetchAllLocationsSuccess(res.locations)); // Reuse existing success action
      } else {
        toast.error("Search location failed!");
        dispatch(fetchAllLocationsFailed());
      }
    } catch (e) {
      toast.error("Search location error!");
      dispatch(fetchAllLocationsFailed());
      console.log("searchLocationsFailed", e);
    }
  };
};

export const deleteALocation = (locationId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteLocationService(locationId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the location success!");
        dispatch(deleteLocationSuccess());
        dispatch(fetchAllLocationsStart());
      } else {
        toast.error("delete the location error!");
        dispatch(deleteLocationFailed());
      }
    } catch (e) {
      toast.error("delete the location error!");
      dispatch(deleteLocationFailed());
      console.log("saveLocationFailed", e);
    }
  };
};

export const deleteALocationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteLocationService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the location success!");
        dispatch(deleteLocationSuccess());
        dispatch(fetchAllLocationByUserIdStart(data.userId));
      } else {
        toast.error("delete the location error!");
        dispatch(deleteLocationFailed());
      }
    } catch (e) {
      toast.error("delete the location error!");
      dispatch(deleteLocationFailed());
      console.log("saveLocationFailed", e);
    }
  };
};

export const deleteLocationSuccess = () => ({
  type: actionTypes.DELETE_LOCATION_SUCCESS,
});

export const deleteLocationFailed = () => ({
  type: actionTypes.DELETE_LOCATION_FAILED,
});

export const editALocation = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editLocationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the location success!");
        dispatch(editLocationSuccess());
        dispatch(fetchAllLocationsStart());
      } else {
        toast.error("Update the location error!");
        dispatch(editLocationFailed());
        console.log("editLocationFailed1", res);
      }
    } catch (e) {
      toast.error("Update the location error!!");
      dispatch(editLocationFailed());
      console.log("editLocationFailed", e);
    }
  };
};

export const editALocationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editLocationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the location success!");
        dispatch(editLocationSuccess());
        dispatch(fetchAllLocationByUserIdStart(data.user_id));
      } else {
        toast.error("Update the location error!");
        dispatch(editLocationFailed());
        console.log("editLocationFailed1", res);
      }
    } catch (e) {
      toast.error("Update the location error!!");
      dispatch(editLocationFailed());
      console.log("editLocationFailed", e);
    }
  };
};

export const editLocationSuccess = () => ({
  type: actionTypes.EDIT_LOCATION_SUCCESS,
});

export const editLocationFailed = () => ({
  type: actionTypes.EDIT_LOCATION_FAILED,
});
