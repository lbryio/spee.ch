module.exports = (helmet, html, preloadedState) => {
  // take the html and preloadedState and return the full page
  return `
    <!DOCTYPE html>
    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <!--helmet-->
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <!--style sheets-->
            <link rel="stylesheet" href="/bundle/style.css" type="text/css">
            <!--google font-->
            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet">
        </head>
        <body>
            <div id="react-app">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
            </script>
            <script src="/bundle/bundle.js"></script>
        </body>
    </html>
  `;
};
