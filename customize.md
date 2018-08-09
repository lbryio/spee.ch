# Configure your own spee.ch

## * Change some **css**

	* Navigate to *public/assets/css* folder and open **general.css** for editing.
`$ cd public/assets/css`
`$ nano general.css`

	* Add `background-color: yellow;` to the `html, body` declaration.
```css
html, body {
margin: 0;
padding: 0;
height: 100%;
word-wrap: break-word;
background-color: yellow;
}
```
* 
	* Restart the server, and you should see your site with a yellow background!    
`$ npm run start:dev`

* Update the custom **About** Page component
	* Most of the components used by [www.spee.ch](http://www.spee.ch) are taken from the spee.ch-components repo, but you can override those components by defining your own locally. As part of the [www.spee.ch](http://www.spee.ch) repo, a local custom **About** page is already included. You can edit the contents of this component in the *src/views/pages/* folder.
	`$ cd src/views/pages/AboutPage`
	`$ nano index.jsx`

	* Change the text, or edit the **HTML** however you like.
	* Restart the server, and you should see your site with an updated **About** page!
	`$ npm run start:dev`

* Add a new custom Logo component.

	* To create your own custom component to override the defaults, create a folder and **index.jsx** file for the component in the *src/views/components* folder.
	
		`$ cd src/views/components`
		`$ mkdir Logo`
		`$ cd Logo`
		`$ touch index.jsx`
		`$ nano index.jsx`

	* Create a simple react component in **index.jsx**.
```js
import React from 'react';
function Logo () {
return (
<p>My Logo</p>
);
};
export default Logo;
```
* 
	* Restart the server, and you should see your site with a new Logo in the top left corner!
`$ npm run start:dev`

**__4. Bonus:__**
    
* [Install PM2](http://pm2.keymetrics.io/docs/usage/quick-start/) and run your server with PM2.
    
* Install PM2.
`$ sudo npm i -g pm2`

* From inside your project’s folder, start your server with PM2.
`$ pm2 start server.js`
	* Visit your site and see if it is running!

* Sync Your Spee.ch Instance with the full **Blockchain**

	* Install **lbrycrdd**.
	*  Install **lbry-decoder**.
	* Start **lbry-decoder**.
	* Install & run [spee.ch-sync](https://github.com/billbitt/spee.ch-sync)
	* Configure **spee.ch-sync**.
