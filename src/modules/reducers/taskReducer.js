import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TO_DIFFERENT_BOARD,
  UPDATE_TO_SAME_BOARD,
  SHOW_SEARCH,
  EDIT_TASK,
} from "../constants";
import { v4 as uuidv4 } from "uuid";
import {
  getInitialState,
  getIndex,
  getIndexFromList,
  filterItems,
  getFilteredItem,
} from "../common/commonFunctions";

const getBoardsFromStorage = JSON.parse(localStorage.getItem("task"));
const initialState = getInitialState(getBoardsFromStorage);

const state = initialState;

const tasks = (initialState = state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return initialState.map((board) => {
        return board.id === action.boardId
          ? {
              ...board,
              list: [...board.list, { id: uuidv4(), title: action.title }],
            }
          : board;
      });
    case UPDATE_TASK:
      return initialState.map((board) => {
        return board.id === action._id
          ? { ...board, showButton: !board.showButton }
          : board;
      });
    case DELETE_TASK:
      const index = getIndex(initialState, action.boardId);
      const list = filterItems(initialState, index, action.taskId);

      return initialState.map((board) => {
        return board.id === action.boardId ? { ...board, list } : board;
      });
    case UPDATE_TO_SAME_BOARD:
      const sourceIndex = getIndex(initialState, action.parentId);
      const targetIndex = getIndexFromList(
        initialState,
        sourceIndex,
        action.targetId
      );

      const tempList = filterItems(initialState, sourceIndex, action.sourceId);

      const sourceList = getFilteredItem(
        initialState,
        sourceIndex,
        action.sourceId
      );

      tempList.splice(targetIndex, 0, sourceList[0]);

      return initialState.map((board) => {
        return board.id === action.parentId
          ? { ...board, list: tempList }
          : board;
      });
    case UPDATE_TO_DIFFERENT_BOARD:
      let addToNewBoard = [];
      if (action.targetId === action.targetParentId) {
        const sourceIndex = getIndex(initialState, action.sourceParentId);

        const tempList = filterItems(
          initialState,
          sourceIndex,
          action.sourceId
        );

        const sourceItem = initialState[sourceIndex].list.find(
          (item) => item.id === action.sourceId
        );

        const removeFromSource = initialState.map((board) => {
          return board.id === action.sourceParentId
            ? { ...board, list: tempList }
            : board;
        });

        addToNewBoard = removeFromSource.map((board) => {
          return board.id === action.targetParentId
            ? { ...board, list: [...board.list, sourceItem] }
            : board;
        });
      } else {
        const parentIndex = getIndex(initialState, action.targetParentId);
        const sourceIndex = getIndex(initialState, action.sourceParentId);

        const targetIndex = getIndexFromList(
          initialState,
          parentIndex,
          action.targetId
        );

        const sourceList = filterItems(
          initialState,
          sourceIndex,
          action.sourceId
        );

        const source = getFilteredItem(
          initialState,
          sourceIndex,
          action.sourceId
        );

        const removeFromSource = initialState.map((board) => {
          return board.id === action.sourceParentId
            ? { ...board, list: sourceList }
            : board;
        });

        const tempList = initialState[parentIndex].list;

        tempList.splice(targetIndex, 0, source[0]);
        addToNewBoard = removeFromSource.map((board) => {
          return board.id === action.targetParentId
            ? { ...board, list: tempList }
            : board;
        });
      }
      return addToNewBoard;
    case SHOW_SEARCH:
      return initialState.map((board) => {
        return board.id === action.boardId
          ? { ...board, showSearch: !board.showSearch }
          : { ...board, showSearch: false };
      });

    case EDIT_TASK:
      const ind = getIndex(initialState, action.boardId);
      const updatedTask = initialState[ind].list.map((task) => {
        return task.id === action.taskId
          ? { ...task, title: action.title }
          : task;
      });
      return initialState.map((board) => {
        return board.id === action.boardId
          ? { ...board, list: updatedTask }
          : board;
      });
    default:
      return initialState;
  }
};

export default tasks;
