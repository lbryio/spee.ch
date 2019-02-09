Settings found in cli/defaults/siteConfig.json will be copied to /site/config/siteConfig.json by running npm run configure

You are encouraged to dig into those settings to make your installation behave how you wish. Below is a description of settings available.

ANALYTICS:

    "googleId": null

ASSET DEFAULTS: _These are some default values for publishes_

    "title": "Default Content Title",
    "description": "Default Content Description",
    "thumbnail": "https://spee.ch/0e5d4e8f4086e13f5b9ca3f9648f518e5f524402/speechflag.png"

DETAILS:

    "port": 3000, - this is the internal server port for the application_
    "title": "My Site",
    "ipAddress": "",
    "host": "https://www.example.com", - must contain "http(s)://" and if localhost, "http://localhost:3000"
    "description": "A decentralized hosting platform built on LBRY",
    "twitter": false,
    "blockListEndpoint": - the LBRY default endpoint is generally for the US. Empty string "" negates.

PUBLISHING:

    "primaryClaimAddress": null, - generally supplied by your lbrynet sdk
    "uploadDirectory": "/home/lbry/Uploads", - lbrynet sdk will know your uploads are here
    "lbrynetHome": "/home/lbry",
    "thumbnailChannel": null, - when publishing non-image content, thumbnails will go here.
    "thumbnailChannelId": null,
    "additionalClaimAddresses": [],
    "disabled": false,
    "disabledMessage": "Default publishing disabled message",
    "closedRegistration": false, - true: prevent new channels from being registered
    "serveOnlyApproved": false, - true: prevent your site from serving up unapproved channels
    "publishOnlyApproved": false, - true: restrict
    "approvedChannels": [], - If either of the above two are true, ['@MyKittens', '@BobsKittens']
    "publishingChannelWhitelist": [],
    "channelClaimBidAmount": "0.1", - When creating a channel, how much you deposit to control the name
    "fileClaimBidAmount": "0.01", - When publishing content, how much you deposit to control the name
    "maxSizeImage": 10000000, - You may not want people uploading 50GB files. 1000000 = 1MB
    "maxSizeGif": 50000000,
    "maxSizeVideo": 50000000

SERVING:

    "markdownSettings": {
      "skipHtmlMain": true, - false: render html, in a somewhat unpredictable way~
      "escapeHtmlMain": true, - true: rather than render html, escape it and print it visibly
      "skipHtmlDescriptions": true, - as above, for descriptions
      "escapeHtmlDescriptions": true, - as above, for descriptions
      "allowedTypesMain": [], - markdown rendered as main content
      "allowedTypesDescriptions": [], - markdown rendered in description in content details
      "allowedTypesExample": [ - here are examples of allowed types
        "see react-markdown docs", `https://github.com/rexxars/react-markdown`
        "root",
        "text",
        "break",
        "paragraph",
        "emphasis",
        "strong",
        "thematicBreak",
        "blockquote",
        "delete",
        "link",
        "image", - you may not have a lot of control over how these are rendered
        "linkReference",
        "imageReference",
        "table",
        "tableHead",
        "tableBody",
        "tableRow",
        "tableCell",
        "list",
        "listItem",
        "heading",
        "inlineCode",
        "code",
        "html", - potentially DANGEROUS, intended for `serveOnlyApproved = true` environments, includes iframes, divs.
        "parsedHtml"
      ],
      "disallowedTypesMain": [], - not implemented
      "disallowedTypesDescriptions": ["image", "html"], - not implemented
      "disallowedTypesExample": ["image", "html"] - not implemented
    },
    "customFileExtensions": { - suggest a file extension for experimental content types you may be publishing
      "application/example-type": "example"
    }

STARTUP:

    "performChecks": true,
    "performUpdates": true

}
