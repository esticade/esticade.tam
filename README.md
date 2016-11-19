# Esticade testing and monitoring tool
- emit events with payload
- listen to all the events

## Installation and configuration
- Install [Git](https://git-scm.com/)
- Clone this repository
- Install [Node.js](https://nodejs.org/en/)
- Install [RabbitMQ](https://www.rabbitmq.com/)

Now you need to install browserify and download dependencies, run following commands:

``` bash
npm install -g browserify
npm install
```

Now set up esticade configuration, easiest way is to create .esticaderc into your home folder
with appropriate configuration connecting to your RabbitMQ installation.

- Create .esticaderc in your home folder, example contents:
``` bash
{ 
    "connectionURL": "amqp://username:password@yourdomain.com/your_vhost",
    "exchange": "EventNetwork"
}
```

## How to run
Running esticade.tam is easy, use one command and it starts to listen on port 2149:

``` bash
npm start
```

## Running Pinger test service
This test service generates event every 2 seconds, use following command to run and Ctrl+C to stop.

``` bash
npm run pinger
```

## Used content
- Background image by HD Images New. 2016. HD Images New. [ONLINE] Available at: http://hdimagesnew.com/hd-backgrounds-wallpapers/. [Accessed 11 April 2016].
- Temporary logo was made with [GraphicSprings](https://www.graphicsprings.com/start-your-logo)
