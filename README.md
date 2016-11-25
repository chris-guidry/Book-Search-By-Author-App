#Book Search By Author App
App uses Google Books API and built with Angular, Bootstrap, Sass, UglifyJS 2, and Font Awesome.
API example: https://www.googleapis.com/books/v1/volumes?maxResults=10&q=inauthor:robbins

##Browser Support
    Firefox and Safari - double click the index.html file and the app will work
    Chrome - the folder needs to be loaded using a light weight web server to avoid CORS errors related to relative paths of local files. For example:
        http-server
        Install: npm install http-server -g
        Run: http-server
        Documentation: https://www.npmjs.com/package/http-server
    Firefox Console Error: "junk after document element" (bookListTemplate.html)
        The bookListTemplate.html template gets imported into index.html and Firefox interprets it as XML so it think's there's a problem with the syntax. It seems to be a Firefox bug: https://github.com/angular/angular.js/issues/7814

##Sass - convert to one minified CSS file (would be automated with Gulp)
    sass sass/style.scss css/style.css  --style compressed

##JS - convert to one minified JS file (would be automated with Gulp)
    uglifyjs js/app.js services/*.js controllers/*.js --output js/script.js --source-map js/script.js.map --compress
