# ReadMe.md

# KUsino

# Docker install

```bash
sudo apt-get remove docker docker-engine [docker.io](http://docker.io/) containerd runc
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli [containerd.io](http://containerd.io/)
sudo usermod -aG docker $USER
newgrp docker
docker --version
```

# Build Docker Image

```bash
docker build -t myimage:latest .
```

# Run Docker Image

```bash
docker run -p 80:80 myiamge:latest
```
