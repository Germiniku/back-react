import React, { memo, useCallback } from 'react';

import { Drawer, Form, Radio, Button } from 'antd';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import { MenuAction } from '../../../redux/saga/actions/menu';

/**
 * 系统设置盒子组件
 */
interface IProps {}
const { Group } = Radio;

interface FormData {
  theme: theme;
}

const DrawerComponent: React.FC<IProps> = props => {
  const { theme, drawer } = useSelector((state: IState) => state.menu);
  const actions = useActions({
    setTheme: MenuAction.setTheme,
    setDrawer: MenuAction.setDrawer
  });
  const handleDrawerClose = useCallback(() => {
    actions.setDrawer(false);
  }, [actions]);
  const handleSetting = useCallback(
    ({ theme }: FormData) => {
      actions.setTheme(theme);
    },
    [actions]
  );
  return (
    <Drawer width={330} visible={drawer} onClose={handleDrawerClose}>
      <Form
        onFinish={handleSetting}
        initialValues={{
          theme: 'dark'
        }}
      >
        <Form.Item label="导航主题" name="theme">
          <Group value={theme}>
            <Radio value="dark">dark-颜色系</Radio>
            <Radio value="light">light-颜色系</Radio>
          </Group>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" style={{ marginRight: '15px' }}>
            恢复系统设置
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default memo(DrawerComponent);
