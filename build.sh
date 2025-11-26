# gcc src/main.cpp -Wall -o test

EXE="expMandelbrotAnim"

cmake .

make

./$EXE
