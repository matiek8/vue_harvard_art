<template>
    <div id="app">
        <div class="nav">
            <router-link class="nav__logo"
                         to="/">
                <img src="./assets/images/harvard_logo_square.jpg"
                     height="50">
            </router-link>
            <div class="nav__link">
                <router-link to="/">Главная</router-link>
                /
                <router-link to="/favourites">Избранное</router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .nav__logo {
        text-align: left;
        flex-grow: 5;
    }

    .nav {
        padding: 10px;
        height: 50px;
        display: flex;
    }

    .nav__link {
        flex-grow: 7;
        height: 50px;
        text-align: left;
        display: flex;
        align-items: center;
    }

    .nav a {
        font-weight: bold;
        color: #736f74;
        text-decoration: none;
    }

    .nav a.router-link-exact-active {
        color: #e54d53;
        text-decoration: underline;
    }
</style>
