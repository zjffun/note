---
updated: 'Thu, 20 Aug 2020 11:58:42 GMT'
date: 'Thu, 20 Aug 2020 11:58:42 GMT'
---

连续创建多个 objectStore 属于同一个 upgrade transaction。参见：<https://www.w3.org/TR/IndexedDB/#dom-idbdatabase-createobjectstore>

```js
function openIndexedDB() {
  let resolve, reject;
  const dbPromise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const request = window.indexedDB.open("GDUDatabase", 1);

  request.onerror = function (error) {
    reject(error);
  };

  request.onsuccess = function (event) {
    let db = event.target.result;

    resolve(db);

    db.onerror = function (event) {
      // Generic error handler for all errors targeted at this database's
      // requests!
      console.error("Database error: " + event.target.errorCode);
    };
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // 清空旧 objectStore
    // Array.from(db.objectStoreNames).forEach(name => {
    //   db.deleteObjectStore(name);
    // });

    // 创建 objectStore
    db.createObjectStore("db1", { keyPath: "id" });
    db.createObjectStore("db2", {
      keyPath: "id",
    });

    // 连续创建多个 objectStore 属于同一个 upgrade transaction
    // https://www.w3.org/TR/IndexedDB/#dom-idbdatabase-createobjectstore
    request.transaction.oncomplete = function () {
      const transaction = db.transaction(db.objectStoreNames, "readwrite");
      const db1ObjectStore = transaction.objectStore("db1");
      const db2ObjectStore = transaction.objectStore("db2");

      transaction.oncomplete = function () {
        console.log("add data transaction done!");
      };

      transaction.onerror = function (error) {
        console.error(error);
      };

      // 添加 db1 数据
      const db1Data = [];

      db1Data.forEach(function (data) {
        db1ObjectStore.add(data);
      });

      // 添加 db2 数据
      const db2Data = [];

      db2Data.forEach(function (data) {
        db2ObjectStore.add(data);
      });
    };
  };

  return dbPromise;
}
```
