const list = document.getElementById('myUL');

const siteItem = (hostname, seconds) => `<li>
<a href="" target="_blank">
  ${hostname} : ${seconds}
</a>
</li>`

const backgroundWindow = chrome.extension.getBackgroundPage();
const urlContainer = backgroundWindow.urlContainer || {};


for (let key in urlContainer) {
    list.innerHTML += siteItem(key, urlContainer[key]);
}
