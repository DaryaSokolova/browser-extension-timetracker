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

const siteItem = (hostname, seconds, href) => `<li>
<a class="item" href="${href}" target="_blank">
  ${hostname} : ${decorateTime(seconds)}
</a>
</li>`

const backgroundWindow = chrome.extension.getBackgroundPage();
const urlContainer = backgroundWindow.urlContainer || { 'test': 4 };


for (let key in urlContainer) {
    list.innerHTML += siteItem(key, urlContainer[key].seconds, urlContainer[key].href);
}