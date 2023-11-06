// Name: fsb_overwrite.c
// Compile: gcc -z execstack -fno-stack-protector -z norelro -g -O0

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

    // 범위 내의 난수 생성
    random_number = min + (rand() % (max - min + 1));


    fgets(money, sizeof(money), stdin);

    printf("Bet money : ");
    printf(money);
    printf("  Number: %lu",random_number);

    return 0;

}
