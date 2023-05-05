import { User } from "../../../models/user";
import { ActionType } from "../../actionTypes";

interface GetLoggedInUserInitAction {
  type: ActionType.GET_LOGGED_IN_USER_INIT;
}

interface GetLoggedInUserSuccessAction {
  type: ActionType.GET_LOGGED_IN_USER_SUCCESS;
  payload: User;
}

interface GetLoggedInUserErrorAction {
  type: ActionType.GET_LOGGED_IN_USER_ERROR;
  payload: string;
}

export type UserAction =
  | GetLoggedInUserInitAction
  | GetLoggedInUserSuccessAction
  | GetLoggedInUserErrorAction;