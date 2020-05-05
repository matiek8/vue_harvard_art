<template>
    <div class="collection_table">
        <div class="collection_table__card"
             v-for="item in collection"
             :id="item.objectid"
        >
            <vue-load-image>
                <div slot="image"
                     class="collection_table__card-img"
                     :data-src="[item.image ? `${item.image.baseimageurl}?height=200&width=200`: `${require('@/assets/images/logo_small.jpeg')}`]"
                     :style="[item.image ? {'background-image':`url(${item.image.baseimageurl}?height=200&width=200)`} : {'background-image':`url(${require('@/assets/images/logo_small.jpeg')})`}]"
                     @click="showObjectData(item.objectid)"/>
                <img slot="preloader"
                     class="collection_table__card-img_loader"
                     :src="require('@/assets/images/image-loader.gif')"/>
                <div slot="error">error message</div>
            </vue-load-image>
            <div class="card__btn">
                <div v-if="item.is_favourite"
                     class="card__btn-remove"
                     @click="favouritesHandler(item.objectid)">
                    <img :src="require('@/assets/images/remove.png')"
                         class="card__btn-remove_img"
                         width="30"
                         height="30">

                </div>
                <div v-else
                     class="card__btn-add"
                     @click="favouritesHandler(item.objectid)">
                    <img :src="require('@/assets/images/add.png')"
                         class="card__btn-remove_img"
                         width="30"
                         height="30">
                </div>
            </div>

        </div>

    </div>
</template>

<script>
  import VueLoadImage from 'vue-load-image'

  export default {
    name: "CollectionTable",
    props: {
      pageTitle: {
        type: String
      },
      onFavouriteChange: {
        type: Function
      },
      onShowObjectData: {
        type: Function
      },
      collection: {
        type: Array,
      }
    },
    components: {
      'vue-load-image': VueLoadImage
    },
    methods: {
      favouritesHandler: function (id) {
        if (this.pageTitle === "favourites") {
          document.getElementById(id).remove()
        }
        this.$emit('onFavouriteChange', id);
      },
      showObjectData: function (id) {
        this.$emit('onShowObjectData', id);
      }
    }
  }
</script>

<style scoped>
    .collection_table {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 40px;
        grid-row-gap: 40px;
    }

    .collection_table__card {
        box-sizing: border-box;
        height: 200px;
    }

    .collection_table__card-img {
        height: 200px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        cursor: pointer;
    }

    .collection_table__card-img_loader {
        height: 200px;
    }

    .card__btn {
        display: none;
        margin-top: -200px;
        width: 30px;
    }

    .collection_table__card:hover .card__btn {
        display: block;
    }


    .card__btn-add, .card__btn-remove {
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.6);
        height: 30px;
        width: 30px;
    }

    @media (max-width: 992px) {
        .collection_table {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 768px) {
        .collection_table {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
