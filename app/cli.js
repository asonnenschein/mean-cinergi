var program = require('commander')
  , async = require('async')
  ;

program
  .version('0.0.1a')
  .option('-i, --init', 'Populate application with sample data')
;

program.on('--help', function () {
  console.log('  Examples:');
  console.log('');
  console.log('    Initialize application with test data for development --');
  console.log('    $ cinergi-ui --init');
  console.log('');
});

program.parse(process.argv);

var queue = [];
if (program.init) queue.push(initialize);
async.series(queue);

function initialize () {
  
}