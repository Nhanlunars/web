import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllTypes,
  createNewTypeService,
  getAllTypeByChargerId,
  getAllTypeByUserId,
  deleteTypeService,
  editTypeService,
} from "../../services/userService";

export const createNewType = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewTypeService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new type success!");
        dispatch(saveTypeSuccess());
        dispatch(fetchAllTypesStart());
      } else {
        toast.error("create a new type faild!!");
        dispatch(saveTypeFailed());
        console.log("createTypeFailed", res);
      }
    } catch (e) {
      dispatch(saveTypeFailed());
      console.log("saveTypeFailed", e);
    }
  };
};

export const createNewTypee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewTypeService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new type success!");
        dispatch(saveTypeSuccess());
        dispatch(fetchAllTypeByUserIdStart(data.userId));
      } else {
        toast.error("create a new type faild!!");
        dispatch(saveTypeFailed());
        console.log("createTypeFailed", res);
      }
    } catch (e) {
      dispatch(saveTypeFailed());
      console.log("saveTypeFailed", e);
    }
  };
};

export const saveTypeSuccess = () => ({
  type: actionTypes.CREATE_TYPE_SUCCESS,
});

export const saveTypeFailed = () => ({
  type: actionTypes.CREATE_TYPE_FAILED,
});

export const fetchAllTypesStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllTypes("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllTypesSuccess(res.types.reverse()));
      } else {
        toast.error("fetch all type error!");
        dispatch(fetchAllTypesFailed());
        console.log("fetchAllTypesFailed", res);
      }
    } catch (e) {
      toast.error("fetch all type error!!");

      dispatch(fetchAllTypesFailed());
      console.log("fetchAllTypesFailed", e);
    }
  };
};

export const fetchAllTypesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_TYPES_SUCCESS,
  types: data,
});

export const fetchAllTypesFailed = () => ({
  type: actionTypes.FETCH_ALL_TYPES_FAILED,
});

export const fetchAllTypeByChargerIdStart = (charger_id) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllTypeByChargerId(charger_id);
      if (res && res.errCode === 0) {
        dispatch(fetchAllTypeByChargerIdSuccess(res.types.reverse()));
        console.log("ok ok", res);
      } else {
        //toast.error("fetch all type by chargerId error!");
        dispatch(fetchAllTypeByChargerIdFailed());
        console.log("fetchAllTypesFailed", res);
      }
    } catch (e) {
      //toast.error("fetch all type by chargerId error!!");
      dispatch(fetchAllTypeByChargerIdFailed());
      console.log("fetchAllTypesFailed", e);
    }
  };
};

export const fetchAllTypeByChargerIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_TYPE_BY_CHARGERID_SUCCESS,
  types: data,
});

export const fetchAllTypeByChargerIdFailed = () => ({
  type: actionTypes.FETCH_ALL_TYPE_BY_CHARGERID_FAILED,
});

export const fetchAllTypeByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllTypeByUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(fetchAllTypeByUserIdSuccess(res.types.reverse()));
      } else {
        toast.error("fetch all type by userid error!");
        dispatch(fetchAllTypeByUserIdFailed());
        console.log("fetchAllTypesByUserIdFailed", res);
      }
    } catch (e) {
      toast.error("fetch all type by userid error!!");
      dispatch(fetchAllTypeByUserIdFailed());
      console.log("fetchAllTypesByUserIdFailed", e);
    }
  };
};

export const fetchAllTypeByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_TYPE_BY_USERID_SUCCESS,
  types: data,
});

export const fetchAllTypeByUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_TYPE_BY_USERID_FAILED,
});

export const deleteAType = (typeId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteTypeService(typeId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the type success!");
        dispatch(deleteTypeSuccess());
        dispatch(fetchAllTypesStart());
      } else {
        toast.error("delete the type error!");
        dispatch(deleteTypeFailed());
      }
    } catch (e) {
      toast.error("delete the type error!");
      dispatch(deleteTypeFailed());
      console.log("saveTypeFailed", e);
    }
  };
};

export const deleteATypee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteTypeService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the type success!");
        dispatch(deleteTypeSuccess());
        dispatch(fetchAllTypeByUserIdStart(data.userId));
      } else {
        toast.error("delete the type error!");
        dispatch(deleteTypeFailed());
      }
    } catch (e) {
      toast.error("delete the type error!");
      dispatch(deleteTypeFailed());
      console.log("saveTypeFailed", e);
    }
  };
};

export const deleteTypeSuccess = () => ({
  type: actionTypes.DELETE_TYPE_SUCCESS,
});

export const deleteTypeFailed = () => ({
  type: actionTypes.DELETE_TYPE_FAILED,
});

export const editAType = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editTypeService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the type success!");
        dispatch(editTypeSuccess());
        dispatch(fetchAllTypesStart());
      } else {
        toast.error("Update the type error!");
        dispatch(editTypeFailed());
        console.log("editTypeFailed", res);
      }
    } catch (e) {
      toast.error("Update the type error!!");
      dispatch(editTypeFailed());
      console.log("editTypeFailed", e);
    }
  };
};

export const editATypee = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editTypeService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the type success!");
        dispatch(editTypeSuccess());
        dispatch(fetchAllTypeByUserIdStart(data.userId));
      } else {
        toast.error("Update the type error!");
        dispatch(editTypeFailed());
        console.log("editTypeFailed", res);
      }
    } catch (e) {
      toast.error("Update the type error!!");
      dispatch(editTypeFailed());
      console.log("editTypeFailed", e);
    }
  };
};

export const editTypeSuccess = () => ({
  type: actionTypes.EDIT_TYPE_SUCCESS,
});

export const editTypeFailed = () => ({
  type: actionTypes.EDIT_TYPE_FAILED,
});
