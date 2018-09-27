#!/bin/bash

echo '下列是可以回滚的版本号：';
for file in $BACKUP_DIR/*
do
  version=${file##*/}
  version=${version%.tar.gz}
  echo "  ${version}";
done

echo -n '请输入你要回滚的版本号：';
read tagName;

# 部署变量
export releaseTarGz="${BACKUP_DIR}/${tagName}.tar.gz";
export remoteReleaseTarGz="/tmp/${tagName}.tar.gz";


"${BASEDIR}/deploy.sh";
