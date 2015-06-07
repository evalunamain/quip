/**
 * Created by 40in on 16.10.14.
 */
define(['marionette'], function(Marionette) {

    var TestView = Marionette.ItemView.extend({

        template: '#test',

        // serializeData: function() {
        //     return {
        //         text: this.options.text || ''
        //     }
        // }

    });

    return TestView;

});