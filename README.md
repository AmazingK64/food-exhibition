# 美食博览会小程序

> ⚠️ **本项目完全由 AI 开发**

微信小程序，用于展示和预约各类美食展览活动。

## 功能特点

- **首页** - 轮播图展示、热门推荐、菜品浏览
- **菜谱大全** - 查看各类菜谱详情（需授权）
- **厨神技巧** - 展示知名厨师信息
- **预约功能** - 在线预约美食展览活动
- **收藏管理** - 收藏喜爱的菜品和厨师
- **个人中心** - 用户授权、AI 生成头像、预约记录管理

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
│   ├── recipe-list/  # 菜谱大全
│   ├── recipe-detail/ # 菜谱详情（需授权）
│   ├── chef-list/    # 厨师列表
│   ├── chef-detail/  # 厨师详情
│   ├── reservation/  # 预约页面
│   ├── favorites/    # 收藏页面
│   ├── search/       # 搜索页面
│   └── profile/      # 个人中心
├── cloudfunctions/  # 云函数
├── app.js            # 小程序逻辑
├── app.json          # 小程序配置
├── app.wxss          # 全局样式
└── config.js         # 配置文件（需自行配置）
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

3. 复制配置文件示例
   ```bash
   cp config.example.js config.js
   cp project.config.json.example project.config.json
   cp project.private.config.json.example project.private.config.json
   ```

4. **配置 config.js**

   复制 `config.example.js` 为 `config.js`，填入你的云开发环境 ID：

   ```javascript
   module.exports = {
     envId: '你的云开发环境ID'
   }
   ```

5. **配置 project.config.json**

   复制配置文件示例后，修改以下内容：
   - `appid` - 你的小程序 AppID
   - 其他配置根据需要调整

6. 使用微信开发者工具打开项目

7. 部署云函数
   - 在微信开发者工具中右键 `cloudfunctions` 文件夹
   - 选择「上传并部署：云端安装依赖」

8. 在微信开发者工具中预览和调试

## 功能说明

### 用户授权

- 使用微信官方 `open-type="getUserInfo"` 方式获取用户信息
- 首次授权时自动生成 AI 头像（使用云函数生成）
- 普通用户可生成 3 次 AI 头像，管理员无限制

### 菜谱查看

- 菜谱详情页需要用户授权后才能查看
- 未授权用户只能看到菜谱标题和分类

### 管理员设置

在 `cloudfunctions/foodApi/index.js` 中修改 `adminOpenIds` 数组，添加你的 openid：

```javascript
const adminOpenIds = [
  '你的openid'
]
```

获取 openid 方法：用户在小程序授权后，可在云数据库 users 集合中查看。

### AI 生图

- 菜品详情页支持 AI 生成菜品图片
- 需要使用云开发的 AI 能力或自定义云函数

## 技术栈

- 微信小程序原生开发
- JavaScript
- WXML / WXSS

## 数据来源

内部自带的食谱来源于 [Anduin2017/HowToCook](https://github.com/Anduin2017/HowToCook)，感谢该项目的贡献者！

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 贡献

欢迎提交 Issue 和 Pull Request！

> **重要提示**：为保持项目的一致性和可维护性，请确保您的改动遵循原有的开发逻辑和代码风格。如有重大架构变更，建议先提交 Issue 讨论后再进行开发。
