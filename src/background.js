'use strict'

/* eslint-env extension */

/* global chrome */

const rules = [
  {
    condidtions: [
      new chrome.declarativeContent.PageStateMatcher({
        css: ['video']
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }
]

if (chrome.declarativeContent.RequestContentScript && false) { // TODO: get dynamic via parcel and implement
  rules[0].actions.push(new chrome.declarativeContent.RequestContentScript({
    js: ['overlay.js'],
    css: ['overlay.css']
  }))
}

chrome.runtime.onInstalled.addListener(function (details) {
  chrome.contextMenus.removeAll()
  chrome.contextMenus.create({
    id: 'stf',
    title: 'Save This Frame!',
    contexts: ['video']
  })

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'stf') {
      const tabId = tab.id
      const { frameId } = info

      chrome.tabs.sendMessage(tabId, {
        stf: true,
        event: 'triggerUi'
      }, { frameId })
    }
  })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          css: ['video']
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})
