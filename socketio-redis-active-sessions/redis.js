const redis = require("redis");

const port = '6379'
const client = redis.createClient(port,'127.0.0.1');

// if doesnt catch events, paste into redis-cli: 
// redis-cli> config set notify-keyspace-events KEA
client.config('set','notify-keyspace-events','KEA');



// Signin:
// * App must send - app key, OS, IP
// * Create record in Redis with given info

// On user termination session:
// * Send HTTP request to backend about it - (app_key must be in body)
// * Delete record from Redis by user_id and app_key
// * Send by socket logout action to specified device