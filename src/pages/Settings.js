import React from 'react';
import { withRouter } from 'react-router-dom';

// Class component wrapped with withRouter HOC (removed in v6)
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      saved: false,
      formData: {
        autoUpdate: true,
        notifyOnFail: true,
        branch: 'main',
      },
    };
  }

  componentDidMount() {
    // Access route params via withRouter-injected props (v5 pattern)
    const { match } = this.props;
    if (match.params && match.params.section) {
      this.scrollToSection(match.params.section);
    }
  }

  scrollToSection = (section) => {
    if (this.formRef.current) {
      // Scroll logic placeholder
      console.log(`Scrolling to section: ${section}`);
    }
  };

  handleSave = () => {
    this.setState({ saved: true });
    // Navigate back after save using withRouter-injected history
    setTimeout(() => {
      this.props.history.push('/dashboard');
    }, 1000);
  };

  handleCancel = () => {
    // withRouter pattern: history.goBack()
    this.props.history.goBack();
  };

  handleChange = (field, value) => {
    this.setState((prev) => ({
      formData: {
        ...prev.formData,
        [field]: value,
      },
    }));
  };

  render() {
    const { saved, formData } = this.state;
    // Access location via withRouter-injected props
    const { location } = this.props;

    return (
      <div ref={this.formRef}>
        <h1>Settings</h1>
        <p>Current path: {location.pathname}</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>
              Auto-update dependencies:
              <input
                type="checkbox"
                checked={formData.autoUpdate}
                onChange={(e) => this.handleChange('autoUpdate', e.target.checked)}
              />
            </label>
          </div>

          <div>
            <label>
              Notify on failure:
              <input
                type="checkbox"
                checked={formData.notifyOnFail}
                onChange={(e) => this.handleChange('notifyOnFail', e.target.checked)}
              />
            </label>
          </div>

          <div>
            <label>
              Target branch:
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => this.handleChange('branch', e.target.value)}
              />
            </label>
          </div>

          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </form>

        {saved && <p>Settings saved! Redirecting...</p>}
      </div>
    );
  }
}

// withRouter HOC wrapping (removed in React Router v6)
export default withRouter(Settings);
