### mean-cinergi

Web application which provides user and organizational management and controls
in the form of command line tools and a graphical user interface to complement 
the CINERGI database and server ecosystem.

#### Base Dependencies
* [MongoDB v2.6.4](http://www.mongodb.org/)
* [Node.js v0.10.29 64-bit](http://nodejs.org/)
* [npmjs v1.4.16](https://www.npmjs.org/)

#### Installation
```
# Download software
$ git clone https://github.com/CINERGI/mean-cinergi.git
$ cd mean-cinergi

# Install backend dependencies
$ npm install

# Install frontend dependencies
$ bower install
```

#### Run Server
MongoDB should be running at this point; by default the server will run on port
3001.
```
$ node server.js
```