'use strict';

module.exports = {
  // 页面
  pageStyleAssets(pageName, assetsMap) {
    const assets = [
      styleAsset('common', assetsMap),
      styleAsset(pageName, assetsMap),
    ];
    return assets.join('');
  },

  pageScriptAssets(pageName, assetsMap) {
    const assets = [
      scriptAsset('common', assetsMap),
      scriptAsset(pageName, assetsMap),
    ];
    return assets.join('');
  },
};

function styleAsset(name, assetsMap) {
  if (!name) return '';

  const assets = assetsMap[name];
  if (assets && assets.css) {
    return `<link rel="stylesheet" href="${assets.css}">`;
  }
  return '';
}

function scriptAsset(name, assetsMap) {
  if (!name) return '';

  const assets = assetsMap[name];
  if (assets && assets.js) {
    return `<script src="${assets.js}"></script>`;
  }
  return '';
}
