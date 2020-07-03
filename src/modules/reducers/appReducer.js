import {
  CHANGE_BACKGROUND,
  CHANGE_SEARCH_VALUE,
  OPEN_EDIT_MODAL,
} from "../constants";
import { selectRandomBackground } from "../common/commonFunctions";

const state = {
  backgroundImage: selectRandomBackground(),
  searchValue: "",
  editModal: false,
};

const app = (initialState = state, action) => {
  switch (action.type) {
    case CHANGE_BACKGROUND:
      return {
        ...initialState,
        backgroundImage: selectRandomBackground(),
      };
    case CHANGE_SEARCH_VALUE:
      return {
        ...initialState,
        searchValue: action.value,
      };
    case OPEN_EDIT_MODAL:
      return {
        ...initialState,
        editModal: !initialState.editModal,
      };
    default:
      return initialState;
  }
};

export default app;
