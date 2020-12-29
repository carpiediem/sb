class MarkdownController {
  constructor($rootScope, $parse, $timeout, $sce) {
    'ngInject';

    Object.assign(this, { $rootScope, $parse, $timeout, $sce });

    // Listen for new component data and render it
    this.listener = $rootScope.$on('render', (event, entity) => {
      $timeout(() => this.render(event, entity.component), 0);
    });
  }

  $onDestroy() {
    this.listener();
  }

  render(event, component) {
    this.docs = $sce.trustAsHtml(component.docs);
  }
}

export default MarkdownController;
