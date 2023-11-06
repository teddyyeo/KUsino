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

    // 주사위 결과 예측
    scanf("%s", predict); // 버퍼 오버플로우 취약점
    
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
