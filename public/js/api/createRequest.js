/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = ({ url, data, method, callback }) => {
  let retry = 5;
  const run = () => {
    let xhr = new XMLHttpRequest();
    xhr.onerror = (error) => {
      if (retry <= 0) {
        callback(error);
      } else {
        --retry;
        setTimeout(() => {
          run();
        }, 200);
      }
    };

    xhr.onload = () => {
      callback(null, xhr.response);
    };

    xhr.responseType = "json";
    if (method === "GET") {
      const queryKeyValueList = Object.entries(data).map(
        ([key, value]) => `${key}=${value}`
      );
      if (queryKeyValueList.length > 0) {
        xhr.open(method, `${url}?${queryKeyValueList.join("&")}`);
      } else {
        xhr.open(method, url);
      }

      xhr.send();
    } else if (["POST", "PUT", "DELETE"].includes(method)) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      xhr.open(method, url);
      try {
        xhr.send(formData);
      } catch (err) {
        console.log("xhr error: ", err);
      }
    } else {
      callback(new Error("Method not defined"));
    }
  };
  run();
};
