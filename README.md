### mean-cinergi

Web application which provides user and organizational management and controls
in the form of command line tools and a graphical user interface to complement 
the CINERGI database and server ecosystem.  Built on top of the 
[MEAN](http://mean.io/#!/) JavaScript fullstack.

#### Base Dependencies
* [MongoDB v2.6.4](http://www.mongodb.org/)
* [Node.js v0.10.29 64-bit](http://nodejs.org/)
* [npmjs v1.4.16](https://www.npmjs.org/)

#### Development Installation
Install MEAN and create a vanilla application
```
$ sudo npm install -g meanio@latest
$ mean init cinergi-application
$ cd cinergi-application
$ npm install
$ bower install
$ grunt
```

Install the `mean-cinergi` package
```
$ cd cinergi-application/packages
$ git clone https://github.com/CINERGI/mean-cinergi.git
$ cd mean-cinergi
$ npm install
```