chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = tabs[0].url;
    console.log(tabs);
    //alert(`oh, ${url}!`); // Тебе 100 лет!
    // use `url` here inside the callback because it's asynchronous!
});