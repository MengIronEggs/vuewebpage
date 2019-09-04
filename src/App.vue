<style lang="less" scoped>
    //定义菜单展开和收起的时间
    @hideDuring: .3s;

    .content-container{
        position: absolute;
        top: 60px;
        bottom: 0;
        left: 230px;
        right: 0;
        overflow-y: auto;
        min-width: 840px;
        padding: 10px;
        transition: @hideDuring linear;

        &.spread{
            left: 0;
        }
    }

    .active-menu{
        transition: @hideDuring linear;
        &.hidden{
            transform: translateX(-230px);
        }
    }
</style>

<template>
    <div>
        <div v-if="isLogin">
            <HomeTitle v-on:logout="updateLoginStatus" v-on:toggleHideMenu="toggleHideMenu"/>
            <Menus class="active-menu" v-bind:class="{hidden: isHideMenu}"/>

            <section class="content-container" v-bind:class="{spread: isHideMenu}">
                <div class="content-box">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </section>
        </div>

        <!-- <am_W00001 v-if="!isLogin" v-on:login="updateLoginStatus"/> -->
    </div>
</template>

<script>
    import Menus from './components/Menus'
    // import am_W00001 from './view/am-W00001'
    import HomeTitle from './components/HomeTitle'
    export default {
        data() {
            return {
                isLogin: true,
                isHideMenu: false,
            }
        },

        created(){

        },

        mounted() {
         

        },

        methods: {
            updateLoginStatus(state) {
                this.isLogin = state;
            },

            toggleHideMenu(){
                this.isHideMenu = !this.isHideMenu;
            }
        },

        components: {
            HomeTitle,
            Menus,
            // am_W00001
        },
    }

</script>
