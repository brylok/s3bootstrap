# S3Bootstrap

Documentation: [brylok.com/s3bootstrap](http://brylok.com/s3bootstrap)

## Features
* JavaScript compressing with uglify.
* Compiles the SCSS files into CSS.
* Minify and copy CSS files.
* Auto reload all browsers with browser-sync when files change.
* Serves the static files to localhost:3000
* Deploys code to S3 Bucket
* The editable files are in /src folder
* The working files are compiled in /working folder (css and js not minified)
* The distribution files are compiled in /dist (css/js/html minified)

## Prerequisites
You will require [node](http://nodejs.org) and [npm](https://npmjs.org) installed.

## Setup
1. Install global gulp

	```
		sudo npm install gulp -g
	```

2. Clone this repository in your working directory

	```
		git clone git@github.com:brylok/bryanlokey.com.git <project_name>
	```

3. Change to the directory project_name

	```
		cd <project_name>
	```

4. Install dependencies

	```
		npm install
	```

5. Start watching files for changes and run server

	```
		gulp work
	```




## Usage

To build working files

```
    gulp work
```


To build and preview files for production

```
    gulp build
```

To deploy build files and deploy to S3 bucket

```
    gulp deploy
```



## How to Setup Deployment key

Before you will be able to deploy you will need to setup your deployment key. Rename the file aws_sample.json to aws.json and fill in the values.

To obtain the key and secret you need to go to Amazon and copy the values from there. (more info here)

The bucket is simply the bucket name and the region can be obtained from your S3 dashboard.

Don't worry, the aws.json file will be ignored by git.



## File Organization

Your working files are located in the src folder. The index.html has includes for smaller components of each page. Those components can be found in src/partials

To add any js library simply copy it to the src/js/vendor folder


## Adding and Removing Assets

To remove the default docs styles simply remove the include from src/scss/styles.scss and delete the file from the components folder.

To add any js library simply copy it to the src/js/vendor folder

