/* global $ */
import Route from '@ember/routing/route';

export default Route.extend({

    actions: {
        error(jqxhr){
            if(jqxhr.status === 404){
                this.intermediateTransitionTo('org.notfound');//Takes you to a state that is not mapped to a URL
            }else{
                return true; //bubble up
            }
        }
    },

    model(params){        
        //debugger; //?access_token=78f552c8f45f1bd22718d55d74dcc980e3a852d9
        return $.get(`https://api.github.com/orgs/${params.id}`)
                    .then(rawOrg => {
                        //backup github numeric ID
                        rawOrg.oldId = rawOrg.id;
                        //use repo name as our app's ID for the model.
                        rawOrg.id = rawOrg.login;
                        //debugger;
                        return rawOrg;
                    })
                    // .then(function(data) {
                    //     return new Ember.RSVP.Promise((res, rej) => {
                    //         Ember.run.later(() => {
                    //             res(data);
                    //         }, 2000 );
                    //     })
                        
                    // });
    }
});
