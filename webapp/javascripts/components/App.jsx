import React, { Component } from "react";
import { Provider } from "react-redux";
import _ from "lodash";
import { Router, browserHistory, createRoutes } from "react-router";
import matchRoutes from "react-router/lib/matchRoutes";
import AppRouter from "components/routes/AppRouter.jsx";

const routes = createRoutes(AppRouter);
const dispatchThingy = (store) => (location) => {
  matchRoutes(routes, location, (error, state) => {
    store.dispatch({
      type: "ROUTER_THINGY",
      data: {
        pathname: location.pathname,
        params: state.params || {},
        query: location.query,
      },
    });
  });
};

const flattenTranslationKeys = (translations, acc, parentKeys = []) => {
  // TODO: Remove this, flatten translations somewhere else
  _.forOwn(translations, (trans, key) => {
    const transKeys = _.concat(parentKeys, [key]);

    if (_.isObject(trans)) {
      flattenTranslationKeys(trans, acc, transKeys);
    }
    else {
      acc[transKeys.join(".")] = trans;
    }
  });
};

class App extends Component {
  getChildContext() { // TODO: Remove this
    return {
      translations: this.props.translations,
    };
  }
  componentWillMount() {
    const { store } = this.props;
    const dispatchLocationChange = dispatchThingy(store);

    browserHistory.listen(dispatchLocationChange);
    dispatchLocationChange(browserHistory.getCurrentLocation());
  }
  render() {
    const { store, translations } = this.props;
    const flattenedTranslations = {};

    flattenTranslationKeys(translations, flattenedTranslations);

    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={AppRouter} />
      </Provider>
    );
  }
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  translations: React.PropTypes.object.isRequired,
};

App.childContextTypes = { // TODO: Remove this
  translations: React.PropTypes.object.isRequired,
};

export default App;
