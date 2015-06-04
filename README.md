#Backbone Marionette Boilerplate
This is a platform for building SPA using Backbone and Marionette. It is a way of organizing your application. This boilerplate includes: 
- File structure
- Loading project dependencies with [Bower](http://bower.io/)
- Building you application with [Grunt](http://gruntjs.com/)
- Using [require.js](http://requirejs.org/) for loading application dependencies
- Writing styles with [Less](http://lesscss.org/)
- Simple web-server on [Node](http://nodejs.org/) and [Express.js](http://expressjs.com/)
 
##Getting started
####0. Install global dependencies
Install [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git), download and install [Node](http://nodejs.org/download/). 

####1. Copy repo

    # Clone only latest revision:
    git clone --depth 1 https://github.com/sorokin-evgeni/backbone-marionette-boilerplate.git
    # Remove .git folder
    rm -rf backbone-marionette-boilerplate/.git 
    # Move files to your folder:
    mv backbone-marionette-boilerplate my-project-name
    
####2. Update dependencies

    # Globaly install bower
    npm install -g bower
    # Install NPM dependencies. You have to do it from your project folder.
    npm install
    # Install bower dependencies.
    bower install
    
####3. Build project

    # Run grunt tasks
    grunt
    
####4. Start your application

    # Start node server
    node server/app.js
    
Open in your browser [http://localhost:3000](http://localhost:3000) url.

##File structure

    # Only for production usage. 
    # All static is kept here: js and css bundles, generated initial index.html
    dist/
    # All static source code is kept here.
    public/
        # CSS and compiled css from less. 
        # All files from this folder will be included in bundle
        css/
        js/
            # All application files
            app/
                # Backbone models which can be shared between any modules
                models/
                # Marionette modules. Independent parts of application
                modules/
                # Common views
                views/
            # All application dependencies. Uploaded from bower
            lib/
            # Application entry point
            app.js
            require.config.js
            require.js
        less/
        # All client templates
        templates/
    server/
        # Server templates. Now generate index.html
        templates/
        # Server application
        app.js
        
File structure is flexible. It can be changed by rewriting paths in config.json.   
Environment variable also is kept in config.json.

##Licence
Copyright © 2014 Evgeny Sorokin.    
Licensed under the MIT license.