# Configure your own spee.ch

_note: this guide assumes you have done the [quickstart](https://github.com/lbryio/spee.ch/blob/master/README.md) or [fullstart](https://github.com/lbryio/spee.ch/blob/master/fullstart.md) guide and have a working spee.ch server_

## Custom Components
The components used by spee.ch are taken from the `client/` folder, but you can override those components by defining your own in the `site/custom/` folder.

### Add a new custom Logo component.

To create your own custom component to override the defaults, create a folder and an `index.jsx` file for the component in the `site/custom/src/components/` folder.

```
$ cd site/custom/src/components/
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

Rebuild and restart the server, and you should see your site with a new Logo in the top left corner!
```
$ npm run build
```
Then
```
$ npm run start
```
