import React, { memo } from 'react';
import { Button, Result, Spin } from 'antd';
import { LoadingComponentProps } from 'react-loadable';
interface IProps extends LoadingComponentProps {}

const PageLoading: React.FC<IProps> = props => {
  const { isLoading, timedOut, pastDelay, error } = props;
  if (isLoading && pastDelay) return <Spin className="spin-center" />;
  // 如果有异常或者超过超时时间
  if (error || timedOut) {
    return (
      <Result
        status="error"
        title="组件加载失败"
        subTitle="有可能当前正在发布新版本，或者您的网络出现了故障，请重试，如果多次重试失败，请联系管理员"
        extra={
          <Button onClick={() => window.location.reload()} type="primary">
            重试
          </Button>
        }
      />
    );
  }
  return null;
};

export default memo(PageLoading);
