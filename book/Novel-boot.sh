#! /bin/bash
JAR_NAME=novel-boot
REPOSITORY=kouleen
pwd
docker stop ${JAR_NAME} || true
docker rm ${JAR_NAME} || true
docker rmi ${REPOSITORY}/${JAR_NAME} || true
docker build -t ${REPOSITORY}/${JAR_NAME}:latest .
echo 3 > /proc/sys/vm/drop_caches
free -m
docker run -itd --name ${JAR_NAME} -p 9001:80 ${REPOSITORY}/${JAR_NAME}
