/**
 * 渲染React页面
 */
import React from 'react';
import ReactDOM from 'react-dom';

export default function render(PageComponent, props = {}, cb) {
  ReactDOM.render(
    <PageComponent {...props} />,
    document.getElementById('app'),
    cb
  );
}

export function hideInitLoading() {
  const node = document.getElementById('init-loading');
  node.remove();
}
