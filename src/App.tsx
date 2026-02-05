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

  leftClick = () => {
    this.setState({
      hasClock: true,
    });
  };

  rightClick = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({
      hasClock: false,
    });
  };

  componentDidMount() {
    document.addEventListener('contextmenu', this.rightClick);
    document.addEventListener('click', this.leftClick);

    window.setInterval(() => {
      this.setState({
        clockName: this.getRandomName(),
      });
    }, 3300);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.rightClick);
    document.removeEventListener('click', this.leftClick);
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
