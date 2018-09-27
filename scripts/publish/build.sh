#!/bin/bash
# 构建&打包选择的版本

function error_exit {
  echo "$1" 1>&2
  exit 1
}

cd $REPOSITORY_PATH;
echo "开始拉远程代码 origin ${BRANCH_NAME}";
git fetch --tags;
git pull origin $BRANCH_NAME --rebase;

versions=$(git tag);
echo "下列是可以发布的版本号：";
OLD_IFS=$IFS;
IFS=" ";
for tag in $versions
do
  echo "${tag}";
done
IFS=$OLD_IFS;
echo -n '请输入你要发布的版本号：'
read tagName;

if ! echo $versions | grep $tagName; then
  error_exit '没有这个版本！';
fi

# 部署变量
export releaseTarGz="${BACKUP_DIR}/${tagName}.tar.gz";
export remoteReleaseTarGz="/tmp/${tagName}.tar.gz";

git checkout $tagName;

npm install --no-save --registry=http://npm.zuzuche.net/;
npm run build;

tar -z -c -f $releaseTarGz --exclude=./.git  ./;

# 部署
"${BASEDIR}/deploy.sh";
