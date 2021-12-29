
const Rx = require('rx')

// Main objects are: 
// * Observable - is functions that fires
// * Observer -  is a consumer of values delivered by an Observable.
// * Subscription -its object that we have after subscribing on observable, that have only unsubscribe(dispose) method

// ALL STARTS FROM OBSERVABLE ! 

// Observable 
// inside func there are 3 methods that provides observer: next(), error(), complete()
let observable = Rx.Observable.create((obs) => {

    // this will be sync event   
    obs.onNext('Here')
  
    // this will be async
    setInterval(() => {
      obs.onNext('There')
    }, 2000)
  //   obs.onError('Here')
  //   obs.onComplete()
  })

// Observable fires when you call method subscribe on observable
// subscribe() - has 3 params, all params are functions:
// * 1 function receives all message from next()
// * 2 function receives error message from error()
// * 3 function receives no message from complete()
observable.subscribe(
  (x) => console.log('simple:', x),
  (err) => console.log(err),
  () => console.log('complete')
)

// OR
// You can also not pass 3 function to observable.subscribe(...)
// we can create object observer like observable
// var observer = Rx.Observer.create(
//     function (x) {
//       console.log('Next: %s', x);
//     },
//     function (err) {
//       console.log('Error: %s', err);
//     },
//     function () {
//       console.log('Completed');
//     }
// );
// observable.subscribe(observer)


// When you make subscribe on observable its returns a Subscription
// which have one method - unsubscribe() or dispose()
let subscription = observable.subscribe(
    (x) => console.log('subscription:', x),
    (err) => console.log(err),
    () => console.log('complete')
  )

// After we get subscription, we decide to unsubscribe after 5 sec
setTimeout(() => {
    subscription.dispose()
    console.log('Unsubscribed')
},5000)  


