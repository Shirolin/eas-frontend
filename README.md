# 项目概述

- 项目中文名：教务管理系统-前端
- 项目英文名：Education Administration System-Frontend
- 项目代号：EAS-Frontend

前后端分离的教务管理系统的前端，用于与后端API进行交互，实现教务管理系统的功能。
后端项目地址：[教务管理系统-后端](https://github.com/Shirolin/Education-Administration-System)

同时，本项目的用户管理由BAS后台管理系统提供。
BAS后台管理系统地址：[BAS后台管理系统](https://github.com/Shirolin/Backend-Administration-System)

# 功能如下

- 用户认证——登录、退出、获取用户信息
- 教师端
  - 课程管理——课程增删改查、管理上课的学生
  - 账单管理——账单增删改查、发送账单通知学生
- 学生端
  - 课程管理——查看课程
  - 账单管理——查看账单、支付账单

# 运行环境要求

- Node.js = 18.20.5 +
- npm = 10.8.2 +

# 开发环境部署/安装

本项目代码使用 vite + Vue3 + pinia + JavaScript 开发。

### 基础安装

1. 克隆源代码到本地：

```shell
git clone https://github.com/Shirolin/eas-frontend
```

2. 进入项目目录安装依赖：

```shell
npm install
```

3. 复制配置文件：

```shell
cp .env.example .env.local
```

4. 修改配置文件：

```shell
# Passport 配置
VITE_PASSPORT_GRANT_TYPE=
VITE_PASSPORT_CLIENT_ID=
VITE_PASSPORT_CLIENT_SECRET=
VITE_PASSPORT_SCOPE=*

# Omise 配置
VITE_OMISE_PUBLIC_KEY=

# 后端 API 配置
VITE_API_URL=
```

5. 运行项目：

```shell
npm run dev
```

6. 访问地址：http://localhost:5173

# 生产环境部署/安装

1. 编译成静态文件：

```shell
npm run build
```

2. 将 `dist` 目录下的文件部署到服务器上。
3. 配置服务器，使之可以访问到 `dist` 目录下的文件。

至此，安装完成。

# 扩展包使用情况

| 扩展包名称                  | 一句话描述                            | 本项目应用场景 |
| --------------------------- | ------------------------------------- | -------------- |
| vue                         | Vue.js 是一套构建用户界面的渐进式框架 | 前端基础框架   |
| vue-router                  | Vue.js 官方的路由管理器               | 前端路由管理   |
| axios                       | 基于 Promise 的 HTTP 请求客户端       | 前端请求库     |
| pinia                       | Vue 3 的状态管理库                    | 前端状态管理   |
| pinia-plugin-persistedstate | Pinia 的持久化插件                    | 前端状态持久化 |
| serve                       | 静态文件服务器                        | 线上部署服务器 |
| date-fns                    | 日期处理工具库                        | 日期时区处理   |
| @heroicons/vue              | Heroicons 的 Vue 组件库               | 图标库         |

# 备注

- 本项目除了日期扩处理扩展包 `date-fns` 和图标库以外，没有使用其他的 UI 库，所有的 UI 组件都是自己写的，包括modal、toast、loadingSpinner、pagination、scrollToTop、debounce等等。
