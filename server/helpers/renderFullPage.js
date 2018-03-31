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
            <link rel="stylesheet" href="/static/assets/css/reset.css" type="text/css">
            <link rel="stylesheet" href="/static/assets/css/general.css" type="text/css">
            <link rel="stylesheet" href="/static/assets/css/mediaQueries.css" type="text/css">
            <!--google font-->
            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">
        </head>
        <body id="main-body">
            <div class="row row--tall flex-container--column">
                <div id="react-app" class="row row--tall flex-container--column">${html}</div>
            </div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
            </script>
            <script src="/static/bundle/bundle.js"></script>
        </body>
    </html>
  `;
};
