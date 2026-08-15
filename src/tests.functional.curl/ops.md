# Ops API
These docs are executable as bash scripts and used in functional tests. See `<meblog-src>/.justfiles/backend.just` for test setup.

## Ops API / Background
You needed a simple monitoring solution for your infra's VMs, so you "forked" [this one](https://github.com/andchir/linux-dash2) for the bash functions, throwing away the rest. Monitoring is hosted on the same box as the frontend and backend (oy!), but that's good enough for your needs. The purpose of your ops dashboard is to mostly look for security issues, making sure the VM hasn't been taken over...or diagnose why it has. You also added an alarm system FIXME to notify you of volatility in the system.

Your forked monitoring system allows you to use this API to query a single, server-side rendered (SSR) HTML page with _all_ the metrics you need for a publish stage:
* app metrics (total/blocked requests to nginx, pages requested, login attempts, cicd failures, etc.)
* infra metrics (cpu/memory usage, etc.)
* app runtime metrics (node gc etc https://www.npmjs.com/package/appmetrics TODO)

If a publish stage's VM goes down, your metrics go bye-bye. At some point you may put up some canary / integration test infra that's not hosted on a VM, and when you do that, FIXME you can implement metrics persistence.

## Ops API / Pre-reqs
Run the backend locally. Run the Auth API curl-based functional test to login.
```bash
export bearer_token=$(cat /tmp/meblog-test-token)
```

## Ops API / Dashboard
The ops dashboard is restricted to "authed" users. To get a pre-rendered version of the ops dashboard, from a terminal, run:
```bash
echo "getOpsDashboard"
ops_response=$(curl --fail -X POST "http://localhost:8081/api/ops" \
 -H "authorization: Bearer ${bearer_token}" \
 -H "Content-Type: application/json")
echo ${ops_response}
```

To get a rendered-on-the-fly version of the ops dashboard, from a terminal, run:
```bash
echo "getOpsDashboard"
ops_response=$(curl --fail -X POST "http://localhost:8081/api/ops?render=true" \
 -H "authorization: Bearer ${bearer_token}" \
 -H "Content-Type: application/json")
echo ${ops_response}
```

## Ops API / Metrics
Ops insights for the infra's applications come from metrics, which are emitted by your backend, and also generated from log parsing nginx/fail2ban logs et. al. Metrics === analytics here.

FIXME Add metrics.

## Ops API / Monitor Stats
Ops insights for VMs come from bash commands. 

FIXME Are these necessary? Are you considering enabling realtime? websocket would be better? maybe make these history? lots of points potentially?

### Ops API / Monitor Stat / ARP Cache
```bash
echo "/api/ops/monitor-stat/arp-cache"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/arp-cache" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Network Bandwidth
```bash
echo "/api/ops/monitor-stat/network-bandwidth"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/network-bandwidth" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / CPU Info
```bash
echo "/api/ops/monitor-stat/cpu-info"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/cpu-info" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / CPU Intensive Processes
```bash
echo "/api/ops/monitor-stat/cpu-intensive-processes"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/cpu-intensive-processes" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / CPU Temp
```bash
echo "/api/ops/monitor-stat/cpu-temp"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/cpu-temp" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / CPU Utilization
```bash
echo "/api/ops/monitor-stat/cpu-utilization"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/cpu-utilization" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Cron History
```bash
echo "/api/ops/monitor-stat/cron-history"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/cron-history" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Current RAM
```bash
echo "/api/ops/monitor-stat/current_ram"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/current_ram" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Disk Partitions
```bash
echo "/api/ops/monitor-stat/disk-partitions"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/disk-partitions" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Docker Processes
```bash
echo "/api/ops/monitor-stat/docker-processes"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/docker-processes" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Download Transfer Rate
```bash
echo "/api/ops/monitor-stat/download-transfer-rate"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/download-transfer-rate" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / General Info
```bash
echo "/api/ops/monitor-stat/general-info"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/general-info" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / IO Stats
```bash
echo "/api/ops/monitor-stat/io-stats"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/io-stats" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / IP Addresses
```bash
echo "/api/ops/monitor-stat/ip-addresses"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/ip-addresses" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Load Average
```bash
echo "/api/ops/monitor-stat/load-avg"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/load-avg" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Logged In Users
```bash
echo "/api/ops/monitor-stat/logged-in-users"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/logged-in-users" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Memory Info
```bash
echo "/api/ops/monitor-stat/memory-info"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/memory-info" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Network Connections
```bash
echo "/api/ops/monitor-stat/network-connections"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/network-connections" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Number of CPU Cores
```bash
echo "/api/ops/monitor-stat/number-of-cpu-core"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/number-of-cpu-cores" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / RAM Intensive Processes
```bash
echo "/api/ops/monitor-stat/ram-intensive-processes"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/ram-intensive-processes" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Recent Account Logins
```bash
echo "/api/ops/monitor-stat/recent-account-logins"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/recent-account-logins" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Scheduled Crons
```bash
echo "/api/ops/monitor-stat/scheduled-crons"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/scheduled-crons" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Swap
```bash
echo "/api/ops/monitor-stat/swap"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/swap" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / Upload Transfer Rate
```bash
echo "/api/ops/monitor-stat/upload-transfer-rate"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/upload-transfer-rate" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```

### Ops API / Monitor Stat / User Accounts
```bash
echo "/api/ops/monitor-stat/user-accounts"
monitor_stat_response=$(curl --fail -X GET "http://localhost:8081/api/ops/monitor-stat/user-accounts" \
  -H "authorization: Bearer ${bearer_token}" \
  -H "Content-Type: application/json")
echo ${monitor_stat_response}
```