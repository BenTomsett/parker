# Parker

Coursework project for CMP-5012B (Software Engineering)

## Getting started
1. Clone the repository
2. Run `npm install` in the root directory of the project
3. Run `npm run dev` to start the project (this will automatically open the frontend in your default browser)

## Contents
This repository contains multiple linked projects - it is a monorepo.
- `./app` - frontend React app
- `./server` - the backend server implementation for the project, using Express

## Adding dependencies
When using a monorepo with Turborepo and npm workspaces, you need to make sure you are first in the root directory of the project before adding dependencies with `npm install`. Then append `-w={WORKSPACE}` to the `npm install` command.
```
npm install example-dependency -w=app
```

See [the npm Docs](https://docs.npmjs.com/cli/v8/commands/npm-install#workspace) for more info.
