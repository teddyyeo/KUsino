#include <stdio.h>
#include <string.h>
#include "sql/sqlite3.h"

// 사용자가 이미 존재하는지 확인하는 함수
int isUserExists(sqlite3* db, char* id) {
    sqlite3_stmt* stmt;
    char selectSQL[200];
    sprintf(selectSQL, "SELECT * FROM USERS WHERE id = '%s'", id);
    int rc = sqlite3_prepare_v2(db, selectSQL, -1, &stmt, 0);
    
    if (rc != SQLITE_OK) {
        fprintf(stderr, "Preparation Error : %s\n", sqlite3_errmsg(db));
        return 0;
    }

    sqlite3_bind_text(stmt, 1, id, -1, SQLITE_STATIC);

    rc = sqlite3_step(stmt);
    if (rc == SQLITE_ROW) {
        return 1;  // 이미 존재하는 사용자
    } else {
        return 0;  // 존재하지 않는 사용자
    }
}

// 새 사용자를 등록하는 함수 (이미 존재하는 ID 확인 포함)
int registerUser(sqlite3* db, char* id, char* pw) {
    // 이미 존재하는 사용자인지 확인
    if (isUserExists(db, id)) {
        fprintf(stderr, "used");
        return 0;
    }

    char* errMsg = 0;
    char insertSQL[500];
    sprintf(insertSQL, "INSERT INTO USERS (id, pw, balance) VALUES ('%s', '%s', 100);", id, pw);
    
    int rc = sqlite3_exec(db, insertSQL, 0, 0, &errMsg);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "Registration Error : %s\n", errMsg);
        sqlite3_free(errMsg);
        return 0;
    }
    return 1;
}

// 사용자를 검색하는 함수
int findUser(sqlite3* db, char* id, char* pw) {
    sqlite3_stmt* stmt;
    char searchSQL[500];
    //printf("%s", id);
    sprintf(searchSQL, "SELECT * FROM USERS WHERE id='%s' and pw='%s';", id, pw);
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

int main(int argc, char* argv[]) {
    sqlite3* db;
    sqlite3_stmt* res;

    int rc = sqlite3_open("momoland.db", &db);
    
    if (rc != SQLITE_OK)
    {
        fprintf(stderr, "Cannot open database : %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);

        return 1;
    }
    int option;
    char *id = argv[1];
    char *pw = argv[2];
    
    scanf("%d", &option);
    switch(option){
        case 1:
            /**/
            registerUser(db, id, pw);
            sqlite3_close(db);
            break;
        case 2:
            //sprintf(id, "admin'--");
            //sprintf(pw, "");
            findUser(db, id, pw);
            sqlite3_close(db);
            break;
        default:
            return 0;
    }
   
    return 0;
}