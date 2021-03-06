# Coworkers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.26.

## Demo: 

https://coworkers-cc0e8.web.app/ (firebase-hosting)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server with hidden environment variables (`/environments/environment.local.ts` is required)

Run `ng serve --configuration=local` || `ng serve -c local --open`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Firebase project setup
`firebase init`

## Cloud functions local testing

1. set up admin sdk https://stackoverflow.com/a/59238144
2. start emulation `firebase emulators:start`
3. deploy functions `firebase deploy --only functions`

## Firebase project deploy
`firebase deploy` or `firebase deploy --only hosting`
