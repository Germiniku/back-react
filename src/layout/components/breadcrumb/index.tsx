import React, { memo } from 'react';
import { Breadcrumb, Divider } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRouteProps } from '../../layout';

/**
 * 面包屑组件
 */

interface IProps extends IRouteProps {}
const { Item } = Breadcrumb;

const BreadcrumbComponent: React.FC<IProps> = props => {
  const { history, pathname } = props;
  const { breadcrumb, currentSidebar } = useSelector((state: IState) => state.menu);
  if (currentSidebar.length === 0) return null;
  const pathSnippets = pathname.split('/').filter(i => i);
  const isShowBack = pathSnippets.length >= 3 && history['length'] > 1;
  return (
    <div className="breadcrumb">
      <CSSTransition
        in={isShowBack}
        timeout={400}
        classNames={{
          enter: 'animated fadeInLeft faster',
          exit: 'animated fadeOutLeft faster'
        }}
        unmountOnExit
      >
        <>
          <LeftOutlined onClick={() => history['goBack']} />
          <Divider type={'vertical'} />
        </>
      </CSSTransition>
      <Breadcrumb>
        {pathSnippets.map((_, index) => {
          const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
          const breadCrumbUrl = breadcrumb[url];
          return (
            <Item key={url}>
              {index > 1 && index !== pathSnippets.length - 1 ? (
                <Link to={url}>
                  <span className="breadcrumb-icon">{breadCrumbUrl.icon}</span>
                  {breadCrumbUrl.name}
                </Link>
              ) : (
                <>
                  <span className="breadcrumb-icon">{breadCrumbUrl.icon}</span>
                  {breadCrumbUrl.name}
                </>
              )}
            </Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default memo(BreadcrumbComponent);
