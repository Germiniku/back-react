import React from 'react';
import Particle from 'zhihu-particle';

export default class Background extends React.Component {
  private background: HTMLElement | null = document.createElement('div');
  componentDidMount() {
    new Particle(this.background as HTMLElement, {
      interactive: true,
      density: 'low'
    });
  }
  render() {
    return (
      <div
        ref={background => {
          this.background = background;
        }}
        className="background"
      />
    );
  }
}
