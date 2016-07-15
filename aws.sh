#!/bin/sh

mkdir -p build
zip -r ./build/dicey.zip ./node_modules/*
zip -r ./build/dicey.zip ./src/*.js
zip -r ./build/dicey.zip ./*.md
