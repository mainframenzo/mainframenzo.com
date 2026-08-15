// This file is responsible for providing functions to retrieve monitoring data from the OS.
import _globalThis from '../@types/global-this';

import spawn from 'spawn-please';

import { components } from '../openapi-def/types';
import * as iface from './iface';
import { validateSchema } from './runtime-schema-validator';

export const getMonitorStatArpCache = async (): Promise<components['schemas']['IMonitorArpCacheEntry'][]> => {
  console.trace('getMonitorStatArpCache');

  // [
  //   {
  //     "addr":"NBG6817.local",
  //     "hw_type":"ether",
  //     "hw_addr.":"54:83:3a:73:1a:56",
  //     "mask":"wlp192s0"
  //   },
  //   {
  //     "addr":"Mac.local",
  //     "hw_type":"ether",
  //     "hw_addr.":"e2:35:03:58:1e:96",
  //     "mask":"wlp192s0"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.arp_cache);

  const monitorArpCacheEntries = JSON.parse(rawBashFunctionResponse) as components['schemas']['IMonitorArpCacheEntry'][];
  
  // @ts-ignore
  const updatedMonitorCacheEntries = monitorArpCacheEntries.map(monitorArpCacheEntry => {
    // @ts-ignore
    const hw_addr = monitorArpCacheEntry['hw_addr.']; // FIXME OpenAPI limitation.
    monitorArpCacheEntry.hw_addr = hw_addr;
    // @ts-ignore
    delete monitorArpCacheEntry['hw_addr.'];

    return monitorArpCacheEntry;
  });

  return await validateSchema<components['schemas']['IMonitorArpCacheEntry'][]>('monitor.arp-cache-entry.schema.yaml', updatedMonitorCacheEntries);
}

const bashScriptFunctionExec = async(functionName: iface.MetricName) => {
  let bashFunctionResponse = '';
  await spawn(`${process.cwd()}/src/backend/monitoring-linux-api.sh`, [functionName], { 
    rejectOnError: true, 
    stdout: (data) => { bashFunctionResponse += Buffer.from(data).toString(); },
    stderr: (data) => { console.error(Buffer.from(data).toString()); }
  });
  //console.debug('bashFunctionResponse', bashFunctionResponse);

  return bashFunctionResponse;
}

export const getMonitorStatBandwidth = async (): Promise<components['schemas']['IMonitorBandwidthEntry'][]> => {
  console.trace('getMonitorStatBandwidth');

  // [
  //   {
  //     "addr":"NBG6817.local",
  //     "hw_type":"ether",
  //     "hw_addr.":"ea:sp:or:ts:it:si",
  //     "mask":"inthegame"
  //   },
  //   {
  //     "addr":"Mac.local",
  //     "hw_type":"ether",
  //     "hw_addr.":"ea:sp:or:ts:it:si",
  //     "mask":"inthegame"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.bandwidth);

  const monitorBandwidthEntries = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorBandwidthEntry'][];
  //console.debug('monitorBandwidthEntries', monitorBandwidthEntries);

  return await validateSchema<components['schemas']['IMonitorBandwidthEntry'][]>('monitor.bandwidth-entry.schema.yaml', monitorBandwidthEntries);
}

export const getMonitorStatCpuInfo = async (): Promise<components['schemas']['IMonitorCpuInfo']> => {
  console.trace('getMonitorStatCpuInfo');

  // {
  //   "Architecture":" x86_64",
  //   "CPU op-mode(s)":" 32-bit, 64-bit",
  //   "Address sizes":" 48 bits physical, 48 bits virtual",
  //   "Byte Order":" Little Endian",
  //   "CPU(s)":" 16",
  //   "On-line CPU(s) list":" 0-15",
  //   "Vendor ID":" AuthenticAMD",
  //   "Model name":" AMD Ryzen AI 7 350 w/ Radeon 860M",
  //   "CPU family":" 26",
  //   "Model":" 96",
  //   "Thread(s) per core":" 2",
  //   "Core(s) per socket":" 8",
  //   "Socket(s)":" 1",
  //   "Stepping":" 0",
  //   "Frequency boost":" enabled",
  //   "CPU(s) scaling MHz":" 74%",
  //   "CPU max MHz":" 2000.0000",
  //   "CPU min MHz":" 599.0000",
  //   "BogoMIPS":" 3992.47",
  //   "Flags":" fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp lm constant_tsc rep_good amd_lbr_v2 nopl xtopology nonstop_tsc cpuid extd_apicid aperfmperf rapl pni pclmulqdq monitor ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand lahf_lm cmp_legacy svm extapic cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw ibs skinit wdt tce topoext perfctr_core perfctr_nb bpext perfctr_llc mwaitx cpb cat_l3 cdp_l3 hw_pstate ssbd mba perfmon_v2 ibrs ibpb stibp ibrs_enhanced vmmcall fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid cqm rdt_a avx512f avx512dq rdseed adx smap avx512ifma clflushopt clwb avx512cd sha_ni avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves cqm_llc cqm_occup_llc cqm_mbm_total cqm_mbm_local user_shstk avx_vnni avx512_bf16 clzero irperf xsaveerptr rdpru wbnoinvd cppc arat npt lbrv svm_lock nrip_save tsc_scale vmcb_clean flushbyasid decodeassists pausefilter pfthreshold avic v_vmsave_vmload vgif x2avic v_spec_ctrl vnmi avx512vbmi umip pku ospke avx512_vbmi2 gfni vaes vpclmulqdq avx512_vnni avx512_bitalg avx512_vpopcntdq rdpid bus_lock_detect movdiri movdir64b overflow_recov succor smca fsrm avx512_vp2intersect flush_l1d amd_lbr_pmc_freeze",
  //   "Virtualization":" AMD-V",
  //   "L1d cache":" 384 KiB (8 instances)",
  //   "L1i cache":" 256 KiB (8 instances)",
  //   "L2 cache":" 8 MiB (8 instances)",
  //   "L3 cache":" 16 MiB (1 instance)",
  //   "NUMA node(s)":" 1",
  //   "NUMA node0 CPU(s)":" 0-15",
  //   "Vulnerability Gather data sampling":" Not affected",
  //   "Vulnerability Ghostwrite":" Not affected",
  //   "Vulnerability Indirect target selection":" Not affected",
  //   "Vulnerability Itlb multihit":" Not affected",
  //   "Vulnerability L1tf":" Not affected",
  //   "Vulnerability Mds":" Not affected",
  //   "Vulnerability Meltdown":" Not affected",
  //   "Vulnerability Mmio stale data":" Not affected",
  //   "Vulnerability Reg file data sampling":" Not affected",
  //   "Vulnerability Retbleed":" Not affected",
  //   "Vulnerability Spec rstack overflow":" Mitigation; IBPB on VMEXIT only",
  //   "Vulnerability Spec store bypass":" Mitigation; Speculative Store Bypass disabled via prctl",
  //   "Vulnerability Spectre v1":" Mitigation; usercopy/swapgs barriers and __user pointer sanitization",
  //   "Vulnerability Spectre v2":" Mitigation; Enhanced / Automatic IBRS; IBPB conditional; STIBP always-on; PBRSB-eIBRS Not affected; BHI Not affected",
  //   "Vulnerability Srbds":" Not affected",
  //   "Vulnerability Tsa":" Not affected",
  //   "Vulnerability Tsx async abort":" Not affected",
  //   "Vulnerability Vmscape":" Mitigation; IBPB on VMEXIT"
  // }
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.cpu_info);

  const monitorCpuInfo = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorCpuInfo'];
  //console.debug('monitorCpuInfo', monitorCpuInfo);

  return await validateSchema<components['schemas']['IMonitorCpuInfo']>('monitor.cpuinfo.schema.yaml', monitorCpuInfo);
}

export const getMonitorStatCpuIntensiveProcesses = async (): Promise<components['schemas']['IMonitorProcessEntry'][]> => {
  console.trace('getMonitorStatCpuIntensiveProcesses');

  // [
  //   {
  //     "pid":64993,
  //     "user":"mainfra+",
  //     "cpu%":23.7,
  //     "rss":165428,
  //     "vsz":18898948,
  //     "cmd":"MainThread"
  //   },
  //   {
  //     "pid":7456,
  //     "user":"mainfra+",
  //     "cpu%":11.8,
  //     "rss":1115880,
  //     "vsz":13179032,
  //     "cmd":"firefox"
  //   },
  //   {
  //     "pid":59392,
  //     "user":"mainfra+",
  //     "cpu%":6.8,
  //     "rss":556356,
  //     "vsz":3188860,
  //     "cmd":"Isolated"
  //   },
  //   {
  //     "pid":6666,
  //     "user":"mainfra+",
  //     "cpu%":6.2,
  //     "rss":506116,
  //     "vsz":6443276,
  //     "cmd":"gnome-shell"
  //   },
  //   {
  //     "pid":55066,
  //     "user":"mainfra+",
  //     "cpu%":4.9,
  //     "rss":864844,
  //     "vsz":3385424,
  //     "cmd":"Isolated"
  //   },
  //   {
  //     "pid":13921,
  //     "user":"mainfra+",
  //     "cpu%":4.6,
  //     "rss":753504,
  //     "vsz":1465104832,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":65051,
  //     "user":"mainfra+",
  //     "cpu%":3.9,
  //     "rss":4232,
  //     "vsz":73232,
  //     "cmd":"just"
  //   },
  //   {
  //     "pid":48813,
  //     "user":"mainfra+",
  //     "cpu%":3.5,
  //     "rss":952168,
  //     "vsz":3548824,
  //     "cmd":"Isolated"
  //   },
  //   {
  //     "pid":7717,
  //     "user":"mainfra+",
  //     "cpu%":2.5,
  //     "rss":183980,
  //     "vsz":1011256,
  //     "cmd":"RDD"
  //   },
  //   {
  //     "pid":65020,
  //     "user":"mainfra+",
  //     "cpu%":1.9,
  //     "rss":74288,
  //     "vsz":2587580,
  //     "cmd":"Web"
  //   },
  //   {
  //     "pid":13869,
  //     "user":"mainfra+",
  //     "cpu%":1.4,
  //     "rss":262460,
  //     "vsz":51353152,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":14580,
  //     "user":"mainfra+",
  //     "cpu%":0.8,
  //     "rss":525456,
  //     "vsz":1459514516,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":30871,
  //     "user":"mainfra+",
  //     "cpu%":0.8,
  //     "rss":525404,
  //     "vsz":3260568,
  //     "cmd":"Isolated"
  //   },
  //   {
  //     "pid":64957,
  //     "user":"mainfra+",
  //     "cpu%":0.7,
  //     "rss":4092,
  //     "vsz":73232,
  //     "cmd":"just"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.cpu_intensive_processes);

  const monitorCpuIntensiveProcesses = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorProcessEntry'][];
  //console.debug('monitorCpuIntensiveProcesses', monitorCpuIntensiveProcesses);

  return await validateSchema<components['schemas']['IMonitorProcessEntry'][]>('monitor.process-entry.schema.yaml', monitorCpuIntensiveProcesses);
}

export const getMonitorStatCpuTemp = async (): Promise<number> => {
  console.trace('getMonitorStatCpuTemp');

  // FIXME []
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.cpu_temp);

  // FIXME no schema
  //const monitorCpuInfo = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitor'];
  //console.debug('monitorCpuInfo', monitorCpuInfo);

  return 0;
}

export const getMonitorStatCpuUtilization = async (): Promise<number> => {
  console.trace('getMonitorStatCpuUtilization');

  // FIXME []
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.cpu_utilization);

  // FIXME no schema
  //const monitorCpuInfo = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitor'];
  //console.debug('monitorCpuInfo', monitorCpuInfo);

  return 0;
}

export const getMonitorStatCronHistory = async (): Promise<components['schemas']['IMonitorCronHistoryEntry'][]> => {
  console.trace('getMonitorStatCronHistory');

  // FIXME []
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.cron_history);

  const monitorCronHistoryEntries = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorCronHistoryEntry'][];
  //console.debug('monitorCronHistory', monitorCronHistory);

  return await validateSchema<components['schemas']['IMonitorCronHistoryEntry'][]>('monitor.cron-history-entry.schema.yaml', monitorCronHistoryEntries);
}

export const getMonitorStatCurrentRam = async (): Promise<components['schemas']['IMonitorRamInfo']> => {
  console.trace('getMonitorStatCurrentRam');

  // {
  //   "total":93534.9,
  //   "used":5943.51,
  //   "available":87591.4
  // }
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.current_ram);

  const monitorCurrentRam = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorRamInfo'];
  //console.debug('monitorCurrentRam', monitorCurrentRam);

  return await validateSchema<components['schemas']['IMonitorRamInfo']>('monitor.ram-info.schema.yaml', monitorCurrentRam);
}

export const getMonitorStatDiskPartitions = async (): Promise<components['schemas']['IMonitorDiskPartition'][]> => {
  console.trace('getMonitorStatDiskPartitions');

  // [
  //   {
  //     "file_system":"tmpfs",
  //     "size":"9.2G",
  //     "used":"6.3M",
  //     "avail":"9.2G",
  //     "used%":"1%",
  //     "mounted":"/run"
  //   },
  //   {
  //     "file_system":"/dev/mapper/ubuntu--vg-ubuntu--lv",
  //     "size":"913G",
  //     "used":"647G",
  //     "avail":"221G",
  //     "used%":"75%",
  //     "mounted":"/"
  //   },
  //   {
  //     "file_system":"tmpfs",
  //     "size":"46G",
  //     "used":"7.8M",
  //     "avail":"46G",
  //     "used%":"1%",
  //     "mounted":"/dev/shm"
  //   },
  //   {
  //     "file_system":"efivarfs",
  //     "size":"148K",
  //     "used":"88K",
  //     "avail":"56K",
  //     "used%":"61%",
  //     "mounted":"/sys/firmware/efi/efivars"
  //   },
  //   {
  //     "file_system":"tmpfs",
  //     "size":"5.0M",
  //     "used":"16K",
  //     "avail":"5.0M",
  //     "used%":"1%",
  //     "mounted":"/run/lock"
  //   },
  //   {
  //     "file_system":"tmpfs",
  //     "size":"1.0M",
  //     "used":"0",
  //     "avail":"1.0M",
  //     "used%":"0%",
  //     "mounted":"/run/credentials/systemd-journald.service"
  //   },
  //   {
  //     "file_system":"tmpfs",
  //     "size":"1.0M",
  //     "used":"0",
  //     "avail":"1.0M",
  //     "used%":"0%",
  //     "mounted":"/run/credentials/systemd-resolved.service"
  //   },
  //   {
  //     "file_system":"tmpfs",
  //     "size":"1.0M",
  //     "used":"0",
  //     "avail":"1.0M",
  //     "used%":"0%",
  //     "mounted":"/run/credentials/systemd-cryptsetup@dm_cryptx2d0.service"
  //   },
  //   {
  //     "file_system":"/dev/nvme0n1p2",
  //     "size":"2.0G",
  //     "used":"298M",
  //     "avail":"1.5G",
  //     "used%":"17%",
  //     "mounted":"/boot"
  //   },
  //   {
  //     "file_system":"tmpfs",
  //     "size":"46G",
  //     "used":"2.9M",
  //     "avail":"46G",
  //     "used%":"1%",
  //     "mounted":"/tmp"
  //   },
  //   {
  //     "file_system":"/dev/nvme0n1p1",
  //     "size":"1.1G",
  //     "used":"6.2M",
  //     "avail":"1.1G",
  //     "used%":"1%",
  //     "mounted":"/boot/efi"
  //   },
  //   {
  //     "file_system":"tmpfs",
  //     "size":"9.2G",
  //     "used":"152K",
  //     "avail":"9.2G",
  //     "used%":"1%",
  //     "mounted":"/run/user/1000"
  //   },
  //   {
  //     "file_system":"/dev/sda1",
  //     "size":"932G",
  //     "used":"609G",
  //     "avail":"324G",
  //     "used%":"66%",
  //     "mounted":"/media/user/drive"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.disk_partitions);

  const monitorDiskPartitions = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorDiskPartition'][];
  //console.debug('monitorDiskPartitions', monitorDiskPartitions);

  return await validateSchema<components['schemas']['IMonitorDiskPartition'][]>('monitor.disk-partition.schema.yaml', monitorDiskPartitions);
}

export const getMonitorStatDockerProcesses = async (): Promise<components['schemas']['IMonitorProcessEntry'][]> => {
  console.trace('getMonitorStatDockerProcesses');

  // FIXME []
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.docker_processes);

  return await validateSchema<components['schemas']['IMonitorProcessEntry'][]>('monitor.process-entry.schema.yaml', []);
}

export const getMonitorStatDownloadTransferRate = async (): Promise<components['schemas']['IMonitorTransferRates']> => {
  console.trace('getMonitorStatDownloadTransferRate');

  // {
  //   "docker0":0,
  //   "lo":0,
  //   "mpqemubr0":0,
  //   "vmnet1":0,
  //   "vmnet8":0,
  //   "wlp192s0":0
  // }
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.download_transfer_rate);

  // FIXME Rename to IMonitorTransferRate
  const monitorDownloadTransferRate = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorTransferRates'];
  //console.debug('monitorDownloadTransferRate', monitorDownloadTransferRate);

  return await validateSchema<components['schemas']['IMonitorTransferRates']>('monitor.transfer-rates.schema.yaml', monitorDownloadTransferRate);
}

export const getMonitorStatGeneralInfo = async (): Promise<components['schemas']['IMonitorGeneralInfo']> => {
  console.trace('getMonitorStatGeneralInfo');

  // {
  //   "OS":"Ubuntu 25.04 6.14.0-37-generic",
  //   "Hostname":"mainframenzo-what",
  //   "Uptime":" 2 minutes and 27 seconds ",
  //   "Server Time":"Tue Mar 24 10:24:08 AM PDT 2026"
  // }
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.general_info);

  const monitorGeneralInfo = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorGeneralInfo'];
  //console.debug('monitorGeneralInfo', monitorGeneralInfo);

  return await validateSchema<components['schemas']['IMonitorGeneralInfo']>('monitor.general-info.schema.yaml', monitorGeneralInfo);
}

export const getMonitorStatIoStats = async (): Promise<components['schemas']['IMonitorIoStat'][]> => {
  console.trace('getMonitorStatIoStats');

  // [
  //   {
  //     "device":"loop0",
  //     "reads":"62",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop1",
  //     "reads":"54",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop2",
  //     "reads":"14",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"0"
  //   },
  //   {
  //     "device":"loop3",
  //     "reads":"57",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop4",
  //     "reads":"62",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop5",
  //     "reads":"53",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop6",
  //     "reads":"62",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop7",
  //     "reads":"53",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"nvme0n1",
  //     "reads":"84335",
  //     "writes":"17077",
  //     "in_prog.":"0",
  //     "time":"5549"
  //   },
  //   {
  //     "device":"nvme0n1p1",
  //     "reads":"546",
  //     "writes":"2",
  //     "in_prog.":"0",
  //     "time":"11"
  //   },
  //   {
  //     "device":"nvme0n1p2",
  //     "reads":"344",
  //     "writes":"22",
  //     "in_prog.":"0",
  //     "time":"30"
  //   },
  //   {
  //     "device":"nvme0n1p3",
  //     "reads":"83384",
  //     "writes":"17053",
  //     "in_prog.":"0",
  //     "time":"6191"
  //   },
  //   {
  //     "device":"sda",
  //     "reads":"830",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"134"
  //   },
  //   {
  //     "device":"sda1",
  //     "reads":"738",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"119"
  //   },
  //   {
  //     "device":"dm-0",
  //     "reads":"126599",
  //     "writes":"40486",
  //     "in_prog.":"0",
  //     "time":"7058"
  //   },
  //   {
  //     "device":"dm-1",
  //     "reads":"112607",
  //     "writes":"39387",
  //     "in_prog.":"0",
  //     "time":"7177"
  //   },
  //   {
  //     "device":"loop8",
  //     "reads":"45",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop9",
  //     "reads":"76",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop10",
  //     "reads":"44",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop11",
  //     "reads":"46",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop12",
  //     "reads":"49",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop13",
  //     "reads":"51",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"2"
  //   },
  //   {
  //     "device":"loop14",
  //     "reads":"56",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"2"
  //   },
  //   {
  //     "device":"loop15",
  //     "reads":"778",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"34"
  //   },
  //   {
  //     "device":"loop16",
  //     "reads":"58",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop17",
  //     "reads":"44",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop18",
  //     "reads":"546",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"24"
  //   },
  //   {
  //     "device":"loop19",
  //     "reads":"140",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"13"
  //   },
  //   {
  //     "device":"loop20",
  //     "reads":"46",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop21",
  //     "reads":"44",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop22",
  //     "reads":"56",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop23",
  //     "reads":"1144",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"60"
  //   },
  //   {
  //     "device":"loop24",
  //     "reads":"55",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop25",
  //     "reads":"52",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop27",
  //     "reads":"58",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"7"
  //   },
  //   {
  //     "device":"loop26",
  //     "reads":"55",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop28",
  //     "reads":"1542",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"298"
  //   },
  //   {
  //     "device":"loop29",
  //     "reads":"47",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop30",
  //     "reads":"44",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop31",
  //     "reads":"64",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"7"
  //   },
  //   {
  //     "device":"loop32",
  //     "reads":"60",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop33",
  //     "reads":"53",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop34",
  //     "reads":"61",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop35",
  //     "reads":"61",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop36",
  //     "reads":"54",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"7"
  //   },
  //   {
  //     "device":"loop37",
  //     "reads":"3659",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"176"
  //   },
  //   {
  //     "device":"loop38",
  //     "reads":"58",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop39",
  //     "reads":"362",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"9"
  //   },
  //   {
  //     "device":"loop40",
  //     "reads":"61",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop41",
  //     "reads":"56",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop42",
  //     "reads":"2805",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"32"
  //   },
  //   {
  //     "device":"loop43",
  //     "reads":"76",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop44",
  //     "reads":"64",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop45",
  //     "reads":"60",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop47",
  //     "reads":"57",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop46",
  //     "reads":"61",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop48",
  //     "reads":"55",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop49",
  //     "reads":"62",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"2"
  //   },
  //   {
  //     "device":"loop50",
  //     "reads":"45",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop51",
  //     "reads":"58",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop52",
  //     "reads":"71",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop53",
  //     "reads":"44",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop54",
  //     "reads":"402",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"22"
  //   },
  //   {
  //     "device":"loop55",
  //     "reads":"81",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop56",
  //     "reads":"56",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop57",
  //     "reads":"61",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"5"
  //   },
  //   {
  //     "device":"loop59",
  //     "reads":"48",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop58",
  //     "reads":"46",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop60",
  //     "reads":"44",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"2"
  //   },
  //   {
  //     "device":"loop61",
  //     "reads":"841",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"80"
  //   },
  //   {
  //     "device":"loop62",
  //     "reads":"35",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"2"
  //   },
  //   {
  //     "device":"loop63",
  //     "reads":"21",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"0"
  //   },
  //   {
  //     "device":"loop64",
  //     "reads":"61",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop65",
  //     "reads":"58",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop66",
  //     "reads":"61",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop67",
  //     "reads":"63",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop68",
  //     "reads":"54",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"4"
  //   },
  //   {
  //     "device":"loop69",
  //     "reads":"38",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"2"
  //   },
  //   {
  //     "device":"loop70",
  //     "reads":"40",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"3"
  //   },
  //   {
  //     "device":"loop71",
  //     "reads":"45",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"1"
  //   },
  //   {
  //     "device":"loop72",
  //     "reads":"62",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"6"
  //   },
  //   {
  //     "device":"loop73",
  //     "reads":"11",
  //     "writes":"0",
  //     "in_prog.":"0",
  //     "time":"0"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.io_stats);

  const monitorIoStats = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorIoStat'][];
  //console.debug('monitorIoStats', monitorIoStats);

  return await validateSchema<components['schemas']['IMonitorIoStat'][]>('monitor.io-stat.schema.yaml', monitorIoStats);
}

export const getMonitorStatIpAddresses = async (): Promise<components['schemas']['IMonitorIpAddress'][]> => {
  console.trace('getMonitorStatIpAddresses');

  // [
  //   {
  //     "interface":"docker0",
  //     "ip":""
  //   },
  //   {
  //     "interface":"lo",
  //     "ip":""
  //   },
  //   {
  //     "interface":"mpqemubr0",
  //     "ip":""
  //   },
  //   {
  //     "interface":"vmnet1",
  //     "ip":""
  //   },
  //   {
  //     "interface":"vmnet8",
  //     "ip":""
  //   },
  //   {
  //     "interface":"wlp192s0",
  //     "ip":"may be missing"
  //   },
  //   {
  //     "interface":"external",
  //     "ip":"ip"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.ip_addresses);

  const monitorIpAddresses = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorIpAddress'][];
  //console.debug('monitorIpAddresses', monitorIpAddresses);

  return await validateSchema<components['schemas']['IMonitorIpAddress'][]>('monitor.ip-address.schema.yaml', monitorIpAddresses);
}

export const getMonitorStatLoadAvg = async (): Promise<components['schemas']['IMonitorLoadAverage'][]> => {
  console.trace('getMonitorStatLoadAvg');

  // {
  //   "1_min_avg":10.6875,
  //   "5_min_avg":4.75,
  //   "15_min_avg":1.8125
  // }
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.load_avg);

  const monitorLoadAverage = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorLoadAverage'][];
  //console.debug('monitorLoadAverage', monitorLoadAverage);

  return await validateSchema<components['schemas']['IMonitorLoadAverage'][]>('monitor.load-average.schema.yaml', monitorLoadAverage);
}

export const getMonitorStatLoggedInUsers = async (): Promise<components['schemas']['ILoggedInUser'][]> => {
  console.trace('getMonitorStatLoggedInUsers');

  // [
  //   {
  //     "user":"mainfram",
  //     "from":"-",
  //     "when":"10:22"
  //   },
  //   {
  //     "user":"mainfram",
  //     "from":"10:22",
  //     "when":"1:41"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.logged_in_users);

  // FIXME Rename to IMonitorLoggedInUser
  const monitorLoggedInUsers = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['ILoggedInUser'][];
  //console.debug('monitorLoggedInUsers', monitorLoggedInUsers);
  
  return await validateSchema<components['schemas']['ILoggedInUser'][]>('monitor.logged-in-user.schema.yaml', monitorLoggedInUsers);
}

export const getMonitorStatMemoryInfo = async (): Promise<components['schemas']['IMonitorMemoryInfo'][]> => {
  console.trace('getMonitorStatMemoryInfo');

  // FIXME Formatting.
  // {
  //   "MemTotal":"       95779700 kB",
  //   "MemFree":"        85398428 kB",
  //   "MemAvailable":"   89060860 kB",
  //   "Buffers":"          370644 kB",
  //   "Cached":"          3946732 kB",
  //   "SwapCached":"            0 kB",
  //   "Active":"          6149376 kB",
  //   "Inactive":"        1952716 kB",
  //   "Active(anon)":"    3792676 kB",
  //   "Inactive(anon)":"        0 kB",
  //   "Active(file)":"    2356700 kB",
  //   "Inactive(file)":"  1952716 kB",
  //   "Unevictable":"          32 kB",
  //   "Mlocked":"              32 kB",
  //   "SwapTotal":"       8388604 kB",
  //   "SwapFree":"        8388604 kB",
  //   "Zswap":"                 0 kB",
  //   "Zswapped":"              0 kB",
  //   "Dirty":"             38992 kB",
  //   "Writeback":"            12 kB",
  //   "AnonPages":"       3784956 kB",
  //   "Mapped":"          1231564 kB",
  //   "Shmem":"            162444 kB",
  //   "KReclaimable":"     317228 kB",
  //   "Slab":"             838604 kB",
  //   "SReclaimable":"     317228 kB",
  //   "SUnreclaim":"       521376 kB",
  //   "KernelStack":"       26816 kB",
  //   "PageTables":"        56348 kB",
  //   "SecPageTables":"      4444 kB",
  //   "NFS_Unstable":"          0 kB",
  //   "Bounce":"                0 kB",
  //   "WritebackTmp":"          0 kB",
  //   "CommitLimit":"    56278452 kB",
  //   "Committed_AS":"   17799912 kB",
  //   "VmallocTotal":"   34359738367 kB",
  //   "VmallocUsed":"      128572 kB",
  //   "VmallocChunk":"          0 kB",
  //   "Percpu":"            22912 kB",
  //   "HardwareCorrupted":"     0 kB",
  //   "AnonHugePages":"         0 kB",
  //   "ShmemHugePages":"        0 kB",
  //   "ShmemPmdMapped":"        0 kB",
  //   "FileHugePages":"         0 kB",
  //   "FilePmdMapped":"         0 kB",
  //   "Unaccepted":"            0 kB",
  //   "HugePages_Total":"       0",
  //   "HugePages_Free":"        0",
  //   "HugePages_Rsvd":"        0",
  //   "HugePages_Surp":"        0",
  //   "Hugepagesize":"       2048 kB",
  //   "Hugetlb":"               0 kB",
  //   "DirectMap4k":"     1553140 kB",
  //   "DirectMap2M":"    13432832 kB",
  //   "DirectMap1G":"    85983232 kB"
  // }
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.memory_info);

  const monitorMemoryInfo = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorMemoryInfo'][];
  //console.debug('monitorMemoryInfo', monitorMemoryInfo);
  
  return await validateSchema<components['schemas']['IMonitorMemoryInfo'][]>('monitor.memory-info.schema.yaml', monitorMemoryInfo);
}

export const getMonitorStatNetworkConnections = async (): Promise<components['schemas']['IMonitorNetworkConnection'][]> => {
  console.trace('getMonitorStatNetworkConnections');

  // [
  //   {
  //     "connections":1,
  //     "address":"104.26.13.202:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"127.0.0.1:58696"
  //   },
  //   {
  //     "connections":19,
  //     "address":"127.0.0.1:8081"
  //   },
  //   {
  //     "connections":3,
  //     "address":"13.107.253.70:443"
  //   },
  //   {
  //     "connections":3,
  //     "address":"13.107.5.93:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"13.89.179.13:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"142.250.69.168:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"150.171.73.16:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"150.171.74.16:443"
  //   },
  //   {
  //     "connections":2,
  //     "address":"151.101.1.91:443"
  //   },
  //   {
  //     "connections":2,
  //     "address":"151.101.193.91:443"
  //   },
  //   {
  //     "connections":3,
  //     "address":"151.101.65.91:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"172.64.41.4:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"172.67.74.246:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"192.168.1.1:67"
  //   },
  //   {
  //     "connections":2,
  //     "address":"23.216.147.70:443"
  //   },
  //   {
  //     "connections":2,
  //     "address":"23.40.41.25:443"
  //   },
  //   {
  //     "connections":2,
  //     "address":"3.163.175.121:443"
  //   },
  //   {
  //     "connections":2,
  //     "address":"34.107.221.82:80"
  //   },
  //   {
  //     "connections":2,
  //     "address":"34.107.243.93:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"34.111.211.209:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"34.120.208.123:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"34.120.237.76:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"34.160.144.191:443"
  //   },
  //   {
  //     "connections":1,
  //     "address":"34.49.51.44:443"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.network_connections);

  const monitorNetworkConnections = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorNetworkConnection'][];
  //console.debug('monitorNetworkConnections', monitorNetworkConnections);

  return await validateSchema<components['schemas']['IMonitorNetworkConnection'][]>('monitor.network-connection.schema.yaml', monitorNetworkConnections);
}

export const getMonitorStatNumberOfCpuCores = async (): Promise<number> => {
  console.trace('getMonitorStatNumberOfCpuCores');

  // FIXME
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.number_of_cpu_cores);

  return 0;
}

export const getMonitorStatRamIntensiveProcesses = async (): Promise<components['schemas']['IMonitorProcessEntry'][]> => {
  console.trace('getMonitorStatRamIntensiveProcesses');

  // [
  //   {
  //     "pid":9673,
  //     "user":"mainfra+",
  //     "mem%":0.5,
  //     "rss":571408,
  //     "vsz":1459514516,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":7270,
  //     "user":"mainfra+",
  //     "mem%":0.5,
  //     "rss":563420,
  //     "vsz":12052232,
  //     "cmd":"firefox"
  //   },
  //   {
  //     "pid":6486,
  //     "user":"mainfra+",
  //     "mem%":0.4,
  //     "rss":465908,
  //     "vsz":6385624,
  //     "cmd":"gnome-shell"
  //   },
  //   {
  //     "pid":10298,
  //     "user":"mainfra+",
  //     "mem%":0.4,
  //     "rss":433352,
  //     "vsz":1462931304,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":7778,
  //     "user":"mainfra+",
  //     "mem%":0.4,
  //     "rss":384196,
  //     "vsz":3092028,
  //     "cmd":"WebExtensions"
  //   },
  //   {
  //     "pid":9339,
  //     "user":"mainfra+",
  //     "mem%":0.3,
  //     "rss":374844,
  //     "vsz":1461336228,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":8739,
  //     "user":"mainfra+",
  //     "mem%":0.3,
  //     "rss":371104,
  //     "vsz":1463376392,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":8619,
  //     "user":"mainfra+",
  //     "mem%":0.2,
  //     "rss":247816,
  //     "vsz":1461646556,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":8673,
  //     "user":"mainfra+",
  //     "mem%":0.2,
  //     "rss":247592,
  //     "vsz":34567872,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":9672,
  //     "user":"mainfra+",
  //     "mem%":0.2,
  //     "rss":200976,
  //     "vsz":1476291668,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":8177,
  //     "user":"mainfra+",
  //     "mem%":0.1,
  //     "rss":185220,
  //     "vsz":2722944,
  //     "cmd":"Isolated"
  //   },
  //   {
  //     "pid":7521,
  //     "user":"mainfra+",
  //     "mem%":0.1,
  //     "rss":182508,
  //     "vsz":2708592,
  //     "cmd":"Privileged"
  //   },
  //   {
  //     "pid":9302,
  //     "user":"mainfra+",
  //     "mem%":0.1,
  //     "rss":177996,
  //     "vsz":1461351112,
  //     "cmd":"code"
  //   },
  //   {
  //     "pid":10744,
  //     "user":"mainfra+",
  //     "mem%":0.1,
  //     "rss":168512,
  //     "vsz":18896520,
  //     "cmd":"MainThread"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.ram_intensive_processes);

  const monitorRamIntensiveProcesses = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorProcessEntry'][];
  //console.debug('monitorRamIntensiveProcesses', monitorRamIntensiveProcesses);

  return await validateSchema<components['schemas']['IMonitorProcessEntry'][]>('monitor.process-entry.schema.yaml', monitorRamIntensiveProcesses);
}

export const getMonitorStatRecentAccountLogins = async (): Promise<components['schemas']['IMonitorRecentLogin'][]> => {
  console.trace('getMonitorStatRecentAccountLogins');

  // FIXME []
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.recent_account_logins);

  const monitorRecentLogins = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorRecentLogin'][];
  //console.debug('monitorRecentLogins', monitorRecentLogins);

  return await validateSchema<components['schemas']['IMonitorRecentLogin'][]>('monitor.recent-login.schema.yaml', monitorRecentLogins);
}

export const getMonitorStatScheduledCrons = async (): Promise<components['schemas']['IMonitorScheduledCron'][]> => {
  console.trace('getMonitorStatScheduledCrons');

  // FIXME 
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.scheduled_crons);

  const monitorScheduledCrons = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorScheduledCron'][];
  //console.debug('monitorScheduledCrons', monitorScheduledCrons);

  return await validateSchema<components['schemas']['IMonitorScheduledCron'][]>('monitor.scheduled-cron.schema.yaml', monitorScheduledCrons);
}

export const getMonitorStatSwap = async (): Promise<components['schemas']['IMonitorSwapPartition'][]> => {
  console.trace('getMonitorStatSwap');

  // [
  //   {
  //     "filename":"/swap.img",
  //     "type":"file",
  //     "size":"8388604",
  //     "used":"0",
  //     "priority":"-2"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.swap);

  const monitorSwapPartitions = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorSwapPartition'][];
  //console.debug('monitorSwapPartitions', monitorSwapPartitions);

  return await validateSchema<components['schemas']['IMonitorSwapPartition'][]>('monitor.swap-partition.schema.yaml', monitorSwapPartitions);
}

export const getMonitorStatUploadTransferRate = async (): Promise<components['schemas']['IMonitorTransferRates']> => {
  console.trace('getMonitorStatUploadTransferRate');

  // {
  //   "docker0":0,
  //   "lo":0,
  //   "mpqemubr0":0,
  //   "vmnet1":0,
  //   "vmnet8":0,
  //   "wlp192s0":0
  // }
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.upload_transfer_rate);

  const monitorUploadTransferRates = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorTransferRates'];
  //console.debug('monitorUploadTransferRates', monitorUploadTransferRates);
  
  return await validateSchema<components['schemas']['IMonitorTransferRates']>('monitor.transfer-rates.schema.yaml', monitorUploadTransferRates);
}

export const getMonitorStatUserAccounts = async (): Promise<components['schemas']['IMonitorUserAccount'][]> => {
  console.trace('getMonitorStatUserAccounts');

  // [
  //   {
  //     "type":"system",
  //     "user":"root",
  //     "home":"/root"
  //   },
  //   {
  //     "type":"system",
  //     "user":"daemon",
  //     "home":"/usr/sbin"
  //   },
  //   {
  //     "type":"system",
  //     "user":"bin",
  //     "home":"/bin"
  //   },
  //   {
  //     "type":"system",
  //     "user":"sys",
  //     "home":"/dev"
  //   },
  //   {
  //     "type":"system",
  //     "user":"sync",
  //     "home":"/bin"
  //   },
  //   {
  //     "type":"system",
  //     "user":"games",
  //     "home":"/usr/games"
  //   },
  //   {
  //     "type":"system",
  //     "user":"man",
  //     "home":"/var/cache/man"
  //   },
  //   {
  //     "type":"system",
  //     "user":"lp",
  //     "home":"/var/spool/lpd"
  //   },
  //   {
  //     "type":"system",
  //     "user":"mail",
  //     "home":"/var/mail"
  //   },
  //   {
  //     "type":"system",
  //     "user":"news",
  //     "home":"/var/spool/news"
  //   },
  //   {
  //     "type":"system",
  //     "user":"uucp",
  //     "home":"/var/spool/uucp"
  //   },
  //   {
  //     "type":"system",
  //     "user":"proxy",
  //     "home":"/bin"
  //   },
  //   {
  //     "type":"system",
  //     "user":"www-data",
  //     "home":"/var/www"
  //   },
  //   {
  //     "type":"system",
  //     "user":"backup",
  //     "home":"/var/backups"
  //   },
  //   {
  //     "type":"system",
  //     "user":"list",
  //     "home":"/var/list"
  //   },
  //   {
  //     "type":"system",
  //     "user":"irc",
  //     "home":"/run/ircd"
  //   },
  //   {
  //     "type":"system",
  //     "user":"_apt",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"user",
  //     "user":"nobody",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"user",
  //     "user":"systemd-network",
  //     "home":"/"
  //   },
  //   {
  //     "type":"user",
  //     "user":"systemd-timesync",
  //     "home":"/"
  //   },
  //   {
  //     "type":"system",
  //     "user":"dhcpcd",
  //     "home":"/usr/lib/dhcpcd"
  //   },
  //   {
  //     "type":"user",
  //     "user":"messagebus",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"system",
  //     "user":"syslog",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"user",
  //     "user":"systemd-resolve",
  //     "home":"/"
  //   },
  //   {
  //     "type":"system",
  //     "user":"tss",
  //     "home":"/var/lib/tpm"
  //   },
  //   {
  //     "type":"system",
  //     "user":"uuidd",
  //     "home":"/run/uuidd"
  //   },
  //   {
  //     "type":"user",
  //     "user":"systemd-oom",
  //     "home":"/"
  //   },
  //   {
  //     "type":"system",
  //     "user":"whoopsie",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"user",
  //     "user":"dnsmasq",
  //     "home":"/var/lib/misc"
  //   },
  //   {
  //     "type":"system",
  //     "user":"avahi",
  //     "home":"/run/avahi-daemon"
  //   },
  //   {
  //     "type":"system",
  //     "user":"nm-openvpn",
  //     "home":"/var/lib/openvpn/chroot"
  //   },
  //   {
  //     "type":"system",
  //     "user":"tcpdump",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"system",
  //     "user":"sssd",
  //     "home":"/var/lib/sss"
  //   },
  //   {
  //     "type":"system",
  //     "user":"speech-dispatcher",
  //     "home":"/run/speech-dispatcher"
  //   },
  //   {
  //     "type":"system",
  //     "user":"usbmux",
  //     "home":"/var/lib/usbmux"
  //   },
  //   {
  //     "type":"system",
  //     "user":"cups-pk-helper",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"user",
  //     "user":"fwupd-refresh",
  //     "home":"/var/lib/fwupd"
  //   },
  //   {
  //     "type":"system",
  //     "user":"saned",
  //     "home":"/var/lib/saned"
  //   },
  //   {
  //     "type":"system",
  //     "user":"geoclue",
  //     "home":"/var/lib/geoclue"
  //   },
  //   {
  //     "type":"system",
  //     "user":"cups-browsed",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"system",
  //     "user":"hplip",
  //     "home":"/run/hplip"
  //   },
  //   {
  //     "type":"user",
  //     "user":"gnome-remote-desktop",
  //     "home":"/var/lib/gnome-remote-desktop"
  //   },
  //   {
  //     "type":"user",
  //     "user":"polkitd",
  //     "home":"/"
  //   },
  //   {
  //     "type":"system",
  //     "user":"rtkit",
  //     "home":"/proc"
  //   },
  //   {
  //     "type":"system",
  //     "user":"colord",
  //     "home":"/var/lib/colord"
  //   },
  //   {
  //     "type":"system",
  //     "user":"gnome-initial-setup",
  //     "home":"/run/gnome-initial-setup/"
  //   },
  //   {
  //     "type":"system",
  //     "user":"gdm",
  //     "home":"/var/lib/gdm3"
  //   },
  //   {
  //     "type":"user",
  //     "user":"mainframenzo",
  //     "home":"/home/mainframenzo"
  //   },
  //   {
  //     "type":"user",
  //     "user":"snapd-range-524288-root",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"user",
  //     "user":"snap_daemon",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"system",
  //     "user":"clamav",
  //     "home":"/var/lib/clamav"
  //   },
  //   {
  //     "type":"system",
  //     "user":"_flatpak",
  //     "home":"/nonexistent"
  //   },
  //   {
  //     "type":"user",
  //     "user":"ollama",
  //     "home":"/usr/share/ollama"
  //   }
  // ]
  const rawBashFunctionResponse = await bashScriptFunctionExec(iface.MetricName.user_accounts);

  const monitorUserAccounts = JSON.parse(rawBashFunctionResponse) as unknown as components['schemas']['IMonitorUserAccount'][];
  //console.debug('monitorUserAccounts', monitorUserAccounts);

  return await validateSchema<components['schemas']['IMonitorUserAccount'][]>('monitor.user-account.schema.yaml', monitorUserAccounts);
}