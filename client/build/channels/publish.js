"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePublishRequestChannel = void 0;

var _reduxSaga = require("redux-saga");

var makePublishRequestChannel = function makePublishRequestChannel(fd) {
  return (0, _reduxSaga.eventChannel)(function (emitter) {
    var uri = '/api/claim/publish';
    var xhr = new XMLHttpRequest(); // add event listeners

    var onLoadStart = function onLoadStart() {
      emitter({
        loadStart: true
      });
    };

    var onProgress = function onProgress(event) {
      if (event.lengthComputable) {
        var percentage = Math.round(event.loaded * 100 / event.total);
        emitter({
          progress: percentage
        });
      }
    };

    var onLoad = function onLoad() {
      emitter({
        load: true
      });
    };

    xhr.upload.addEventListener('loadstart', onLoadStart);
    xhr.upload.addEventListener('progress', onProgress);
    xhr.upload.addEventListener('load', onLoad); // set state change handler

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.response);

        if (xhr.status === 200 && response.success) {
          emitter({
            success: response
          });
          emitter(_reduxSaga.END);
        } else {
          emitter({
            error: new Error(response.message)
          });
          emitter(_reduxSaga.END);
        }
      }
    }; // open and send


    xhr.open('POST', uri, true);
    xhr.send(fd); // clean up

    return function () {
      xhr.upload.removeEventListener('loadstart', onLoadStart);
      xhr.upload.removeEventListener('progress', onProgress);
      xhr.upload.removeEventListener('load', onLoad);
      xhr.onreadystatechange = null;
      xhr.abort();
    };
  }, _reduxSaga.buffers.sliding(2));
};

exports.makePublishRequestChannel = makePublishRequestChannel;