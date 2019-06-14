Example app demonstrating that Firefox and Chrome treat relative paths differently - Firefox treats sourceURL lines in a js file as relative to the JS file, but Chrome treats them as relative to the html page which loaded the JS to begin with.

Run `python -m http.server` as an easy way to see the requests each browser makes.

Results in Firefox when loading `/index.html` ("seems to work" from my perspective):
```
127.0.0.1 - - [14/Jun/2019 08:33:37] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:33:37] "GET /js/all.js HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:33:38] code 404, message File not found
127.0.0.1 - - [14/Jun/2019 08:33:38] "GET /favicon.ico HTTP/1.1" 404 -
127.0.0.1 - - [14/Jun/2019 08:33:41] "GET /js/uncompiled/app.js.map HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:33:41] "GET /js/uncompiled/app.js HTTP/1.1" 200 -
```

Results in Chrome when loading `/index.html` ("seems to be broken" from my perspective):
```
127.0.0.1 - - [14/Jun/2019 08:34:22] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:34:22] "GET /js/all.js HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:34:22] code 404, message File not found
127.0.0.1 - - [14/Jun/2019 08:34:22] "GET /uncompiled/app.js.map HTTP/1.1" 404 -
127.0.0.1 - - [14/Jun/2019 08:34:23] code 404, message File not found
127.0.0.1 - - [14/Jun/2019 08:34:23] "GET /favicon.ico HTTP/1.1" 404 -
```


Example with another html file in a different directory, showing that the paths ought to be relative to the JS file, not HTML:

Firefox, working:

```
127.0.0.1 - - [14/Jun/2019 08:43:48] "GET /otherapp HTTP/1.1" 301 -
127.0.0.1 - - [14/Jun/2019 08:43:48] "GET /otherapp/ HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:43:48] "GET /js/all.js HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:43:49] "GET /js/uncompiled/app.js.map HTTP/1.1" 304 -
127.0.0.1 - - [14/Jun/2019 08:43:49] "GET /js/uncompiled/app.js HTTP/1.1" 304 -
127.0.0.1 - - [14/Jun/2019 08:43:50] code 404, message File not found
127.0.0.1 - - [14/Jun/2019 08:43:50] "GET /favicon.ico HTTP/1.1" 404 -
```

Chrome, not working:
```
127.0.0.1 - - [14/Jun/2019 08:44:24] "GET /otherapp HTTP/1.1" 301 -
127.0.0.1 - - [14/Jun/2019 08:44:24] "GET /otherapp/ HTTP/1.1" 200 -
127.0.0.1 - - [14/Jun/2019 08:44:24] "GET /js/all.js HTTP/1.1" 304 -
127.0.0.1 - - [14/Jun/2019 08:44:24] code 404, message File not found
127.0.0.1 - - [14/Jun/2019 08:44:24] "GET /otherapp/uncompiled/app.js.map HTTP/1.1" 404 -
```
