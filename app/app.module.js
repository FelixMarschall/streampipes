'use strict';

import angular from 'npm/angular';

import "jquery-ui";

import uiRouter from 'npm/angular-ui-router';

import spServices from './services/services.module';

import spAdd from './add/add.module';
import spConfiguration from './configuration/configuration.module';
import spCore from './core/core.module';
import spHome from './home/home.module';
import spCreate from './create/create.module';
import spDashboard from './dashboard/dashboard.module';
import spEditor from './editor/editor.module';
import spLayout from './layout/layout.module';
import spLogin from './login/login.module';
import spMyElements from './myelements/my-elements.module';
import spNotifications from './notifications/notifications.module';
import spOntology from './ontology/ontology.module';
import spPipelines from './pipelines/pipelines.module';
import spSensors from './sensors/sensors.module';
import spAppLinks from './applinks/applinks.module';
import spAppFileDownload from './app-file-download/app-file-download.module';
import spPipelineDetails from './pipeline-details/pipeline-details.module'

const MODULE_NAME = 'streamPipesApp';

export default angular
    .module(MODULE_NAME, [
        spServices,
        spAdd,
        spConfiguration,
        spCore,
        spHome,
        spCreate,
        spDashboard,
        spEditor,
        spLayout,
        spLogin,
        spMyElements,
        spNotifications,
        spOntology,
        spPipelines,
        spSensors,
        spAppLinks,
        spAppFileDownload,
        spPipelineDetails,
        uiRouter,
    ])
    .run(function ($rootScope, $location, restApi, authService, $state, $urlRouter, objectProvider) {
        var bypass;
        window.loading_screen.finish();
        if (!$location.path().startsWith("/login") && !$location.path().startsWith("/sso")) {
            restApi.configured().success(function (msg) {
                if (msg.configured) {
                    authService.authenticate;
                }
                else {
                    $rootScope.authenticated = false;
                    $state.go("setup");
                }
            });
        }


        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                var isLogin = toState.name === "login";
                var isSetup = toState.name === "setup";
                var isExternalLogin = (toState.name === "sso" || toState.name === "ssosuccess");
                var isRegister = toState.name === "register";
                if (isLogin || isSetup || isRegister || isExternalLogin) {
                    return;
                }
                else if ($rootScope.authenticated === false) {
                    event.preventDefault();
                    console.log("logging in event prevent");
                    $state.go('login');
                }

            })

        $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
            authService.authenticate;
        });
        $rootScope.state = new objectProvider.State();
        $rootScope.state.sources = false;
        $rootScope.state.sepas = false;
        $rootScope.state.actions = false;
        $rootScope.state.adjustingPipelineState = false;
        $rootScope.state.adjustingPipeline = {};

    }).config(function($mdThemingProvider) {

        $mdThemingProvider.definePalette('streamPipesPrimary', {
            '50': '304269',
            '100': '304269',
            '200': '304269',
            '300': '304269',
            '400': '304269',
            '500': '304269',
            '600': '304269',
            '700': '003B3D',
            '800': '0A3F54',
            '900': '0A3F54',
            'A100': '0A3F54',
            'A200': '0A3F54',
            'A400': '0A3F54',
            'A700': '0A3F54',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
        });

        $mdThemingProvider.definePalette('streamPipesAccent', {
            '50': 'DF5A49',
            '100': 'DF5A49',
            '200': '007F54',
            '300': '007F54',
            '400': '39B54A',
            '500': '45DA59',
            '600': '45DA59',
            '700': '45DA59',
            '800': '45DA59',
            '900': '39B54A',
            'A100': '39b54a',
            'A200': '39b54a',
            'A400': '39B54A',
            'A700': '39B54A',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('streamPipesPrimary')
            .accentPalette('streamPipesAccent')

    });
