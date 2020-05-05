<template>
    <div class="collection">
        <h2 class="collection__title">Коллекция Гарвардского художественного музея</h2>
        <div v-if="collection.length>0">
            <CollectionTable :collection="collection"
                             pageTitle="main"
                             @onFavouriteChange="onFavouriteChange"
                             @onShowObjectData="onShowObjectData"/>
            <div class="collection__pagination">
                <div class="card__btn-prev"
                     v-if="page>1"
                     @click="prevPage">
                    <img :src="require('@/assets/images/back.png')"
                         class="card__btn-prev_img"
                         width="30"
                         height="30">
                </div>
                <h1 class="collection__pagination-page">{{page}}</h1>
                <div class="card__btn-next"
                     v-if="page<maxPages"
                     @click="nextPage">
                    <img :src="require('@/assets/images/next.png')"
                         class="card__btn-next_img"
                         width="30"
                         height="30">
                </div>
            </div>
        </div>
        <div v-else>
            <h3>Данные загружаются</h3>
        </div>
        <ArtObject :objectData="objectData"
                   @onCloseObjectData="onCloseObjectData"
                   v-if="showObjectData"/>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  import ArtObject from "@/components/ArtObject";
  import CollectionTable from "@/components/CollectionTable";

  export default {
    name: "Collection",
    components: {ArtObject, CollectionTable},
    data() {
      return {
        page: 1,
        objectData: {},
        showObjectData: false,
      }
    },
    mounted() {
      this.$store.dispatch('getCollection', this.page)
    },
    computed: {
      ...
        mapState({
          collection: state => state.collection,
          maxPages: state => state.maxPages
        })
    },
    methods: {
      onFavouriteChange: function (id) {
        const elementsIndex = this.collection.findIndex(element => id === element.objectid);
        let newCollection = [...this.collection];

        newCollection[elementsIndex] = {
          ...newCollection[elementsIndex],
          is_favourite: !newCollection[elementsIndex].is_favourite
        };

        let localCollection = localStorage.getItem('collection') ? JSON.parse(localStorage.getItem('collection')) : [];
        if (newCollection[elementsIndex].is_favourite) {
          localCollection.push(newCollection[elementsIndex])
        } else {
          localCollection = localCollection.filter(item => id !== item.objectid);
        }
        localStorage.setItem('collection', JSON.stringify(localCollection));
        this.$store.dispatch('updateCollection', newCollection);
      },
      onShowObjectData: function (id) {
        this.objectData = this.collection.filter(element => id === element.objectid)[0];
        this.showObjectData = true;
      },
      onCloseObjectData: function () {
        this.showObjectData = false;
        this.objectData = {};
      },
      nextPage: function () {
        if (this.page < this.maxPages) {
          this.page += 1;
          this.$store.dispatch('getCollection', this.page);
        }
      },
      prevPage: function () {
        if (this.page > 1) {
          this.page -= 1;
          this.$store.dispatch('getCollection', this.page);
        }
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

    .collection__title {
        margin: 40px;
    }

    .collection__pagination {
        margin-top: 40px;
        justify-content: center;
        display: flex;
        align-items: center;
    }

    .collection__pagination-page {
        margin-left: 20px;
        margin-right: 20px;
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
