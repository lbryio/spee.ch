function ViewsConfig () {
  this.components = {};
  this.containers = {};
  this.pages = {};
  this.update = (config) => {
    if (!config) {
      return console.log('No components config received.');
    }
    const { components, containers, pages } = config;
    console.log('Configuring custom components ...');
    this.components = components;
    this.containers = containers;
    this.pages = pages;
  };
}

module.exports = new ViewsConfig();
