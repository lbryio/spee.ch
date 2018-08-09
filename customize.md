# Configure your own spee.ch

_note:this guide assumes you have done the []quickstart](https://github.com/lbryio/spee.ch/blob/readme-update/README.md) or [fullstart](https://github.com/lbryio/spee.ch/blob/readme-update/fullstart.md) guide and have a working spee.ch server_

## Custom Components
The components used by spee.ch are taken from the `client/` folder, but you can override those components by defining your own in the `client_custom/` folder. 
 
### Add a new custom Logo component.

To create your own custom component to override the defaults, create a folder and an `index.jsx` file for the component in the `client_custom/src/components/` folder.

```	
$ cd client_custom/src/components/
$ mkdir Logo
$ cd Logo
$ touch index.jsx
$ nano index.jsx
```

Create a simple react component in `index.jsx`.

```
import React from 'react';

function Logo () {
  return (
    <p>My Logo</p>
  );
};

export default Logo;
```

Restart the server, and you should see your site with a new Logo in the top left corner!
```
$ npm run start
```
