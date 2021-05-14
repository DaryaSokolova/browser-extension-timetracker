const text = document.getElementById('relationOfCounts');
const list = document.getElementById('myUL');

document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.local.clear(() => {
        list.innerHTML = "";
    });

    render();
}
);

list.addEventListener('click', clickHandler);

function clickHandler(e) {

    if ((e.target.type === 'button') && (e.target.name === 'one')) {
        markAsLazy(e.target.id);
    }

    if ((e.target.type === 'button') && (e.target.name === 'two')) {
        markAsNotLazy(e.target.id);
    }

    //console.dir(e.target);
}


function markAsLazy(key) {
    chrome.storage.local.get(['myContainer'], function (result) {
        const urlContainer = result.myContainer;

        updUrlContainer = {
            ...urlContainer,
            [key]: {
                ...urlContainer[key],
                isLazy: true,
            }
        }
        //console.log(updUrlContainer);

        chrome.storage.local.set({ 'myContainer': updUrlContainer }, () => render());

    });

}

function markAsNotLazy(key) {
    chrome.storage.local.get(['myContainer'], function (result) {
        const urlContainer = result.myContainer;

        updUrlContainer = {
            ...urlContainer,
            [key]: {
                ...urlContainer[key],
                isLazy: false,
            }
        }
        //console.log(updUrlContainer);

        chrome.storage.local.set({ 'myContainer': updUrlContainer }, () => render());

    });
}

function sortByTime(urlContainer) {

    let arr = [];

    for (let key in urlContainer) {
        let tempObject = {
            hostname: key,
            seconds: urlContainer[key].seconds,
            href: urlContainer[key].href,
            isLazy: urlContainer[key].isLazy
        };

        arr.push(tempObject);
    }

    arr.sort(function (x, y) {
        var category = "seconds"
        if (x[category] < y[category]) {
            return -1;
        }
        if (x[category] > y[category]) {
            return 1;
        }
        return 0;
    });

    //console.log(arr);
    return arr;
}

const decorateTime = (seconds) => {
    let minutes = parseInt(seconds / 60, 10);
    let hours = parseInt(minutes / 60, 10);

    hours = Math.floor(seconds / 60 / 60);;
    minutes = Math.floor(seconds / 60) - (hours * 60);;
    seconds = seconds % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `: ${hours}:${minutes}:${seconds}`
}

const checkbox = (isLazy, key) => {
    if (!isLazy) {
        return `Да :)) <input type="button" value="🤖"  name="one" id="${key}"> Это время потрачено зря?`
    }
    return ` Даа! <input type="button" value="💚" name="two" id="${key}"> Это время проведено с пользой?`;
}

const siteItem = (hostname, seconds, href, isLazy) => `<li class="site-card">
    ${checkbox(isLazy, hostname)}
    <a class="item ${isLazy ? 'item-red' : ''}" href="${href}" target="_blank">
    ${hostname} : ${decorateTime(seconds)}
    </a>
</li>`

//const backgroundWindow = chrome.extension.getBackgroundPage();
//const urlContainer = backgroundWindow.urlContainer || { 'test': 4 };

const render = () => {
    list.innerHTML = "";
    chrome.storage.local.get(['myContainer'], function (result) {
        const urlContainer = result.myContainer;

        //console.log(urlContainer);
        //проработать сортировку вложенных объектов
        const sortedUrls = sortByTime(urlContainer);
        //console.log(sortedUrls);

        sortedUrls.forEach(urlObj => {
            if (urlObj.hostname !== 'режим разработчика') {
                list.innerHTML += siteItem(urlObj.hostname, urlObj.seconds, urlObj.href, urlObj.isLazy);
            }

        });



        // for (let key in urlContainer) {
        //     if (key !== 'режим разработчика') {
        //         list.innerHTML += siteItem(key, urlContainer[key].seconds, urlContainer[key].href, urlContainer[key].isLazy);
        //     }
        // }
        // Даша

        let countLazy = 0; let countLazyTime = 0;
        let countAll = 0; let countAllTime = 0;
        for (let key in urlContainer) {
            if (urlContainer[key].isLazy === true) {
                countLazyTime += urlContainer[key].seconds;
                countLazy++;
            }

            if (key !== 'режим разработчика') {
                countAll++;
                countAllTime += urlContainer[key].seconds;
            }
        }


        let relationOfCounts = (countLazy > 0 && countAll > 0) ? Math.trunc(countLazyTime / (countAllTime) * 100) : 0;

        text.innerHTML = `${countLazy} из ${countAll} сайтов отвлекали тебя от работы,
        а это ${relationOfCounts} % твоего бесценного времени.`;


    });
}

const updInfo = setInterval(() => {
    render();
}, 3000);




render();