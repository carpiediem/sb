class CompileDirective {
    controller($compile) {
        'ngInject';

        this.$compile = $compile;
    }

    link(scope, element, attrs, ctrl) {
        scope.$watch(
            scope => scope.$eval(attrs.compile),
            value => {
                element.html(value);
                ctrl.$compile(element.contents())(scope);
            }
        );
    }
}

export default CompileDirective;