import React from "react";
import styled from "styled-components";
import { editModal } from "../../actions/appAction";
import { connect } from "react-redux";
import { editTask } from "../../actions/taskAction";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 200px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalWrapper = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 5px 15px;
  border: 1px solid #888;
  width: 50%;
  border-radius: 5px;
`;

const Close = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const EditTask = styled.input`
  margin: 10px 0px 20px;
  width: calc(100% - 25px);
  outline: none;
  border-radius: 3px;
  resize: vertical;
  height: 20px;
  padding: 5px 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.div`
  background-color: #42a946;
  border: none;
  color: white;
  padding: 9px 25px;
  text-align: center;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
`;

const EditModal = (props) => {
  const { editModal, app, editedValue, handleEditedValue, editTask } = props;
  const { title, taskId, boardId } = editedValue;

  const handleModal = () => {
    editModal();
  };
  const handleUpdateTask = () => {
    editTask(title, taskId, boardId);
    editModal();
  };
  return app.editModal ? (
    <Modal>
      <ModalWrapper>
        <Header>
          <h4>EDIT TASK</h4>
          <Close onClick={handleModal}>&times;</Close>
        </Header>
        <EditTask
          placeholder="Edit value here"
          value={editedValue.title}
          onChange={(e) => handleEditedValue(e.target.value, taskId, boardId)}
        />
        <Button onClick={handleUpdateTask}>Update</Button>
      </ModalWrapper>
    </Modal>
  ) : null;
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  editModal: () => dispatch(editModal()),
  editTask: (title, taskId, boardId) =>
    dispatch(editTask(title, taskId, boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
