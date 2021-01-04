let db;

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = e => {
    const db = e.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
};