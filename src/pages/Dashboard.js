import React from 'react';

// Class component with defaultProps (deprecated pattern in React 19)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null,
      loading: true,
    };
  }

  componentDidMount() {
    // Simulate data fetch
    setTimeout(() => {
      this.setState({
        stats: {
          totalRepos: 42,
          activeJobs: 7,
          completedToday: 15,
        },
        loading: false,
      });
    }, 100);
  }

  handleNavigateToSettings = () => {
    // v5 pattern: history prop injected via Route component prop
    this.props.history.push('/settings');
  };

  handleNavigateToUser = (userId) => {
    this.props.history.push(`/users/${userId}`);
  };

  render() {
    const { title, subtitle } = this.props;
    const { stats, loading } = this.state;

    if (loading) {
      return <div>Loading {title}...</div>;
    }

    return (
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {stats && (
          <ul>
            <li>Total Repos: {stats.totalRepos}</li>
            <li>Active Jobs: {stats.activeJobs}</li>
            <li>Completed Today: {stats.completedToday}</li>
          </ul>
        )}
        <button onClick={this.handleNavigateToSettings}>Go to Settings</button>
        <button onClick={() => this.handleNavigateToUser(1)}>View User 1</button>
      </div>
    );
  }
}

// defaultProps pattern (deprecated in React 19, removed from function components)
Dashboard.defaultProps = {
  title: 'Dashboard',
  subtitle: 'Overview of your dependency updates',
};

export default Dashboard;
