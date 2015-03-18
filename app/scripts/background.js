'use strict';

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('onInstalled');
  console.log('previousVersion', details.previousVersion);
});

function mark(tab) {
  console.log('marked ' + tab.url + ' as uncloseable');

  chrome.pageAction.setIcon({
    tabId: tab.id,
    path: {
      19: 'images/icon-active-19.png',
      38: 'images/icon-active-38.png'
    }
  });

  window.localStorage.setItem(tab.url, true);

  chrome.tabs.sendMessage(tab.id, 'marked');
}

chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.pageAction.show(tabId);
  
  chrome.tabs.getSelected(null, function(tab) {
    if (window.localStorage.getItem(tab.url)) {
      mark(tab);
    }
  });
});

chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.getSelected(null, function(tab) {
    // mark
    if (!window.localStorage.getItem(tab.url)) {
      mark(tab);
    // unmark
    } else {
      console.log('unmark');

      chrome.pageAction.setIcon({
        tabId: tab.id,
        path: {
          19: 'images/icon-19.png',
          38: 'images/icon-38.png'
        }
      });

      window.localStorage.removeItem(tab.url);

      chrome.tabs.sendMessage(tab.id, 'unmarked');
    }
  });
});

