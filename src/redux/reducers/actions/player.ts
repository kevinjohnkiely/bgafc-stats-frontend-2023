import { Player } from "../../../models/player";
import { ActionType } from "../../actionTypes";

interface GetPlayerInitAction {
  type: ActionType.GET_PLAYER_INIT;
}

interface GetPlayerSuccessAction {
  type: ActionType.GET_PLAYER_SUCCESS;
  payload: Player;
}

interface GetPlayerErrorAction {
  type: ActionType.GET_PLAYER_ERROR;
  payload: string;
}

export type PlayerAction =
  | GetPlayerInitAction
  | GetPlayerSuccessAction
  | GetPlayerErrorAction;
