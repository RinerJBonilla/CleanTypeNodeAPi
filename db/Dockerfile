FROM mariadb:latest

ENV MYSQL_ROOT_PASSWORD=123456
ENV MYSQL_DATABASE=tester

# Add init script
ADD tester.sql /docker-entrypoint-initdb.d
EXPOSE 3306
