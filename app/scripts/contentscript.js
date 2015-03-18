'use strict';

chrome.runtime.onMessage.addListener(function(message) {
  console.log(message);
  if (message === 'marked') {
    window.onbeforeunload = function() {
      return ('are you sure?');
    };
  } else {
    window.onbeforeunload = null;
  }
});
