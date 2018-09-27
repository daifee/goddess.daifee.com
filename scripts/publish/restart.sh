#!/bin/bash


# 登录远程服务，并执行任务
ssh -tt -i $IDENTITY_FILE $USER@$IP << remotessh


cd $REMOTE_PROJECT_PATH;

# 停止服务
npm run stop;

# 定义环境变量
export PORT="${APP_PORT}";
export TENCENT_COS_SECRET_ID="${APP_TENCENT_COS_SECRET_ID}";
export TENCENT_COS_SECRET_KEY="${APP_TENCENT_COS_SECRET_KEY}";
export AUTHORIZATION_SECRET="${APP_AUTHORIZATION_SECRET}";
export COOKIE_KEYS="${APP_COOKIE_KEYS}";
export MONGO_URL="${APP_MONGO_URL}";
export MONGO_USER="${APP_MONGO_USER}";
export MONGO_PASSWORD="${APP_MONGO_PASSWORD}";

# 启动服务
npm run start;


# 退出远程服务器
exit;

remotessh
