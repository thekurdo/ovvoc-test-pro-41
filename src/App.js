import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import NavLinkBar from './components/NavLink';

// Auth guard using Redirect (React Router v5 pattern)
function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

// Nested routes using useRouteMatch (v5 pattern)
function ProjectSection() {
  const match = useRouteMatch();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h2>Projects</h2>
      <button onClick={goBack}>Go Back</button>
      <Switch>
        <Route exact path={`${match.path}`}>
          <p>Select a project</p>
        </Route>
        <Route path={`${match.path}/:projectId`}>
          <ProjectDetail />
        </Route>
      </Switch>
    </div>
  );
}

// Component using useHistory for programmatic navigation
function ProjectDetail() {
  const history = useHistory();

  const handleComplete = () => {
    history.push('/dashboard');
  };

  return (
    <div>
      <h3>Project Detail</h3>
      <button onClick={handleComplete}>Back to Dashboard</button>
    </div>
  );
}

// withRouter HOC usage (removed in v6)
class LoginPageBase extends React.Component {
  handleLogin = () => {
    // v5 pattern: history injected via withRouter
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={this.handleLogin}>Log In</button>
      </div>
    );
  }
}

const LoginPage = withRouter(LoginPageBase);

function App() {
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <NavLinkBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/users/:id" component={UserProfile} />
        <Route path="/settings" component={Settings} />
        <Route path="/projects" component={ProjectSection} />
        <Route path="*">
          <div>
            <h2>404 — Page Not Found</h2>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
