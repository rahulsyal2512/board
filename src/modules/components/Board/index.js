import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  addTask,
  updateTask,
  updateToSameBoard,
  updateToDifferentBoard,
  showSearch,
} from "../../actions/taskAction";
import { connect } from "react-redux";
import Card from "./Card";
import { changeSearchValue } from "../../actions/appAction";
import Search from "./Search";
import { getIndex } from "../../common/commonFunctions";
import EditModal from "./EditModal";

const Container = styled.div`
  font-size: 15px;
  padding: 10px;
`;

const BoardLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1000px;
  margin: 0 auto;
`;

const BoardList = styled.div`
  width: 245px;
  margin: 20px 15px;
  background-color: rgb(235, 236, 240);
  border-radius: 3px;
  padding: 10px;
`;

const AddToListText = styled.div`
  text-align: center;
  margin: 15px 0px 0px;
  font-size: 13px;
  cursor: pointer;
`;

const AddTask = styled.textarea`
  margin: 10px 0px;
  border: none;
  width: calc(100% - 20px);
  outline: none;
  border-radius: 3px;
  resize: vertical;
  padding: 5px 10px;
`;

const BoardTitleWithSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const Board = (props) => {
  const [task, setTask] = useState("");
  const [boardsList, setBoardsList] = useState(props.boardList);
  const [showSearchOrCancel, setShowSearchOrCancel] = useState(false);
  const [item, setItem] = useState({ parentId: "", id: "" });
  const [editedValue, setEditedValue] = useState({
    title: "",
    taskId: "",
    boardId: "",
  });

  useEffect(() => {
    setBoardsList(props.boardList);
  }, [props.boardList]);

  const handleShowInputBox = (boardId) => {
    props.updateTask(boardId);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setTask(value);
  };

  const dragStart = (e) => {
    const source = e.target;
    const parentId = source.parentElement.id;

    setItem({ parentId: parentId, id: e.target.id });
  };

  const onDrops = (e) => {
    e.preventDefault();
    const target = e.target;
    const targetParent = target.parentElement.id;

    if (item.parentId === targetParent || item.parentId === target) {
      props.updateToSameBoard(item.id, target.id, item.parentId);
    } else {
      if (targetParent) {
        props.updateToDifferentBoard(
          item.id,
          target.id,
          item.parentId,
          targetParent
        );
      } else {
        props.updateToDifferentBoard(
          item.id,
          target.id,
          item.parentId,
          target.id
        );
      }
    }
  };

  const allowDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleAddTask = (e, boardId) => {
    const { value } = e.target;
    if (e.key === "Escape") {
      props.updateTask(boardId);
      setTask("");
    }
    if (e.key === "Enter" && value) {
      props.addTask(value, boardId);
      props.updateTask(boardId);
      setTask("");
    }
  };

  const renderAddButtonOrInputBox = (showButton, id) => {
    return showButton ? (
      <AddToListText onClick={() => handleShowInputBox(id)}>
        + Add To List
      </AddToListText>
    ) : (
      <AddTask
        type="comment"
        placeholder="Input your task and press enter"
        value={task}
        autoFocus
        rows={4}
        onChange={handleOnChange}
        onKeyDown={(e) => handleAddTask(e, id)}
      />
    );
  };

  const handleShowSearch = (boardId) => {
    props.showSearch(boardId);
    setShowSearchOrCancel(!showSearchOrCancel);
    props.changeSearchValue("");
  };

  const showSearchResult = (value, boardId) => {
    const index = getIndex(boardsList, boardId);
    const list = boardsList[index].list.filter((list) =>
      list.title.toLowerCase().includes(value.toLowerCase())
    );
    const searchedValues = boardsList.map((board) => {
      return board.id === boardId ? { ...board, list: list } : board;
    });

    setBoardsList(searchedValues);
  };

  const handleEditedValue = (title, taskId, boardId) => {
    setEditedValue({
      title,
      taskId,
      boardId,
    });
  };

  const renderBoards = (list) => {
    return list.map((board) => {
      const { id, title, list, showButton, showSearch } = board;
      return (
        <div key={id}>
          <BoardList
            id={board.id}
            onDrop={(e) => onDrops(e)}
            onDragOver={(e) => allowDrop(e)}
          >
            <BoardTitleWithSearch>
              <span>{title}</span>
              {showSearch ? (
                <Icon
                  src="https://res.cloudinary.com/dssa0shmr/image/upload/v1593778408/close_acmggw.png"
                  onClick={() => handleShowSearch(id)}
                ></Icon>
              ) : (
                <Icon
                  src="https://res.cloudinary.com/dssa0shmr/image/upload/v1593778175/search_avsoig.png"
                  onClick={() => handleShowSearch(id)}
                ></Icon>
              )}
            </BoardTitleWithSearch>

            <Search
              boardId={id}
              showSearch={showSearch}
              showSearchResult={showSearchResult}
              handleShowSearch={handleShowSearch}
            />
            {list.map((value) => (
              <Card
                key={value.id}
                list={value}
                boardId={id}
                dragstart={dragStart}
                handleShowSearch={handleShowSearch}
                handleEditedValue={handleEditedValue}
              />
            ))}
            {renderAddButtonOrInputBox(showButton, id)}
          </BoardList>
        </div>
      );
    });
  };

  return (
    <Container>
      <EditModal
        handleEditedValue={handleEditedValue}
        editedValue={editedValue}
      />
      <BoardLists id="boardlists">{renderBoards(boardsList)}</BoardLists>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  boardList: state.tasks,
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (value, boardId) => dispatch(addTask(value, boardId)),
  updateTask: (id) => dispatch(updateTask(id)),
  changeSearchValue: (value) => dispatch(changeSearchValue(value)),
  updateToSameBoard: (sourceId, targetId, parentId) =>
    dispatch(updateToSameBoard(sourceId, targetId, parentId)),
  showSearch: (boardId) => dispatch(showSearch(boardId)),
  updateToDifferentBoard: (
    sourceId,
    targetId,
    sourceParentId,
    targetParentId
  ) =>
    dispatch(
      updateToDifferentBoard(sourceId, targetId, sourceParentId, targetParentId)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
