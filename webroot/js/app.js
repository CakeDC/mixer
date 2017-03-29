var apiURL = 'http://dev.mixerapi.cakedc.com/api/v1/';

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

    computed: {
        compiledMarkdown: function () {
            if (!this.selected) {
                return;
            }

            return marked(this.selected.readme, { sanitize: true })
        }
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
                //console.log(self.plugins);
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
                self.isLoading = false;
            };
            xhr.send();
        }
    }
});
