# orders-payments-microservices
An example project demonstrating event sourcing and Command Query Responsibility Segregation (CQRS) using a couple of _NestJS_ microservices with an _Angular_ frontend app.
_Redis_ is used as a read database and also acts as the message broker for the pub/sub communication between the microservices. 
All the events are persisted into a _MongoDB_ database.

## CQRS Pattern
![CQRS pattern](https://raw.githubusercontent.com/ArkerLabs/event-sourcing-nestjs/master/docs/state.jpg)

## Description

### orders
- Responsible for the management of orders
- Each order can only be at a single state at a time
- Order states: _created, confirmed, delivered, cancelled_
- Once an order is created, the **orders** app publishes an event which is subscribed by the **payments** app to process a payment for the order
- If the payment of the order is declined, the order is set to _cancelled_
- If the payment of the order is confirmed, the order is set to _confirmed_
  - After _X_ amount of seconds a _confirmed_ order is automatically set to _delivered_
- Has endpoints to do the following:
  1. view all orders
  2. create an order
  3. cancel an order
  4. check order status

### payments
- Responsible for payment processing
- Each order is handled by the **payments** app by setting the payment of the order to _confirmed_ or _declined_ based on random logic
- Each payment is persisted into its own table in the _MongoDB_ database
- Once a payment is processed, the **payments** app publishes an event which is subscribed by the **orders** app to continue with order processing

### portal
- A user of the **portal** app can do the following:
  1. view list of orders
  2. view the details of an order
  3. create an order
  4. cancel an order
- Login requires a _Gmail_ account for auth
- Implements server-sent events (SSE) to update the state of an order

### Order event flow
- Events that are stored in the event store are highlighted in red
- The dotted green lines represent pub/sub messaging via _Redis_
![Order event flow](https://github.com/razalyalhafiz/orders-payments-microservices/main/docs/order_event_flow.jpg)

## How To Run

### Prerequisites
- It is assumed that the user has a basic understanding of _Kubernetes_ and _Helm_ charts
- A _Firebase_ developer account is required to handle auth for the **portal** and **orders** app
- Installation scripts available for _Minikube_ and _Google Cloud Platform_
  - Please ensure to copy the file _.firebase-configmap.example.yaml_ and set the values accordingly prior to starting installation.
  ```
  $ cp .firebase-configmap.example.yaml firebase-configmap.yaml
  ```

### Install on Minikube
Open a shell and run these commands:
```
$ minikube start
$ cd orders-payments-microservices/helm/scripts
$ ./install.sh
```

### Install on Google Cloud Platform
Open a shell and run these commands:
```
$ gcloud auth login
$ cd orders-payments-microservices/helm/scripts
$ ./gcloud_add_helm.sh
$ ./gcloud_startup.sh
$ ./install.sh
```

### Install on local machine
Set the configuration values / enviroment variable of each application.

#### orders / payments
Copy the file _.env.example_ and set each environment variable accordingly.
```
$ cp .env.example .env
```

#### portal
Set the configuration values in the _EnvService_ class.
```ts
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by the generated env.js file.

  public production = false;
  public ordersURL = '';
  public apiKey = '';
  ...
```
Note: the _env.js_ file is only generated when installation is made on a _Kubernetes_ cluster.

## Working Example
A working example of the demo project can be found [here](http://35.240.168.252/).
