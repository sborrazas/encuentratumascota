import React, { Component } from "react";
import { Provider as ReduxProvider  } from "react-redux";
import { Provider as RouterProvider } from "utils/react-router-extras.js";
import AppRouter, { routesMap } from "components/routes/AppRouter.jsx";

class App extends Component {
  getChildContext() {
    return {
      translations: this.props.translations,
    };
  }
  render() {
    const { store } = this.props;

    return (
      <ReduxProvider store={store}>
        <RouterProvider
          routes={AppRouter}
          routesMap={routesMap}
          store={store} />
      </ReduxProvider>
    );
  }
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  translations: React.PropTypes.object.isRequired,
};

App.childContextTypes = {
  translations: React.PropTypes.object.isRequired,
};

export default App;
