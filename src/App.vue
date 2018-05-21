<template>
    <div id="app">
        <div id="nav" style="display: none;">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="less">
    @import 'assets/main.css';
    @import 'assets/elementui.css';
</style>
