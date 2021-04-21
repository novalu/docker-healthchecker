"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.FakeInspectProvider = void 0;
const inversify_1 = require("inversify");
let FakeInspectProvider = class FakeInspectProvider {
  constructor() {
  }

  getInspectForId(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return `[
    {
        "Id": "43eeb2265daa216958b94309065c68732dd29698ec39cc0d21f5db80278e4407",
        "Created": "2019-11-12T11:27:55.61512168Z",
        "Path": "./scripts/dumb-init_1.2.1_amd64.sh",
        "Args": [
            "./scripts/wait-for-postgres.sh",
            "--",
            "npm",
            "run",
            "start-production"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 4876,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2019-11-12T11:27:56.252346328Z",
            "FinishedAt": "0001-01-01T00:00:00Z",
            "Health": {
                "Status": "healthy",
                "FailingStreak": 0,
                "Log": [
                    {
                        "Start": "2019-11-13T11:03:52.491171276+01:00",
                        "End": "2019-11-13T11:03:52.59700234+01:00",
                        "ExitCode": 0,
                        "Output": "++ hostname --ip-address\\n+ host=172.18.0.8\\n++ curl -s -w '%{http_code}' 172.18.0.8:8081 -o /dev/null --max-time 15\\n+ code=301\\n+ [[ 301 == \\\\3\\\\0\\\\1 ]]\\n+ exit 0\\n"
                    },
                    {
                        "Start": "2019-11-13T11:04:22.597146697+01:00",
                        "End": "2019-11-13T11:04:22.702407859+01:00",
                        "ExitCode": 0,
                        "Output": "++ hostname --ip-address\\n+ host=172.18.0.8\\n++ curl -s -w '%{http_code}' 172.18.0.8:8081 -o /dev/null --max-time 15\\n+ code=301\\n+ [[ 301 == \\\\3\\\\0\\\\1 ]]\\n+ exit 0\\n"
                    },
                    {
                        "Start": "2019-11-13T11:04:52.702610616+01:00",
                        "End": "2019-11-13T11:04:52.830656957+01:00",
                        "ExitCode": 0,
                        "Output": "++ hostname --ip-address\\n+ host=172.18.0.8\\n++ curl -s -w '%{http_code}' 172.18.0.8:8081 -o /dev/null --max-time 15\\n+ code=301\\n+ [[ 301 == \\\\3\\\\0\\\\1 ]]\\n+ exit 0\\n"
                    },
                    {
                        "Start": "2019-11-13T11:05:22.830833013+01:00",
                        "End": "2019-11-13T11:05:22.941126293+01:00",
                        "ExitCode": 0,
                        "Output": "++ hostname --ip-address\\n+ host=172.18.0.8\\n++ curl -s -w '%{http_code}' 172.18.0.8:8081 -o /dev/null --max-time 15\\n+ code=301\\n+ [[ 301 == \\\\3\\\\0\\\\1 ]]\\n+ exit 0\\n"
                    },
                    {
                        "Start": "2019-11-13T11:05:52.941263249+01:00",
                        "End": "2019-11-13T11:05:53.05199103+01:00",
                        "ExitCode": 0,
                        "Output": "++ hostname --ip-address\\n+ host=172.18.0.8\\n++ curl -s -w '%{http_code}' 172.18.0.8:8081 -o /dev/null --max-time 15\\n+ code=301\\n+ [[ 301 == \\\\3\\\\0\\\\1 ]]\\n+ exit 0\\n"
                    }
                ]
            }
        },
        "Image": "sha256:4409cdfa12f0cd5cb4d297df5a824e6fe9dcc751b0d559e266f694ed4adf0f68",
        "ResolvConfPath": "/var/lib/docker/containers/43eeb2265daa216958b94309065c68732dd29698ec39cc0d21f5db80278e4407/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/43eeb2265daa216958b94309065c68732dd29698ec39cc0d21f5db80278e4407/hostname",
        "HostsPath": "/var/lib/docker/containers/43eeb2265daa216958b94309065c68732dd29698ec39cc0d21f5db80278e4407/hosts",
        "LogPath": "",
        "Name": "/flexiapp-unizone-up-dev_app_1",
        "RestartCount": 0,
        "Driver": "overlay2",
        "MountLabel": "system_u:object_r:svirt_sandbox_file_t:s0:c497,c992",
        "ProcessLabel": "system_u:system_r:svirt_lxc_net_t:s0:c497,c992",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": [
                "/root/flexiapp/data/app_data/unizone-up-dev:/usr/app/data:Z",
                "/root/flexiapp/ssl:/usr/app/cert:Z"
            ],
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "journald",
                "Config": {}
            },
            "NetworkMode": "flexiapp",
            "PortBindings": {
                "8080/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "8443"
                    }
                ],
                "8081/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "81"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "always",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": [],
            "CapAdd": null,
            "CapDrop": null,
            "Dns": null,
            "DnsOptions": null,
            "DnsSearch": null,
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "docker-runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": null,
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": null,
            "DiskQuota": 0,
            "KernelMemory": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": -1,
            "OomKillDisable": false,
            "PidsLimit": 0,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0
        },
        "GraphDriver": {
            "Name": "overlay2",
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/2641faf126433986a26059dbfb7547b10e23361ba0b883e20274fd1a3a7b85b8-init/diff:/var/lib/docker/overlay2/c13f6d5d8946c77f7d3523b779669be8ea7914bdaf943cac863093675e374589/diff:/var/lib/docker/overlay2/66890a767f89e4461036171087d781f467fe0a98da00d8a18a9c3c080be52ea1/diff:/var/lib/docker/overlay2/c48228d75b15f7d5f8250ef75a3e6352b5ad4160b955524c40c06b178a841cd3/diff:/var/lib/docker/overlay2/c7e7c608bb4958bebaf659ef407b9205f40462556cf2b72b82d2693522d6c3ef/diff:/var/lib/docker/overlay2/f4d72033f4fafaf307cad70b7b9ba750111634e27c59b1b5e16a5e880123a9ad/diff:/var/lib/docker/overlay2/ab751954d316f0ea3bcd0023699899097a226fc8b3f1777b3b58d73e778ce398/diff:/var/lib/docker/overlay2/9218fc74a0518432f20d9eb57b026c5c3f78b3d7e3f95885f58af943bfd9233a/diff:/var/lib/docker/overlay2/50956dca9cbbee973004c34f7d78109e111c9b644f608ae00cb551b92cbcba55/diff:/var/lib/docker/overlay2/a2c180ecb0f43e81d1943d3c2394cfb36abe5b8c0724b0a9e731a9715663e827/diff:/var/lib/docker/overlay2/e73f7b3dd3eccdb4c996b3d001e2b50db7078878659cb88d48109a9d4686570d/diff:/var/lib/docker/overlay2/535ee35034ebf18c8835d78737975db82f658395f041056c40ecb4d9799700f7/diff:/var/lib/docker/overlay2/2311264d50ad1fa38942a1592a7a0896693c02251a9aa6bb715b9276640d6f28/diff:/var/lib/docker/overlay2/3e458bb075a96719378251823ed347c87ffa67ab35ef72be8d6ed43c3b78ebab/diff:/var/lib/docker/overlay2/1a8a87b06324591c4d66a7d8a3f1eab4420c7491a42e35868fdab5e4735f7192/diff:/var/lib/docker/overlay2/c95b5a58f2451bbff4b48bdee8360138e1606f79787b7dbf9b4efc80b7c64c39/diff:/var/lib/docker/overlay2/5842e82aea6484c3c8f5978bbfd9ca42274eef58c50ecfa908f0d78604a954ea/diff:/var/lib/docker/overlay2/6038e8d31825b26d77cb9c5594a4083e52af51c71fd42f414778c1f3adaf2fda/diff:/var/lib/docker/overlay2/63ba04f49ae6a063798e6850a516c892acff066844ec0343d222fbb336c3a17a/diff:/var/lib/docker/overlay2/23f1c850b4cd74a967de3ff020717358b489f998d166849839b2c5fb869b3038/diff:/var/lib/docker/overlay2/17b7752845283a13282ba288647053a04e11c3d92cae1d57a27d8fe38712f991/diff:/var/lib/docker/overlay2/343799f63a6c2c8bcad2797b0e380388343b8bb3482e3e024e73a6a350caf44d/diff:/var/lib/docker/overlay2/8edffc0e320ab7c2bb350a8bc51d04a5eac4b2a86ac81f8582d4332c4c93b3be/diff",
                "MergedDir": "/var/lib/docker/overlay2/2641faf126433986a26059dbfb7547b10e23361ba0b883e20274fd1a3a7b85b8/merged",
                "UpperDir": "/var/lib/docker/overlay2/2641faf126433986a26059dbfb7547b10e23361ba0b883e20274fd1a3a7b85b8/diff",
                "WorkDir": "/var/lib/docker/overlay2/2641faf126433986a26059dbfb7547b10e23361ba0b883e20274fd1a3a7b85b8/work"
            }
        },
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/root/flexiapp/data/app_data/unizone-up-dev",
                "Destination": "/usr/app/data",
                "Mode": "Z",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",
                "Source": "/root/flexiapp/ssl",
                "Destination": "/usr/app/cert",
                "Mode": "Z",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
        "Config": {
            "Hostname": "43eeb2265daa",
            "Domainname": "",
            "User": "nodejs",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "8080/tcp": {},
                "8081/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PUBLIC_URL=https://unizone2.upol.cz:8443",
                "INSTANCE_KEY=unizone-up-dev",
                "POSTGRES_USER=novalu",
                "POSTGRES_PASSWORD=jUMfBBQh7VFc4x9ZQswXNprjB88JD5zBZuj2sZ36W8HWGokbyCXE5vozqQdnSYkw",
                "POSTGRES_DB=unizone-up-dev",
                "PATH=/usr/local/nvm/versions/node/v10.16.3/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NVM_DIR=/usr/local/nvm",
                "NODE_VERSION=10.16.3",
                "NODE_PATH=/usr/local/nvm/versions/node/v10.16.3/lib/node_modules",
                "APP_DIR=/usr/app"
            ],
            "Cmd": [
                "./scripts/dumb-init_1.2.1_amd64.sh",
                "./scripts/wait-for-postgres.sh",
                "--",
                "npm",
                "run",
                "start-production"
            ],
            "Healthcheck": {
                "Test": [
                    "CMD",
                    "docker-healthcheck.sh"
                ]
            },
            "Image": "flexiapp-app-unizone-up-dev:current",
            "Volumes": {
                "/usr/app/cert": {},
                "/usr/app/data": {}
            },
            "WorkingDir": "/usr/app",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "com.docker.compose.config-hash": "2707e3af1bd82b50f0577262ae390edc3c88315a56d5270b31a2e7ba71a94feb",
                "com.docker.compose.container-number": "1",
                "com.docker.compose.oneoff": "False",
                "com.docker.compose.project": "flexiapp-unizone-up-dev",
                "com.docker.compose.service": "app",
                "com.docker.compose.version": "1.21.2",
                "maintainer": "novalu@novalu.info",
                "project": "flexiapp"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "32e0186756e8378d15537d5b2d55f785134e067d37ce9fd24c6074defc1343c5",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "8080/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "8443"
                    }
                ],
                "8081/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "81"
                    }
                ]
            },
            "SandboxKey": "/var/run/docker/netns/32e0186756e8",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "flexiapp": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "app",
                        "43eeb2265daa"
                    ],
                    "NetworkID": "e97b0ba5511d78804ff1011631a6328de9517a0666489e6cf6fd8df7a205e743",
                    "EndpointID": "25e711276dde7fb93b0fa248a72a316bba69eb3ba9e0c69a3d7d27f8a2fc2a19",
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.8",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:12:00:08"
                }
            }
        }
    }
]`;
    });
  }
};
FakeInspectProvider = __decorate([
  inversify_1.injectable(),
  __metadata("design:paramtypes", [])
], FakeInspectProvider);
exports.FakeInspectProvider = FakeInspectProvider;
//# sourceMappingURL=FakeInspectProvider.js.map