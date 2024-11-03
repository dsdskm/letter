export const SET_ACCOUNT = "SET_ACCOUNT";

export interface AccountState {
  [x: string]: any;
  key: string | null;
}

export interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  key: string | null;
}
