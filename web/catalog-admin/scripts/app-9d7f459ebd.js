(function() {
  'use strict';

  angular
    .module('sdaAdminWeb', [
      'ngAnimate',
      'ngCookies',
      // 'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'toastr',
      'ngMaterial',
      'slideToggle',
      'trcWorks',
      'trcTasks'
    ]);

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('workEditor', workEditorDirective);


  function workEditorDirective() {
    WorkEditorController.$inject = ["$scope", "worksRepo", "_"];
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/work-editor/work-editor.html',
      scope: {
        work: '=ngModel'
      },
      controller: WorkEditorController,
      controllerAs: 'vm'
    };

    return directive;


    function WorkEditorController($scope, worksRepo, _) {
      var vm = this;

      vm.editions = [];

      vm.createEdition = createEdition;
      vm.deleteEdition = deleteEdition;

      activate();

      function activate() {
        $scope.work.editions.forEach(function (edition) {
          vm.editions.push({
            model: edition,
            focused: false
          });
        });
      }

      function createEdition() {
        var edition = worksRepo.createEdition();
        edition.titles = _.cloneDeep($scope.work.titles);
        edition.authors = _.cloneDeep($scope.work.authors);
        edition.otherAuthors = _.cloneDeep($scope.work.otherAuthors);

        $scope.work.editions.push(edition);
        vm.editions.push({
          model: edition,
          focused: true
        });
      }

      function deleteEdition(ix) {
        vm.editions.splice(ix, 1);
        $scope.work.editions.splice(ix, 1);
      }
    }
  }
})();

(function () {
  'use strict';

  workEditorItemDirective.$inject = ["$log"];
  angular
    .module('sdaAdminWeb')
    .directive('workEditorItem', workEditorItemDirective);


  function workEditorItemDirective($log) {
    WorkEditorItemController.$inject = ["$scope", "worksRepo"];
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/work-editor/work-editor-item.html',
      link: linkFunc,
      scope: {
        id: '=id'
      },
      controller: WorkEditorItemController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc($scope) {
      if (!$scope.id) {
        $log.error('missing required attribute "id"');
      }
    }


    function WorkEditorItemController($scope, worksRepo) {
      var vm = this;

      vm.loaded = false;

      activate();

      function activate() {
        if ($scope.id) {
          vm.work = worksRepo.get($scope.id);
          vm.work.$promise.then(function () {
            vm.loaded = true;
          });
        }
      }
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('volumeEditor', volumeEditorDirective);


  function volumeEditorDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/volume-editor/volume-editor.html',
      scope: {
        volume: '=ngModel'
      }
    };

    return directive;
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('titleEditor', titleEditorDirective);


  function titleEditorDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/title-editor/title-editor.html',
      scope: {
        title: '=ngModel'
      }
    };

    return directive;
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('summaryEditor', summaryEditorDirective);


  function summaryEditorDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/summary-editor/summary-editor.html',
      scope: {
        summary: '=ngModel'
      }
    };

    return directive;
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('publicationInfoEditor', publicationInfoEditorDirective);


  function publicationInfoEditorDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/publication-info-editor/publication-info-editor.html',
      scope: {
        pubInfo: '=ngModel'
      }
    };

    return directive;
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('editionEditor', editionEditorDirective);


  function editionEditorDirective() {
    EditionEditorController.$inject = ["$scope", "worksRepo", "_"];
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/edition-editor/edition-editor.html',
      scope: {
        edition: '=ngModel'
      },
      controller: EditionEditorController,
      controllerAs: 'vm'
    };

    return directive;


    function EditionEditorController($scope, worksRepo, _) {
      var vm = this;

      vm.volumes = [];

      vm.createVolume = createVolume;
      vm.deleteVolume = deleteVolume;

      activate();

      function activate() {
        $scope.edition.volumes.forEach(function (volume) {
          vm.volumes.push({
            model: volume,
            focused: false
          });
        });
      }

      function createVolume() {
        var volume = worksRepo.createVolume();
        volume.titles = _.cloneDeep($scope.edition.titles);
        volume.authors = _.cloneDeep($scope.edition.authors);
        volume.otherAuthors = _.cloneDeep($scope.edition.otherAuthors);
        volume.publicationInfo = _.cloneDeep($scope.edition.publicationInfo);

        $scope.edition.volumes.push(volume);
        vm.volumes.push({
          model: volume,
          focused: true
        });
      }

      function deleteVolume(ix) {
        vm.volumes.splice(ix, 1);
        $scope.edition.volumes.splice(ix, 1);
      }
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('dateEditor', dateEditorDirective);


  function dateEditorDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/date-editor/date-editor.html',
      scope: {
        date: '=ngModel'
      }
    };

    return directive;
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('copyEditor', copyEditorDirective);


  function copyEditorDirective() {
    CopyEditorController.$inject = ["$scope"];
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/copy-editor/copy-editor.html',
      scope: {
        copy: '=ngModel'
      },
      controller: CopyEditorController,
      controllerAs: 'vm'
    };

    return directive;


    function CopyEditorController($scope) {
      var vm = this;

      vm.refHandlers = {};
      vm.setProperties = parseProperties;

      activate();

      function activate() {
        addHandler(HathiTrustRefHandler());
        addHandler(GoogleBooksRefHandler());
      }

      function addHandler(handler) {
        vm.refHandlers[handler.id] = handler;
      }

      function parseProperties(type, url) {
        if (vm.refHandlers[type]) {
          $scope.copy.properties = vm.refHandlers[type](url);
        }

        $scope.copyForm.url.$setValidity(type, $scope.copy.properties != null);
      }
    }
  }

  function HathiTrustRefHandler() {
    function handle(url) {
      var parsed = parseUrl(url);
      if (!parsed) {
        return null;
      }

      var id, seq;

      switch (parsed.hostname) {
        case 'babel.hathitrust.org':
          id = parsed.query.id;
          seq = parsed.query.seq;
          break;

        case 'hdl.handle.net':
          id = parsed.path.substr(parsed.path.lastIndexOf('/') + 1);

          if (!parsed.query.urlappend) {
            break;
          }

          var subquery = parseQueryString(parsed.query.urlappend);
          if (!subquery) {
            break;
          }
          seq = subquery.seq;
          break;
      }

      if (!id) {
        return null;
      }

      return {
        htid: id,
        seq: seq
      };
    }

    handle.id = 'hathitrust';
    handle.display = 'HathiTrust';

    return handle;
  }

  function GoogleBooksRefHandler() {
    function handle(url) {
      var parsed = parseUrl(url);
      if (!parsed) {
        return null;
      }

      switch (parsed.hostname) {
        case 'books.google.com':
          var id = parsed.query.id;
          var section = parsed.query.printsec;
          var page = parsed.query.pg;
          break;
      }

      if (!id) {
        return null;
      }

      return {
        id: id,
        section: section,
        page: page
      };
    }

    handle.id = 'googlebooks';
    handle.display = 'Google Books';

    return handle;
  }

  /**
   * Parses a URL string into its components
   *
   * @param  {string} url
   * @return {URL}
   */
  function parseUrl(url) {
    if (!url) {
      return null;
    }

    var parser = document.createElement('a');
    parser.href = url;

    return {
      toString: function() {
        return url;
      },
      protocol: parser.protocol,
      host: parser.host,
      hostname: parser.hostname,
      port: parser.port,
      path: parser.pathname,
      query: parseQueryString(parser.search),
      fragment: parser.hash
    };
  }

  /**
   * Parses a query string into key/value pairs
   *
   * @param {string} query
   * @return {object.<string,any>}
   */
  function parseQueryString(query, sep) {
    if (!query || !angular.isString(query)) {
      return {};
    }

    // remove leading '?'
    if (query[0] === '?') {
      query = query.substr(1);
    }

    // attempt to auto-detect separator
    if (!sep) {
      // auto-detection "bitmask"
      // 0 = none detected -- prefer '&'
      // 1 = only ';' detected -- use it
      // 2 = only '&' detected -- use it
      // 3 = both detected -- prefer '&'
      var flags = (query.indexOf(';') >= 0 ? 1 : 0) + (query.indexOf('&') >= 0 ? 2 : 0);
      sep = flags === 1 ? ';' : '&';
    }

    var parsed = {};

    var kvpairs = query.split(sep);
    kvpairs.forEach(function (pair) {
      var ix = pair.indexOf('=');
      var key = pair;
      var value = null;

      if (!key) {
        return;
      }

      if (ix >= 0) {
        key = pair.substr(0, ix);
        value = pair.substr(ix + 1);
      }

      try {
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
      } catch (URIError) {
        return;
      }

      // TODO: handle key array/map notation

      if (parsed.hasOwnProperty(key)) {
        // convert repeated keys into an array
        if (angular.isArray(parsed[key])) {
          parsed[key].push(value);
        } else {
          parsed[key] = [parsed[key], value];
        }
      } else {
        parsed[key] = value;
      }
    });

    return parsed;
  }

})();

(function () {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .directive('authorRefEditor', authorRefEditorDirective);


  function authorRefEditorDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/bulk/components/author-ref-editor/author-ref-editor.html',
      scope: {
        ref: '=ngModel'
      }
    };

    return directive;
  }

})();

(function () {
  'use strict';

  EditWorkController.$inject = ["$state", "$stateParams", "worksRepo", "$mdDialog", "$mdToast"];
  angular
    .module('sdaAdminWeb')
    .controller('ShowWorkController', EditWorkController);


  function EditWorkController($state, $stateParams, worksRepo, $mdDialog, $mdToast) {
    var vm = this;

    vm.loading = true;
    vm.work = null;
    vm.title = null;

    vm.addCopy = addCopy;
    vm.editCopy = editCopy;
    vm.deleteCopy = deleteCopy;

    activate();

    function activate() {
      vm.work = worksRepo.get($stateParams.workId);

      vm.work.$promise.then(function () {
        vm.bcTitle = worksRepo.getTitle(vm.work.titles, ['short', 'canonical', 'bibliographic']);
        vm.title = worksRepo.getTitle(vm.work.titles, ['bibliographic', 'canonical', 'short']);

        vm.loading = false;
      });
    }

    function addCopy($event) {
      var copy = {};
      editCopy(copy, $event).then(function () {
        vm.work.copies.push(copy);
      });
    }

    function editCopy(copy, $event) {
      var dialog = {
        targetEvent: $event,
        templateUrl: 'app/work/copy-edit-dialog.html',
        locals: {
          // create a copy for manipulation
          copy: angular.copy(copy)
        },
        controller: 'CopyEditDialogController',
        controllerAs: 'vm'
      };

      var dialogPromise = $mdDialog.show(dialog);

      dialogPromise.then(function (updatedCopy) {
        // copy updates back to original only after dialog is positively dismised (i.e. not canceled)
        angular.extend(copy, updatedCopy);

        save();
      });

      return dialogPromise;
    }

    function deleteCopy(copy, $event) {
      var confirm = $mdDialog.confirm()
        .targetEvent($event)
        .title('Confirm Deletion')
        .textContent('Are you sure you want to delete this copy?')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm)
        .then(function () {
          var ix = vm.work.copies.indexOf(copy);
          vm.work.copies.splice(ix, 1);

          save();
        });
    }

    function save() {
      var savePromise = worksRepo.save(vm.work);

      savePromise.then(function () {
        var toast = $mdToast.simple()
          .textContent('Saved')
          .position('bottom right');

        $mdToast.show(toast);
      });
    }
  }

})();

(function () {
  'use strict';

  EditWorkController.$inject = ["$state", "$stateParams", "worksRepo"];
  angular
    .module('sdaAdminWeb')
    .controller('EditWorkController', EditWorkController);


  function EditWorkController($state, $stateParams, worksRepo) {
    var vm = this;

    vm.loading = true;

    vm.work = worksRepo.get($stateParams.id);
    vm.work.$promise.then(function () {
      vm.loading = false;
    });

    vm.save = save;
    vm.delete = deleteWork;

    function save() {
      worksRepo.save(vm.work);
    }

    function deleteWork() {
      var promise = worksRepo.delete(vm.work.id);

      promise.then(function () {
        $state.go('work-new');
      });
    }
  }

})();

(function () {
  'use strict';

  ShowVolumeController.$inject = ["$state", "$stateParams", "worksRepo", "_", "$mdDialog", "$mdToast"];
  angular
    .module('sdaAdminWeb')
    .controller('ShowVolumeController', ShowVolumeController);


  function ShowVolumeController($state, $stateParams, worksRepo, _, $mdDialog, $mdToast) {
    var vm = this;

    vm.loading = true;
    vm.work = null;
    vm.workTitle = null;
    vm.edition = null;
    vm.volume = null;
    vm.title = null;

    vm.addCopy = addCopy;
    vm.editCopy = editCopy;
    vm.deleteCopy = deleteCopy;

    activate();

    function activate() {
      vm.work = worksRepo.get($stateParams.workId);

      vm.work.$promise.then(function () {
        vm.workTitle = worksRepo.getTitle(vm.work.titles, ['short', 'canonical', 'bibliographic']);

        vm.edition = _.find(vm.work.editions, { id: $stateParams.editionId });
        if (!vm.edition) {
          throw new Error('unable to find edition ' + $stateParams.editionId);
        }

        vm.volume = _.find(vm.edition.volumes, { id: $stateParams.volumeId });
        if (!vm.volume) {
          throw new Error('unable to find volume ' + $stateParams.volumeId);
        }

        vm.title = worksRepo.getTitle(vm.volume.titles, ['bibliographic', 'canonical', 'short']);

        vm.loading = false;
      });
    }

    function addCopy($event) {
      var copy = {};
      editCopy(copy, $event).then(function () {
        vm.volume.copies.push(copy);
      });
    }

    function editCopy(copy, $event) {
      var dialog = {
        targetEvent: $event,
        templateUrl: 'app/work/copy-edit-dialog.html',
        locals: {
          // create a copy for manipulation
          copy: angular.copy(copy)
        },
        controller: 'CopyEditDialogController',
        controllerAs: 'vm'
      };

      var dialogPromise = $mdDialog.show(dialog);

      dialogPromise.then(function (updatedCopy) {
        // copy updates back to original only after dialog is positively dismised (i.e. not canceled)
        angular.extend(copy, updatedCopy);

        save();
      });

      return dialogPromise;
    }

    function deleteCopy(copy, $event) {
      var confirm = $mdDialog.confirm()
        .targetEvent($event)
        .title('Confirm Deletion')
        .textContent('Are you sure you want to delete this copy?')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm)
        .then(function () {
          var ix = vm.volume.copies.indexOf(copy);
          vm.volume.copies.splice(ix, 1);

          save();
        });
    }

    function save() {
      var savePromise = worksRepo.save(vm.work);

      savePromise.then(function () {
        var toast = $mdToast.simple()
          .textContent('Saved')
          .position('bottom right');

        $mdToast.show(toast);
      });
    }
  }

})();

(function () {
  'use strict';

  ShowEditionController.$inject = ["$state", "$stateParams", "worksRepo", "_", "$mdDialog", "$mdToast"];
  angular
    .module('sdaAdminWeb')
    .controller('ShowEditionController', ShowEditionController);


  function ShowEditionController($state, $stateParams, worksRepo, _, $mdDialog, $mdToast) {
    var vm = this;

    vm.loading = true;
    vm.work = null;
    vm.workTitle = null;
    vm.edition = null;
    vm.title = null;

    vm.addCopy = addCopy;
    vm.editCopy = editCopy;
    vm.deleteCopy = deleteCopy;

    activate();

    function activate() {
      vm.work = worksRepo.get($stateParams.workId);

      vm.work.$promise.then(function () {
        vm.workTitle = worksRepo.getTitle(vm.work.titles, ['short', 'canonical', 'bibliographic']);

        vm.edition = _.find(vm.work.editions, { id: $stateParams.editionId });
        if (!vm.edition) {
          throw new Error('unable to find edition ' + $stateParams.editionId);
        }

        vm.title = worksRepo.getTitle(vm.edition.titles, ['bibliographic', 'canonical', 'short']);

        vm.loading = false;
      });
    }

    function addCopy($event) {
      var copy = {};
      editCopy(copy, $event).then(function () {
        vm.edition.copies.push(copy);
      });
    }

    function editCopy(copy, $event) {
      var dialog = {
        targetEvent: $event,
        templateUrl: 'app/work/copy-edit-dialog.html',
        locals: {
          // create a copy for manipulation
          copy: angular.copy(copy)
        },
        controller: 'CopyEditDialogController',
        controllerAs: 'vm'
      };

      var dialogPromise = $mdDialog.show(dialog);

      dialogPromise.then(function (updatedCopy) {
        // copy updates back to original only after dialog is positively dismised (i.e. not canceled)
        angular.extend(copy, updatedCopy);

        save();
      });

      return dialogPromise;
    }

    function deleteCopy(copy, $event) {
      var confirm = $mdDialog.confirm()
        .targetEvent($event)
        .title('Confirm Deletion')
        .textContent('Are you sure you want to delete this copy?')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm)
        .then(function () {
          var ix = vm.edition.copies.indexOf(copy);
          vm.edition.copies.splice(ix, 1);

          save();
        });
    }

    function save() {
      var savePromise = worksRepo.save(vm.work);

      savePromise.then(function () {
        var toast = $mdToast.simple()
          .textContent('Saved')
          .position('bottom right');

        $mdToast.show(toast);
      });
    }
  }

})();

(function () {
  'use strict';

  CopyEditDialogController.$inject = ["$scope", "$mdDialog", "copy"];
  angular
    .module('sdaAdminWeb')
    .controller('CopyEditDialogController', CopyEditDialogController);


  function CopyEditDialogController($scope, $mdDialog, copy) {
    var vm = this;

    vm.copy = copy;

    vm.close = close;
    vm.cancel = cancel;

    function close() {
      $mdDialog.hide(vm.copy);
    }

    function cancel() {
      $mdDialog.cancel();
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('trcWorks', [
      'ngResource'
    ]);

})();

(function () {
  'use strict';

  angular
    .module('trcWorks')
    .provider('worksRepo', worksRepoProvider);

  /**
   * This functionality is already being implemented as a standalone trc-biblio module. The code is
   * used here as an interim until the Bower build/dependency workflow has been finalized.
   *
   * @return {angular.provider}
   */
  function worksRepoProvider() {
    var provider = {};
    provider.url = '/api/works';
    provider.$get = worksRepoFactory;
    return provider;

    /** @ngInejct */
    function worksRepoFactory($resource, _) {
      var restResource = $resource(provider.url + '/:id', { id: '@id' }, {
        update: {
          method: 'PUT'
        }
      });

      var repo = {};
      repo.getAll = findAll;
      repo.search = search;
      repo.get = findById;
      repo.create = create;
      repo.createEdition = createEdition;
      repo.createVolume = createVolume;
      repo.save = save;
      repo.delete = deleteWork;
      repo.getTitle = getTitleByTypePreference;
      return repo;

      /**
       * Retrieves a listing of all works
       *
       * @return {WorkProxy[]}
       */
      function findAll() {
        return search('');
      }

      /**
       * Search for works by query
       *
       * @return {SearchResultSet}
       */
      function search(query) {
        return restResource.get({ q: query, max: 50 });
      }

      /**
       * Retrieves a work object by identifier.
       *
       * A proxy object will be returned immediately, and its properties will be populated after the
       * request succeds. If fine-grained asynchronous handling, etc. is required, the request's
       * promis is available on Work.$promise.
       *
       * @param {string} id
       * @return {Work}
       */
      function findById(id) {
        if (angular.isUndefined(id)) {
          throw new TypeError('No ID provided to find work by ID');
        }

        var work = restResource.get({ id: id });

        work.$promise.then(adaptWork);

        return work;
      }

      /**
       * Creates a new work instance
       *
       * @return {Work}
       */
      function create() {
        var work = new restResource();
        return adaptWork(work);
      }

      /**
       * Creates a new edition instance
       *
       * @return {Edition}
       */
      function createEdition() {
        var edition = {};
        return adaptEdition(edition);
      }

      /**
       * Creates a new volume instance
       *
       * @return {Volume}
       */
      function createVolume() {
        var volume = {};
        return adaptVolume(volume);
      }

      /**
       * Saves a work instance back to the server
       *
       * @param {Work} work
       */
      function save(work) {
        if (!(work instanceof restResource)) {
          throw new Error('work was not created by this repo');
        }

        // TODO: the server should return the created/updated model; ngResource automatically updates the model to reflect any server changes (e.g. setting IDs for the work/edtions/volumes/copies).

        var proxy = work.id
            ? restResource.update({ id: work.id }, work)
            : restResource.save(null, work);

        return proxy.$promise.then(function (data) {
          return data.id;
        });
      }

      /**
       * Deletes a work instance from the server
       *
       * @param  {string} id
       */
      function deleteWork(workId) {
        var dataItem = restResource.delete({ id: workId });
        return dataItem.$promise;
      }

      /**
       * Ensure that aggregate fields common to all work/edition/volume entities exist and are formatted correctly
       *
       * @param  {Work|Edition|Volume} entity
       * @return {Work|Edition|Volume}
       */
      function adaptCommon(entity) {
        if (!entity.titles) {
          entity.titles = [];
        } else {
          entity.titles.forEach(function (title) {
            title.type = title.type.toLowerCase();
          });
        }

        if (!entity.authors) {
          entity.authors = [];
        } else {
          entity.authors.forEach(function (author) {
            author.role = author.role.toLowerCase();
          });
        }

        if (!entity.otherAuthors) {
          entity.otherAuthors = [];
        } else {
          entity.otherAuthors.forEach(function (author) {
            author.role = author.role.toLowerCase();
          });
        }

        if (!entity.copies) {
          entity.copies = [];
        }

        return entity;
      }

      /**
       * Ensure that work aggregate fields exist and are formatted correctly
       *
       * @param  {Work} work
       * @return {Work}
       */
      function adaptWork(work) {
        adaptCommon(work);

        if (!work.editions) {
          work.editions = [];
        } else {
          work.editions.forEach(adaptEdition);
        }

        return work;
      }

      /**
       * Ensure that edition aggregate fields exist and are formatted correctly
       *
       * @param  {Edition} edition
       * @return {Edition}
       */
      function adaptEdition(edition) {
        adaptCommon(edition);

        if (!edition.volumes) {
          edition.volumes = [];
        } else {
          edition.volumes.forEach(adaptVolume);
        }

        return edition;
      }

      /**
       * Ensure that volume aggregate fields exist and are formatted correctly
       *
       * @param  {Volume} volume
       * @return {Volume}
       */
      function adaptVolume(volume) {
        adaptCommon(volume);

        return volume;
      }

      /**
       * Retrieves the first available title of the given type or falsey if no title can be found.
       * If multiple types are given, returns the title corresponding to the first type for which a title is found.
       *
       * @param  {Title[]}         titles
       * @param  {string|string[]} types
       * @return {Title}
       */
      function getTitleByTypePreference(titles, types) {
        if (!angular.isArray(types)) {
          types = [types];
        }

        return types.reduce(function (found, type) {
          return found || _.find(titles, { type: type });
        }, null);
      }
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('trcTasks', [
      'ngResource'
    ]);

})();

/**
 * @typedef {object} Workflow
 * @property {string} id
 * @property {string} label
 * @property {string} description
 * @property {object.<string, WorkflowStage>} stages
 * @property {string} status
 */

/**
 * @typedef {object} WorkflowStage
 * @property {string} id
 * @property {string} label
 * @property {string} description
 * @property {boolean} isFinal
 * @property {WorkflowStageTransition[]} transitions
 */

/**
 * @typedef {object} WorkflowStageTransition
 * @property {string} sourceStage
 * @property {string} targetStage
 * @property {string} label
 */

/**
 * @typedef {object} Worklist
 * @property {string} groupId
 * @property {string} label
 * @property {integer} itemCount
 * @property {integer} start
 * @property {integer} max
 * @property {WorkItem[]} items
 */

/**
 * @typedef {object} WorkItem
 * @property {string} itemId
 * @property {string} type
 * @property {string} entityId
 * @property {string} label
 * @property {object.<string,string>} properties
 * @property {string} stage
 * @property {string} task
 */

(function () {
  'use strict';

  angular
    .module('trcTasks')
    .provider('tasksRepo', tasksRepoProvider);

  /**
   * @return {angular.provider}
   */
  function tasksRepoProvider() {
    var provider = {};
    provider.url = '/api/tasks';
    provider.$get = tasksRepoFactory;
    return provider;

    /** @ngInejct */
    function tasksRepoFactory($resource) {
      var workflowResource = $resource(provider.url + '/:taskId/workflow', { taskId: 'copies' });
      var itemResource = $resource(provider.url + '/:taskId/items/:itemId', { taskId: 'copies', itemId: '@itemId' });

      var repo = {};
      repo.get = getTask;
      repo.getItems = getItems;
      repo.transition = transition;
      return repo;

      /**
       * Retrieves a listing of all tasks
       *
       * @param  {string} [taskId=copies]
       * @return {GroupedTaskList}
       */
      function getTask(taskId) {
        taskId = taskId || 'copies';

        var workflow = workflowResource.get({ taskId: taskId });

        var task = {
          $promise: workflow.$promise.then(function () {
            return task;
          }),
          workflow: workflow,
          getItems: function (stageId, options) {
            return getItems(taskId, stageId, options);
          }
        };

        return task;
      }

      /**
       * Gets items from the task endpoint for a given stage
       *
       * @param  {string}  [taskId=copies]  Task ID
       * @param  {string}  stageId          Workflow stage for which to get items
       * @param  {object}  options
       * @param  {integer} [options.start]  Starting index
       * @param  {integer} [options.max]    Maximum number of items to fetch per page
       * @return {Worklist}
       */
      function getItems(taskId, stageId, options) {
        options = options || {};
        return itemResource.get({
          taskId: taskId,
          stage: stageId,
          start: options.start,
          max: options.max
        });
      }

      /**
       * Transition an item from its current stage to a target stage
       *
       * @param  {WorkItem}                item   Work item instance
       * @param  {WorkflowStageTransition} transition Target workflow stage
       * @return {WorkItem}                       Updated work item instance
       */
      function transition(item, transition) {
        if (item.stage !== transition.sourceStage) {
          throw new Error('Transition (' + transition.sourceStage + ' -> ' + transition.targetStage + ') is not valid for item currently in stage ' + item.stage);
        }

        var result = itemResource.save({
          itemId: item.itemId
        }, {
          stage: transition.targetStage,
          // NOTE comments are not saved yet
          comments: null
        });

        // propagate updates to the original item
        result.$promise.then(function (resp) {
          angular.extend(item, resp);
        });

        return result;
      }
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('slideToggle', []);

})();

(function () {
   'use strict';

   angular
      .module('slideToggle')
      .directive('slideToggle', slideToggle);


   function slideToggle() {
      var directive = {
         restrict: 'A',
         scope: {
            active: '=slideToggle'
         },
         link: linkFunc
      };

      return directive;

      function linkFunc(scope, el, attr) {
         var duration = parseInt(attr.slideToggleDuration) || 200;
         scope.$watch('active', function (active) {
            if (active) {
               el.stop().slideDown(duration);
            } else {
               el.stop().slideUp(duration);
            }
         })
      }
   }

})();

(function() {
  'use strict';

  MainController.$inject = ["worksRepo", "$stateParams", "$mdSidenav", "_"];
  angular
    .module('sdaAdminWeb')
    .controller('MainController', MainController);


  function MainController(worksRepo, $stateParams, $mdSidenav, _) {
    var vm = this;

    vm.loading = false;
    vm.searchQuery = '';

    vm.openMenu = openMenu;
    vm.search = _.debounce(search, 300);

    activate();

    function activate() {
      if ($stateParams.q) {
        vm.searchQuery = $stateParams.q;
        search(vm.searchQuery);
      }
    }

    function openMenu() {
      $mdSidenav('left').toggle();
    }

    function search(query) {
      vm.loading = true;
      vm.results = worksRepo.search(query);
      vm.results.$promise.then(function () {
        vm.loading = false;
      })
    }
  }
})();

(function () {
  'use strict';

  NewWorkController.$inject = ["worksRepo"];
  angular
    .module('sdaAdminWeb')
    .controller('NewWorkController', NewWorkController);


  function NewWorkController(worksRepo) {
    var vm = this;

    vm.work = worksRepo.create();

    vm.save = save;

    function save() {
      worksRepo.save(vm.work);
    }
  }

})();

(function () {
  'use strict';

  BulkEditorController.$inject = ["$mdSidenav", "worksRepo", "tasksRepo", "_"];
  angular
    .module('sdaAdminWeb')
    .controller('BulkEditorController', BulkEditorController);


  function BulkEditorController($mdSidenav, worksRepo, tasksRepo, _) {
    var vm = this;

    vm.loaded = false;
    vm.worklists = {};
    vm.task = null;

    vm.openMenu = openMenu;
    vm.focusItem = focusItem;
    vm.search = _.debounce(search, 200);
    vm.transition = transitionItem;

    activate();

    function activate() {
      vm.task = tasksRepo.get();

      vm.task.$promise.then(function (task) {
        angular.forEach(task.workflow.stages, function (stage) {
          fetchStage(task, stage.id);
        });
        vm.loaded = true;
      });
    }

    function openMenu() {
      $mdSidenav('left').toggle();
    }

    function focusItem(item) {
      if (item.focused) {
        item.focused = false;
      } else {
        angular.forEach(vm.worklists, function (worklist) {
          worklist.items.forEach(function (item) {
            item.focused = false;
          });
        });

        item.focused = true;
      }
    }

    function search(query) {
      vm.loaded = false;
      var results = worksRepo.search(query);
      results.$promise.then(function (works) {
        vm.worklists[0].items = works;
        vm.loaded = true;
      });
    }

    function transitionItem(item, transition) {
      item.focused = false;
      var updatedItem = tasksRepo.transition(item, transition);
      updatedItem.$promise.then(function () {
        // remove from current group
        var worklist = vm.worklists[transition.sourceStage];
        _.remove(worklist.items, function (i) {
          return i.itemId === item.itemId;
        });

        // remove entry from page if there are no items to display
        if (worklist.items.length === 0) {
          vm.worklists[transition.sourceStage] = null;
        }

        // refresh target group
        // fetchStage(vm.task, transition.targetStage);

        // add item to target group instead
        if (vm.worklists[transition.targetStage]) {
          vm.worklists[transition.targetStage].items.unshift(updatedItem);
        } else {
          fetchStage(vm.task, transition.targetStage);
        }
      });
    }

    function fetchStage(task, stageId) {
      var group = task.getItems(stageId);
      group.$promise.then(function (group) {
        if (group.items.length > 0) {
          vm.worklists[stageId] = group;
        }
      });
    }
  }

})();

(function() {
  'use strict';

  runBlock.$inject = ["$log"];
  angular
    .module('sdaAdminWeb')
    .run(runBlock);


  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();

(function() {
  'use strict';

  routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  angular
    .module('sdaAdminWeb')
    .config(routerConfig);


  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/?q',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('root.work', {
        url: 'works/:workId',
        views: {
          main: {
            templateUrl: 'app/work/work.html',
            controller: 'ShowWorkController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.edition', {
        url: 'works/:workId/editions/:editionId',
        views: {
          main: {
            templateUrl: 'app/work/edition.html',
            controller: 'ShowEditionController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.volume', {
        url: 'works/:workId/editions/:editionId/volumes/:volumeId',
        views: {
          main: {
            templateUrl: 'app/work/volume.html',
            controller: 'ShowVolumeController',
            controllerAs: 'vm'
          }
        }
      })

      // .state('bulk', {
      //   url: '/b',
      //   templateUrl: 'app/bulk/bulk.html',
      //   controller: 'BulkEditorController',
      //   controllerAs: 'vm'
      // })
      // .state('work-new', {
      //   url: '/work',
      //   templateUrl: 'app/bulk/work-new.html',
      //   controller: 'NewWorkController',
      //   controllerAs: 'vm'
      // })
      // .state('work-edit', {
      //   url: '/work/:id',
      //   templateUrl: 'app/bulk/work-edit.html',
      //   controller: 'EditWorkController',
      //   controllerAs: 'vm'
      // });

    $urlRouterProvider.otherwise('/');
  }

})();

/* global _:false, moment:false */
(function() {
  'use strict';

  angular
    .module('sdaAdminWeb')
    .constant('_', _)
    .constant('moment', moment);

})();

(function() {
  'use strict';

  config.$inject = ["$logProvider", "toastrConfig", "$mdThemingProvider", "tasksRepoProvider", "worksRepoProvider"];
  angular
    .module('sdaAdminWeb')
    .config(config);


  function config($logProvider, toastrConfig, $mdThemingProvider, tasksRepoProvider, worksRepoProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $mdThemingProvider.definePalette('darkBrown', {
      '50': '#595c59',
      '100': '#4c4f4c',
      '200': '#404240',
      '300': '#333533',
      '400': '#272827',
      '500': '#1a1b1a',
      '600': '#0d0e0d',
      '700': '#010101',
      '800': '#000000',
      '900': '#000000',
      'A100': '#e0f0e0',
      'A200': '#565956',
      'A400': '#7e837e',
      'A700': '#000000',

      contrastDefaultColor: 'light',
      contrastDarkColors: ['A100']
    });

    $mdThemingProvider.definePalette('copper', {
      '50': '#d4b190',
      '100': '#cca47e',
      '200': '#c5976b',
      '300': '#be8a59',
      '400': '#b67e47',
      '500': '#a47140',
      '600': '#926439',
      '700': '#7f5832',
      '800': '#6d4b2b',
      '900': '#5b3e23',
      'A100': '#dcc3ab',
      'A200': '#a47140',
      'A400': '#48321c',
      'A700': '#272927',

      contrastDefaultColor: 'light',
      contrastDarkColors: ['50', '100', '200', 'A100']
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('darkBrown')
      .accentPalette('copper');


    tasksRepoProvider.url = '/api/catalog/v1/tasks';
    worksRepoProvider.url = '/api/catalog/works';
  }

})();

angular.module("sdaAdminWeb").run(["$templateCache", function($templateCache) {$templateCache.put("app/bulk/bulk.html","<md-content flex=\"\" layout=\"column\"><md-toolbar><div class=\"md-toolbar-tools\"><md-button class=\"md-accent md-icon-button\" ng-click=\"vm.openMenu()\" title=\"toggle menu\" hide-gt-sm=\"\"><md-icon>menu</md-icon></md-button><img class=\"logo\" src=\"assets/images/sda-logo-light.png\"><h2><span>Works Copy Editor</span></h2><span flex=\"\"></span> <img class=\"ox-brand\" src=\"assets/images/ox-brand-rect.png\" alt=\"University of Oxford\" hide-xs=\"\"></div></md-toolbar><md-content flex=\"\" layout=\"row\"><md-sidenav md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\">Left Sidebar</md-sidenav><md-content flex=\"\" layout=\"column\"><md-content flex=\"\" layout=\"column\"><md-input-container><label>Search</label><md-icon>search</md-icon><input type=\"search\" ng-model=\"searchQuery\" ng-change=\"vm.search(searchQuery)\"></md-input-container><md-content flex=\"\"><div layout=\"row\" layout-align=\"center center\" ng-if=\"!vm.loaded\"><md-progress-circular md-mode=\"indeterminate\"></md-progress-circular></div><md-list ng-if=\"vm.loaded\"><div ng-repeat=\"stage in vm.task.workflow.stages\" ng-if=\"vm.worklists[stage.id]\"><md-subheader>{{stage.label}}</md-subheader><div class=\"item\" layout=\"column\" ng-repeat=\"item in vm.worklists[stage.id].items\" ng-class=\"{done: item.done, focused: item.focused}\" ng-mouseover=\"item.hover = true\" ng-mouseout=\"item.hover = false\"><div class=\"item-heading\"><md-button class=\"md-no-style\" ng-click=\"vm.focusItem(item)\" ng-bind-html=\"item.label\"></md-button><div class=\"actions\" layout=\"row\" layout-align=\"end center\"><md-button ng-repeat=\"transition in stage.transitions\" class=\"md-secondary\" ng-click=\"vm.transition(item, transition, $parent.$index)\" ng-show=\"item.hover || item.focused\"><span>{{transition.label}}</span></md-button></div></div><md-content slide-toggle=\"item.focused\"><work-editor-item id=\"item.entityId\" ng-if=\"item.focused\"></work-editor-item></md-content></div></div></md-list></md-content></md-content></md-content></md-content></md-content>");
$templateCache.put("app/bulk/work-new.html","<div layout=\"column\" flex=\"\"><work-editor ng-model=\"vm.work\"></work-editor><div layout=\"row\" layout-align=\"end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.save()\">Save</md-button></div></div>");
$templateCache.put("app/main/main.html","<md-content flex=\"\" layout=\"column\"><md-toolbar><div class=\"md-toolbar-tools\"><md-button class=\"md-accent md-icon-button\" ng-click=\"vm.openMenu()\" title=\"toggle menu\" hide-gt-sm=\"\"><md-icon>menu</md-icon></md-button><img class=\"logo\" src=\"assets/images/sda-logo-light.png\"><h2><span>Works Copy Editor</span></h2><span flex=\"\"></span> <img class=\"ox-brand\" src=\"assets/images/ox-brand-rect.png\" alt=\"University of Oxford\" hide-xs=\"\"></div></md-toolbar><md-content flex=\"\" layout=\"row\"><md-sidenav md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\" ui-view=\"sidebar\" layout=\"column\"><form layout=\"row\"><md-input-container flex=\"\"><label for=\"searchQuery\">Search</label><md-icon>search</md-icon><input type=\"search\" name=\"searchQuery\" id=\"searchQuery\" ng-model=\"vm.searchQuery\" ng-change=\"vm.search(vm.searchQuery)\" required=\"\"></md-input-container></form><md-content><div ng-if=\"vm.loading\" layout=\"row\" layout-align=\"center\"><md-progress-circular md-mode=\"indeterminate\"></md-progress-circular></div><md-list ng-if=\"!vm.loading &amp;&amp; vm.results &amp;&amp; vm.results.items.length > 0\"><md-list-item ng-repeat=\"work in vm.results.items\" ui-sref=\"root.work({workId: work.id})\"><div class=\"md-list-item-text\"><span>{{work.label}}</span></div></md-list-item></md-list></md-content></md-sidenav><md-content flex=\"\" layout=\"column\" ui-view=\"main\"></md-content></md-content></md-content>");
$templateCache.put("app/work/copy-edit-dialog.html","<md-dialog flex=\"50\"><md-toolbar><div class=\"md-toolbar-tools\"><h3>Digital Copy Editor</h3><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"vm.cancel()\"><md-icon>close</md-icon></md-button></div></md-toolbar><form ng-submit=\"vm.close()\"><md-dialog-content><div class=\"md-dialog-content\"><copy-editor ng-model=\"vm.copy\"></copy-editor></div></md-dialog-content><md-dialog-actions><md-button ng-click=\"vm.cancel()\">Cancel</md-button><md-button class=\"md-primary\" type=\"submit\">Done</md-button></md-dialog-actions></form></md-dialog>");
$templateCache.put("app/work/edition.html","<nav layout=\"row\" layout-padding=\"\"><ol class=\"breadcrumbs\" flex=\"\"><li><a ui-sref=\"root.work({workId: vm.work.id})\">{{vm.workTitle.title}}{{vm.workTitle.title && vm.workTitle.subtitle ? \': \' : \'\'}}{{vm.workTitle.subTitle}}</a></li><li>{{vm.edition.editionName}}</li></ol></nav><div layout=\"row\" layout-padding=\"\"><div layout=\"column\" flex=\"60\"><section class=\"content citation\"><div layout=\"row\"><h2 class=\"content-heading\">Bibliographic Information</h2></div><p><span class=\"authors\" ng-if=\"vm.edition.authors && vm.edition.authors.length > 0\"><span class=\"author\" ng-repeat=\"author in vm.edition.authors\">{{author.lastName}}{{author.lastName && author.firstName ? \', \' : \'\'}}{{author.firstName}}.</span></span> <span class=\"title\" ng-if=\"vm.title\">{{vm.title.title}}{{vm.title.title && vm.title.subtitle ? \': \' : \'\'}}{{vm.title.subtitle}}.</span></p></section><section class=\"content summary\"><div layout=\"row\"><h2 class=\"content-heading\">Summary</h2></div><p ng-if=\"vm.edition.summary\" ng-bind-html=\"vm.edition.summary\"></p></section><section class=\"content volumes\"><div layout=\"row\"><h2 class=\"content-heading\">Volumes</h2></div><md-list><md-list-item ng-repeat=\"volume in vm.edition.volumes\" ui-sref=\"root.volume({workId: vm.work.id, editionId: vm.edition.id, volumeId: volume.id})\"><span>Volume {{volume.volumeNumber}}</span></md-list-item></md-list></section></div><div layout=\"column\" flex=\"40\"><section class=\"content references\"><div layout=\"row\"><h2 class=\"content-heading\">References</h2></div><p>Coming soon</p></section><section class=\"content copies\"><div layout=\"row\"><h2 class=\"content-heading\">Digital Copies</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"vm.addCopy($event)\"><md-icon>add</md-icon></md-button></div><md-list><md-list-item ng-repeat=\"copy in vm.edition.copies\" ng-click=\"vm.editCopy(copy, $event)\"><span>{{copy.title}}</span><md-button class=\"md-secondary md-icon-button md-warn\" ng-click=\"vm.deleteCopy(copy, $event)\"><md-icon>delete</md-icon></md-button></md-list-item></md-list></section></div></div>");
$templateCache.put("app/work/volume.html","<nav layout=\"row\" layout-padding=\"\"><ol class=\"breadcrumbs\" flex=\"\"><li><a ui-sref=\"root.work({workId: vm.work.id})\">{{vm.workTitle.title}}{{vm.workTitle.title && vm.workTitle.subtitle ? \': \' : \'\'}}{{vm.workTitle.subTitle}}</a></li><li><a ui-sref=\"root.edition({workId: vm.work.id, editionId: vm.edition.id})\">{{vm.edition.editionName}}</a></li><li>Volume {{vm.volume.volumeNumber}}</li></ol></nav><div layout=\"row\" layout-padding=\"\"><div layout=\"column\" flex=\"60\"><section class=\"content citation\"><div layout=\"row\"><h2 class=\"content-heading\">Bibliographic Information</h2></div><p><span class=\"authors\" ng-if=\"vm.volume.authors && vm.volume.authors.length > 0\"><span class=\"author\" ng-repeat=\"author in vm.volume.authors\">{{author.lastName}}{{author.lastName && author.firstName ? \', \' : \'\'}}{{author.firstName}}.</span></span> <span class=\"title\" ng-if=\"vm.title\">{{vm.title.title}}{{vm.title.title && vm.title.subtitle ? \': \' : \'\'}}{{vm.title.subtitle}}.</span></p></section><section class=\"content summary\"><div layout=\"row\"><h2 class=\"content-heading\">Summary</h2></div><p ng-if=\"vm.volume.summary\" ng-bind-html=\"vm.volume.summary\"></p></section></div><div layout=\"column\" flex=\"40\"><section class=\"content references\"><div layout=\"row\"><h2 class=\"content-heading\">References</h2></div><p>Coming soon</p></section><section class=\"content copies\"><div layout=\"row\"><h2 class=\"content-heading\">Digital Copies</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"vm.addCopy($event)\"><md-icon>add</md-icon></md-button></div><md-list><md-list-item ng-repeat=\"copy in vm.volume.copies\" ng-click=\"vm.editCopy(copy, $event)\"><span>{{copy.title}}</span><md-button class=\"md-secondary md-icon-button md-warn\" ng-click=\"vm.deleteCopy(copy, $event)\"><md-icon>delete</md-icon></md-button></md-list-item></md-list></section></div></div>");
$templateCache.put("app/work/work-edit.html","<div layout=\"column\" flex=\"\"><div layout=\"row\" layout-align=\"center center\" ng-if=\"vm.loading\"><md-progress-circular md-mode=\"indeterminate\"></md-progress-circular></div><work-editor ng-if=\"!vm.loading\" ng-model=\"vm.work\"></work-editor><div layout=\"row\" layout-align=\"end\"><md-button class=\"md-raised md-warn\" ng-click=\"vm.delete()\">Delete</md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.save()\">Save</md-button></div></div>");
$templateCache.put("app/work/work.html","<nav layout=\"row\" layout-padding=\"\"><ol class=\"breadcrumbs\" flex=\"\"><li>{{vm.bcTitle.title}}{{vm.bcTitle && vm.bcTitle.subtitle ? \': \' : \'\'}}{{vm.bcTitle.subTitle}}</li></ol></nav><div layout=\"row\" layout-padding=\"\"><div layout=\"column\" flex=\"60\"><section class=\"content citation\"><div layout=\"row\"><h2 class=\"content-heading\">Bibliographic Information</h2></div><p><span class=\"authors\" ng-if=\"vm.work.authors && vm.work.authors.length > 0\"><span class=\"author\" ng-repeat=\"author in vm.work.authors\">{{author.lastName}}{{author.lastName && author.firstName ? \', \' : \'\'}}{{author.firstName}}.</span></span> <span class=\"title\" ng-if=\"vm.title\">{{vm.title.title}}{{vm.title.title && vm.title.subtitle ? \': \' : \'\'}}{{vm.title.subtitle}}.</span></p></section><section class=\"content summary\"><div layout=\"row\"><h2 class=\"content-heading\">Summary</h2></div><p ng-if=\"vm.work.summary\" ng-bind-html=\"vm.work.summary\"></p></section><section class=\"content editions\"><div layout=\"row\"><h2 class=\"content-heading\">Editions</h2></div><md-list><md-list-item ng-repeat=\"edition in vm.work.editions\" ui-sref=\"root.edition({workId: vm.work.id, editionId: edition.id})\"><span>{{edition.editionName}}</span></md-list-item></md-list></section></div><div layout=\"column\" flex=\"40\"><section class=\"content references\"><div layout=\"row\"><h2 class=\"content-heading\">Relationships</h2></div><p>Coming soon</p></section><section class=\"content copies\"><div layout=\"row\"><h2 class=\"content-heading\">Digital Copies</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"vm.addCopy($event)\"><md-icon>add</md-icon></md-button></div><md-list><md-list-item ng-repeat=\"copy in vm.work.copies\" ng-click=\"vm.editCopy(copy, $event)\"><span>{{copy.title}}</span><md-button class=\"md-secondary md-icon-button md-warn\" ng-click=\"vm.deleteCopy(copy, $event)\"><md-icon>delete</md-icon></md-button></md-list-item></md-list></section></div></div>");
$templateCache.put("app/bulk/components/author-ref-editor/author-ref-editor.html","<div layout=\"row\"><md-input-container><label>role</label><md-select ng-model=\"ref.role\" required=\"\"><md-option value=\"author\">author</md-option><md-option value=\"editor\">editor</md-option><md-option value=\"translator\">translator</md-option><md-option value=\"other\">other</md-option></md-select></md-input-container><md-input-container flex=\"\"><label>first name</label> <input type=\"text\" ng-model=\"ref.firstName\"></md-input-container><md-input-container flex=\"\"><label>last name</label> <input type=\"text\" ng-model=\"ref.lastName\"></md-input-container></div>");
$templateCache.put("app/bulk/components/copy-editor/copy-editor.html","<ng-form name=\"copyForm\" layout=\"column\" flex=\"\"><md-input-container><label for=\"title\">Title</label> <input type=\"text\" name=\"title\" id=\"title\" ng-model=\"copy.title\"></md-input-container><div layout=\"row\"><md-input-container><label for=\"type\">Type</label><md-select name=\"type\" id=\"type\" ng-model=\"copy.type\" required=\"\" ng-change=\"vm.setProperties(copy.type, copyUrl)\"><md-option ng-repeat=\"handler in vm.refHandlers\" value=\"{{handler.id}}\">{{handler.display}}</md-option></md-select></md-input-container><md-input-container flex=\"\"><label for=\"url\">URL</label> <input type=\"url\" name=\"url\" id=\"url\" ng-model=\"copyUrl\" ng-change=\"vm.setProperties(copy.type, copyUrl)\"></md-input-container></div><summary-editor ng-model=\"copy.summary\" flex=\"\"></summary-editor><md-input-container><label for=\"rights\">Description of Rights</label> <input type=\"text\" name=\"rights\" id=\"rights\" ng-model=\"copy.rights\"></md-input-container></ng-form>");
$templateCache.put("app/bulk/components/date-editor/date-editor.html","<div layout=\"row\"><md-input-container flex=\"\"><label>date</label> <input type=\"text\" ng-model=\"date.description\"></md-input-container><md-input-container flex=\"\"><label>ISO-8601 date</label> <input type=\"datetime\" ng-model=\"date.calendar\"></md-input-container></div>");
$templateCache.put("app/bulk/components/edition-editor/edition-editor.html","<div layout=\"row\"><md-input-container flex=\"\"><label>edition name</label> <input type=\"text\" ng-model=\"edition.editionName\" required=\"\"></md-input-container></div><section class=\"publication\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Publication Information</h2></div></md-toolbar><publication-info-editor ng-model=\"edition.publicationInfo\" flex=\"\"></publication-info-editor></section><section class=\"titles\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Titles</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"edition.titles.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"title\" layout=\"row\" ng-repeat=\"title in edition.titles\"><title-editor ng-model=\"title\" flex=\"\"></title-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"edition.titles.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"authors\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Authors</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"edition.authors.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"author\" layout=\"row\" ng-repeat=\"author in edition.authors\"><author-ref-editor ng-model=\"author\" flex=\"\"></author-ref-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"edition.authors.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"authors other-authors\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Other Authors</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"edition.otherAuthors.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"author other-author\" layout=\"row\" ng-repeat=\"author in edition.otherAuthors\"><author-ref-editor ng-model=\"author\" flex=\"\"></author-ref-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"edition.otherAuthors.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"summary\"><h2>Summary</h2><summary-editor ng-model=\"edition.summary\" flex=\"\"></summary-editor></section><section class=\"volumes\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Volumes</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"vm.createVolume()\"><md-icon>add</md-icon></md-button></div></md-toolbar><md-whiteframe class=\"volume\" layout=\"column\" layout-margin=\"\" ng-repeat=\"volume in vm.volumes\" ng-class=\"{\'md-whiteframe-2dp\': !volume.focused, \'md-whiteframe-8dp\': volume.focused}\"><h3 layout=\"row\"><div flex=\"\" layout=\"row\" layout-align=\"start center\" ng-click=\"volume.focused = !volume.focused\"><md-icon>{{ edition.focused ? \'expand_less\' : \'expand_more\'}}</md-icon><span>Volume {{volume.model.volumeNumber}}</span> <span flex=\"\"></span></div><md-button class=\"md-icon-button md-warn\" ng-click=\"vm.deleteVolume($index)\"><md-icon>delete</md-icon></md-button></h3><div slide-toggle=\"volume.focused\"><volume-editor ng-model=\"volume.model\" flex=\"\"></volume-editor></div></md-whiteframe></section><section class=\"copies\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Digital Copies</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"edition.copies.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"copy\" layout=\"column\" ng-repeat=\"copy in edition.copies\"><div layout=\"row\"><copy-editor ng-model=\"copy\" flex=\"\"></copy-editor><md-button class=\"md-icon-button md-warn\" ng-click=\"edition.copies.splice($index, 1)\"><md-icon>delete</md-icon></md-button></div></div></section>");
$templateCache.put("app/bulk/components/publication-info-editor/publication-info-editor.html","<div layout=\"row\"><md-input-container flex=\"\"><label>publisher</label> <input type=\"text\" ng-model=\"pubInfo.publisher\"></md-input-container><md-input-container flex=\"\"><label>location</label> <input type=\"text\" ng-model=\"pubInfo.place\"></md-input-container><date-editor ng-model=\"pubInfo.date\" flex=\"\"></date-editor></div>");
$templateCache.put("app/bulk/components/summary-editor/summary-editor.html","<p>TODO: summary editor</p><div ng-bind-html=\"summary\"></div>");
$templateCache.put("app/bulk/components/title-editor/title-editor.html","<div layout=\"row\"><md-input-container><label>type</label><md-select ng-model=\"title.type\" required=\"\"><md-option value=\"bibliographic\">bibliographic</md-option><md-option value=\"canonical\">canonical</md-option><md-option value=\"short\">short</md-option></md-select></md-input-container><md-input-container flex=\"\"><label>title</label> <input type=\"text\" ng-model=\"title.title\" required=\"\"><div ng-switch=\"title.type\"><small ng-switch-when=\"bibliographic\">the full title as published on the work</small> <small ng-switch-when=\"canonical\">title by which the work is commonly known in the academic realm</small> <small ng-switch-when=\"short\">shortened title coloquially used by the public</small></div></md-input-container><md-input-container flex=\"\"><label>subtitle</label> <input type=\"text\" ng-model=\"title.subtitle\"></md-input-container></div>");
$templateCache.put("app/bulk/components/volume-editor/volume-editor.html","<div layout=\"row\"><md-input-container flex=\"\"><label>volume number</label> <input type=\"text\" ng-model=\"volume.volumeNumber\" required=\"\"></md-input-container></div><section class=\"publication\" layout=\"column\"><h2>Publication Information</h2><publication-info-editor ng-model=\"volume.publicationInfo\"></publication-info-editor></section><section class=\"titles\" layout=\"column\"><h2 layout=\"row\"><span flex=\"\">Titles</span><md-button class=\"md-icon-button\" ng-click=\"volume.titles.push({})\"><md-icon>add</md-icon></md-button></h2><div class=\"title\" layout=\"row\" ng-repeat=\"title in volume.titles\"><title-editor ng-model=\"title\" flex=\"\"></title-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"volume.titles.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"authors\" layout=\"column\"><h2 layout=\"row\"><span flex=\"\">Authors</span><md-button class=\"md-icon-button\" ng-click=\"volume.authors.push({})\"><md-icon>add</md-icon></md-button></h2><div class=\"author\" layout=\"row\" ng-repeat=\"author in volume.authors\"><author-ref-editor ng-model=\"author\" flex=\"\"></author-ref-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"volume.authors.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"authors other-authors\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Other Authors</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"volume.otherAuthors.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"author other-author\" layout=\"row\" ng-repeat=\"author in volume.otherAuthors\"><author-ref-editor ng-model=\"author\" flex=\"\"></author-ref-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"volume.otherAuthors.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"summary\"><h2>Summary</h2><summary-editor ng-model=\"volume.summary\" flex=\"\"></summary-editor></section><section class=\"copies\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Digital Copies</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"volume.copies.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"copy\" layout=\"column\" ng-repeat=\"copy in volume.copies\"><div layout=\"row\"><copy-editor ng-model=\"copy\" flex=\"\"></copy-editor><md-button class=\"md-icon-button md-warn\" ng-click=\"volume.copies.splice($index, 1)\"><md-icon>delete</md-icon></md-button></div></div></section>");
$templateCache.put("app/bulk/components/work-editor/work-editor-item.html","<div layout=\"row\" layout-align=\"center center\" ng-if=\"!vm.loaded\"><md-progress-circular md-mode=\"indeterminate\"></md-progress-circular></div><div ng-if=\"vm.loaded\"><work-editor ng-model=\"vm.work\"></work-editor></div>");
$templateCache.put("app/bulk/components/work-editor/work-editor.html","<section class=\"titles\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Titles</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"work.titles.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"title\" layout=\"row\" ng-repeat=\"title in work.titles\"><title-editor ng-model=\"title\" flex=\"\"></title-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"work.titles.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"authors\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Authors</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"work.authors.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"author\" layout=\"row\" ng-repeat=\"author in work.authors\"><author-ref-editor ng-model=\"author\" flex=\"\"></author-ref-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"work.authors.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"authors other-authors\" layout=\"column\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Other Authors</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"work.otherAuthors.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"author other-author\" layout=\"row\" ng-repeat=\"author in work.otherAuthors\"><author-ref-editor ng-model=\"author\" flex=\"\"></author-ref-editor><md-input-container><md-button class=\"md-icon-button md-warn\" ng-click=\"work.otherAuthors.splice($index, 1)\"><md-icon>delete</md-icon></md-button></md-input-container></div></section><section class=\"summary\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Summary</h2></div></md-toolbar><summary-editor ng-model=\"work.summary\" flex=\"\"></summary-editor></section><section class=\"editions\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Editions</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"vm.createEdition()\"><md-icon>add</md-icon></md-button></div></md-toolbar><md-whiteframe class=\"edition\" layout=\"column\" layout-margin=\"\" ng-repeat=\"edition in vm.editions\" ng-class=\"{ \'md-whiteframe-2dp\': !edition.focused, \'md-whiteframe-8dp\': edition.focused }\"><h3 layout=\"row\"><div flex=\"\" layout=\"row\" layout-align=\"start center\" ng-click=\"edition.focused = !edition.focused\"><md-icon>{{ edition.focused ? \'expand_less\' : \'expand_more\'}}</md-icon><span>{{edition.model.editionName}}</span> <span flex=\"\"></span></div><md-button class=\"md-icon-button md-warn\" ng-click=\"vm.deleteEdition($index)\"><md-icon>delete</md-icon></md-button></h3><div slide-toggle=\"edition.focused\"><edition-editor ng-model=\"edition.model\" flex=\"\"></edition-editor></div></md-whiteframe></section><section class=\"copies\"><md-toolbar class=\"md-hue-3\"><div class=\"md-toolbar-tools\"><h2>Digital Copies</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"work.copies.push({})\"><md-icon>add</md-icon></md-button></div></md-toolbar><div class=\"copy\" layout=\"column\" ng-repeat=\"copy in work.copies\"><div layout=\"row\"><copy-editor ng-model=\"copy\" flex=\"\"></copy-editor><md-button class=\"md-icon-button md-warn\" ng-click=\"work.copies.splice($index, 1)\"><md-icon>delete</md-icon></md-button></div></div></section>");}]);
//# sourceMappingURL=../maps/scripts/app-9d7f459ebd.js.map
