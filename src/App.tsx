import React from 'react';
import Clock from './components/Clock';
import './App.scss';

type State = {
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, State> {
  private currentName?: string;

  state = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  getRandomName = () => {
    this.currentName = this.state.clockName;
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  };

  componentDidMount() {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({
        hasClock: false,
      });
    });

    document.addEventListener('click', () => {
      this.setState({
        hasClock: true,
      });
    });

    window.setInterval(() => {
      this.setState({
        clockName: this.getRandomName(),
      });
    }, 3300);
  }

  componentDidUpdate() {
    if (this.state.hasClock) {
      // eslint-disable-next-line no-console
      console.log(
        `Renamed from ${this.currentName} to Clock-${this.state.clockName}`,
      );
    }
  }

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock name={clockName} />}
      </div>
    );
  }
}
