import React from 'react';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
  const onClickHandler = () => {
    Accounts.logout();
  };
  return (
    <div className="header">
      <div className="header__container">
        <h1>{props.title}</h1>
        <button className="button button--link" onClick={onClickHandler}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default PrivateHeader;

