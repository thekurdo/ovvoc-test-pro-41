const assert = require('assert');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('  PASS: ' + name);
    passed++;
  } catch (err) {
    console.log('  FAIL: ' + name);
    console.log('        ' + err.message);
    failed++;
  }
}

console.log('ovvoc-test-pro-41: React 18 + React Router 5 multi-package update tests\n');

// -- React Router v5 API tests --

test('Switch is exported from react-router-dom', function() {
  const rrd = require('react-router-dom');
  assert.ok(rrd.Switch, 'Switch should be exported (removed in v6, replaced by Routes)');
  assert.strictEqual(typeof rrd.Switch, 'function');
});

test('useHistory is exported from react-router-dom', function() {
  const rrd = require('react-router-dom');
  assert.ok(rrd.useHistory, 'useHistory should be exported (replaced by useNavigate in v6)');
  assert.strictEqual(typeof rrd.useHistory, 'function');
});

test('withRouter HOC is exported from react-router-dom', function() {
  const rrd = require('react-router-dom');
  assert.ok(rrd.withRouter, 'withRouter should be exported (removed entirely in v6)');
  assert.strictEqual(typeof rrd.withRouter, 'function');
});

test('Redirect is exported from react-router-dom', function() {
  const rrd = require('react-router-dom');
  assert.ok(rrd.Redirect, 'Redirect should be exported (replaced by Navigate in v6)');
  assert.strictEqual(typeof rrd.Redirect, 'function');
});

test('useRouteMatch is exported from react-router-dom', function() {
  const rrd = require('react-router-dom');
  assert.ok(rrd.useRouteMatch, 'useRouteMatch should be exported (removed in v6)');
  assert.strictEqual(typeof rrd.useRouteMatch, 'function');
});

test('NavLink supports activeClassName prop via propTypes or internal handling', function() {
  const rrd = require('react-router-dom');
  assert.ok(rrd.NavLink, 'NavLink should be exported');
  assert.ok(typeof rrd.NavLink === 'function' || typeof rrd.NavLink === 'object', 'NavLink should be a component (function or forwardRef object)');
  // In v5, NavLink is a forwardRef (typeof === 'object') with propTypes including activeClassName
  if (rrd.NavLink.propTypes) { assert.ok(rrd.NavLink.propTypes.activeClassName, 'NavLink should have activeClassName propType'); }
});

// -- React 18 API tests --

test('React.forwardRef works and returns a valid component type', function() {
  const React = require('react');
  const Inner = function TestComponent(props, ref) {
    return null;
  };
  const Wrapped = React.forwardRef(Inner);
  assert.ok(Wrapped, 'forwardRef should return a component');
  assert.ok(Wrapped.$$typeof, 'Should have $$typeof symbol');
  assert.ok(
    String(Wrapped.$$typeof).includes('forward_ref') ||
    Wrapped.$$typeof === Symbol.for('react.forward_ref'),
    'Should be a forward_ref type'
  );
});

test('defaultProps pattern works on class components', function() {
  const React = require('react');

  class TestDashboard extends React.Component {
    render() {
      return null;
    }
  }
  TestDashboard.defaultProps = {
    title: 'Dashboard',
    subtitle: 'Overview',
  };

  assert.deepStrictEqual(TestDashboard.defaultProps, {
    title: 'Dashboard',
    subtitle: 'Overview',
  });
});

test('defaultProps pattern works on forwardRef components', function() {
  const React = require('react');

  const Inner = function(props, ref) {
    return null;
  };
  const Wrapped = React.forwardRef(Inner);
  Wrapped.defaultProps = {
    defaultRole: 'viewer',
  };

  assert.deepStrictEqual(Wrapped.defaultProps, {
    defaultRole: 'viewer',
  });
});

test('React.createRef creates a ref object', function() {
  const React = require('react');
  const ref = React.createRef();
  assert.ok(ref, 'createRef should return an object');
  assert.strictEqual(ref.current, null, 'Initial ref.current should be null');
  assert.ok(ref.hasOwnProperty('current'), 'Should have own current property');
});

test('React version is 18.x', function() {
  const React = require('react');
  assert.ok(React.version.startsWith('18.'), 'Expected React 18.x, got ' + React.version);
});

test('react-router-dom version is 5.x', function() {
  const pkg = require('react-router-dom/package.json');
  assert.ok(pkg.version.startsWith('5.'), 'Expected react-router-dom 5.x, got ' + pkg.version);
});

// -- Source file validation --

test('App.js uses Switch, useHistory, Redirect, withRouter, useRouteMatch', function() {
  const fs = require('fs');
  const appSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'App.js'), 'utf8');
  assert.ok(appSrc.includes('Switch'), 'App.js should import Switch');
  assert.ok(appSrc.includes('useHistory'), 'App.js should use useHistory');
  assert.ok(appSrc.includes('Redirect'), 'App.js should use Redirect');
  assert.ok(appSrc.includes('withRouter'), 'App.js should use withRouter');
  assert.ok(appSrc.includes('useRouteMatch'), 'App.js should use useRouteMatch');
});

test('Dashboard.js uses class component with defaultProps and history.push', function() {
  const fs = require('fs');
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', 'Dashboard.js'), 'utf8');
  assert.ok(src.includes('extends React.Component'), 'Should be a class component');
  assert.ok(src.includes('defaultProps'), 'Should use defaultProps');
  assert.ok(src.includes('history.push'), 'Should use history.push for navigation');
});

test('UserProfile.js uses useParams, useHistory, and forwardRef', function() {
  const fs = require('fs');
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', 'UserProfile.js'), 'utf8');
  assert.ok(src.includes('useParams'), 'Should use useParams');
  assert.ok(src.includes('useHistory'), 'Should use useHistory');
  assert.ok(src.includes('React.forwardRef'), 'Should use React.forwardRef');
});

test('Settings.js uses withRouter HOC and createRef', function() {
  const fs = require('fs');
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'pages', 'Settings.js'), 'utf8');
  assert.ok(src.includes('withRouter'), 'Should import withRouter');
  assert.ok(src.includes('React.createRef'), 'Should use React.createRef');
  assert.ok(src.includes('match.params'), 'Should access match.params (v5 pattern)');
  assert.ok(src.includes('export default withRouter'), 'Should export wrapped with withRouter');
});

test('NavLink.js uses activeClassName and exact props', function() {
  const fs = require('fs');
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'NavLink.js'), 'utf8');
  assert.ok(src.includes('activeClassName'), 'Should use activeClassName (removed in v6)');
  assert.ok(src.includes('exact'), 'Should use exact prop (replaced by end in v6)');
});

// -- Summary --

console.log('\nResults: ' + passed + ' passed, ' + failed + ' failed out of ' + (passed + failed) + ' tests');

if (failed > 0) {
  process.exit(1);
}
