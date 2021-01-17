import React, { memo } from 'react';
import Background from './background';
import LoginLayout from './layout';
import LoginForm from './form';
import { loginAction } from '../../redux/saga/actions/user';
import useActions from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './index.less';
interface IProps {}

const Login: React.FC<IProps> = (props: IProps) => {
  const action = useActions({
    loginAction
  });

  const { isLogin, loading } = useSelector((state: IState) => state.user);
  if (isLogin) return <Redirect to="/" />;
  return (
    <div className="login">
      <LoginLayout>
        <LoginForm loading={loading} fetch={action.loginAction} />
      </LoginLayout>
      <Background />
    </div>
  );
};

export default memo(Login);
