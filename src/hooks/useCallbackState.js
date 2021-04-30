import { useEffect, useState, useRef } from 'react';

function useCallbackState(state) {
  // useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”, useRef 会在每次渲染时返回同一个 ref 对象
  // 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现
  const cbRef = useRef();
  const [data, setData] = useState(state);

  useEffect(() => {
    cbRef.current && cbRef.current(data);
  }, [data]);

  return [
    data,
    function (val, callback) {
      cbRef.current = callback;
      setData(val);
    }
  ];
}

export default useCallbackState;
