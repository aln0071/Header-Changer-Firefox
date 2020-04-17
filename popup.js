'use strict';

function keyup(e) {
    chrome.tabs.executeScript(null,
        {code:"document.title='"+e.target.value+"'"});
}

document.addEventListener('DOMContentLoaded', function () {
    var title = document.getElementById('title');
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        title.value = tabs[0].title;
        title.focus();
        title.select();
    })
    title.addEventListener('keyup', keyup);
})