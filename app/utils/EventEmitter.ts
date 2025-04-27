const listenersMap: { [id: string]: Array<(...params: any[]) => void> } = {};

function addListener(eventName: string, listener: (...params: any[]) => void) {
    listenersMap[eventName] = listenersMap[eventName] || [];
    listenersMap[eventName].push(listener);
}

function removeListener(eventName: string, listener: (...params: any[]) => void) {
    const lis = listenersMap[eventName];
    if (!lis) return;

    for (let i = lis.length - 1; i >= 0; i--) {
        if (lis[i] === listener) {
            lis.splice(i, 1);
            break;
        }
    }
}

function removeAllListeners(eventName: string) {
    listenersMap[eventName] = [];
}

function notify<T = any>(eventName: string, ...params: T[]) {
    const listeners = listenersMap[eventName];
    if (!listeners) return false;
    listeners.forEach(fnc => {
        fnc(...params);
    });
    return true;
}

export default {
    addListener,
    removeListener,
    removeAllListeners,
    notify,
};