import * as angular from 'angular';

import './core/core.module';
import './services/services.module';
import './modules/modules.module';
import './components/components.module';
import './directives/directives.module';

angular.module('sb', ['sb.core', 'sb.modules', 'sb.directives', 'sb.services', 'sb.components']);
