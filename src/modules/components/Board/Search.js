import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { changeSearchValue } from "../../actions/appAction";

const SearchBar = styled.input`
  margin: 10px 0px;
  border: none;
  height: 30px;
  width: calc(100% - 20px);
  outline: none;
  border-radius: 3px;
  resize: vertical;
  padding: 5px 10px;
`;

const Search = (props) => {
  const handleChangeSearchValue = (e) => {
    props.changeSearchValue(e.target.value);
  };
  const handleSearch = (e, boardId) => {
    const { value } = e.target;
    if (e.key === "Escape") {
      props.handleShowSearch();
    }
    if (e.key === "Enter" && value) {
      props.showSearchResult(value, boardId);
    }
  };
  return (
    props.showSearch && (
      <SearchBar
        type="text"
        placeholder="Search here and press enter"
        value={props.app.searchValue}
        autoFocus
        onChange={handleChangeSearchValue}
        onKeyDown={(e) => handleSearch(e, props.boardId)}
      />
    )
  );
};

const mapStateToProps = (state) => ({
  boardList: state.tasks,
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchValue: (value) => dispatch(changeSearchValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
