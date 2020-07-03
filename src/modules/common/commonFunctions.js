import { BACKGROUNDS, BOARDS } from "../constants";

export const getInitialState = (boards) => {
  if (boards?.length) {
    return boards.map((board) => {
      return !board.showButton || !boards.showSearch
        ? {
            ...board,
            showButton: true,
            showSearch: false,
          }
        : board;
    });
  }
  return BOARDS;
};

export const selectRandomBackground = () => {
  return BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
};

export const getIndex = (initialState, id) =>
  initialState.findIndex((board) => board.id === id);

export const getIndexFromList = (initialState, parentId, id) =>
  initialState[parentId].list.findIndex((item) => item.id === id);

export const filterItems = (initialState, index, id) =>
  initialState[index].list.filter((task) => task.id !== id);

export const getFilteredItem = (initialState, index, id) =>
  initialState[index].list.filter((task) => task.id === id);
