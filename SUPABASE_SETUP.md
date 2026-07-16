# Supabase Setup

这个项目会优先从 Supabase 读取 `dinner_options` 表；如果没有配置 Supabase，或读取失败，会自动回退到 `src/data/dinnerOptions.json`。

## 1. 创建食物表和导入数据

在 Supabase 项目后台打开 SQL Editor，运行：

```sql
-- 文件路径：supabase/dinner_options.sql
```

把 [supabase/dinner_options.sql](./supabase/dinner_options.sql) 的内容复制进去执行。

## 2. 创建用户偏好表

继续在 SQL Editor 里运行：

```sql
-- 文件路径：supabase/user_preferences.sql
```

把 [supabase/user_preferences.sql](./supabase/user_preferences.sql) 的内容复制进去执行。

这个表用来保存登录用户的筛选偏好，并且已经开启 RLS，用户只能读写自己的偏好。

## 3. 开启邮箱登录

在 Supabase 后台进入 Authentication -> Providers，确认 Email 已开启。

再进入 Authentication -> Email Templates，打开 Magic Link 模板，确认邮件正文里包含验证码变量：

```text
{{ .Token }}
```

可以把邮件文案改成类似：

```text
你的“今晚吃什么”登录验证码是：{{ .Token }}
```

这个项目使用“输入验证码”的登录方式，不需要用户点击邮件链接。

最后进入 Authentication -> URL Configuration，保留基础站点地址：

```text
Site URL:
https://dinner-decider-sage.vercel.app

Redirect URLs:
https://dinner-decider-sage.vercel.app
https://dinner-decider-sage.vercel.app/
```

验证码登录不依赖 Redirect URLs，但建议保留线上域名配置。如果以后换了 Vercel 域名，把上面的线上地址也换成新域名。

## 4. 配置环境变量

本地开发新建 `.env.local`：

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
```

Vercel 部署时，在 Project Settings -> Environment Variables 里添加同名变量。

## 5. 重新部署

环境变量配置完成后重新部署 Vercel。没有配置时网站仍可运行，只是会使用本地 JSON 数据，并且登录/保存偏好不可用。
