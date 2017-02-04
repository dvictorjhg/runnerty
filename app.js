"use strict";
var program = require('commander');
var logger = require("./libs/utils.js").logger;
var loadGeneralConfig = require("./libs/utils.js").loadGeneralConfig;

var FilePlan = require("./classes/file_plan.js");

var configFilePath = '/etc/runnerty/conf.json';
var config;

var reloadPlan = false;

// CHECK ARGS APP:
program
  .version('0.0.1')
  .option('-c, --config <path>', `set config path. defaults to ${configFilePath}`, function (filePath) {
    configFilePath = filePath;
  })
  .option('-r, --reload', 'reload plan', function () {
    reloadPlan = true;
  })
  .option('-p, --password <password>', 'Password cryptor', function (argCryptoPassword) {
    global.cryptoPassword = argCryptoPassword;
  });

program.parse(process.argv);

logger.log('info', `RUNNERTY RUNNING - TIME...: ${new Date()}`);

//LOAD GENERAL CONFIG:
loadGeneralConfig(configFilePath)
  .then(function (fileConfig) {
    config = fileConfig;
    global.config = config;

    var fileLoad;
    if (reloadPlan) {
      fileLoad = config.general.planFilePath;
      logger.log('warn', `Reloading plan from ${fileLoad}`);
    }
    else {
      fileLoad = config.general.binBackup;
    }

    new FilePlan(fileLoad, config)
      .then(function (plan) {
        global.runtimePlan = plan;
        require('./api/api.js')(config.general, logger);
      })
      .catch(function (err) {
        logger.log('error', 'FilePlan: ', err);
      });

  })
  .catch(function (err) {
    logger.log('error', `Config file ${configFilePath}: `,err);
  });


//==================================================================
//
process.on('uncaughtException', function (err) {
  logger.log('error', err.stack);
});

process.on('exit', function (err) {
  logger.log('warn', '--> [R]unnerty stopped.', err);
});