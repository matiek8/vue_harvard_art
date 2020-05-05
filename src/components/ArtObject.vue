<template>
    <div class="modal"
         @click="outsideClick">
        <div class="modal__content">
            <span class="modal__close"
                  @click="closeObjectData">&times;</span>
            <vue-load-image>
                <img :src="objectData.image? `${objectData.image.baseimageurl}`: logo"
                     slot="image"
                     class="modal__image"
                     alt="">
                <img slot="preloader"
                     class="modal__image_loader"
                     :src="require('@/assets/images/image-loader.gif')"/>
                <div slot="error">error message</div>
            </vue-load-image>
            <hr>
            <div class="modal__description">
                <h1 class="modal__description_title">Описание</h1>
                <div class="modal__description_content">
                    <h3>Номер Объекта</h3>
                    <p>{{objectData.objectnumber}}</p>

                    <h3>Заголовок</h3>
                    <p>{{objectData.title}}</p>

                    <h3>Люди</h3>
                    <p>{{objectData.people}}</p>

                    <h3>Дата</h3>
                    <p>{{objectData.dated}}</p>

                    <h3>Век</h3>
                    <p>{{objectData.century}}</p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
  import VueLoadImage from 'vue-load-image'

  export default {
    name: "ArtObject",
    props: {
      objectData: {
        type: Object,
      }, onCloseObjectData: {
        type: Function,
      }
    },
    components: {
      'vue-load-image': VueLoadImage
    },
    data() {
      return {
        logo: require('@/assets/images/logo_small.jpeg'),
      }
    },
    methods: {
      closeObjectData: function () {
        this.$emit('onCloseObjectData');
      },
      outsideClick: function (e) {
        const modal = document.getElementsByClassName('modal')[0];
        if (e.target == modal) {
          this.closeObjectData();
        }
      }
    }
  }
</script>

<style scoped>
    .modal {
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal__content {
        background-color: #fefefe;
        margin: auto;
        padding: 40px;
        border: 1px solid #888;
        width: 50%;
    }

    .modal__close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .modal__close:hover,
    .modal__close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .modal__image {
        max-width: 400px;
        max-height: 400px;
    }

    .modal__image_loader {
         max-height: 400px;
    }

    .modal__description {
        display: flex;
    }

    .modal__description_title {
        text-align: left;
        flex: 1;
    }

    .modal__description_content {
        text-align: left;
        flex: 1;
    }

    .modal__description_content h3 {
        color: #736f74;
        margin-bottom: 0;
    }

    .modal__description_content p {
        margin: 0;
    }

    @media (max-width: 992px) {
        .modal__image {
            max-width: 200px;
            max-width: 200px;
        }
    }

</style>
