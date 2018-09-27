#!/bin/bash

export MAIN_SCRIPT=$(readlink -f "$0");
export BASEDIR=$(dirname "$MAIN_SCRIPT");

export APP_PORT="8002";
export APP_TENCENT_COS_SECRET_ID="{secret}";
export APP_TENCENT_COS_SECRET_KEY="{secret}";
export APP_AUTHORIZATION_SECRET="{secret}";
export APP_COOKIE_KEYS="{secret}"
export APP_MONGO_URL="{secret}";
export APP_MONGO_USER="{secret}";
export APP_MONGO_PASSWORD="{secret}";

export USER='{secret}';
export IP='{secret}';
export IDENTITY_FILE='~/.ssh/daifee-web-tencent';
# 仓库地址（build服务器中）
export REPOSITORY_PATH='/home/daifee/goddess.daifee.com';
# 代码包备份位置（build服务器中）
export BACKUP_DIR='/home/daifee/goddess.daifee.com-backup';
# 构建分支
export BRANCH_NAME='master';
# 项目目录（生产服务器）
export REMOTE_PROJECT_PATH='/var/www/goddess.daifee.com';


function error_exit {
  echo "$1" 1>&2
  exit 1
}

if [ ! -d $BACKUP_DIR ]; then
  mkdir $BACKUP_DIR
fi

echo -n "你要干嘛？
  1. 发布新版
  2. 回滚
  3. 重启
请选择序号：";

read number;
if [ $number == '1' ]; then
  "${BASEDIR}/build.sh";
fi
if [ $number == '2' ]; then
  "${BASEDIR}/rollback.sh";
fi
if [ $number == '3' ]; then
  "${BASEDIR}/restart.sh";
fi
