import React, { Component } from "react";
import { Provider as ReduxProvider  } from "react-redux";
import { Provider as RouterProvider } from "utils/react-router-extras.js";
import AppRouter, { routesMap } from "components/routes/AppRouter.jsx";
import { Provider as ApiProvider } from "utils/api.js";

class App extends Component {
  getChildContext() {
    return {
      translations: this.props.translations,
    };
  }
  render() {
    const { client, store } = this.props;

    return (
      <ReduxProvider store={store}>
        <ApiProvider client={client}>
          <RouterProvider
            routes={AppRouter}
            routesMap={routesMap}
            store={store} />
        </ApiProvider>
      </ReduxProvider>
    );
  }
}

App.propTypes = {
  client: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired,
  translations: React.PropTypes.object.isRequired,
};

App.childContextTypes = {
  translations: React.PropTypes.object.isRequired,
};

export default App;
