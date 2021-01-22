import React, { memo, useCallback } from 'react';
import { Result, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {}

const NotFound: React.FC<IProps> = props => {
  const { history } = props;
  const handleBackHome = useCallback(() => {
    history.push('/');
  }, [history]);
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    ></Result>
  );
};

export default memo(NotFound);
