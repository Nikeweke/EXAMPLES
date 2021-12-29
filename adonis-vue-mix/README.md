# Adonis + Vue (привязан с помощью laravel-mix)

* [Adonis and Vue together](https://dev.to/mzanggl/build-fullstack-javascript-apps-with-adonis-and-vue-3edc)
* [Laravel-mix](https://laravel-mix.com/docs/4.1/basic-example)

### Quick start
```bash
# watching vue app changing(console 1) 
npm run assets-watch
```

```bash
# starting adonis app (console 2)
npm start
```



---

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
