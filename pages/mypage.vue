<template>
  <amplify-authenticator>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      absolute
      top
      right
    >
      <span v-if="isEdit">更新しました</span>
      <span v-else>保存しました</span>
    </v-snackbar>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="user.name"
            label="名前"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="user.birthday"
            label="生年月日"
            type="date"
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="user.comment"
          >
            <template v-slot:label>
              <div>ひとこと</div>
            </template>
          </v-textarea>
        </v-col>
        <v-col cols="12">
          <v-btn
            v-if="!isEdit"
            class="mr-4"
            @click="createEmployee"
          >
            保存する
          </v-btn>
          <v-btn
            v-else
            class="mr-4"
            @click="updateEmployee"
          >
            更新する
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div>
    </div>
  </amplify-authenticator>
</template>

<script>
import { API } from 'aws-amplify';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { listEmployees } from '~/src/graphql/queries';
import { createEmployee, updateEmployee } from '~/src/graphql/mutations';

export default {
  name: "MyPage",
  data() {
    return {
      user: {
        id: '',
        name: '',
        birthday: new Date(),
        comment: '',
      },
      loginUserName: '',
      isEdit: false,
      snackbar: false,
    }
  },
  created() {
    // 認証情報の取得
    onAuthUIStateChange((authState, authData) => {
      if (authState === 'signedin') {
        this.loginUserName = authData.username;
        this.getMyPageInfo();
      }
    });
  },
  methods: {
    // ログインユーザの情報を取得
    async getMyPageInfo() {
      const filter = {
        username: {
          eq: this.loginUserName
        }
      };
      const employee = await API.graphql({
        query: listEmployees,
        variables: { filter },
      });

      const userData = employee.data.listEmployees.items;
      console.log(userData.length)
      if (userData.length) {
        userData.forEach(item => {
          this.user.id = item.id;
          this.user.name = item.nickname;
          this.user.birthday = item.birthday;
          this.user.comment = item.comment;
        });
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    },
    async createEmployee() {
      const employee = {
        username: this.loginUserName,
        nickname: this.user.name,
        birthday: this.user.birthday,
        comment: this.user.comment
      }
      console.log('employee: ', employee);
      await API.graphql({
        query: createEmployee,
        variables: { input: employee },
      })

      this.snackbar = true;
      console.log('createEmployee is succeed')
    },
    async updateEmployee() {
      const employee = {
        id: this.user.id,
        username: this.loginUserName,
        nickname: this.user.name,
        birthday: this.user.birthday,
        comment: this.user.comment
      }
      await API.graphql({
        query: updateEmployee,
        variables: { input: employee }
      })
      this.snackbar = true;
    }
  }
}
</script>

<style scoped>

</style>
