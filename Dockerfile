# Use an official Ubuntu 16.04 image as a parent image
FROM ubuntu:16.04

# Install system dependencies, including SSL libraries
RUN apt-get update && \
    apt-get install -y python3-dev build-essential zlib1g-dev libncurses5-dev \
    libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libbz2-dev \
    libdb5.3-dev wget git sqlite3 libsqlite3-dev -y

# Install Python 3.8.6 from source
ARG version=3.8.6
RUN wget https://www.python.org/ftp/python/${version}/Python-${version}.tgz && \
    tar xzf Python-${version}.tgz && \
    cd Python-${version} && \
    ./configure --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu && \
    make && \
    make install

# Clean up
RUN rm -rf Python-${version}.tgz Python-${version}
# Set the working directory in the container
WORKDIR /app
# Create a Python virtual environment
# Clone your Git repository
RUN git clone 'https://github.com/teddyyeo/KUsino'

# Set the working directory within the cloned repository
WORKDIR /app/KUsino

# Install any needed Python packages specified in requirements.txti
#RUN pip3 install --trusted-host=pypi.org --trusted-host=files.pythonhosted.org flask
RUN python3 -m pip install --trusted-host pypi.python.org --trusted-host files.pythonhosted.org --trusted-host pypi.org --upgrade pip
RUN python3 -m pip install --trusted-host pypi.python.org --trusted-host files.pythonhosted.org --trusted-host pypi.org flask
RUN	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game1.c -o ./games/game1
RUN	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game2.c -o ./games/game2
RUN	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game3.c -o ./games/game3
RUN	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game4.c -o ./games/game4
RUN apt-get install libsqlite3-dev
RUN	gcc -lsqlite3  -I/sql/sqlite3.h -I/sql/sqlite3.c ./login.c -o ./login
RUN	gcc ./board.c -o ./board
# Make port 80 available to the world outside this container
EXPOSE 5000

# Define environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask application
CMD ["python3", "-m", "flask", "run"]
