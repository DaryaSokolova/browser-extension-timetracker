const IS_DEBUG = false;
window.urlContainer = {};

const getHotname = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const url = tabs[0] && tabs[0].url;

            try {
                const { hostname, href } = new URL(url);
                if ((hostname === 'extensions') || (hostname === 'bodjmonnkcegkkiofjpbliihjpkipdif')) {
                    resolve({ hostname: 'режим разработчика', href: 'https://www.google.com/', });
                } else {

                    if (hostname === 'newtab') {
                        resolve({ hostname: 'www.google.com', href: 'https://www.google.com/', });
                    } else {
                        resolve({ hostname, href });

                    }
                }

            } catch (error) {
                resolve({
                    hostname: 'режим разработчика',
                    href: 'https://www.google.com/',
                });
            }

        });
    })
}

const intervalId = setInterval(() => {
    getHotname().then(siteObj => {
        chrome.storage.local.get(['myContainer'], function (result) {
            const urlContainer = result.myContainer;
            console.log(urlContainer);


            const { hostname } = siteObj;

            if (hostname in urlContainer) {
                // urlContainer[mess] += 1;
                urlContainer[hostname] = {
                    ...urlContainer[hostname],
                    seconds: urlContainer[hostname].seconds + 1,
                };
            } else {
                urlContainer[hostname] = {
                    href: siteObj.href,
                    seconds: 0,
                };
            }

            for (let key in urlContainer) {
                IS_DEBUG && console.log(key, urlContainer[key]);
            }

            chrome.storage.local.set({ 'myContainer': urlContainer });
        });

    })
}, 1000);
//clearInterval(intervalId);