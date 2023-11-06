#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>

int main(int argc, char* argv[]){
    srand(time(NULL));

    int user_ans = atoi(argv[1]);
    if (user_ans != 1){
        if (user_ans != 3){
            if (user_ans != 5){
                if (user_ans != 10){
                    if (user_ans != 20){
                        printf("Not Valid Input\n");
                        return 1;
                    }
                }
            }
        }
    }
    
    int user_bet = atoi(argv[2]);
    //if (user_bet <= 0){
    //    printf("Bet more than ZERO!!!\n");
    //}

    int target = rand() % 25;
    int val[25] = {1,1,1,1,1,1,1,1,1,1,1,1, 3,3,3,3,3,3, 5,5,5,5, 10,10, 20};
    if (val[target] == user_ans){
        user_bet *= (user_ans + 1);
    }
    printf("%d\n",val[target]);
    printf("%d\n", user_bet);
    return 0;
}