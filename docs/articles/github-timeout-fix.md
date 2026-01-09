# 解决服务器连接 GitHub 端口 443 超时问题

## 1. 问题描述

在云服务器上执行 `git push` 操作时，遇到如下报错，导致代码无法推送到 GitHub 远程仓库：

```bash
fatal: unable to access 'https://github.com/Personxy/personal-knowledge-blog-xy.git/': Failed to connect to github.com port 443 after 135651 ms: Couldn't connect to server
```

## 2. 原因分析

该错误表明服务器无法连接到 GitHub 的 HTTPS 端口 (443)。
这通常是因为：
1.  **网络环境限制**：国内云服务器访问 GitHub 的 HTTPS 线路经常不稳定或被阻断。
2.  **DNS 解析问题**：DNS 无法正确解析 GitHub 域名。

虽然可以通过配置代理或修改 hosts 尝试修复 HTTPS 连接，但最稳定、最推荐的长期解决方案是 **改用 SSH 协议**。SSH 协议不仅更稳定，而且配置好公钥后无需每次输入密码。

## 3. 解决方案：切换至 SSH 协议

### 3.1 检查/生成 SSH 密钥
首先检查服务器是否已有 SSH 密钥：
```bash
ls -la ~/.ssh/id_rsa.pub
```
如果文件存在，直接使用。如果不存在，使用以下命令生成：
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 一路回车即可
```

### 3.2 将公钥添加到 GitHub
1.  查看并复制公钥内容：
    ```bash
    cat ~/.ssh/id_rsa.pub
    ```
2.  登录 GitHub，进入 **Settings** -> **SSH and GPG keys** -> **New SSH key**。
3.  将复制的内容粘贴到 "Key" 输入框中，点击 "Add SSH key"。

### 3.3 修改 Git 远程仓库地址
将原本的 HTTPS 地址修改为 SSH 地址：

```bash
# 查看当前远程地址
git remote -v
# origin  https://github.com/Personxy/personal-knowledge-blog-xy.git (fetch)

# 修改为 SSH 地址 (注意格式为 git@github.com:用户名/仓库名.git)
git remote set-url origin git@github.com:Personxy/personal-knowledge-blog-xy.git
```

### 3.4 验证并推送
1.  测试 SSH 连接：
    ```bash
    ssh -T git@github.com
    # 如果看到 "Hi username! You've successfully authenticated..." 则说明成功
    ```
2.  再次尝试推送：
    ```bash
    git push -u origin master
    ```

## 4. 总结
对于云服务器开发环境，推荐始终优先使用 SSH 方式连接 GitHub。它能有效避开 HTTPS 连接的各种网络干扰，提供更流畅的代码同步体验。
