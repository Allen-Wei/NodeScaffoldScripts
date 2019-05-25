rm -rf ./dist 
npx webpack --config webpack.config.js --display-error-details --profile --display-entrypoints --display-used-exports
node ./dist/shell.js --project-name hello