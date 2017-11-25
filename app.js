var express = require('express');
var app = express();
var path = require('path');
var port = 3001;
var log = require('./libs/log')(module);
var main = require('./routes');
app.use('/',main);
/*
app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete
app.use(app.router); // модуль для простого задания обработчиков путей
app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html
*/
app.use(function (req, res, next) {
  res.status(404);
  log.debug('Not found URL: %s', req.url);
  res.send({ error: 'Not found' });
  return;
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  res.send({ error: err.message });
  return;
});

app.get('/ErrorExample', function (req, res, next) {
  next(new Error('Random error!'));
});


app.listen(port, () => { console.log('Express server listening on port 3000'); })
