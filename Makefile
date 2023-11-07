make:
	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game1.c -o ./games/game1
	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game2.c -o ./games/game2
	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game3.c -o ./games/game3
	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./games/game4.c -o ./games/game4
	gcc  -lsqlite3 ./login.c -o ./login
	gcc -z execstack -fno-stack-protector -z norelro -g -O0 ./board.c -o ./board

