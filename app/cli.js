var program = require('commander')
  , async = require('async')
  ;

program
  .version('0.0.1a')
  .option('-s, --sampledata', 'Populate application with sample data')
;