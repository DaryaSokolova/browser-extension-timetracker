window.urlContainer = 
{
    //"javascript.ru" : 0,
    //"learn.javascript.ru" : 0,
    //"ipsilon.sgu.ru": 0,
    //"vk.com" : 0,
    //"other" : 0,
};

const getHotname = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const url = tabs[0] && tabs[0].url;
            if (url === undefined)
            {
                const hostname = 'console';
                resolve(hostname);
            }
            else
            {
                const { hostname } = new URL(url);
                resolve(hostname);
            }
        });
    })
}

const intervalId = setInterval(() => {
    getHotname().then(hostname => {
        //console.log(hostname);
        let mess = String(hostname);
        if (mess in urlContainer)
        {
            urlContainer[mess] += 1;
        }
        else
        {
            urlContainer[hostname] = 0;
        }

        for (let key in urlContainer) 
        {
            console.log( key, urlContainer[key] );
            //return `${key} ${myUrls[key]}`;
        }
    })
}, 1000);
//clearInterval(intervalId);

