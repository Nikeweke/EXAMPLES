# Clickhouse - Yandex column-oriented database

* [Github](https://github.com/ClickHouse/ClickHouse)
* [Clickhouse Web Browser](http://ui.tabix.io)
* [ReadTheDocs](https://clickhouse-docs.readthedocs.io/ru/latest/access_rights.html)
* [Колоночные базы данных](https://ruhighload.com/Колоночные+базы+данных)
* [Clickhouse Joins](https://ruhighload.com/Работа+с+join+в+clickhouse)
---

### Особенности

* `;` - порой в конце запроса надо ставить, а иногда не надо (В коде надо везед, а через UI только если несколько запросов)
* Clickhouse имеет только 3 операции - SELECT, INSERT, ALTER(через эту делаеться delete, update)
* Clickhouse не имеет auto-increment - есть UUID
```sql
CREATE TABLE t_uuid (x UUID, y String) ENGINE=TinyLog
INSERT INTO t_uuid SELECT generateUUIDv4(), 'Example 1'
SELECT * FROM t_uuid
```


### Запуск 

[Установить](https://clickhouse.yandex/#quick-start) можно только на Linux или MacOS. На Windows через Docker.

### Язык запросов

SQL с Clickhouse надстройками.

### Подключение черех Tabix (Web UI)

Стандартный логин - `default`, пароля - нет.


### Подключение через Nodejs

Стандартный порт - 8123

```js
const { ClickHouse } = require('clickhouse');

const dockerIP = 'http://192.168.99.100'
const clickhouse = new ClickHouse({
  url: dockerIP,
  port: 8123,
  debug: false,
  basicAuth: null,
  isUseGzip: false,
  config: {
    session_timeout                         : 60,
    output_format_json_quote_64bit_integers : 0,
    enable_http_compression                 : 0
  },
});
clickhouse.sessionId = '123';

const SQL = 'SHOW DATABASES;'
const result = clickhouse.query(SQL).toPromise()
result.then((res) => {
  console.log(res)
})
```