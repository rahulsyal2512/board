import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TO_SAME_BOARD,
  UPDATE_TO_DIFFERENT_BOARD,
  SHOW_SEARCH,
  EDIT_TASK,
} from "../constants";
import { v4 as uuidv4 } from "uuid";

export const addTask = (title, boardId) => ({
  type: ADD_TASK,
  _id: uuidv4(),
  title,
  boardId,
});

export const updateTask = (_id) => ({
  type: UPDATE_TASK,
  _id,
});

export const deleteTask = (taskId, boardId) => ({
  type: DELETE_TASK,
  taskId,
  boardId,
});

export const updateToSameBoard = (sourceId, targetId, parentId) => ({
  type: UPDATE_TO_SAME_BOARD,
  sourceId,
  targetId,
  parentId,
});

export const updateToDifferentBoard = (
  sourceId,
  targetId,
  sourceParentId,
  targetParentId
) => ({
  type: UPDATE_TO_DIFFERENT_BOARD,
  sourceId,
  targetId,
  sourceParentId,
  targetParentId,
});

export const showSearch = (boardId) => ({
  type: SHOW_SEARCH,
  boardId,
});

export const editTask = (title, taskId, boardId) => ({
  type: EDIT_TASK,
  title,
  taskId,
  boardId,
});
