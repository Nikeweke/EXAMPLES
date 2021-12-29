# Debugging(webhook, fulfillment) code locally

* [Ngrok](https://ngrok.com/)
* [Debug webhook locally](https://medium.com/@antonyharfield/dialogflow-web-hooks-how-to-develop-locally-and-deploy-to-cloud-functions-48839919e998)

![](https://cdn-images-1.medium.com/max/800/1*JnvBfKOExcw0QysR-7rNhA.png)

### Quick start
```sh
npm i 
```

Запускать в 2 консолях
```sh
# открывает через ngrok https адрес
npm run tunnel  

# запускаем сервер локально
node app
```

В **DialogFlow** => меню агента => секция `"Fulfillment"` - активировать **Webhook**, 
вставить адрес из `ngrok` консоли в `URL*`, нажать "Save" 