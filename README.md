# Find Local IPs

The purpose of this tool is to find out Raspberry Pi address when it is connected to the same network with your computer.

## Usage (Linux Docker)

```bash
docker run --network host mrako/find-local-ips [ip address]
```

## Usage (Node)

```bash
node index.js [ip address]
```

## Building

```bash
docker build -t mrako/find-local-ips .
docker push mrako/find-local-ips
```
