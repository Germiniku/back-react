/***
 * @auth: dmx
 * @time: 2020/7/2
 * @func: 顶部右侧布局
 ***/
import React, { memo, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import PickerColor from '../../../components/pick-color';
import UserInfo from './userInfo';
import { MenuAction } from '../../../redux/saga/actions/menu';
import LocalStore from '../../../utils/localStore';

import './index.less';

interface IProps {}

// 在线换肤 的原理 实际上是借助 window.less 这个属性
// 具体怎么操作，马上讲来

const ROUTE_BASE_NAME = process.env.PUBLIC_URL || '';
const BASE_NAME = ROUTE_BASE_NAME ? ROUTE_BASE_NAME.replace('/', '') : '';

const OLD_LESS_ID = `less:${BASE_NAME ? BASE_NAME + '-' : ''}color:old`;
const LESS_ID = `less:${BASE_NAME ? BASE_NAME + '-' : ''}color`;
// 这个 less.min.js  是我们需要去创建的， 这个less文件 里面放的是 ant-design 的样式表
const LESS_URL = `${ROUTE_BASE_NAME}/less.min.js`;

// 动态根据 响应的路径 添加script标签
function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const RightMenu: React.FC<IProps> = props => {
  const [lessLoaded, setLessLoaded] = useState(false);
  const { primaryColor } = useSelector((state: IState) => state.menu);
  const actions = useActions({
    setPrimaryColor: MenuAction.setPrimaryColor
  });

  const handleColorChange = useCallback(
    color => {
      // 1 通知redux 改变颜色
      actions.setPrimaryColor(color);

      const changeColor = () => {
        window['less']
          .modifyVars({
            '@primary-color': color
          })
          .then(() => {
            // 先清除掉 咱们这个 缓存的样式
            const oldStyle = document.getElementById(OLD_LESS_ID);
            if (oldStyle) oldStyle.remove();

            //将生成之后的style标签 插入到body 的第一个
            const lessColor = document.getElementById(LESS_ID);
            if (!lessColor) return;

            // 由于 每个页面的css 也是异步加载的（ 无论咱们是生产环境，还是开发环境）
            // 所以就会导致样式插入在生成的style标签之后，就导致主题失效，
            // 所以要加到body 里面的第一个
            document.body.insertBefore(lessColor, document.body.firstChild);
            LocalStore.set('theme-style-content', lessColor.innerHTML);
          });
      };

      if (lessLoaded) {
        changeColor();
      } else {
        window['less'] = {
          logLevel: 2,
          async: true,
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#d214a2'
          }
        };
        loadScript(LESS_URL).then(() => {
          setLessLoaded(true);
          changeColor();
        });
      }
    },
    [actions, lessLoaded]
  );

  // 只需要页面首次加载的时候，执行一次即可。所以千万不要添加依赖项
  useEffect(() => {
    // 快速生效的办法
    const themeStyleContent = LocalStore.get('theme-style-content');
    if (themeStyleContent) {
      const themeStyle = document.createElement('style');
      themeStyle.id = OLD_LESS_ID;
      themeStyle.innerHTML = themeStyleContent;
      document.body.insertBefore(themeStyle, document.body.firstChild);
    }
    // .less 文件加载完成之后 就要生成主题 因为 localStorage中的数据可能已经过时了，
    if (primaryColor) handleColorChange(primaryColor);
  }, []);

  const themeColor = primaryColor;

  return (
    <div className="right-menu">
      <PickerColor color={themeColor} onChangeComplete={handleColorChange} type="sketch" />
      <div className="language">简体中文</div>
      <UserInfo />
    </div>
  );
};

export default memo(RightMenu);
