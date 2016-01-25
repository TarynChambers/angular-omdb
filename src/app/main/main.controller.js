(function() {
  'use strict';

  angular
    .module('tz')
    .controller('MainController', MainController)
    .controller('SeasonController', SeasonController)
    .controller('EpisodeController', EpisodeController);

  /** @ngInject */
  function MainController(toastr, omdb) {
    var vm = this;

    // get general series info
    omdb.seriesInfo()
      .then(function (data) {
        vm.list = data;
      });

    vm.classAnimation = '';
    vm.creationDate = 1452536355396;
    vm.showToastr = showToastr;


    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    vm.seasons = [
      {
        "id": 1,
        "name": "Season 1"
      },
      {
        "id": 2,
        "name": "Season 2"
      },
      {
        "id": 3,
        "name": "Season 3"
      },
      {
        "id": 4,
        "name": "Season 4"
      },
      {
        "id": 5,
        "name": "Season 5"
      }
    ]

  }

  function SeasonController($stateParams, omdb) {
    var vm = this;

    // get list of episodes with details for each season using passed seasonId from the menu items
    omdb.listSeason($stateParams.seasonId)
      .then(function (data) {
        vm.season = data;
      });
  }

  function EpisodeController($stateParams, omdb) {
    var vm = this;

    // get episode details
    omdb.getEpisode($stateParams.seasonId, $stateParams.episodeId)
      .then(function (data) {
        vm.episode = data;
      });
  }


})();
