import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component {
  componentDidMount () {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    console.log('width: ' + width);
    console.log('height: ' + height);

    // ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      35,
      width / height,
      0.1,
      1000
    );
    this.camera = new THREE.PerspectiveCamera(35, width / height, 1, 15);
    this.camera.position.set(3, 0.15, 3);

    // ADD SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#ff0000');

    // ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    this.mount.appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);
  }

  componentWillUnmount () {
    this.mount.removeChild(this.renderer.domElement);
  }

  render () {
    return (
      <div
        style={{ width: '100%', minHeight: '525px' }}
        ref={(mount) => { this.mount = mount }}
      />
    );
  }
}

export default ThreeScene;
