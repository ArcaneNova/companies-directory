@echo off
set NODE_OPTIONS=--loader ts-node/esm
ts-node --project tsconfig.node.json scripts/generate-sitemaps.ts 