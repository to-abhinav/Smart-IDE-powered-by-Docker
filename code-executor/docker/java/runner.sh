#!/bin/sh

cat > Main.java

javac Main.java 2> compile_error.txt

if [ $? -ne 0 ]; then
  cat compile_error.txt 1>&2
  exit 1
fi

java Main 2> runtime_error.txt
if [ $? -ne 0 ]; then
  cat runtime_error.txt 1>&2
  exit 1
fi
