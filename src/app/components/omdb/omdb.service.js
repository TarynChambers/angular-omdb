(function() {
  'use strict';

  angular
    .module('tz')
    .factory('omdb', omdb);

  /** @ngInject */
  function omdb($http) {
    var apiHost = 'http://www.omdbapi.com/?';

    var service = {
      seriesInfo: seriesInfo,
      listSeason: listSeason,
      getEpisode: getEpisode
    };

    return service;

    // get general info
    function seriesInfo(){
      return $http.get(apiHost + 'i=tt0052520&plot=full&r=json')
        .then(function (response) {
          return response.data;
        });
    }

    // get full seasons
    function listSeason(season){
      return $http.get(apiHost + 'i=tt0052520&Season=' + season)
        .then(function (response) {
          return response.data;
        });
    }

    // get full seasons
    function getEpisode(season, episode){
      return $http.get(apiHost + 'i=tt0052520&plot=full&r=json&Season=' + season + '&Episode=' + episode)
        .then(function (response) {
          return response.data;
        });
    }

  }
})();
