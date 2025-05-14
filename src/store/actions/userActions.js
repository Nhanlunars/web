import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  getRole,
  deleteUserService,
  editUserService,
} from "../../services/userService";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

//user
export const fetchGenderStart = () => {
  return async (dispatch, getstate) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderFailed", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleFailed", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchStatusStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllCodeService("STATUS");
      if (res && res.errCode === 0) {
        dispatch(fetchStatusSuccess(res.data));
        console.log("log", res);
      } else {
        dispatch(fetchStatusFailed());
        console.log("log1", res);
      }
    } catch (e) {
      dispatch(fetchStatusFailed());
      console.log("fetchStatusFailed", e);
    }
  };
};

export const fetchStatusSuccess = (statusData) => ({
  type: actionTypes.FETCH_STATUS_SUCCESS,
  data: statusData,
});

export const fetchStatusFailed = () => ({
  type: actionTypes.FETCH_STATUS_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewUserService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error(res.errMessage);
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.errCode === 0) {
        //console.log(res.users);
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("fetch all user error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("fetch all user error!!");

      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed", e);
    }
  };
};

export const getNameUserByUserId = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllUsers(userId);
      if (res && res.errCode === 0) {
        getstate(fetchAllUsersSuccess(res.users));
      } else {
        toast.error("fetch all user error!");
        getstate(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("fetch all user error!!");

      getstate(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const getRoleStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getRole("R3");
      if (res && res.errCode === 0) {
        dispatch(getRoleSuccess(res.users.reverse()));
      } else {
        toast.error("get role error!");
        dispatch(getRoleFailed());
        console.log("getRoleFailed", res);
      }
    } catch (e) {
      toast.error("Get role error!!");

      dispatch(getRoleFailed());
      console.log("getRoleFailed", e);
    }
  };
};

export const getRoleSuccess = (data) => ({
  type: actionTypes.GET_ALL_ROLE_SUCCESS,
  users: data,
});

export const getRoleFailed = () => ({
  type: actionTypes.GET_ALL_ROLE_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteUserService(userId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("delete the user error!");
      dispatch(deleteUserFailed());
      console.log("saveUserFailed", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editUserService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the user success!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update the user error!");
      dispatch(editUserFailed());
      console.log("EditUserFailed", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
