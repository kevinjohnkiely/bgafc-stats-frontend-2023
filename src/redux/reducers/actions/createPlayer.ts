import { Player } from "../../../models/player";
import { ActionType } from "../../actionTypes";

interface CreatePlayerInitAction {
  type: ActionType.CREATE_PLAYER_INIT;
}

interface CreatePlayerSuccessAction {
  type: ActionType.CREATE_PLAYER_SUCCESS;
  payload: Player;
}

interface CreatePlayerErrorAction {
  type: ActionType.CREATE_PLAYER_ERROR;
  payload: string;
}

export type CreatePlayerAction =
  | CreatePlayerInitAction
  | CreatePlayerSuccessAction
  | CreatePlayerErrorAction;
