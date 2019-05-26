# JavaScriptBoilerplates
JavaScript App Boilerplates

JavaScript 脚手架脚本

## Node ShellJS App 

```shell
# download script to local
curl https://raw.githubusercontent.com/Allen-Wei/JavaScriptBoilerplates/master/dist/release/shelljs.js -o shelljs.js
# show help
node ./shelljs.js
# create shelljs app to directory hello-world on current location
node ./shelljs.js --project-name helloworld --directory hello-world
```

## Create Gist Script

```shell
# download script to local
curl https://raw.githubusercontent.com/Allen-Wei/node-scaffold-scripts/master/dist/release/gist-create.js -o shelljs.js
# show help
node ./gist-create.js
# create private gist, contains two files
node ./gist-create.js --token your_token_value --description "test text" --files $(pwd)/README.md,/dir/file/path 
# create public gist, all .js file in /some-dir
node ./gist-create.js --token your_token_value --public --directory /some-dir --recurisive --name-match "\.js$"
```