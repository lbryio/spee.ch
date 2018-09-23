import React, { Component } from 'react';
import * as THREE from 'three';
const STLLoader = require('three-stl-loader')(THREE);

class ThreeScene extends Component {
  componentDidMount () {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

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

    // this.renderer.render(this.scene, this.camera);

    // "Material" to use when rendering
    const material = new THREE.MeshPhongMaterial({
      color    : '#ffffff',
      specular : 0x111111,
      shininess: 200,
    });

    // Declare a new file to reader to read the file as a data url. Then use that to preview the STL
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const loader = new STLLoader();
      loader.load(e.target.result, (geometry) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -0.37, -0.6);
        mesh.rotation.set(-Math.PI / 2, 0, 0);
        mesh.scale.set(2, 2, 2);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.renderer.render(this.scene, this.camera);
      });
    };
    reader.readAsDataURL(this.props.file);
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
