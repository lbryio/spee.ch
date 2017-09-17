const Handlebars = require('handlebars');
const config = require('config');

module.exports = {
    // define any extra helpers you may need
  googleAnalytics () {
    const googleApiKey = config.get('AnalyticsConfig.GoogleId');
    return new Handlebars.SafeString(
            `<script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '${googleApiKey}', 'auto');
        ga('send', 'pageview');
        </script>`
        );
  },
  addOpenGraph (title, mimeType, showUrl, source, description, thumbnail) {
    let basicTags = `<meta property="og:title" content="${title}"> 
          <meta property="og:url" content="${showUrl}" > 
          <meta property="og:site_name" content="Spee.ch" > 
          <meta property="og:description" content="${description}">`;
    if (mimeType === 'video/mp4') {
      return new Handlebars.SafeString(
                `${basicTags} <meta property="og:image" content="${thumbnail}" > 
          <meta property="og:image:type" content="image/png" >
          <meta property="og:image:width" content="600" >
          <meta property="og:image:height" content="315" >
          <meta property="og:type" content="video" > 
          <meta property="og:video" content="${source}" > 
          <meta property="og:video:secure_url" content="${source}" > 
          <meta property="og:video:type" content="${mimeType}" >`
            );
    } else if (mimeType === 'image/gif') {
      return new Handlebars.SafeString(
                `${basicTags} <meta property="og:image" content="${source}" > 
          <meta property="og:image:type" content="${mimeType}" >
          <meta property="og:image:width" content="600" >
          <meta property="og:image:height" content="315" >
          <meta property="og:type" content="video.other" >`
            );
    } else {
      return new Handlebars.SafeString(
                `${basicTags} <meta property="og:image" content="${source}" > 
          <meta property="og:image:type" content="${mimeType}" >
          <meta property="og:image:width" content="600" >
          <meta property="og:image:height" content="315" >
          <meta property="og:type" content="article" >`
            );
    }
  },
  addTwitterCard (mimeType, source, embedUrl, directFileUrl) {
    let basicTwitterTags = `<meta name="twitter:site" content="@speechch" >`;
    if (mimeType === 'video/mp4') {
      return new Handlebars.SafeString(
                `${basicTwitterTags} <meta name="twitter:card" content="player" >
          <meta name="twitter:player" content="${embedUrl}>
          <meta name="twitter:player:width" content="600" >
          <meta name="twitter:text:player_width" content="600" >
          <meta name="twitter:player:height" content="337" >
          <meta name="twitter:player:stream" content="${directFileUrl}" >
          <meta name="twitter:player:stream:content_type" content="video/mp4" >
          `
            );
    } else {
      return new Handlebars.SafeString(
                `${basicTwitterTags} <meta name="twitter:card" content="summary_large_image" >`
            );
    }
  },
  ifConditional (varOne, operator, varTwo, options) {
    switch (operator) {
      case '===':
        return (varOne === varTwo) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (varOne !== varTwo) ? options.fn(this) : options.inverse(this);
      case '<':
        return (varOne < varTwo) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (varOne <= varTwo) ? options.fn(this) : options.inverse(this);
      case '>':
        return (varOne > varTwo) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (varOne >= varTwo) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (varOne && varTwo) ? options.fn(this) : options.inverse(this);
      case '||':
        return (varOne || varTwo) ? options.fn(this) : options.inverse(this);
      case 'mod3':
        return ((parseInt(varOne) % 3) === 0) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  },
};
