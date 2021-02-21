import React from 'react';

interface IProps {}

const Layout: React.FC<IProps> = props => {
  return (
    <div className="login-layout">
      <div className="login-layout-container">
        <header className="login-layout-container-header">
        </header>
        {props.children}
        <div className="login-footer"></div>
      </div>
    </div>
  );
};

export default Layout;
