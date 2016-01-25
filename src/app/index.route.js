(function() {
  'use strict';

  angular
    .module('tz')
    .config(routerConfig);


  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/index.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('home.detail', {
        url: 'season/{seasonId:[0-9]{1,4}}',
        templateUrl: 'app/main/season.detail.html',
        controller: 'SeasonController',
        controllerAs: 'vm'
      })
      .state('home.episode', {
        url: 'season/{seasonId}/{episodeId}',
        templateUrl: 'app/main/episode.detail.html',
        controller: 'EpisodeController',
        controllerAs: 'vm'
      })
      .state('home.summary', {
        url: 'season/{seasonId}/episode/{episodeId}',
        templateUrl: 'app/main/episode.summary.html',
        controller: function($log, $stateParams, myOmdb){
          var vm = this;
          vm.episode = myOmdb.data;

        },
        controllerAs: 'vm',
        resolve: {
          myOmdb: function($http, getSeason, getEpisode){
            return $http({method: 'GET', url: 'http://www.omdbapi.com/?i=tt0052520&plot=full&r=json&Season=' + getSeason + '&Episode=' + getEpisode})},
          getSeason: function($stateParams){
            return $stateParams.seasonId;
          },
          getEpisode: function($stateParams){
            return $stateParams.episodeId;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
