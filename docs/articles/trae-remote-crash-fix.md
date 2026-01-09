# 排查与解决 Trae 远程连接导致服务器死机的问题

## 1. 问题背景

在使用 Trae IDE 的 SSH Remote 功能连接到一台配置为 **2vCPU / 2GB RAM** 的云服务器进行开发时，频繁遇到以下问题：
*   连接建立后不久，IDE 提示重连或断开。
*   服务器 SSH 响应极慢甚至无响应。
*   VNC 远程桌面显示黑屏或画面卡死。
*   控制台日志出现 `console_callback hogged CPU` 等内核警告。

这种情况导致无法正常进行远程开发，必须强制重启服务器才能恢复。

## 2. 问题排查

### 2.1 资源监控
通过在 SSH 终端（趁系统尚未完全卡死时）运行 `top` 和 `free -h` 命令，观察到以下现象：
*   **内存耗尽**：物理内存（2GB）几乎被占满，可用内存仅剩几十 MB。
*   **Swap 缺失**：系统未配置 Swap 分区（交换空间），或 Swap 极小。
*   **高负载进程**：
    *   `node` 进程：由 Trae Server 启动，用于运行 TypeScript Language Server 和 AI 补全服务。
    *   `trae-server`：IDE 的后端核心进程。
    *   这两个进程合计占用了 800MB - 1GB+ 的内存。

### 2.2 原因分析
**根本原因**：服务器物理内存不足以支撑现代 IDE 后端服务的运行。
当 VS Code Server / Trae Server 启动时，会加载大量插件 host、语言服务（TSServer）和 AI 模型接口。在 2GB 内存且无 Swap 的环境下，一旦内存耗尽，Linux 内核会触发 OOM Killer（内存溢出查杀）或导致内核频繁进行内存回收（Thrashing），从而阻塞 CPU 调度，导致系统呈现“假死”状态。

## 3. 解决方案

既然物理内存无法立即升级，最有效的方案是**增加 Swap (虚拟内存)**，用磁盘空间换取系统稳定性。

### 3.1 创建 Swap 文件
我们决定添加一个 4GB 的 Swap 文件，防止内存溢出。

1.  **检查磁盘空间**：
    ```bash
    df -h /
    ```
    确保根分区有大于 4GB 的可用空间。

2.  **创建交换文件**：
    使用 `fallocate` 快速预分配空间（比 `dd` 更快更安全）：
    ```bash
    sudo fallocate -l 4G /swap_extra.img
    ```

3.  **设置权限**：
    为了安全，仅允许 root 用户读写：
    ```bash
    sudo chmod 600 /swap_extra.img
    ```

4.  **格式化并启用 Swap**：
    ```bash
    sudo mkswap /swap_extra.img
    sudo swapon /swap_extra.img
    ```

### 3.2 持久化配置
为了确保重启后 Swap 依然生效，需要将其写入 `/etc/fstab`：

```bash
echo '/swap_extra.img none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 3.3 优化 Swappiness
默认的 `vm.swappiness` 值通常为 60，意味着内核会比较积极地使用 Swap。为了避免磁盘 I/O 拖慢系统，我们将其调整为 **10**，即“仅在物理内存真的不够用时才使用 Swap”。

```bash
# 临时生效
sudo sysctl vm.swappiness=10

# 永久生效 (写入配置文件)
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

## 4. 结果验证

执行完上述操作后，再次运行 `free -h`：

```text
               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       1.5Gi       227Mi       1.5Mi       349Mi       402Mi
Swap:          5.9Gi       797Mi       5.2Gi
```

可以看到，现在系统拥有了近 6GB 的总可用内存（物理+虚拟）。即使 Trae 的后端服务占用较多内存，溢出的数据也会被安全地交换到磁盘中，而不会导致系统内核崩溃或死锁。

## 5. 总结
对于小内存（<= 4GB）的开发服务器，**启用 Swap 是必须的兜底措施**。虽然 Swap 的速度不如物理内存，但它能保证系统在高负载下不崩溃，是保障远程开发体验的关键一环。
