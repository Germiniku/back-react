import React from 'react';

interface IProps {}

const Layout: React.FC<IProps> = props => {
  return (
    <div className="login-layout">
      <div className="login-layout-container">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1133515339,2294936858&fm=26&gp=0.jpg"></img>
        <header className="login-layout-container-header">
          <h1>积糖</h1>
          <h2>与世界分享你的收藏</h2>
        </header>
        {props.children}
        <div className="login-footer"></div>
      </div>
    </div>
  );
};

export default Layout;
