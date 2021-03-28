#!/bin/zsh
rm -rf ./output/**
cp -r src/ chromeExtension_settleCard/
zip -r ./output/settleCard.zip chromeExtension_settleCard/
rm -rf chromeExtension_settleCard/