import { ActionType } from "../../actionTypes";

interface LoginUserInitAction {
  type: ActionType.LOGIN_USER_INIT;
}

interface LoginUserSuccessAction {
  type: ActionType.LOGIN_USER_SUCCESS;
  payload: string;
}

interface LoginUserErrorAction {
  type: ActionType.LOGIN_USER_ERROR;
  payload: string;
}

export type LoginAction =
  | LoginUserInitAction
  | LoginUserSuccessAction
  | LoginUserErrorAction;
