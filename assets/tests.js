'use strict';

define('remember/tests/acceptance/reminder-list-test', ['exports', 'qunit', 'remember/tests/helpers/module-for-acceptance', 'ember'], function (exports, _qunit, _rememberTestsHelpersModuleForAcceptance, _ember) {

  (0, _rememberTestsHelpersModuleForAcceptance['default'])('Acceptance | reminders list', {
    beforeEach: function beforeEach() {
      server.createList('reminder', 5);
    },
    afterEach: function afterEach() {
      server.shutdown();
    }
  });

  (0, _qunit.test)('viewing the homepage', function (assert) {

    visit('/');

    andThen(function () {
      assert.equal(currentURL(), '/');
      assert.equal(_ember['default'].$('.spec-reminder-item').length, 5);
    });
  });

  (0, _qunit.test)('clicking on an individual item', function (assert) {

    visit('/');
    click('.spec-reminder-item:first');

    andThen(function () {
      assert.equal(currentURL(), '/1');
      assert.equal(_ember['default'].$('.spec-reminder-item:first').text().trim(), _ember['default'].$('.spec-reminder-title').text().trim());
    });
  });

  (0, _qunit.test)('clicking on the ➕ button displays the form', function (assert) {

    visit('/');
    click('.add-reminder-button');

    andThen(function () {
      assert.equal(currentURL(), '/new');
      assert.equal(_ember['default'].$('.create-reminder-form').length, 1);
    });
  });

  (0, _qunit.test)('clicking on the edit button takes you to the :id/edit url', function (assert) {

    visit('/');
    click('.reminder-list-item:last');
    click('.edit-button');

    andThen(function () {
      assert.equal(currentURL(), '/5/edit');
      assert.equal(_ember['default'].$('.create-reminder-form').length, 1);
      assert.equal(_ember['default'].$('.reminder-revert-button').length, 1);
    });
  });

  (0, _qunit.test)('editing fields should show the revert button when changes are unsaved', function (assert) {

    visit('/');
    click('.reminder-list-item:last');

    andThen(function () {
      assert.equal(_ember['default'].$('.reminder-revert-button').length, 0);
    });

    click('.edit-button');
    fillIn('.reminder-title-input', 'New');

    andThen(function () {
      assert.equal(_ember['default'].$('.reminder-revert-button').length, 1);
    });
  });

  (0, _qunit.test)('editing should trigger warning icon when changes are unsaved', function (assert) {

    visit('/');
    click('.reminder-list-item:nth-child(5)');
    click('.edit-button');
    fillIn('.reminder-title-input', 'New');

    andThen(function () {
      click('.reminder-list-item:nth-child(5)');
    });

    andThen(function () {
      assert.equal(_ember['default'].$('.dirty-warning-icon:visible').length, 1);
    });
  });

  (0, _qunit.test)('has a search field', function (assert) {

    visit('/');

    andThen(function () {
      assert.equal(_ember['default'].$('.reminder-list-filter').length, 1);
    });
  });

  (0, _qunit.test)('search field finds case insensitive matches in the reminder-list titles', function (assert) {
    visit('/');

    click('.reminder-list-item:nth-child(5)');
    click('.edit-button');
    fillIn('.reminder-title-input', 'New1111111111111');
    click('.reminder-submit-button');

    andThen(function () {
      click('.reminder-list-item:nth-child(2)');
      click('.edit-button');
      fillIn('.reminder-title-input', 'neW1111111111111ton');
      click('.reminder-submit-button');
    });

    andThen(function () {
      click('.reminder-list-filter');
      fillIn('.reminder-list-filter', "new");
    });

    andThen(function () {
      assert.equal(_ember['default'].$('.reminder-list-item').length, 2);
    });
  });

  (0, _qunit.test)('clicking the delete button component', function (assert) {

    visit('/');
    click('.delete-button:last');

    andThen(function () {
      assert.equal(_ember['default'].$('.reminder-list-item').length, 4);
    });
  });
});
/* globals server */
define('remember/tests/acceptance/reminder-list-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/reminder-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/reminder-list-test.js should pass jshint.\nacceptance/reminder-list-test.js: line 3, col 16, \'skip\' is defined but never used.\n\n1 error');
  });
});
define('remember/tests/acceptance/reminder-list/edit-test', ['exports', 'qunit', 'remember/tests/helpers/module-for-acceptance'], function (exports, _qunit, _rememberTestsHelpersModuleForAcceptance) {

  (0, _rememberTestsHelpersModuleForAcceptance['default'])('Acceptance | reminder list/edit', {
    beforeEach: function beforeEach() {
      server.createList('reminder', 5);
    },
    afterEach: function afterEach() {
      server.shutdown();
    }
  });

  (0, _qunit.test)('visiting the "edit" route', function (assert) {
    visit('5/edit');

    andThen(function () {
      assert.equal(currentURL(), '5/edit');
    });
  });

  (0, _qunit.test)('editing a reminder', function (assert) {

    visit('5/edit');
    fillIn('.reminder-title-input', 'Some title');
    fillIn('.reminder-notes-input', 'Some notes');
    click('.reminder-submit-button');

    andThen(function () {
      assert.equal(Ember.$('.spec-reminder-title').text(), 'Some title');
      assert.equal(Ember.$('.reminder-detail-notes').text(), 'Some notes');
    });
  });

  (0, _qunit.test)('revert a reminder', function (assert) {

    visit('5/edit');
    fillIn('.reminder-title-input', 'Hey');
    fillIn('.reminder-notes-input', 'How are you?');
    click('.reminder-submit-button');

    andThen(function () {
      assert.equal(Ember.$('.spec-reminder-title').text(), 'Hey');
      assert.equal(Ember.$('.reminder-detail-notes').text(), 'How are you?');
    });

    andThen(function () {
      click('.edit-button');
      fillIn('.reminder-title-input', 'Some title');
      fillIn('.reminder-notes-input', 'Some notes');
      click('.reminder-revert-button');
      visit('5');
    });

    andThen(function () {
      assert.equal(Ember.$('.spec-reminder-title').text(), 'Hey');
      assert.equal(Ember.$('.reminder-detail-notes').text(), 'How are you?');
    });
  });
});
define('remember/tests/acceptance/reminder-list/edit-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/reminder-list/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/reminder-list/edit-test.js should pass jshint.\nacceptance/reminder-list/edit-test.js: line 6, col 5, \'server\' is not defined.\nacceptance/reminder-list/edit-test.js: line 9, col 5, \'server\' is not defined.\nacceptance/reminder-list/edit-test.js: line 29, col 18, \'Ember\' is not defined.\nacceptance/reminder-list/edit-test.js: line 30, col 18, \'Ember\' is not defined.\nacceptance/reminder-list/edit-test.js: line 42, col 18, \'Ember\' is not defined.\nacceptance/reminder-list/edit-test.js: line 43, col 18, \'Ember\' is not defined.\nacceptance/reminder-list/edit-test.js: line 55, col 18, \'Ember\' is not defined.\nacceptance/reminder-list/edit-test.js: line 56, col 18, \'Ember\' is not defined.\n\n8 errors');
  });
});
define('remember/tests/acceptance/reminder-list/new-test', ['exports', 'qunit', 'remember/tests/helpers/module-for-acceptance'], function (exports, _qunit, _rememberTestsHelpersModuleForAcceptance) {

  (0, _rememberTestsHelpersModuleForAcceptance['default'])('Acceptance | reminder list/new', {
    beforeEach: function beforeEach() {
      server.createList('reminder', 5);
    },
    afterEach: function afterEach() {
      server.shutdown();
    }
  });

  (0, _qunit.test)('visiting the "new" route', function (assert) {
    visit('/new');

    andThen(function () {
      assert.equal(currentURL(), '/new');
    });
  });

  (0, _qunit.test)('submitting a new reminder', function (assert) {

    visit('/new');
    fillIn('.reminder-title-input', 'Some title');
    fillIn('.reminder-notes-input', 'Some notes');
    click('.reminder-submit-button');

    andThen(function () {
      assert.equal(Ember.$('.spec-reminder-item').length, 6);
      assert.equal(Ember.$('.spec-reminder-item:last').text(), 'Some title');
    });
  });
});
define('remember/tests/acceptance/reminder-list/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | acceptance/reminder-list/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'acceptance/reminder-list/new-test.js should pass jshint.\nacceptance/reminder-list/new-test.js: line 6, col 5, \'server\' is not defined.\nacceptance/reminder-list/new-test.js: line 9, col 5, \'server\' is not defined.\nacceptance/reminder-list/new-test.js: line 29, col 18, \'Ember\' is not defined.\nacceptance/reminder-list/new-test.js: line 30, col 18, \'Ember\' is not defined.\n\n4 errors');
  });
});
define('remember/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('remember/tests/components/delete-button.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/delete-button.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-button.js should pass jshint.');
  });
});
define('remember/tests/controllers/reminder-list.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/reminder-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/reminder-list.js should pass jshint.');
  });
});
define('remember/tests/controllers/reminder-list/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/reminder-list/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/reminder-list/edit.js should pass jshint.');
  });
});
define('remember/tests/controllers/reminder-list/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/reminder-list/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/reminder-list/new.js should pass jshint.\ncontrollers/reminder-list/new.js: line 11, col 39, Missing semicolon.\n\n1 error');
  });
});
define('remember/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('remember/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('remember/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'remember/tests/helpers/start-app', 'remember/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _rememberTestsHelpersStartApp, _rememberTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _rememberTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _rememberTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('remember/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('remember/tests/helpers/resolver', ['exports', 'remember/resolver', 'remember/config/environment'], function (exports, _rememberResolver, _rememberConfigEnvironment) {

  var resolver = _rememberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _rememberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _rememberConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('remember/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('remember/tests/helpers/start-app', ['exports', 'ember', 'remember/app', 'remember/config/environment'], function (exports, _ember, _rememberApp, _rememberConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _rememberConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _rememberApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('remember/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('remember/tests/integration/components/delete-button-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('delete-button', 'Integration | Component | delete button', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 17
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['content', 'delete-button', ['loc', [null, [1, 0], [1, 17]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'delete-button', [], [], 0, null, ['loc', [null, [2, 4], [4, 22]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('remember/tests/integration/components/delete-button-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/delete-button-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-button-test.js should pass jshint.');
  });
});
define('remember/tests/integration/components/reminder-detail-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('reminder-detail', 'Integration | Component | reminder detail', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['content', 'reminder-detail', ['loc', [null, [1, 0], [1, 19]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'reminder-detail', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('remember/tests/integration/components/reminder-detail-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/reminder-detail-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/reminder-detail-test.js should pass jshint.');
  });
});
define('remember/tests/integration/components/reminder-item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('reminder-item', 'Integration | Component | reminder item', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 17
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['content', 'reminder-item', ['loc', [null, [1, 0], [1, 17]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'reminder-item', [], [], 0, null, ['loc', [null, [2, 4], [4, 22]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('remember/tests/integration/components/reminder-item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/reminder-item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/reminder-item-test.js should pass jshint.');
  });
});
define('remember/tests/models/reminder.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/reminder.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/reminder.js should pass jshint.');
  });
});
define('remember/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('remember/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('remember/tests/routes/reminder-list.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/reminder-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/reminder-list.js should pass jshint.');
  });
});
define('remember/tests/routes/reminder-list/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/reminder-list/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/reminder-list/edit.js should pass jshint.');
  });
});
define('remember/tests/routes/reminder-list/reminder-detail.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/reminder-list/reminder-detail.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/reminder-list/reminder-detail.js should pass jshint.');
  });
});
define('remember/tests/test-helper', ['exports', 'remember/tests/helpers/resolver', 'ember-qunit'], function (exports, _rememberTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_rememberTestsHelpersResolver['default']);
});
define('remember/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('remember/tests/transforms/date.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | transforms/date.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transforms/date.js should pass jshint.');
  });
});
define('remember/tests/unit/controllers/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:new', 'Unit | Controller | new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('remember/tests/unit/controllers/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-test.js should pass jshint.');
  });
});
define('remember/tests/unit/controllers/reminder-detail-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:reminder-detail', 'Unit | Controller | reminder detail', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('remember/tests/unit/controllers/reminder-detail-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/reminder-detail-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/reminder-detail-test.js should pass jshint.');
  });
});
define('remember/tests/unit/controllers/reminder-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:reminder-list', 'Unit | Controller | reminder list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('remember/tests/unit/controllers/reminder-list-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/reminder-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/reminder-list-test.js should pass jshint.');
  });
});
define('remember/tests/unit/models/reminder-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('reminder-list', 'Unit | Model | reminder list', {
    // Specify the other units that are required for this test.
    needs: ['model:reminder']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('remember/tests/unit/models/reminder-list-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/reminder-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/reminder-list-test.js should pass jshint.');
  });
});
define('remember/tests/unit/models/reminder-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('reminder', 'Unit | Model | reminder', {
    // Specify the other units that are required for this test.
    needs: ['model:reminder-list']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('remember/tests/unit/models/reminder-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/reminder-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/reminder-test.js should pass jshint.');
  });
});
define('remember/tests/unit/routes/reminder-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:reminder-list', 'Unit | Route | reminder list', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('remember/tests/unit/routes/reminder-list-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/reminder-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/reminder-list-test.js should pass jshint.');
  });
});
define('remember/tests/unit/routes/reminder-list/edit', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:reminder-detail/edit', 'Unit | Route | reminder detail/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('remember/tests/unit/routes/reminder-list/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/reminder-list/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/reminder-list/edit.js should pass jshint.');
  });
});
define('remember/tests/unit/routes/reminder-list/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:reminder-list/new', 'Unit | Route | reminder list/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('remember/tests/unit/routes/reminder-list/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/reminder-list/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/reminder-list/new-test.js should pass jshint.');
  });
});
define('remember/tests/unit/routes/reminder-list/reminder-detail-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:reminder-list/reminder-detail', 'Unit | Route | reminder list/reminder detail', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('remember/tests/unit/routes/reminder-list/reminder-detail-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/reminder-list/reminder-detail-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/reminder-list/reminder-detail-test.js should pass jshint.');
  });
});
define('remember/tests/unit/transforms/date-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('transform:date', 'Unit | Transform | date', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var transform = this.subject();
    assert.ok(transform);
  });
});
define('remember/tests/unit/transforms/date-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/transforms/date-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/date-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('remember/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
