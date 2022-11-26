### React SSR with Redis cache demo app

##### For dev: 
1. `npm i`
1. `docker run -it --name redis-alone -p 0.0.0.0:6379:6379 redis:7.0.5-alpine`
1. `npm start`
1. open `http://localhost:3000`

##### For production
1. ` docker-compose up -d`
