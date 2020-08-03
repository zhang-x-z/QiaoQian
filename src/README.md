## 巧倩项目部署指南

  本目录下包含三个文件夹，分别为frontend、backend和frontend-deployment，分别存放前端代码、后端代码和docker配置、前端部署docker配置，本项目采用docker部署，所以请提前安装并正确配置好docker

### frontend

  此目录含有前端代码，采用Vue进行开发，需正确配置Nodejs和Vue，并不能部署，如有修改，请自行编译出dist文件夹并替换frontend-deployment文件夹中的dist文件夹。

- 构建

```bash
npm run build
```

- 运行开发服务器

```bash
npm run serve
```

### frontend-deployment

  此目录为前端部署目录，为Vue编译出来的dist文件夹，还包含Dockerfile、docker-compose所需的yml配置文件以及nginx的配置文件。在nginx文件夹下分local文件夹和production文件夹，表示本地部署和生产部署。注意，当前状态的下的dist文件夹为本地部署时编译的，所以只支持本地部署，如需生产部署请到代码包中修改frontend/src/utils.js文件，将其中的baseurl函数的返回值填写为您生成部署后端服务器的IP或者域名，再重新编译，替换当前的dist文件即可，同时注意修改production文件夹下的default.conf文件的server_name配置，改为部署服务器的IP或者域名。

- 本地部署

```bash
sudo docker-compose -f local.yml build
sudo docker-compose -f local.yml up
```

- 生产部署

```bash
sudo docker-compose -f production.yml build
sudo docker-compose -f production.yml up
```

### backend

​    此目录为项目后端部署包，包含后端项目代码，Dockerfile，docker-compose所需的yml配置文件和python环境必备的包以及requirements.txt，代码中的DEBUG为False，如有需要请自行开启DEBUG=True。部署本地与生产部署皆可，区别是本地部署用Django自带开发用服务器，生产采用gunicorn服务器

- 本地部署

```bash
sudo docker-compose -f local.yml build
sudo docker-compose -f local.yml up
```

- 生产部署

```bash
sudo docker-compose -f production.yml build
sudo docker-compose -f production.yml up
```