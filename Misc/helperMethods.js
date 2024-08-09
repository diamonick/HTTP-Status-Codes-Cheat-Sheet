export
{
    getRand, getRandInt, getRandRange, getRandIntRange, getBalancedRandRange,
    getElement, getAllElements, sleep, getClamp,
    getZeroRelDelay, getRelDelay,
    invoke, invokeRepeating
};

//#region Miscellaneous Function(s)
//#region Random Function(s)
function getRand(length)
{
    return Math.random() * length;
}

function getRandInt(length)
{
    return Math.floor(Math.random() * length);
}

function getRandRange(min, max)
{
    return Math.random() * (max - min) + min;
}

function getRandIntRange(min, max)
{
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getBalancedRandRange(num)
{
    let min = -num;
    let max = num;
    return Math.random() * (max - min) + min;
}
//#endregion
function getElement(selector)
{
    return document.querySelector(selector);
}

function getAllElements(selectors)
{
    return document.querySelectorAll(selectors);
}

function sleep(seconds)
{
    return new Promise(resolve => invoke(resolve, seconds));
}

function getClamp(num, min, max)
{
    return Math.min(Math.max(num, min), max);
}

//#region GSAP Helper Function(s)


function getZeroRelDelay()
{
    return '<0';
}

function getRelDelay(delay)
{
    return `<${delay}`;
}

//#endregion

//#region Invoke Function(s)


function invoke(func, seconds)
{
    let invokeMethod = setTimeout(func, seconds * 1000);
}

function invokeRepeating(func, seconds)
{
    let invokeMethod = setInterval(func, seconds * 1000);
}

//#endregion
//#endregion