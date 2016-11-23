import angular from 'angular';
import 'angular-ui-router';
import previewComponent from './preview/preview.component';
import storyListComponent from './storyList/storyList.component';
import templateComponent from './template/template.component';
import modelComponent from './model/model.component'
import interceptorComponent from './interceptor/interceptor.component'

const module = angular.module('sb.components', ['ui.router',]);

module.component('preview', previewComponent);
module.component('storyList', storyListComponent);
module.component('model', modelComponent);
module.component('view', templateComponent);
module.component('interceptor', interceptorComponent);

module.run((storeService) => {
    storeService.component({
        title: 'preview',
        template: '<preview flex layout="column"></preview>'
    });
    storeService.component({
        title: 'model',
        template: '<model flex layout="column"></model>'
    });
    storeService.component({
        title: 'view',
        template: '<view flex layout="column"></view>'
    });
    storeService.component({
        title: 'XHR',
        template: '<interceptor flex layout="column"></interceptor>'
    });
});

export default module;
