import React, { memo, useState, useCallback, useMemo } from 'react';
import {
  SketchPicker,
  GithubPicker,
  TwitterPicker,
  ChromePicker
} from 'react-color';
import { Popover } from 'antd';
import './index.less';
/**
 * 颜色选择器
 */

interface IProps {
  onChangeComplete: (color: string) => void;
  type?: string;
  position?: string;
  themeColor?: string;
}

const pickers: {
  [key: string]: React.ReactNode;
} = {
  chrome: ChromePicker,
  github: GithubPicker,
  twitter: TwitterPicker,
  sketch: SketchPicker
};

const PickColor: React.FC<IProps> = props => {
  const {
    type = 'sketch',
    position = 'bottom',
    themeColor = '#555555',
    onChangeComplete
  } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(themeColor);
  const Picker: any = pickers[type] ? pickers[type] : SketchPicker;

  const handleChangeComplete = useCallback(
    (color: any) => {
      onChangeComplete(color.hex);
      setColor(color.hex);
    },
    [onChangeComplete, setColor]
  );
  // 展示色块的点击
  const handleDisplayColorPicker = useCallback(() => {
    setDisplayColorPicker(true);
  }, []);
  // 关闭颜色选择器
  const handleClosePicker = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);
  const { swatch, picker } = useMemo(() => {
    const styles: any = {
      wrapper: {
        position: 'inherit',
        zIndex: 100
      }
    };
    if (position === 'top') {
      styles.wrapper.transform = 'translateY(-100%)';
      styles.wrapper.paddingBottom = 0;
    }
    const swatch = (
      <Popover content="更改主题色">
        <div className="swatch" onClick={handleDisplayColorPicker}>
          <div
            className="swatch-color"
            style={{
              background: color
            }}
          />
        </div>
      </Popover>
    );
    const picker = displayColorPicker ? (
      <div className="popover">
        <div className="cover" onClick={handleClosePicker} />
        <div style={styles.wrapper}>
          <Picker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
    ) : null;
    return {
      swatch,
      picker
    };
  }, [
    displayColorPicker,
    position,
    color,
    Picker,
    handleChangeComplete,
    handleClosePicker,
    handleDisplayColorPicker
  ]);
  return (
    <div className="pick-color">
      {swatch}
      {picker}
    </div>
  );
};

export default memo(PickColor);
