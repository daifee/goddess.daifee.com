#!/bin/bash


function error_exit {
  echo "$1" 1>&2
  exit 1
}

if [ ! -f $releaseTarGz ]; then
  error_exit "${releaseTarGz}文件不存在";
fi

echo "开始上传：${releaseTarGz}";
cd $REPOSITORY_PATH;
scp -i $IDENTITY_FILE $releaseTarGz $USER@$IP:$remoteReleaseTarGz;
echo "上传完成：${releaseTarGz} -> ${remoteReleaseTarGz}";


# 登录远程服务，并执行任务
ssh -tt -i $IDENTITY_FILE $USER@$IP << remotessh

if [ ! -d $REMOTE_PROJECT_PATH ]; then
  mkdir $REMOTE_PROJECT_PATH
fi

cd $REMOTE_PROJECT_PATH;

echo "停止服务";
npm run stop;
echo "覆盖旧代码";
rm -rf ./*;
tar -z -x -f $remoteReleaseTarGz;

echo "定义环境变量";
export PORT="${APP_PORT}";
export TENCENT_COS_SECRET_ID="${APP_TENCENT_COS_SECRET_ID}";
export TENCENT_COS_SECRET_KEY="${APP_TENCENT_COS_SECRET_KEY}";
export AUTHORIZATION_SECRET="${APP_AUTHORIZATION_SECRET}";
export COOKIE_KEYS="${APP_COOKIE_KEYS}";
export MONGO_URL="${APP_MONGO_URL}";
export MONGO_USER="${APP_MONGO_USER}";
export MONGO_PASSWORD="${APP_MONGO_PASSWORD}";

echo "启动服务";
npm run start;


echo "删除临时文件";
if [ -f $remoteReleaseTarGz ]; then
  rm $remoteReleaseTarGz;
fi

echo "退出远程服务器";
exit;

remotessh
