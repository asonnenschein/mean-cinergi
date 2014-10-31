### mean-cinergi

Web application which provides user and organizational management and controls
in the form of command line tools and a graphical user interface to complement 
the CINERGI database and server ecosystem.

#### Base Dependencies
* [MongoDB v2.6.4](http://www.mongodb.org/)
* [Node.js v0.10.29 64-bit](http://nodejs.org/)
* [npmjs v1.4.16](https://www.npmjs.org/)
* [bower v1.3.12](http://bower.io/)
* [xml-to-cinergi v0.0.1-dev](https://github.com/CINERGI/enhancers)

#### Installation
```
# Install xml-to-cinergi CLI tool
$ git clone https://github.com/CINERGI/enhancers.git
$ cd enhancers/nodejs/harvest-iso
$ npm install -g

# Download software
$ git clone https://github.com/CINERGI/mean-cinergi.git
$ cd mean-cinergi

# Install backend dependencies
$ npm install

# Install frontend dependencies
$ bower install
```

#### Initialize Develop Environment
Initializing the application for development **deletes all data stored in the
development database** and populates the database with sample data.
```
$ cd mean-cinergi
$ node app/cli.js --init
```

#### Run Server
MongoDB should be running at this point; by default the server will run on port
3001.
```
$ node server.js
```