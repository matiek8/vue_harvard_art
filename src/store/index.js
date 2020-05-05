import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {api_key} from "../harvard_api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    maxPages: 0,
    collection: [],
    localCollection: [],
  },
  mutations: {
    async getCollection(state, page) {
      try {
        const response = await axios.get(`https://api.harvardartmuseums.org/object?size=20&page=${page}&apikey=${api_key}`);
        if (response.data.records) {
          state.collection = [];
          const localCollection = localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')) : null;
          response.data.records.map(item => {
            let localItem = localCollection ? localCollection.filter(local_item => local_item.objectid === item.objectid)[0] : null;
            let object = {
              objectid: item.objectid ? item.objectid : null,
              title: item.title ? item.title : null,
              image: item.images ? item.images[0] : null,
              objectnumber: item.objectnumber ? item.objectid : null,
              people: item.people ? item.people.map(person => person.name).join(', ') : null,
              dated: item.dated ? item.objectid : null,
              century: item.century ? item.objectid : null,
              is_favourite: localItem ? true : false,
            };
            state.maxPages = response.data.info.pages;
            state.collection.push(object)
          })
        }
      } catch (e) {
        console.error(e)
      }
    },
    changeFavouriteStatus(state, newCollection) {
      state.collection = newCollection
    },
    getLocalCollection(state) {
      try {
        state.localCollection = localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')) : [];
      } catch (e) {
        console.error(e)
      }
    }
  },
  actions: {
    getCollection(context, page) {
      context.commit('getCollection', page)
    },
    getLocalCollection(context) {
      context.commit('getLocalCollection')
    },
    updateCollection(context, newCollection) {
      context.commit('changeFavouriteStatus', newCollection)
    }

  },
  modules: {}
})
