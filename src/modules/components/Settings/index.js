import React, { useState } from "react";
import styled from "styled-components";
import { SETTINGS } from "../../constants";
import { connect } from "react-redux";
import { changeBackground } from "../../actions/appAction";

const Dropdown = styled.div`
  width: 150px;
  position: fixed;
  bottom: 45px;
  right: 45px;
  background: white;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  span {
    font-size: 14px;
  }
`;
const SettingsWrapper = styled.div`
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Icon = styled.img`
  width: 50%;
`;

const Settings = (props) => {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenMenu = () => {
    setOpenSettings(!openSettings);
  };

  const handleChangeSettings = () => {
    props.changeBackground();
    handleOpenMenu();
  };

  const renderDropdown = () =>
    openSettings && (
      <Dropdown onClick={handleChangeSettings}>
        {SETTINGS.map((setting, key) => (
          <span key={key}>{setting}</span>
        ))}
      </Dropdown>
    );
  return (
    <>
      <SettingsWrapper onClick={handleOpenMenu}>
        <Icon src="https://res.cloudinary.com/dssa0shmr/image/upload/v1593702392/more_ivi3ln.png"></Icon>
      </SettingsWrapper>
      {renderDropdown()}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeBackground: (value, boardId) => dispatch(changeBackground()),
});

export default connect(null, mapDispatchToProps)(Settings);
