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
        strcpy(buffer, input);
    guess = atoi(buffer) % 2;
    
    printf("%d\n", answer);

    if (guess == (answer % 2))
        printf("1\n");
    else
        printf("2\n");

    return (0);
}