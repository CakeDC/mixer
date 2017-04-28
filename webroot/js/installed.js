var app = new Vue({

    el: '#plugins',
    data: {
        plugins: null,
        isLoading: false
    },
    created: function () {
       this.list();
    },
    methods: {
        list: function(event) {
            var self = this;
            self.isLoading = false;
            this.plugins = installedPackages;
        }
    }
});
