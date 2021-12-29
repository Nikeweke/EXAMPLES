export default {
  // vus: 100, // virtual users

  // with "stages" you can wave your load on app
  stages: [
    { duration: '1m', target: 50 }, // Target - its how many VU per 1m will make requests in parallel
    // { duration: '30s', target: 100 }, 
  ],

  // "thresholds" - its checks 
  thresholds: { 
    // 'failed requests': ['rate<0.1'], // rate - its percent counter of successful responses
    http_req_duration: ['p(95)<200']  // response time in 95% must be less 200ms
  },
  
  // The maximum number of requests to make per second, in total across all VUs
  // rps: 10
};