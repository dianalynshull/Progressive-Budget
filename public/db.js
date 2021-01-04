let db;

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = e => {
    const db = e.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
};

request.onsucces = e => {
    db = e.target.result;
    if (navigator.onLine) {
        // add function that will check all pending transactions and send them through once online
    }
};

request.onerror = e => {
    console.log('Error on connection: ', e.target.errorCode);
}