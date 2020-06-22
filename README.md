# FoodLog

See [RFC](./docs/RFC.md) for more information

[TODO list](./docs/TODO.md) for a working log on some high level 

## Scripts
Most of the scripts are used to run / test.

### Starting dev server
TODO: Right now as is we nee dto first start a local redis instance for the server to connect. It will keep trying to connect to the redis service. This process needs to be more robust. 

Before running these commands the start_redis command should be run first.
```bash
$ npm install
$ npm start
```

### Redis docker container. 
We have two separate scripts that can be used to load a redis instance locally for testing purposes. 

```bash
$ npm run-script load-redis ./data/nutrition.csv 
```


#### BASH Scripts. 
We may want to move these over to js modules instead of BASH. 
- The first script is used to start a docker container locally with redis and expose the port through localhost. 
- stop_redis does more than stop the container it also removes it. TODO: May want to separate out removing the docker container so that the data may be 
```bash
$ bash ./scripts/start_redis.sh
$ bash ./scripts/stop_redis.sh
```