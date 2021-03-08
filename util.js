const IS_DEBUG = false;
window.urlContainer = {};

// {
//     'pornhub': {
//         href,
//             seconds,
//     }
// }


// {
//     //"javascript.ru" : 0,
//     //"learn.javascript.ru" : 0,
//     //"ipsilon.sgu.ru": 0,
//     //"other" : 0,
// };

const getHotname = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const url = tabs[0] && tabs[0].url;

            try {
                const { hostname, href } = new URL(url);
                if ((hostname === 'extensions') || (hostname === 'bodjmonnkcegkkiofjpbliihjpkipdif') || (hostname === 'newtab')) {
                    resolve({ hostname: 'режим разработчика', href: 'https://www.google.com/', });
                } else {
                    resolve({ hostname, href });
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
    })
}, 1000);
//clearInterval(intervalId);