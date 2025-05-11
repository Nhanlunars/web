import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllReservations,
  createNewReservationService,
  getAllReservationsByUserId,
  deleteReservationService,
  editReservationService,
} from "../../services/userService";

export const createNewReservation = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewReservationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new reservation success!");
        dispatch(saveReservationSuccess());
        dispatch(fetchAllReservationsStart());
      } else {
        toast.error("create a new reservation faild!!");
        dispatch(saveReservationFailed());
        console.log("createReservationFailed", res);
      }
    } catch (e) {
      dispatch(saveReservationFailed());
      console.log("saveReservationFailed", e);
    }
  };
};

export const createNewReservationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await createNewReservationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("create a new reservation success!");
        dispatch(saveReservationSuccess());
        dispatch(fetchAllReservationsByUserIdStart(data.userId));
      } else {
        toast.error("create a new reservation faild!!");
        dispatch(saveReservationFailed());
        console.log("createReservationFailed", res);
      }
    } catch (e) {
      dispatch(saveReservationFailed());
      console.log("saveReservationFailed", e);
    }
  };
};

export const saveReservationSuccess = () => ({
  type: actionTypes.CREATE_RESERVATION_SUCCESS,
});

export const saveReservationFailed = () => ({
  type: actionTypes.CREATE_RESERVATION_FAILED,
});

export const fetchAllReservationsStart = () => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllReservations("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllReservationsSuccess(res.reservations.reverse()));
      } else {
        toast.error("fetch all reservation error!");
        dispatch(fetchAllReservationsFailed());
        console.log("fetchAllReservationsFailed", res);
      }
    } catch (e) {
      toast.error("fetch all reservation error!!");

      dispatch(fetchAllReservationsFailed());
      console.log("fetchAllReservationsFailed", e);
    }
  };
};

export const fetchAllReservationsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_RESERVATIONS_SUCCESS,
  reservations: data,
});

export const fetchAllReservationsFailed = () => ({
  type: actionTypes.FETCH_ALL_RESERVATIONS_FAILED,
});

export const fetchAllReservationsByUserIdStart = (userId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await getAllReservationsByUserId(userId);
      if (res && res.errCode === 0) {
        dispatch(
          fetchAllReservationsByUserIdSuccess(res.reservations.reverse())
        );
      } else {
        toast.error("fetch all reservation by userid error!");
        dispatch(fetchAllReservationsByUserIdFailed());
        console.log("fetchAllReservationsByUserIdFailed", res);
      }
    } catch (e) {
      toast.error("fetch all reservation by userid error!!");
      dispatch(fetchAllReservationsByUserIdFailed());
      console.log("fetchAllReservationsByUserIdFailed", e);
    }
  };
};

export const fetchAllReservationsByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_RESERVATIONS_BY_USERID_SUCCESS,
  reservations: data,
});

export const fetchAllReservationsByUserIdFailed = () => ({
  type: actionTypes.FETCH_ALL_RESERVATIONS_BY_USERID_FAILED,
});

export const deleteAReservation = (reservationId) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteReservationService(reservationId);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the reservation success!");
        dispatch(deleteReservationSuccess());
        dispatch(fetchAllReservationsStart());
      } else {
        toast.error("delete the reservation error!");
        dispatch(deleteReservationFailed());
      }
    } catch (e) {
      toast.error("delete the reservation error!");
      dispatch(deleteReservationFailed());
      console.log("saveReservationFailed", e);
    }
  };
};

export const deleteAReservationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await deleteReservationService(data.id);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("delete the reservation success!");
        dispatch(deleteReservationSuccess());
        dispatch(fetchAllReservationsByUserIdStart(data.userId));
      } else {
        toast.error("delete the reservation error!");
        dispatch(deleteReservationFailed());
      }
    } catch (e) {
      toast.error("delete the reservation error!");
      dispatch(deleteReservationFailed());
      console.log("saveReservationFailed", e);
    }
  };
};

export const deleteReservationSuccess = () => ({
  type: actionTypes.DELETE_RESERVATION_SUCCESS,
});

export const deleteReservationFailed = () => ({
  type: actionTypes.DELETE_RESERVATION_FAILED,
});

export const editAReservation = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editReservationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the reservation success!");
        dispatch(editReservationSuccess());
        dispatch(fetchAllReservationsStart());
      } else {
        toast.error("Update the reservation error!");
        dispatch(editReservationFailed());
        console.log("editReservationFailed", res);
      }
    } catch (e) {
      toast.error("Update the reservation error!!");
      dispatch(editReservationFailed());
      console.log("editReservationFailed", e);
    }
  };
};

export const editAReservationn = (data) => {
  return async (dispatch, getstate) => {
    try {
      let res = await editReservationService(data);
      //console.log('check create user redux', res)
      if (res && res.errCode === 0) {
        toast.success("Update the reservation success!");
        dispatch(editReservationSuccess());
        dispatch(fetchAllReservationsByUserIdStart(data.userId));
      } else {
        toast.error("Update the reservation error!");
        dispatch(editReservationFailed());
        console.log("editReservationFailed", res);
      }
    } catch (e) {
      toast.error("Update the reservation error!!");
      dispatch(editReservationFailed());
      console.log("editReservationFailed", e);
    }
  };
};

export const editReservationSuccess = () => ({
  type: actionTypes.EDIT_RESERVATION_SUCCESS,
});

export const editReservationFailed = () => ({
  type: actionTypes.EDIT_RESERVATION_FAILED,
});
