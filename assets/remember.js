"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('remember/app', ['exports', 'ember', 'remember/resolver', 'ember-load-initializers', 'remember/config/environment'], function (exports, _ember, _rememberResolver, _emberLoadInitializers, _rememberConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _rememberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _rememberConfigEnvironment['default'].podModulePrefix,
    Resolver: _rememberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _rememberConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('remember/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'remember/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _rememberConfigEnvironment) {

  var name = _rememberConfigEnvironment['default'].APP.name;
  var version = _rememberConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('remember/components/delete-button', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    store: _ember['default'].inject.service(),
    routing: _ember['default'].inject.service('-routing'),

    actions: {
      destroyReminder: function destroyReminder(reminder) {
        var _this = this;

        reminder.destroyRecord().then(function () {
          _this.get('routing').transitionTo('reminder-list');
        });
      }
    }
  });
});
define('remember/controllers/reminder-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    queryParams: ['search'],
    search: null,

    reminders: _ember['default'].computed('search', function () {
      var search = this.get('search');
      var reminders = this.get('model');
      if (search) {
        reminders = reminders.filter(function (reminder) {
          return reminder.get('title').toLowerCase().match(search);
        });
      }
      return reminders;
    }),

    actions: {
      updateSearch: function updateSearch(search) {
        this.set('search', search && search.toLowerCase());
      }
    }
  });
});
define('remember/controllers/reminder-list/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {

      updateReminder: function updateReminder(reminder) {
        var _this = this;

        this.get('store').findRecord('reminder', reminder.id).then(function (reminder) {
          reminder.save().then(function (reminder) {
            _this.transitionToRoute('reminder-list.reminder-detail', reminder.id);
          });
        });
      },

      revertReminder: function revertReminder(reminder) {
        this.get('store').findRecord('reminder', reminder.id).then(function (reminder) {
          reminder.rollbackAttributes();
        });
      }
    }
  });
});
define('remember/controllers/reminder-list/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    title: '',
    date: '',
    notes: '',

    actions: {
      createReminder: function createReminder() {
        var _this = this;

        console.log(this.get('title'));
        var reminder = this.getProperties('title', 'date', 'notes');
        this.get('store').createRecord('reminder', reminder).save().then(function () {
          _this.setProperties({ title: '', date: '', notes: '' });
        });
      }
    }
  });
});
define('remember/helpers/moment-calendar', ['exports', 'ember', 'remember/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _rememberConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_rememberConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('remember/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('remember/helpers/moment-format', ['exports', 'ember', 'remember/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _rememberConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_rememberConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('remember/helpers/moment-from-now', ['exports', 'ember', 'remember/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _rememberConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_rememberConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('remember/helpers/moment-to-now', ['exports', 'ember', 'remember/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _rememberConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_rememberConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('remember/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define('remember/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('remember/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('remember/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'remember/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _rememberConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_rememberConfigEnvironment['default'].APP.name, _rememberConfigEnvironment['default'].APP.version)
  };
});
define('remember/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('remember/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('remember/initializers/ember-cli-mirage', ['exports', 'ember-cli-mirage/utils/read-modules', 'remember/config/environment', 'remember/mirage/config', 'ember-cli-mirage/server', 'lodash/object/assign'], function (exports, _emberCliMirageUtilsReadModules, _rememberConfigEnvironment, _rememberMirageConfig, _emberCliMirageServer, _lodashObjectAssign) {
  exports.startMirage = startMirage;
  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(application) {
      if (arguments.length > 1) {
        // Ember < 2.1
        var container = arguments[0],
            application = arguments[1];
      }

      if (_shouldUseMirage(_rememberConfigEnvironment['default'].environment, _rememberConfigEnvironment['default']['ember-cli-mirage'])) {
        startMirage(_rememberConfigEnvironment['default']);
      }
    }
  };

  function startMirage() {
    var env = arguments.length <= 0 || arguments[0] === undefined ? _rememberConfigEnvironment['default'] : arguments[0];

    var environment = env.environment;
    var modules = (0, _emberCliMirageUtilsReadModules['default'])(env.modulePrefix);
    var options = (0, _lodashObjectAssign['default'])(modules, { environment: environment, baseConfig: _rememberMirageConfig['default'], testConfig: _rememberMirageConfig.testConfig });

    return new _emberCliMirageServer['default'](options);
  }

  function _shouldUseMirage(env, addonConfig) {
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
define('remember/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('remember/initializers/export-application-global', ['exports', 'ember', 'remember/config/environment'], function (exports, _ember, _rememberConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_rememberConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _rememberConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_rememberConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('remember/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('remember/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('remember/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("remember/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('remember/mirage/config', ['exports'], function (exports) {
  exports['default'] = function () {
    this.get('/reminders');
    this.post('/reminders');
    this.get('/reminders/:id');
    this.patch('/reminders/:id');
    this.put('/reminders/:id');
    this.del('/reminders/:id');
  };
});
define('remember/mirage/factories/reminder', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.Factory.extend({
    title: function title() {
      return _emberCliMirage.faker.lorem.words().join(' ').capitalize();
    },
    date: function date() {
      return _emberCliMirage.faker.date.recent(3);
    },
    notes: function notes() {
      return _emberCliMirage.faker.lorem.paragraph();
    },
    pinned: false
  });
});
define('remember/mirage/models/reminder', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.Model.extend({});
});
define('remember/mirage/scenarios/default', ['exports'], function (exports) {
  exports['default'] = function (server) {
    server.createList('reminder', 5);
  };
});
define('remember/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.JSONAPISerializer.extend({});
});
define('remember/mirage/serializers/reminder', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.JSONAPISerializer.extend({});
});
define('remember/models/reminder', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    date: _emberData['default'].attr('date'),
    notes: _emberData['default'].attr('string'),
    pinned: _emberData['default'].attr('boolean', { defaultValue: false })
  });
});
define('remember/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('remember/router', ['exports', 'ember', 'remember/config/environment'], function (exports, _ember, _rememberConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _rememberConfigEnvironment['default'].locationType,
    rootURL: _rememberConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('reminder-list', { path: '/' }, function () {
      this.route('reminder-detail', { path: ':id' });
      this.route('edit', { path: ':id/edit' });
      this.route('new');
    });
  });

  exports['default'] = Router;
});
define('remember/routes/reminder-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    queryParams: {
      search: {
        replace: true
      }
    },
    model: function model() {
      return this.get('store').findAll('reminder');
    }
  });
});
define('remember/routes/reminder-list/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('reminder', params.id);
    }
  });
});
define('remember/routes/reminder-list/reminder-detail', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('reminder', params.id);
    }
  });
});
define('remember/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('remember/services/moment', ['exports', 'ember', 'remember/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _rememberConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_rememberConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define("remember/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "remember/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "application");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [2, 2], [2, 12]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("remember/templates/components/delete-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "remember/templates/components/delete-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "title", "delete this reminder");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "delete-button");
        var el3 = dom.createTextNode("🗑");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["destroyReminder", ["get", "reminder", ["loc", [null, [2, 59], [2, 67]]], 0, 0, 0, 0]], ["on", "click"], ["loc", [null, [2, 32], [2, 80]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("remember/templates/reminder-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 8
              },
              "end": {
                "line": 14,
                "column": 8
              }
            },
            "moduleName": "remember/templates/reminder-list.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "title", "This reminder has unsaved changes!");
            dom.setAttribute(el1, "class", "dirty-warning-icon");
            var el2 = dom.createTextNode("\n            ⚠️\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "title", "This reminder has unsaved changes!");
            dom.setAttribute(el1, "class", "dirty-warning-icon");
            var el2 = dom.createTextNode("⚠️");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h2");
            dom.setAttribute(el1, "class", "spec-reminder-item");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            dom.setAttribute(el1, "class", "reminder-item-date");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(fragment, [5]);
            var morphs = new Array(5);
            morphs[0] = dom.createAttrMorph(element0, 'hidden');
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            morphs[2] = dom.createAttrMorph(element1, 'hidden');
            morphs[3] = dom.createMorphAt(dom.childAt(fragment, [7]), 0, 0);
            morphs[4] = dom.createMorphAt(dom.childAt(fragment, [9]), 0, 0);
            return morphs;
          },
          statements: [["attribute", "hidden", ["subexpr", "unless", [["get", "reminder.hasDirtyAttributes", ["loc", [null, [7, 29], [7, 56]]], 0, 0, 0, 0], "true"], [], ["loc", [null, [null, null], [7, 66]]], 0, 0], 0, 0, 0, 0], ["inline", "delete-button", [], ["reminder", ["subexpr", "@mut", [["get", "reminder", ["loc", [null, [10, 35], [10, 43]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [10, 10], [10, 45]]], 0, 0], ["attribute", "hidden", ["subexpr", "unless", [["get", "reminder.hasDirtyAttributes", ["loc", [null, [11, 103], [11, 130]]], 0, 0, 0, 0], "true"], [], ["loc", [null, [null, null], [11, 140]]], 0, 0], 0, 0, 0, 0], ["content", "reminder.title", ["loc", [null, [12, 41], [12, 59]]], 0, 0, 0, 0], ["content", "reminder.date", ["loc", [null, [13, 40], [13, 57]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 6
            },
            "end": {
              "line": 15,
              "column": 6
            }
          },
          "moduleName": "remember/templates/reminder-list.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["reminder-list.reminder-detail", ["get", "reminder", ["loc", [null, [5, 51], [5, 59]]], 0, 0, 0, 0]], ["tagName", "li", "class", "reminder-list-item"], 0, null, ["loc", [null, [5, 8], [14, 20]]]]],
        locals: ["reminder"],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 4
            },
            "end": {
              "line": 20,
              "column": 4
            }
          },
          "moduleName": "remember/templates/reminder-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "add-reminder-button");
          var el2 = dom.createTextNode("+");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 0
          }
        },
        "moduleName": "remember/templates/reminder-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "reminders-list-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2, "class", "reminder-list");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "add-reminder-button-container");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "reminder-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element2, 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [5]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "search", "value", ["subexpr", "@mut", [["get", "search", ["loc", [null, [2, 30], [2, 36]]], 0, 0, 0, 0]], [], [], 0, 0], "key-up", "updateSearch", "class", "reminder-list-filter"], ["loc", [null, [2, 2], [2, 89]]], 0, 0], ["block", "each", [["get", "reminders", ["loc", [null, [4, 14], [4, 23]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 6], [15, 15]]]], ["block", "link-to", ["reminder-list.new"], [], 1, null, ["loc", [null, [18, 4], [20, 16]]]], ["content", "outlet", ["loc", [null, [25, 2], [25, 12]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("remember/templates/reminder-list/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "remember/templates/reminder-list/edit.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("form");
          dom.setAttribute(el1, "class", "create-reminder-form");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h2");
          var el3 = dom.createTextNode("Edit this reminder");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "reminder-submit-button");
          var el3 = dom.createTextNode("Submit");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "reminder-revert-button");
          var el3 = dom.createTextNode("\n      Revert ↺\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(element0, [15]);
          var element2 = dom.childAt(element0, [17]);
          var morphs = new Array(6);
          morphs[0] = dom.createMorphAt(element0, 3, 3);
          morphs[1] = dom.createMorphAt(element0, 7, 7);
          morphs[2] = dom.createMorphAt(element0, 11, 11);
          morphs[3] = dom.createElementMorph(element1);
          morphs[4] = dom.createAttrMorph(element2, 'hidden');
          morphs[5] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "reminder.title", ["loc", [null, [4, 19], [4, 33]]], 0, 0, 0, 0]], [], [], 0, 0], "class", "reminder-title-input", "placeholder", "Insert Title"], ["loc", [null, [4, 4], [4, 92]]], 0, 0], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "reminder.date", ["loc", [null, [5, 19], [5, 32]]], 0, 0, 0, 0]], [], [], 0, 0], "type", "datetime-local", "class", "reminder-date-input", "placeholder", "Insert Date"], ["loc", [null, [5, 4], [5, 111]]], 0, 0], ["inline", "textarea", [], ["value", ["subexpr", "@mut", [["get", "reminder.notes", ["loc", [null, [6, 22], [6, 36]]], 0, 0, 0, 0]], [], [], 0, 0], "class", "reminder-notes-input", "placeholder", "Insert Note"], ["loc", [null, [6, 4], [6, 94]]], 0, 0], ["element", "action", ["updateReminder", ["get", "reminder", ["loc", [null, [7, 69], [7, 77]]], 0, 0, 0, 0]], ["on", "click"], ["loc", [null, [7, 43], [7, 90]]], 0, 0], ["attribute", "hidden", ["subexpr", "unless", [["get", "reminder.hasDirtyAttributes", ["loc", [null, [10, 23], [10, 50]]], 0, 0, 0, 0], "true"], [], ["loc", [null, [null, null], [10, 59]]], 0, 0], 0, 0, 0, 0], ["element", "action", ["revertReminder", ["get", "reminder", ["loc", [null, [9, 32], [9, 40]]], 0, 0, 0, 0]], ["on", "click"], ["loc", [null, [9, 6], [9, 53]]], 0, 0]],
        locals: ["reminder"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "remember/templates/reminder-list/edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "with", [["get", "model", ["loc", [null, [1, 8], [1, 13]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [14, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("remember/templates/reminder-list/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "remember/templates/reminder-list/new.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        dom.setAttribute(el1, "class", "create-reminder-form");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Create new reminder");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "reminder-submit-button");
        var el3 = dom.createTextNode("Submit");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(element0, 7, 7);
        morphs[3] = dom.createMorphAt(element0, 10, 10);
        return morphs;
      },
      statements: [["element", "action", ["createReminder"], ["on", "submit"], ["loc", [null, [2, 35], [2, 74]]], 0, 0], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "title", ["loc", [null, [4, 17], [4, 22]]], 0, 0, 0, 0]], [], [], 0, 0], "class", "reminder-title-input", "placeholder", "Insert Title"], ["loc", [null, [4, 2], [4, 81]]], 0, 0], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "date", ["loc", [null, [5, 17], [5, 21]]], 0, 0, 0, 0]], [], [], 0, 0], "type", "datetime-local", "class", "reminder-date-input", "placeholder", "Insert Date"], ["loc", [null, [5, 2], [5, 100]]], 0, 0], ["inline", "textarea", [], ["value", ["subexpr", "@mut", [["get", "notes", ["loc", [null, [6, 20], [6, 25]]], 0, 0, 0, 0]], [], [], 0, 0], "class", "reminder-notes-input", "placeholder", "Insert Note"], ["loc", [null, [6, 2], [6, 83]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("remember/templates/reminder-list/reminder-detail", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "remember/templates/reminder-list/reminder-detail.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "title", "edit this reminder");
            var el2 = dom.createElement("button");
            dom.setAttribute(el2, "class", "edit-button");
            var el3 = dom.createTextNode("📝");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "remember/templates/reminder-list/reminder-detail.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h2");
          dom.setAttribute(el1, "class", "spec-reminder-title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "reminder-detail-date");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "reminder-detail-notes");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          morphs[2] = dom.createMorphAt(dom.childAt(fragment, [5]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(fragment, [7]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(fragment, [9]), 0, 0);
          return morphs;
        },
        statements: [["inline", "delete-button", [], ["reminder", ["subexpr", "@mut", [["get", "reminder", ["loc", [null, [3, 27], [3, 35]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [3, 2], [3, 37]]], 0, 0], ["block", "link-to", ["reminder-list.edit", ["get", "reminder", ["loc", [null, [4, 34], [4, 42]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 2], [6, 14]]]], ["content", "reminder.title", ["loc", [null, [7, 34], [7, 52]]], 0, 0, 0, 0], ["content", "reminder.date", ["loc", [null, [8, 34], [8, 51]]], 0, 0, 0, 0], ["content", "reminder.notes", ["loc", [null, [9, 35], [9, 53]]], 0, 0, 0, 0]],
        locals: ["reminder"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "remember/templates/reminder-list/reminder-detail.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "reminder-item-detail");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "with", [["get", "model", ["loc", [null, [2, 10], [2, 15]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [10, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('remember/tests/mirage/mirage/config.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/config.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass jshint.');
  });
});
define('remember/tests/mirage/mirage/factories/reminder.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/factories/reminder.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/reminder.js should pass jshint.');
  });
});
define('remember/tests/mirage/mirage/models/reminder.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/models/reminder.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/reminder.js should pass jshint.');
  });
});
define('remember/tests/mirage/mirage/scenarios/default.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/scenarios/default.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass jshint.');
  });
});
define('remember/tests/mirage/mirage/serializers/application.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass jshint.');
  });
});
define('remember/tests/mirage/mirage/serializers/reminder.jshint', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/serializers/reminder.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/reminder.js should pass jshint.');
  });
});
define('remember/transforms/date', ['exports', 'ember-data', 'moment'], function (exports, _emberData, _moment) {
  exports['default'] = _emberData['default'].Transform.extend({

    deserialize: function deserialize(serialized) {
      if (serialized) {
        return (0, _moment['default'])(serialized).format("dddd, MMM Do, h:mm a");
      }
      return serialized;
    },

    serialize: function serialize(deserialized) {
      if (deserialized) {
        return (0, _moment['default'])(deserialized).toISOString();
      }
      return deserialized;
    }

  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('remember/config/environment', ['ember'], function(Ember) {
  var prefix = 'remember';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("remember/app")["default"].create({"name":"remember","version":"0.0.0+b9513aac"});
}

/* jshint ignore:end */
//# sourceMappingURL=remember.map
