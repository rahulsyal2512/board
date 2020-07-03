import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteTask } from "../../actions/taskAction";
import { editModal } from "../../actions/appAction";

const Icon = styled.img`
  width: 13px;
  text-align: right;
  cursor: pointer;
  display: none;
  margin-left: 5px;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 4px;
  margin: 10px 0px;
  box-shadow: 0 1px 0 rgba(10, 96, 245, 0.34);
  padding: 10px;
  align-items: center;
  cursor: pointer;
  word-break: break-all;
  &:hover ${Icon} {
    display: block;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Card = (props) => {
  const { id, title } = props.list;
  const handleDeleteTask = (taskId, boardId) => {
    props.deleteTask(taskId, boardId);
    props.handleShowSearch();
  };

  const handleEditTask = (value, taskId, boardId) => {
    props.editModal();
    props.handleEditedValue(value, taskId, boardId);
    props.handleShowSearch();
  };

  return (
    <CardWrapper
      id={id}
      draggable="true"
      onDragStart={(e) => props.dragstart(e)}
    >
      <span>{title}</span>
      <IconWrapper>
        <Icon
          onClick={() => handleEditTask(title, id, props.boardId)}
          src="https://res.cloudinary.com/dssa0shmr/image/upload/v1593801109/pencil_jsbyfn.png"
        ></Icon>

        <Icon
          onClick={() => handleDeleteTask(id, props.boardId)}
          src="https://res.cloudinary.com/dssa0shmr/image/upload/v1592336093/criss-cross_dyrxqa.png"
        ></Icon>
      </IconWrapper>
    </CardWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (taskId, boardId) => dispatch(deleteTask(taskId, boardId)),
  editModal: (taskId, boardId) => dispatch(editModal()),
});

export default connect(null, mapDispatchToProps)(Card);
