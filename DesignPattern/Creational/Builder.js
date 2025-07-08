class HTTPRequest {
  constructor({ method, url, headers, body } = {}) {
    this.method = method || "GET";
    this.url = url || "";
    this.headers = headers || {};
    this.body = body || null;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setHeaders(headers) {
    this.headers = headers;
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }
}

const httpRequest = new HTTPRequest();

httpRequest
.setMethod("POST")
.setBody({name: "Shreyansh"})
.setUrl("http://localhost:8080")
.setHeaders({"CONTENT-TYPE": "Text/Plain"})

console.log(httpRequest);