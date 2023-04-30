tests=`dirname $0`
mocha=$dirname../node_modules/mocha/bin/mocha.js

$mocha $tests/$1 --no-timeouts
