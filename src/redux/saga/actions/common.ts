import { createRoutine } from 'redux-saga-routines';
import NAME_SPACE from '../../../constants/namespace';



// 超时提示，发送请求，如果发送失败，就会重试请求，
// 超过约定的重试次数过后(axios二次封装的时候处理)就会触发action，提示用户请求超时
export const setRetryTip = createRoutine(`${NAME_SPACE.COMMON}`);

