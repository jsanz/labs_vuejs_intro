const loadVue = function () {
    console.log('Loading vue instance...');

    // Ignore airship tags
    Vue.config.ignoredElements = [/as-\w+/];

    const formatter = new Intl.NumberFormat('en-EN', {
        maximumFractionDigits: 2
    });
    

    // Vue instance
    const app = new Vue({
        el: '#app',
        data: {
            step: 9,
            longitude: 73,
            latitude: 1,
            zoomLevel: 3,
            totalPop: null,
            map: null,
            features: null,
            topCitiesCount: 10,
            zooming: 0
        },
        watch: {
            zoomLevel: function(newValue, oldValue) {
                if (newValue > oldValue) {
                    this.zooming = 1;
                } else if (newValue < oldValue) {
                    this.zooming = -1;
                } else {
                    this.zooming = 0;
                }
            }
        },
        computed:{
            totalCount: function(){
                if (this.features){
                    return this.features.length 
                } else {
                    return null;
                }
            },
            avgPop: function(){
                if (this.totalCount){
                    return this.totalPop / this.totalCount;
                } else {
                    return null;
                }
            },
            noCities: function(){
                return this.totalCount == 0 || this.totalCount == null;
            },
            topPlaces: function(){
                if (this.features) {
                    const sortedPlaces = this.features.sort(function(a,b){
                        return b.pop_max - a.pop_max;
                    })
                    return sortedPlaces.slice(0, this.topCitiesCount - 1);
                } else {
                    return null;
                }
            }
        },
        methods: {
            formatNumber: function(value){
                return formatter.format(value);
            }
        }
    });

    console.log('Vue instance loaded!');
    return app;
};