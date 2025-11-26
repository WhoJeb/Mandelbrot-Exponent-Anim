# gcc src/main.cpp -Wall -o test

EXE="shaderTest"

cmake .

make

./$EXE
