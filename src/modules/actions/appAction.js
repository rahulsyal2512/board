import {
  CHANGE_BACKGROUND,
  CHANGE_SEARCH_VALUE,
  SEARCH_VALUE,
  OPEN_EDIT_MODAL,
} from "../constants";

export const changeBackground = () => ({
  type: CHANGE_BACKGROUND,
});

export const changeSearchValue = (value) => ({
  type: CHANGE_SEARCH_VALUE,
  value,
});

export const searchValue = (value, boardId, state) => ({
  type: SEARCH_VALUE,
  value,
  boardId,
  state,
});

export const editModal = () => ({
  type: OPEN_EDIT_MODAL,
});
