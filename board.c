#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

int main(int argc, char *argv[]){
    char option = atoi(argv[1]);

    char *title; 
    int title_len = sizeof(char) * strlen(argv[2]);
    title = (char *)malloc(title_len + 1);
    strncpy(title, argv[2], title_len);
    title[title_len] = '\0';

    char *content;
    int cont_len = sizeof(char) * strlen(argv[3]);
    content = (char *)malloc(cont_len + 1);
    strncpy(content, argv[3], cont_len);
    content[cont_len] = '\0';

    if (option == 1) {//read
        FILE *fp = fopen(title, "r");
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
    if (option == 2) {
        if (access(title, 0) == 0){
            printf("File Already Exits!\n");
            return 1;
        }
        FILE *fp = fopen(title, "w");

        fwrite(content, cont_len, 1, fp);

        free(title);
        free(content);
        fclose(fp);
        
        return 0;
    }
    
}