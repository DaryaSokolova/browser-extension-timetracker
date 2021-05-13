const list = document.getElementById('myUL');

const decorateTime = (seconds) => {
    let minutes = parseInt(seconds / 60, 10);
    let hours = parseInt(minutes / 60, 10);

    hours = Math.floor(seconds / 60 / 60);;
    minutes = Math.floor(seconds / 60) - (hours * 60);;
    seconds = seconds % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `:${hours}:${minutes}:${seconds}`
}

const checkbox = (isVisible) => {
    if (isVisible) {
        return `<input type="checkbox" name="" id="">`
    }
    return '';
}
//почитать про обработчик событий js
// повесить его на чекбокс - понять какой конкретно элемент из списака мы взяли - зайти в храрнилище, найти его, изменить его, остальное не испортить и все сохранить.

const siteItem = (hostname, seconds, href, isVisible) => `<li>
${checkbox(isVisible)}
<a class="item ${true ? '' : 'item-red'}" href="${href}" target="_blank">
  ${hostname} : ${decorateTime(seconds)}
</a>
</li>`

//const backgroundWindow = chrome.extension.getBackgroundPage();
//const urlContainer = backgroundWindow.urlContainer || { 'test': 4 };

chrome.storage.local.get(['myContainer'], function (result) {
    const urlContainer = result.myContainer;

    for (let key in urlContainer) {
        if (key !== 'режим разработчика') {
            list.innerHTML += siteItem(key, urlContainer[key].seconds, urlContainer[key].href);
        }
    }
});