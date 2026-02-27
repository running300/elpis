### 项目简介

> package.json

```json
{
  "config": {
    "ghooks": {
      "commit-msg": "validate-commit-msg", // 提交时候commit校验
      "pre-commit": "npm run lint" // 提交前elint校验
    }
  }
}
```

- commit规范
  - feat: 新功能
  - fix: 修复bug
  - docs: 文档更新
  - style: 代码格式调整
  - refactor: 代码重构
  - test: 测试相关
  - chore: 构建过程或辅助工具的变动
