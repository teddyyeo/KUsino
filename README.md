![image](https://github.com/teddyyeo/KUsino/assets/108565829/268a87a1-8abf-4566-a0a1-5b45f6b99780)# ReadMe.md

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
sudo docker run -p 80:80 myiamge:latest
```

# Intended vulnerabilities
## Game1
line number 83 of game1.c
```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <string.h>
#include <stdint.h>

uint64_t random_number;
const uint64_t JACKPOT = 777777777;

int main() {
    setbuf(stdout, NULL);

    char money[0x100];
    srand((unsigned int)time(NULL));
    uint64_t min = 100000000;
    uint64_t max = 1000000000; 

    random_number = min + (rand() % (max - min + 1));


    fgets(money, sizeof(money), stdin);

    printf("Bet money : ");
    printf(money);    // FSB bug !
    printf("  Number: %lu",random_number);

    return 0;

}
```
modify random_number to 777777777 to get the flag!
![image](https://github.com/teddyyeo/KUsino/assets/108565829/a7290749-d3d6-4edc-ad64-2f2f2fdce829)

## Game2
line number 34 of game2.c
```c
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

char input[200] = {0,};

void flag(int a, int b, int c, int d, int e, int f, int g)
{
    if (g == 777)
    {
        puts("flag");
        exit(1);
    }
    else
        puts("Almost there!");
    exit(0);
}

int main(void)
{
    int  answer;
    int  guess;
    char buffer[8];

    srand(time(NULL));

    answer = rand() % 8 + 1;
    fgets(input, 100, stdin);
    if (input[23] == 'A')
        memcpy(buffer, input, 199);
    else
        strcpy(buffer, input);  // BOF !!
    guess = atoi(buffer) % 2;
    
    printf("%d\n", answer);

    if (guess == (answer % 2))
        printf("1\n");
    else
        printf("2\n");

    return (0);
}
```
execute flag trigger to get the flag!
![image](https://github.com/teddyyeo/KUsino/assets/108565829/1100420c-3b2c-4adb-881d-e0f63f4b7bfd)

## Game4
line number 29 of game4.c
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int sum = 0;
char input[128];

void flag(void){
    printf("flag\n");
    exit(0);
}

int main(void)
{
    int dice1 = 0;
    int dice2 = 0;
    char predict[8];

    srand(time(NULL));
    dice1 = rand() % 6 + 1;
    dice2 = rand() % 6 + 1;
    sum = dice1 + dice2;

    gets(input);
    strcpy(predict, input);

    scanf("%s", predict); // BOF !!
    
    printf("%d\n%d\n%d\n", dice1,dice2,sum);
    if (atoi(predict) == sum)
    {
        printf("win\n");
    }
    else
    {
        printf("lose\n");
    }

    return 0;
}
```
execute flag trigger to get the flag!
![image](https://github.com/teddyyeo/KUsino/assets/108565829/4c8894ad-b3e2-4d4a-90ed-4e1e18ef7983)

## Login
line number 51 of login.c
```c
int findUser(sqlite3* db, char* id, char* pw) {
    sqlite3_stmt* stmt;
    char searchSQL[500];
    //printf("%s", id);
    sprintf(searchSQL, "SELECT * FROM USERS WHERE id='%s' and pw='%s';", id, pw); // SQL injection !
    char* errMsg = 0;
    //printf("%s\n", searchSQL);

    int rc = sqlite3_prepare_v2(db, searchSQL, -1, &stmt, 0);
    
    if (rc == SQLITE_OK)
        sqlite3_bind_int(stmt, 1, 3);
    else
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(db));
    
    int step = sqlite3_step(stmt);

    if (step == SQLITE_ROW) {
        printf("Success\n");
        char tmp[50];
        char tmp2[50];
        strcpy(tmp, sqlite3_column_text(stmt, 0));
        strcpy(tmp2, sqlite3_column_text(stmt, 2));
        printf("%s\n",tmp);
        printf("%s\n",tmp2);
        return 1;
    } else {
        printf("Fail\n");
        return 0;
    }
}
```
login as admin to get the flag !
![image](https://github.com/teddyyeo/KUsino/assets/108565829/ed71f0e3-c2b1-42bb-a926-2d323a738b3e)

## Board
line number 23 of board.c
```c
    if (option == 1) {//read
        FILE *fp = fopen(title, "r"); // PATH traversal !
        struct stat st;
        if (access(title, 0) != 0){
            printf("No File Exists!\n");
            return 1;
        }
        stat(title, &st);

        int filesize = st.st_size;
        char *read_content = (char *)malloc(sizeof(char) * filesize + 1);
        fread(read_content, filesize,1, fp);
        read_content[filesize] = '\0';
        printf("%s", read_content);

        free(title);
        free(content);
        free(read_content);
        fclose(fp);

        return 0;
    }
```
you can read ANY file..


