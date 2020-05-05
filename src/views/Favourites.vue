<template>
    <div class="collection">
        <h2>Избранные позиции</h2>
        <CollectionTable :collection="localCollection"
                         pageTitle="favourites"
                         @onFavouriteChange="onFavouriteChange"
                         @onShowObjectData="onShowObjectData"
                         v-if="localCollection.length>0"/>
        <div v-else>
            <h3>У вас еще нет избранных позиций</h3>
        </div>
        <ArtObject :objectData="objectData"
                   @onCloseObjectData="onCloseObjectData"
                   v-if="showObjectData"/>
    </div>
</template>

<script>
  import ArtObject from "@/components/ArtObject";
  import CollectionTable from "@/components/CollectionTable";
  import {mapState} from "vuex";

  export default {
    name: "Favourites",
    components: {ArtObject, CollectionTable},
    data() {
      return {
        objectData: {},
        showObjectData: false,
      }
    },
    mounted() {
      this.$store.dispatch('getLocalCollection')
    },
    computed: {
      ...
        mapState({
          localCollection: state => state.localCollection,
        })
    },
    methods: {
      onFavouriteChange: function (id) {
        const elementsIndex = this.localCollection.findIndex(element => id === element.objectid);
        let newCollection = [...this.localCollection];

        newCollection[elementsIndex] = {
          ...newCollection[elementsIndex],
          is_favourite: !newCollection[elementsIndex].is_favourite
        };

        let localStorageCollection = localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')) : [];
        if (newCollection[elementsIndex].is_favourite) {
          localStorageCollection.push(newCollection[elementsIndex])
        } else {
          localStorageCollection = localStorageCollection.filter(item => id !== item.objectid);
        }
        localStorage.setItem('collection', JSON.stringify(localStorageCollection));

        this.$store.dispatch('getLocalCollection')

      },
      onShowObjectData: function (id) {
        this.objectData = this.localCollection.filter(element => id === element.objectid)[0];
        this.showObjectData = true;
      },
      onCloseObjectData: function () {
        this.showObjectData = false;
        this.objectData = {};
      }
    }
  }
</script>

<style scoped>
    .collection {
        margin: auto;
        box-sizing: border-box;
        width: 1140px;
    }

    @media (max-width: 1200px) {
        .collection {
            width: 960px;
        }
    }

    @media (max-width: 992px) {
        .collection {
            width: 720px;
        }
    }

    @media (max-width: 768px) {
        .collection {
            width: 540px;
        }
    }

</style>
