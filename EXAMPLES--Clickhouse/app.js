const { ClickHouse } = require('clickhouse');
const dockerIP = 'http://192.168.99.100'
const clickhouse = new ClickHouse({
  url: dockerIP,
  port: 8123,
  debug: false,
  basicAuth: null,
  isUseGzip: false,
  database: 'db_test',  // be sure you create db_test before "run" function
  username: 'default',
  password: '',
  config: {
    session_timeout                         : 1000,
    output_format_json_quote_64bit_integers : 0,
    enable_http_compression                 : 0
  },
});
clickhouse.sessionId = '123';


// const SQL = 'SHOW DATABASES'
// const SQL = 'SHOW TABLES'
// const SQL = `CREATE DATABASE IF NOT EXISTS db_test`
// const SQL = 'SELECT toUUID(rand64());'
// const SQL = `INSERT INTO tasks VALUES (1, 'TAKE A NAP')`
// const result = clickhouse.query(SQL).toPromise()
// result.then((res) => {
//   console.log(res)
// })

run()

async function run() {

  const queries = [
    'SHOW DATABASES;',

    'SHOW TABLES;',

    'CREATE DATABASE IF NOT EXISTS db_test;',

    `CREATE TABLE IF NOT EXISTS tasks (id UInt64, task String)
    ENGINE=MergeTree() 
    PRIMARY KEY id
    ORDER BY id;
    `,

    `CREATE TABLE IF NOT EXISTS tasks_uuid (id UUID, task String)
    ENGINE=MergeTree() 
    PRIMARY KEY id
    ORDER BY id;
    `,

    `CREATE TABLE IF NOT EXISTS tasks_nested (
      id UInt64, 
      task String,
      queries Nested (
        act String,
        id UInt32
      )
    )
    ENGINE=MergeTree() 
    PRIMARY KEY id
    ORDER BY id;
    `,



    // ==========> INSERT
    // `INSERT INTO db_test.tasks (id, task) 
    //   VALUES (123, \'take a nap\');`,

    // `INSERT INTO tasks_uuid (id, task) SELECT generateUUIDv4(), 'take a nap'`

    // `INSERT INTO db_test.tasks_nested (id, task, queries.act, queries.id)
    //   VALUES (123, \'take a pee\', ['act1', 'act2'], [1,2]);`

    // ==========> DELETE
    // `ALTER TABLE tasks DELETE WHERE id = 123;`

    // ==========> UPDATE (id not updating - idk why)
    // `ALTER TABLE db_test.tasks UPDATE task = 'buy a car' WHERE id = 144;`
  ];

  for (const query of queries) {
    const r = await clickhouse.query(query).toPromise();
    console.log(query, r);
  }

}