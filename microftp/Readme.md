## Ftp communication microservice

### Usability 
Functions : 
 - run() : consumes data 
	- sendMessage(Item) : sends item through kafka to consumer 
 
### Explain microservice

#### Start
npm start

#### Directory Explained
- models: The models for the sequelize database
- src: 
  - config.js: kafka config
  - consumer.js: run() function to consume data via kafka
  - producer.js: sendMessage(Item) function to send data via kafka
- ftp: communication with ftp server, storing data to database, perform a query and return a array with the data
- csvtest: store data temporalily until you save them in the database

#### Docker
Creates a sql database. This database is used to store data, perform a query
on them, and then delete them.
Creates zookeeper to manage docker 
Create Kafka with a certain topic to send and receive data
docker compose -f docker-compose.yml up -d
docker compose -f docker-compose.yml down

#### NPM

- Uses sequelize to communicate with database.
- Uses kafka to send data: Consumer subscribe to a specific topic. In this topic 
	the producer writes the item. 
- Procudes: send Item to topic. 
- Consumer: 2 use cases: 
	- If message.send == 1 then start data function 
  - if message.send != 1 then save data to ./savedata/list.csv
- Data function: uses to load data from ftp server, store them in database, 
	perform the query, return data, clear database,

