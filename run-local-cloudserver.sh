# 官方文档https://github.com/Binaryify/NeteaseCloudMusicApi
set -e

if [[ -d cloudserver ]]; then 
  echo "本地已存在cloudserver"
else
  echo "本地不存在cloudserver"
  git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git cloudserver
  cd cloudserver
  yarn install
  cd ..
fi
# exist_pid=`lsof -nPi :3300 | awk '{print $2}' | awk 'NR == 2'`
# if [ -n $exist_pid ]; then
#   echo "存在端口被占用，开始kill端口 ${exist_pid}"
#   kill -9 $exist_pid
# fi
cd cloudserver
cross-env PORT=3300 node app.js
cd ..