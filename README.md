# maribor-transit-frontend

TypeScript, React, RxJS frontend for the Maribor Transit app.

## Development

To run the app in the development mode, run: `npm run dev` and open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Libraries used

Usage of [React](https://reactjs.org) and [RxJS](https://rxjs.dev) is separated into three levels:

- React only (components)
- both React and RxJS (hooks like useObservableState)
- RxJS only (service)

## Analyse performance

To get basic performance information on the production build, run `npm run analysePerformance`.

## TODO

- TODOs in code (search for `TODO:`)
- consider using [Observable Hooks](https://observable-hooks.js.org) library
- use Lighthouse report during development/on build

## License

GNU General Public License v3.0

## Created using Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
