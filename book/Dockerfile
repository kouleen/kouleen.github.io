# 拉取nginx镜像文件
FROM nginx:latest
# 作者
MAINTAINER kouleen@aliyun.com
# 这里的dist文件就是打包好的文件，project是我们上面设置的工作目录
COPY . /usr/share/nginx/html
# default.conf就是我们项目下面的nginx配置文件，我们需要copy到nginx的相应目录
COPY default.conf /etc/nginx/conf.d
# 申明容器编码
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
# 指定容器时间
ENV TZ=Asia/Shanghai
# 查看当前路径
RUN pwd
# 列表当前工作路径下的所有文件及文件夹
RUN ls -lh

