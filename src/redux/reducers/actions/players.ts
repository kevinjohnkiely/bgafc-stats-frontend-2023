import { Player } from "../../../models/player";
import { ActionType } from "../../actionTypes";

interface GetPlayersInitAction {
  type: ActionType.GET_PLAYERS_INIT;
}

interface GetPlayersSuccessAction {
  type: ActionType.GET_PLAYERS_SUCCESS;
  payload: Player[];
}

interface GetPlayersErrorAction {
  type: ActionType.GET_PLAYERS_ERROR;
  payload: string;
}

export type PlayersAction =
  | GetPlayersInitAction
  | GetPlayersSuccessAction
  | GetPlayersErrorAction;
