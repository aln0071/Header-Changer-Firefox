'use strict';

function changeTitle(e) {
    browser.tabs.executeScript(null,
        {code:"document.title='"+e.target.value+"'"});
}

function changeIcon(e) {
    browser.tabs.executeScript(null,
        {code: `
            var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = '${e.target.value}';
            document.getElementsByTagName('head')[0].appendChild(link);
        `})
}

function selectText(e) {
    e.target.select();
}

function handlePaste(e) {
    var clipboardData = e.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('Text');
    var event = {
        target: {
            value: pastedData
        }
    }
    if(e.target.id==='title') {
        changeTitle(event);
    } else {
        changeIcon(event);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var title = document.getElementById('title');
    var icon = document.getElementById('icon');
    var iconText = document.getElementById('icon-text');
    browser.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        title.value = tabs[0].title;
        icon.src = tabs[0].favIconUrl;
        iconText.value = tabs[0].favIconUrl;
        title.focus();
    })
    title.addEventListener('keyup', changeTitle);
    title.addEventListener('focus', selectText);
    iconText.addEventListener('keyup', changeIcon);
    iconText.addEventListener('focus', selectText);
    // paste event listener
    title.addEventListener('paste', handlePaste);
    iconText.addEventListener('paste', handlePaste);
})