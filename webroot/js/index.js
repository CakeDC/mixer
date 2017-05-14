var app = new Vue({

    el: '#plugins',

    data: {
        query: 'cakedc',
        plugins: null,
        selectedId: null,
        selected: null,
        isLoading: false
    },

    created: function () {
       this.search();
    },
    watch: {
        query: 'search',
        selectedId: 'view'
    },
    mounted: function () {
        this.list();
    },
    methods: {
        updateQuery: _.debounce(function (e) {
            var query = e.target.value;

            if (query.length < 3) {
                return;
            }

            this.query = query;
        }, 300),

        search: function () {
            var self = this;
            self.isLoading = true;

            var xhr = new XMLHttpRequest();
            xhr.open('GET', apiURL + 'packages?q=' + self.query);
            xhr.onload = function () {
                self.plugins = JSON.parse(xhr.responseText).data;

                self.isLoading = false;
            };
            xhr.send();
        },

        view: function () {
            var self = this;
            self.isLoading = true;

            var xhr = new XMLHttpRequest();
            xhr.open('GET', apiURL + 'packages/' + self.selectedId);
            xhr.onload = function () {
                self.selected = JSON.parse(xhr.responseText).data;
                self.selected.is_installed = (installedPackages.indexOf(self.selected.name) !== -1);

                self.isLoading = false;
            };
            xhr.send();
        },

        install: function(event) {
            var self = this;
            self.isLoading = true;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', event.target.href + '.json');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                //alert(JSON.parse(xhr.responseText).message);
                self.selected.is_installed = true;
                installedPackages.push(self.selected.name);

                self.isLoading = false;
            };
            xhr.send('id=' + self.selected.id);
        },

        uninstall: function(event) {
            var self = this;
            self.isLoading = true;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', event.target.href + '.json');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                //alert(JSON.parse(xhr.responseText).message);
                self.selected.is_installed = false;
                installedPackages.splice(installedPackages.indexOf(self.selected.name), 1);

                self.isLoading = false;
            };
            xhr.send('package=' + self.selected.name);
        },
        list: function(event) {
            var self = this;
            self.isLoading = true;

            installedPackages
            var xhr = new XMLHttpRequest();
            for (var i in array) {
                xhr.open('GET', apiURL + 'packages/' + self.selectedId);
                xhr.onload = function () {
                    self.plugins = JSON.parse(xhr.responseText).data;
                };
                xhr.send();
            }
            self.isLoading = false;

            this.isLoading = false;
            this.plugins = installedPackages;
            console.log(this.plugins);
        }
    },

    computed: {
        compiledMarkdown: function () {
            if (!this.selected) {
                return;
            }

            return marked(this.selected.readme, { sanitize: true })
        }
    }
});
