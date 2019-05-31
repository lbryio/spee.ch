import {buffers, END, eventChannel} from 'redux-saga';

export const makePublishRequestChannel = (fd, isUpdate) => {
  return eventChannel(emitter => {
    const uri = `/api/claim/${isUpdate ? 'update' : 'publish'}`;
    const xhr = new XMLHttpRequest();
    // add event listeners
    const onLoadStart = () => {
      emitter({loadStart: true});
    };
    const onProgress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded * 100) / event.total);
        emitter({progress: percentage});
      }
    };
    const onLoad = () => {
      emitter({load: true});
    };
    xhr.upload.addEventListener('loadstart', onLoadStart);
    xhr.upload.addEventListener('progress', onProgress);
    xhr.upload.addEventListener('load', onLoad);
    // set state change handler
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        switch (xhr.status) {
          case 413:
            emitter({error: new Error("Unfortunately it appears this web server " +
              "has been misconfigured, please inform the service administrators " +
              "that they must set their nginx/apache request size maximums higher " +
              "than their file size limits.")});
            emitter(END);
            break;
          case 200:
            var response = JSON.parse(xhr.response);
            if (response.success) {
              emitter({success: response});
              emitter(END);
            } else {
              emitter({error: new Error(response.message)});
              emitter(END);
            }
            break;
          default:
            emitter({error: new Error("Received an unexpected response from " +
              "server: " + xhr.status)});
            emitter(END);
        }
      }
    };
    // open and send
    xhr.open('POST', uri, true);
    xhr.send(fd);
    // clean up
    return () => {
      xhr.upload.removeEventListener('loadstart', onLoadStart);
      xhr.upload.removeEventListener('progress', onProgress);
      xhr.upload.removeEventListener('load', onLoad);
      xhr.onreadystatechange = null;
      xhr.abort();
    };
  }, buffers.sliding(2));
};
