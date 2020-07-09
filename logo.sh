#!/bin/bash

for i in 16 32 48 128; do
  convert logo.png -resize "${i}x${i}" src/assets/logo$i.png
done
