<template>
  <div>
    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator>
      <div v-if="authState === 'signedin' && user" >
        Hello, {{ user.username }}
      </div>
      <h1>TodoApp</h1>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-btn @click="createTodo">Create</v-btn>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          {{ todo.name }} : {{ todo.description }}
        </li>
      </ul>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { createTodo } from '~/src/graphql/mutations'
import { listTodos } from '~/src/graphql/queries'
import { onCreateTodo } from '~/src/graphql/subscriptions'

export default {
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      name: '',
      description: '',
      todos: [],
    }
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });

    this.getTodos()
    this.subscribe()
  },
  methods: {
    async createTodo() {
      const { name, description } = this
      if (!name || !description) return false
      const todo = { name, description }
      await API.graphql({
        query: createTodo,
        variables: { input: todo },
      })
      this.name = ''
      this.description = ''
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos,
      })
      this.todos = todos.data.listTodos.items
    },
    subscribe() {
      API.graphql({ query: onCreateTodo }).subscribe({
        next: (eventData) => {
          const todo = eventData.value.data.onCreateTodo
          if (this.todos.some((item) => item.name === todo.name)) return // remove duplications
          this.todos = [...this.todos, todo]
        },
      })
    },
  },
}
</script>
