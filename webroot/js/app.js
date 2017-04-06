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
                self.selected.is_installed = (installedPackages[self.selected.name] !== undefined);

                self.isLoading = false;
            };
            xhr.send();
        },
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
