const Handlebars = require('handlebars');
const config = require('../config/speechConfig.js');

module.exports = {
    // define any extra helpers you may need
  googleAnalytics () {
    const googleApiKey = config.analytics.googleId;
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
    console.log('title', title);
    console.log('description', description);
    let ogTitle = `<meta property="og:title" content="${title}" >`;
    let ogUrl = `<meta property="og:url" content="${showUrl}" >`;
    let ogSiteName = `<meta property="og:site_name" content="Spee.ch" >`;
    let ogDescription = `<meta property="og:description" content="${description}" >`;
    let ogImageWidth = '<meta property="og:image:width" content="600" >';
    let ogImageHeight = '<meta property="og:image:height" content="315" >';
    let basicTags = `${ogTitle} ${ogUrl} ${ogSiteName} ${ogDescription} ${ogImageWidth} ${ogImageHeight}`;
    let ogImage = `<meta property="og:image" content="${source}" >`;
    let ogImageType = `<meta property="og:image:type" content="${mimeType}" >`;
    let ogType = `<meta property="og:type" content="article" >`;
    if (mimeType === 'video/mp4') {
      let ogVideo, ogVideoSecureUrl, ogVideoType;
      ogImage = `<meta property="og:image" content="${thumbnail}" >`;
      ogImageType = `<meta property="og:image:type" content="image/png" >`;
      ogType = `<meta property="og:type" content="video" >`;
      ogVideo = `<meta property="og:video" content="${source}" >`;
      ogVideoSecureUrl = `<meta property="og:video:secure_url" content="${source}" >`;
      ogVideoType = `<meta property="og:video:type" content="${mimeType}" >`;
      return new Handlebars.SafeString(`${basicTags} ${ogImage} ${ogImageType} ${ogType} ${ogVideo} ${ogVideoSecureUrl} ${ogVideoType}`);
    } else {
      if (mimeType === 'image/gif') {
        ogType = `<meta property="og:type" content="video.other" >`;
      };
      return new Handlebars.SafeString(`${basicTags} ${ogImage} ${ogImageType} ${ogType}`);
    }
  },
  addTwitterCard (mimeType, source, embedUrl, directFileUrl) {
    let basicTwitterTags = `<meta name="twitter:site" content="@spee_ch" >`;
    if (mimeType === 'video/mp4') {
      let twitterName = '<meta name="twitter:card" content="player" >';
      let twitterPlayer = `<meta name="twitter:player" content="${embedUrl}" >`;
      let twitterPlayerWidth = '<meta name="twitter:player:width" content="600" >';
      let twitterTextPlayerWidth = '<meta name="twitter:text:player_width" content="600" >';
      let twitterPlayerHeight = '<meta name="twitter:player:height" content="337" >';
      let twitterPlayerStream = `<meta name="twitter:player:stream" content="${directFileUrl}" >`;
      let twitterPlayerStreamContentType = '<meta name="twitter:player:stream:content_type" content="video/mp4" >';
      return new Handlebars.SafeString(`${basicTwitterTags} ${twitterName} ${twitterPlayer} ${twitterPlayerWidth} ${twitterTextPlayerWidth} ${twitterPlayerHeight} ${twitterPlayerStream} ${twitterPlayerStreamContentType}`);
    } else {
      let twitterCard = '<meta name="twitter:card" content="summary_large_image" >';
      return new Handlebars.SafeString(`${basicTwitterTags} ${twitterCard}`);
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
