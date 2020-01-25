<template>
    <div>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="1">
                        <v-avatar>
                            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                        </v-avatar>
                    </v-col>
                    <v-col cols="11">
                        <span class="headline">{{ user.firstName }} {{ user.lastName }}</span>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <strong>Username: </strong>
                        </v-col>
                        <v-col col="10">
                            <span>{{ user.username }}</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <strong>Email: </strong>
                        </v-col>
                        <v-col col="10">
                            <span>{{ user.email }}</span>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import api from '@/api';
export default {
    data() {
        return {
            user: {}
        };
    },
    async created() {
        this.getUserProfile();
    },
    methods: {
        async getUserProfile() {
            await api.getUserProfile().then(res => {
                console.log(res.user);
                this.user = res.user;
            });
        }
    }
};
</script>
<style></style>
