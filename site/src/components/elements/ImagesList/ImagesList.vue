<template>
    <div class="images-list">
        <table v-if="images.length">
            <v-data-table v-bind:headers="headers" :items="images" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.uploadedAt }}</td>
                </template>
            </v-data-table>
        </table>
        <div v-else class="images-list__no-data-message">
            <v-alert color="info" icon="info" value="true">
                You have no uploaded images.
            </v-alert>
        </div>
    </div>
</template>

<script src="./imagesList.js">
</script>

<style lang="scss">
@import "./images-list";
</style>
