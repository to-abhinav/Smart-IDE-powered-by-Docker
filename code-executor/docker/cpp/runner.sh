#!/bin/sh
g++ code.cpp -o code.out 2> compile_error.txt

if [ $? -ne 0 ]; then
    cat compile_error.txt 1>&2
    exit 1
fi

./code.out
