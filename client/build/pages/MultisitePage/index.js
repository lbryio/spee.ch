"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PageLayout = _interopRequireDefault(require("@components/PageLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var MultisitePage =
/*#__PURE__*/
function (_React$Component) {
  function MultisitePage() {
    _classCallCheck(this, MultisitePage);

    return _possibleConstructorReturn(this, _getPrototypeOf(MultisitePage).apply(this, arguments));
  }

  _createClass(MultisitePage, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_PageLayout.default, {
        pageTitle: 'Multisite',
        pageUri: '/multisite'
      }, _react.default.createElement("p", {
        className: "text--pull-quote"
      }, "Introducing Spee.ch Multisite"), _react.default.createElement("p", null, "Hi there!  My name is ", _react.default.createElement("a", {
        href: 'https://github.com/billbitt',
        target: '_blank'
      }, "Bill"), ", and I\u2019d like to speak with you about Spee.ch.  No, not \u2018speech,\u2019 \u2018", _react.default.createElement("i", null, _react.default.createElement("a", {
        href: 'https://spee.ch',
        target: '_blank'
      }, "Spee.ch.")), "\u2019 You know what, just read on..."), _react.default.createElement("h2", null, "A Little Background"), _react.default.createElement("p", null, "Wow, time flies!  A little over a year ago Spee.ch was nothing more than a glimmer in the eye of LBRY CEO Jeremy Kaufman.  At that time, the ", _react.default.createElement("a", {
        href: 'https://lbry.io/faq/what-is-lbry',
        target: '_blank'
      }, "LBRY protocol"), " was still so early in its development, that there were no web-based applications for interacting with the LBRY blockchain. But then, something beautiful happened.  On March 29th, 2017, Jeremy sat down with Jack, and together they ", _react.default.createElement("a", {
        href: 'https://www.youtube.com/watch?v=C9LCapt_OYw',
        target: '_blank'
      }, "live coded a single-page PHP site"), " that could publish images to the LBRY network.  And just like that, Spee.ch was born!"), _react.default.createElement("p", null, "Being that LBRY is an open source project, Jeremy ended the session by inviting community members who were interested in the project to take the reigns and see where Spee.ch could go.  I was one of the devs that did just that, and it wasn\u2019t long before I was on a weekly call dedicated to this project with contributors from around the world."), _react.default.createElement("p", null, "At this point in time, the vision for Spee.ch was pretty simple: create a web-based hosting service that used the LBRY network as a database for free image and video sharing.  In other words, an \u2018imgur on the blockchain.\u2019"), _react.default.createElement("h2", null, "Growth"), _react.default.createElement("p", null, "You might be wondering, \u201CSo, what has the Spee.ch team been doing since then?\u201D. Well, that is a great question. I\u2019m glad you asked."), _react.default.createElement("p", null, "As it turned out, the initial single-serving site was only the beginning.  We wanted to add more features, improve user experience, and continue to rapidly innovate on new ideas to explore what web-based image-hosting on the blockchain could look like.  And now -- a couple of re-designs, ", _react.default.createElement("a", {
        href: 'https://github.com/lbryio/spee.ch',
        target: '_blank'
      }, "1,428 commits"), ", and ", _react.default.createElement("a", {
        href: 'https://github.com/lbryio/spee.ch/graphs/contributors',
        target: '_blank'
      }, "18 contributors"), " later (as of the time of this writing) -- we\u2019ve been through a lot of changes.  We changed the URL scheme, switched out the PHP for Javascript (sorry Jeremy!), added more HTML pages, removed those HTML pages, added Handlebars, removed most of Handlebars, added React, and... you get the picture."), _react.default.createElement("p", null, "It\u2019s been a lot of work, and through all of these changes, we have been guided by our original vision: develop a free web app that allows users to share images and video using a blockchain."), _react.default.createElement("p", null, "However, we ask ourselves constantly: what else can we be doing?  What can we be doing differently?  What features can we be doing better?  And it is those kinds of questions that lead us to this post."), _react.default.createElement("h2", null, "A New Initiative"), _react.default.createElement("p", null, "As Spee.ch developed, we were lucky to find an amazing community spring up around the project that contributed bug reports, bug fixes, feature requests, pull requests, etc., but ultimately we are limited by the hours we have in the day, and while some requests get prioritized, others get shelved. "), _react.default.createElement("p", null, "So we started wondering:  What if instead of having the community help us build our platform, we started helping them build theirs?  We started mulling this over, and the more we thought about it the more we liked it. And thus, Spee.ch Multisite was born."), _react.default.createElement("h2", null, "Spee.ch Multisite"), _react.default.createElement("p", null, "The vision for Spee.ch Multisite is to maintain a foundational codebase that will support a greater variety of content-sharing web apps built on LBRY, allowing these apps to publish and retrieve content from the network via the blockchain."), _react.default.createElement("h3", null, "Run Your Own Spee.ch!"), _react.default.createElement("p", null, "Ok, here\u2019s the tl:dr: the purpose of the Spee.ch Multisite initiative is to enable you to run your own version of Spee.ch."), _react.default.createElement("p", null, "Spee.ch Multisite will provide a helpful set of basic code to get you going, but we purposefully want to give you control and provide a sandbox in which you can develop the look, content, and features for your site.  The shared code base will be developed to support you in that quest. "), _react.default.createElement("p", null, "So if you don\u2019t want your site called or looking anything like Spee.ch, we encourage that! Don\u2019t hesitate to make it your own!"), _react.default.createElement("h3", null, "For the Community by the Community"), _react.default.createElement("p", null, "Initially, sites built on Spee.ch Multisite will look a lot like Spee.ch, but you will be able to add custom pages, update the look of components, and limit the content on your spee.ch site as you see fit."), _react.default.createElement("p", null, "Over time, it is our hope that the project will grow to incorporate many more components and features developed by us and the community to support a wide variety of functionalities beyond what the current spee.ch site is capable of."), _react.default.createElement("h3", null, "A Common Codebase"), _react.default.createElement("p", null, "If you have been following the project, you may have already noticed that the original github repository has grown into two: ", _react.default.createElement("a", {
        href: 'https://github.com/lbryio/www.spee.ch',
        target: '_blank'
      }, "www.spee.ch"), " and ", _react.default.createElement("a", {
        href: 'https://github.com/lbryio/spee.ch',
        target: '_blank'
      }, "spee.ch"), ".  I will save the specifics for a future tech-focused blog post in the coming weeks, but the reason for these changes is to modularise the code so that is it easier for anyone who wants to run their own version of Spee.ch to do so, and to be able to customize their Spee.ch to their liking."), _react.default.createElement("h3", null, "What About the Flagship Spee.ch Site?"), _react.default.createElement("p", null, "Don\u2019t worry!  If you like using ", _react.default.createElement("a", {
        href: 'https://spee.ch',
        target: '_blank'
      }, "Spee.ch"), " and have no intention of running your own site, we will still be here running it for you!  We are dedicated to pushing it forward and using it as patient zero for all additions to the Spee.ch Multisite codebase."), _react.default.createElement("h2", null, "Join Us"), _react.default.createElement("p", null, "Friday, May 18, we will be hosting a live demo showcasing the alpha version of Spee.ch Multisite.  It\u2019s still quite young, but that\u2019s the point: we want to realize this vision together."), _react.default.createElement("p", null, _react.default.createElement("b", null, _react.default.createElement("a", {
        href: 'https://speech.rsvpify.com/',
        target: '_blank'
      }, "CLICK HERE TO RSVP!"))), _react.default.createElement("p", null, "At this first demonstration, we will walk through preparing a server environment, installing LBRY and Spee.ch, and how to make local changes to your Spee.ch instance.  Details below:"), _react.default.createElement("ul", null, _react.default.createElement("li", null, "When: Friday, May 18, 2018"), _react.default.createElement("li", null, "Time: 5:00 p.m. PST"), _react.default.createElement("li", null, "Where: Google Hangouts"), _react.default.createElement("li", null, "Link: ", _react.default.createElement("a", {
        href: 'https://meet.google.com/aex-ghqg-kcs',
        target: '_blank'
      }, "meet.google.com/aex-ghqg-kcs")), _react.default.createElement("li", null, "System Requirements: If you have a server, please make sure you have MySql, Node and NPM installed. If you need help installing the above, or if you need a server to run your own instance on, please join the Hangout 30 minutes ahead of time and we will help get you set up =]"), _react.default.createElement("li", null, "Questions: hello@lbry.io")));
    }
  }]);

  _inherits(MultisitePage, _React$Component);

  return MultisitePage;
}(_react.default.Component);

var _default = MultisitePage;
exports.default = _default;