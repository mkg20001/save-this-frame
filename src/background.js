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
