'use strict';

function keyup(e) {
    browser.tabs.executeScript(null,
        {code:"document.title='"+e.target.value+"'"});
}

document.addEventListener('DOMContentLoaded', function () {
    var title = document.getElementById('title');
    console.log(title)
    browser.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        title.value = tabs[0].title;
        console.log(tabs)
        title.focus();
        title.select();
    })
    title.addEventListener('keyup', keyup);
})