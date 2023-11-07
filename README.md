# ReadMe.md

# Software Security Team 05 - KUsino
```bash
Software Security Team 05 Team Project - KUsino
```
# Docker install

```bash
# Remove old version
sudo apt-get remove docker docker-engine docker.io containerd runc

# Set repository
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add current User to docker group
sudo usermod -aG docker $USER

# Apply changes to user group
newgrp docker

# Check installation
docker --version
```

# Download Dockerfile

```bash
git clone https://github.com/teddyyeo/KUsino
```

# Build Docker Image

```bash
# Go to the KUsino directory
cd KUsino

# Build docker image
docker build -t myimage:latest .
```

# Run Docker Image

```bash
sudo docker run --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -p 5002:5002 myiamge:latest
sudo docker run --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -it myimage:latest /bin/bash
```
