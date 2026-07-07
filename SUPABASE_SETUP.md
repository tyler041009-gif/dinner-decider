# Supabase Setup

这个项目会优先从 Supabase 读取 `dinner_options` 表；如果没有配置 Supabase，或读取失败，会自动回退到 `src/data/dinnerOptions.json`。

## 1. 创建表和导入数据

在 Supabase 项目后台打开 SQL Editor，运行：

```sql
-- 文件路径：supabase/dinner_options.sql
```

把 [supabase/dinner_options.sql](./supabase/dinner_options.sql) 的内容复制进去执行。

## 2. 配置环境变量

本地开发新建 `.env.local`：

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
```

Vercel 部署时，在 Project Settings -> Environment Variables 里添加同名变量。

## 3. 重新部署

环境变量配置完成后重新部署 Vercel。没有配置时网站仍可运行，只是会使用本地 JSON 数据。
