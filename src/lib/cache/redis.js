const redis = require('redis');
let client;

const connectRedis = () => {
    return new Promise((resolve, reject) => {
        client = redis.createClient();
        client.on('connect', function() {
            return resolve(true);
        });
        client.on('error', function (err, res){
            console.error('Error in connecting to redis', {error: err})
            return reject(new Error('Error in connecting to redis'))
        });
    })
};

const getValue = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, function(err,res){
            if(err){
                console.error('Error in getting value', {error: err});
                return reject(new Error('Error in getting value'));
            }
            console.log('Successfully gt value in redis');
            return resolve(true);
        })
    })
}
const setValue = (key, value) => {
    return new Promise((resolve, reject) => {
        client.set(key, function(err,res){
            if(err){
                console.error('Error in setting value', {error: err});
                return reject(new Error('Error in setting value'));
            }
            console.log('Successfully set value in redis');
            return resolve(true);
        })
    })
}
const deleteKey = (key) => {

}