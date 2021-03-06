# Docker Healthchecker

## CLI

### Images:

| Parameter | Description | Type | Default |
| ---- | ----------- | ---- | ---- |
| -i, --image | Docker image to check. Could be defined more times. | string | `''` |
| -f, --file | JSON file with image definition in format `[{name: string, image: string, alias: string}, ...]`, where there should be at least `name` or `image`. Parameter `alias` is optional. | string | `''` |

### Output:

| Parameter | Description | Type | Default |
| ---- | ----------- | ---- | ----- |
| --console | Whether program should output to console | boolean | false |
| --slack | Whether program should send output to Slack | boolean | false |
| --slack-webhook | If slack output is enabled, define the Slack webhook URL | string | `''` |
| --force | Whether program should send output even if containers are up | boolean | false

### Options:

| Parameter | Description | Type |
| ---- | ----------- | ---- |
| --version | Show version number | --- |
| -h, --help | Show help | --- |