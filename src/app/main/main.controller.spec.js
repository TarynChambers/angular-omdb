(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var toastr;
    var omdb;
    var $httpBackend;

    beforeEach(module('tz'));
    beforeEach(inject(function(_$controller_, _toastr_, _omdb_, _$httpBackend_) {

      spyOn(_toastr_, 'info').and.callThrough();
      spyOn(_omdb_, 'seriesInfo').and.callThrough();
      vm = _$controller_('MainController');
      toastr = _toastr_;
      omdb = _omdb_;
      $httpBackend = _$httpBackend_;

    }));

    it('should have a timestamp creation date', function() {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });

    it('should show a Toastr info and stop animation when invoke showToastr()', function() {
      vm.showToastr();
      expect(toastr.info).toHaveBeenCalled();
      expect(vm.classAnimation).toEqual('');
    });

    it('should make a call to the omdb service', function() {
      omdb.seriesInfo();
      expect(omdb.seriesInfo).toHaveBeenCalled();
    });

    it('should fetch series details', function(){
      $httpBackend.expectGET('http://www.omdbapi.com/?i=tt0052520&plot=full&r=json').respond(200);
      $httpBackend.flush();
    });


  });
})();
