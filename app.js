'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanCinergi = new Module('mean-cinergi');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanCinergi.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  MeanCinergi.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  MeanCinergi.menus.add({
    title: 'meanCinergi example page',
    link: 'meanCinergi example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  MeanCinergi.aggregateAsset('css', 'meanCinergi.css');

  // Save settings with callback
  // Use this for saving data from administration pages
  MeanCinergi.settings({
      'someSetting': 'some value'
  }, function(err, settings) {
      //you now have the settings object
  });

  // Another save settings example this time with no callback
  // This writes over the last settings.
  MeanCinergi.settings({
      'anotherSettings': 'some value'
  });

  // Get settings. Retrieves latest saved settigns
  MeanCinergi.settings(function(err, settings) {
      //you now have the settings object
  });

  return MeanCinergi;
});
