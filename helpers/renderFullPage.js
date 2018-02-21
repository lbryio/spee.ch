module.exports = (html, preloadedState) => {
  // take the html and preloadedState and return the full page
  return `
    <!DOCTYPE html>
    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
        <head>
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
            <script src="/bundle/bundle.js"></script>
        </body>
    </html>
  `;
};
