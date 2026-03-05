# 美食博览会小程序

微信小程序，用于展示和预约各类美食展览活动。

## 功能特点

- **首页** - 轮播图展示、热门推荐
- **菜品浏览** - 查看各类美食菜品详情
- **厨师展示** - 展示知名厨师信息
- **预约功能** - 在线预约美食展览活动
- **收藏管理** - 收藏喜爱的菜品和厨师
- **个人中心** - 查看和管理个人信息

## 项目结构

```
food-exhibition/
├── assets/           # 静态资源
│   ├── icons/        # 图标
│   └── images/       # 图片
├── pages/            # 页面目录
│   ├── index/        # 首页
│   ├── dishes/       # 菜品列表
│   ├── dish-detail/  # 菜品详情
│   ├── chef-list/    # 厨师列表
│   ├── chef-detail/  # 厨师详情
│   ├── reservation/  # 预约页面
│   ├── favorites/    # 收藏页面
│   ├── search/       # 搜索页面
│   └── profile/      # 个人中心
├── app.js            # 小程序逻辑
├── app.json          # 小程序配置
├── app.wxss          # 全局样式
└── config.js         # 配置文件
```

## 快速开始

### 环境要求

- 微信开发者工具
- Node.js 14+

### 安装

1. 克隆项目
   ```bash
   git clone https://github.com/your-username/food-exhibition.git
   ```

2. 进入项目目录
   ```bash
   cd food-exhibition
   ```

3. 复制配置文件
   ```bash
   cp config.example.js config.js
   cp .env.local.example .env.local
   cp project.config.json.example project.config.json
   cp project.private.config.json.example project.private.config.json
   ```

4. **配置微信开发者工具项目文件**

   项目已提供配置文件示例，复制后即可使用：
   
   - `project.config.json` - 微信开发者工具项目配置
     - 主要配置项说明：
       - `projectname` - 项目名称，可根据需要修改
       - `libVersion` - 微信开发者工具基础库版本
       - `srcMiniprogramRoot` - 小程序源码路径（默认 `miniprogram/`）
   
   - `project.private.config.json` - 私有配置文件（可选）
     - 包含本地开发环境偏好设置
     - 如无需特殊配置，可保持默认或删除此文件

   **提示**：首次用微信开发者工具打开项目时，也可能会提示需要配置项目信息，届时根据实际情况修改即可。

5. 使用微信开发者工具打开项目

6. 在微信开发者工具中预览和调试

## 技术栈

- 微信小程序原生开发
- JavaScript
- WXML / WXSS

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 贡献

欢迎提交 Issue 和 Pull Request！
