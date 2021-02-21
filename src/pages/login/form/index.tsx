import React from 'react';
import { Form, Button, Input, notification } from 'antd';
import MD5 from '../../../utils/md5';
interface IProps {
  fetch: (values: ILogin) => void;
  loading: boolean;
}

const { Item } = Form;

const LoginForm: React.FC<IProps> = props => {
  const { loading, fetch } = props;
  const handleLogin = (values: ILogin) => {
    if (!values.phone && !values.password) {
      notification.warn({
        message: '验证失败',
        description: '用户名或密码不能为空'
      });
    } else {
      const data = Object.assign(values, {
        password: MD5(values.password).toString()
      });
      fetch(data);
    }
  };
  return (
    <div className="login-layout-container-main">
      <Form className="login-layout-container-main-form" onFinish={handleLogin}>
        <p className="login-layout-container-main-form-title">欢迎登陆widowmaker后台系统</p>
        <Item className="login-layout-container-main-form-item" name="phone">
          <Input placeholder="请输入手机号" />
        </Item>
        <Item className="login-layout-container-main-form-item" name="password">
          <Input type="password" placeholder="请输入密码" />
        </Item>
        <Item className="login-layout-container-main-form-item">
          <Button
            className="login-layout-container-main-form-item-btn"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            登陆
          </Button>
        </Item>
        <Item className="login-layout-container-main-form-item">
          <div className="login-layout-container-main-form-item-other">
            <p>其他登陆方式</p>
            <div>
              <span>QQ</span>
              <span>微信</span>
              <span>Github</span>
            </div>
          </div>
        </Item>
      </Form>
    </div>
  );
};

export default LoginForm;
