function fetchTool() {
  const fetchData = (method, url, payload, cb) => {
    const xhr = new XMLHttpRequest();
    const payloadString = JSON.stringify(payload);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          cb(null, result);
        } else {
          cb('Error');
        }
      }
    };

    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(payloadString);
  };

  function get(url, cb) { fetchData('GET', url, null, cb); }
  function post(url, payload, cb) { fetchData('POST', url, payload, cb); }

  return {
    get,
    post,
  };
}

export default fetchTool;
