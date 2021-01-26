const list = document.getElementById('myUL');

const decorateTime = (seconds) => {
    let minutes = parseInt(seconds / 60, 10);
    let hours = parseInt(minutes / 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `:${hours}:${minutes}:${seconds}`

}

const siteItem = (hostname, seconds) => `<li>
<a href="" target="_blank">
  ${hostname} : ${decorateTime(seconds)}
</a>
</li>`

const backgroundWindow = chrome.extension.getBackgroundPage();
console.log(backgroundWindow);
const urlContainer = backgroundWindow.urlContainer || { 'test': 4 };


for (let key in urlContainer) {
    list.innerHTML += siteItem(key, urlContainer[key]);
}

