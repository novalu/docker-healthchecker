# This repo has been archived.

---

# Docker Healthchecker

TODO image

You've implemented healthcheck in your Docker containers, right? Now you can get status of your containers with `docker ps`, but this is what you should do periodically. Wouldn't it be better to leave the job to some automatized solution? There are monitoring software tools like Zabbix, but if you found this too overkill for your solution, then there is `docker-healthchecker` libraries.

## What docker-healthchecker can do?

It's a simple Node.js library and CLI which can be used to obtain status and/or health of your containers. Simply ask for containers by image names or definition file and get useful info. Moreover, if you need, healthchecker can send status of your containers to Slack or display in console. Recommended usage is to install a CRON job, which periodically monitor your containers and send message to Slack if one or more of your containers is down or unhealthy.

## What is docker healthcheck?

Healthcheck is an instruction in Dockerfile which tells Docker how to test a container to check that it is still working. This is not same as running state of the container. For example, container with web server may be running, but could be in an infinite loop, which causes to not able to handle new connections. 

Healthchecks could be defined in-line in Dockerfile, though more often is healthcheck a simple bash script which executes a test and exit with return value based on result of that test. Many services has healthcheck script included in repository along with Dockerfile, for another services you can use healthchecks made by community, for example [here](https://github.com/docker-library/healthcheck). In other cases you can write a healthcheck on your own (i.e. for healthchecking your app).

For more info about Docker healthchecks, see [official documentation](https://docs.docker.com/engine/reference/builder/#healthcheck).

## Libraries based on docker-healthchecker

### docker-healthchecker-api

If you want to build own solution, which monitor your containers, then you can use `docker-healthchecker-api`, which provides REST API for the underlying `docker-healthchecker`. More info you can find on npm package info: https://www.npmjs.com/package/docker-healthchecker-api.

### docker-healthchecker-ui

For a simple HTML status page containing a health of your containers, you can use `docker-healthchecker-ui`. More info you can find on npm package info: https://www.npmjs.com/package/docker-healthchecker-ui.

## Usage

You can use this package either as a CLI application, Node.js library or in Docker container.

### CLI application

#### Images:

| Parameter | Description | Type | Default |
| ---- | ----------- | ---- | ---- |
| -i, --image | Docker image to check. Could be defined more times. | string | `''` |
| -f, --file | JSON file with image definition in format `[{name: string, image: string, alias: string}, ...]`, where there should be at least `name` or `image`. Parameter `alias` is optional. | string | `''` |

#### Output:

| Parameter | Description | Type | Default |
| ---- | ----------- | ---- | ----- |
| --console | Whether program should output to console | boolean | false |
| --slack | Whether program should send output to Slack | boolean | false |
| --slack-webhook | If slack output is enabled, define the Slack webhook URL | string | `''` |
| --force | Whether program should send output even if containers are up | boolean | false

#### Options:

| Parameter | Description | Type |
| ---- | ----------- | ---- |
| --version | Show version number | --- |
| -h, --help | Show help | --- |

### Node.js library

TODO

### Docker container

TODO

## Outputs

### Console

### Slack webhook

## About

Pull requests are welcome

## Author
