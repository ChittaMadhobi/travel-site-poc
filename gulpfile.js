/* We impoert the files we just created in this main gulp file */
require('./gulp/tasks/styles');   // All that is style related
require('./gulp/tasks/watch');    // The main watch related tasks
require('./gulp/tasks/sprites');  // NEED TO ELIMINATE IN BAANDA SANDBOX
require('./gulp/tasks/scripts');  // To automate webpacc via gulp
// require('./gulp/tasks/modernizer');  // We are not including part of the course
require('./gulp/tasks/build'); // For building the application distribution 
