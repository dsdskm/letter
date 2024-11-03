import { AccountState, SetAccountAction, SET_ACCOUNT } from "state/stateAction";

export const accountState: AccountState = {
  key: null,
};

export const setAccount = (key: string): SetAccountAction => {
  return {
    type: SET_ACCOUNT,
    key: key,
  };
};

export const accountReducer = (state = accountState, action: any): AccountState => {
  switch (action.type) {
    case SET_ACCOUNT:
      return { ...state, key: action.key };
    default:
      return state;
  }
};
