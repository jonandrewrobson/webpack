# webpack
Basic installation of webpack project.


Webpack

Installation:

	- Create project directory and cd into it
		- mkdir webpack-demo && cd webpack-demo
	- Set up NPM in project
		- npm init
		- creates json and tracks dependencies
	- Install webpack, cli, and server locally
		- npm install --save-dev webpack webpack-cli webpack-web-server

	Create Directory Structure
		  webpack-demo
			|- package.json
		 	|- /dist
		 		|- index.html
			|- /src
				|- index.js

		- npm install --save lodash to read global variable of '_'
		- run 'npx webpack' to take our script at src/index.js as the entry point, and generate dist/main.js as the output
		- If installed correctly index.html should return "Hello webpack"

	Create webpack config file
		- Install xcode/clt if needed
		- touch webpack.config.js
		- npx webpack --config webpack.config.js

		For more complex config files:
		- https://generatewebpackconfig.netlify.com/
		- install dependencies
			- npm install node-sass mini-css-extract-plugin css-loader sass-loader --save-dev
			
	NPM Scripts:
		- Add '"build": "webpack"' to scripts in .json
		- npm run build command can be used now in place of the npx

ASSET MGMT

	- Change script src in html to ./bundle.js
	- Change filename to bundle.js in config file

	Loading CSS:
		- Add style-loader and css-loader
			- npm install --save-dev style-loader css-loader
		- Add module to config file to include
			```module: {
				rules: [
					{
						test: /\.css$/,
						use: [
							'style-loader',
							'css-loader'
						]
					}
				]
			}```



Link JS
	- Creat new script file