<template>
    <div>
      <h2>用戶列表</h2>
      
      <!-- 創建用戶表單 -->
      <form @submit.prevent="createUser">
        <input v-model="newUser.email" type="email" placeholder="Email" required>
        <input v-model="newUser.name" type="text" placeholder="Name" required>
        <button type="submit">創建用戶</button>
      </form>
  
      <!-- 用戶列表 -->
      <div v-if="loading">載入中...</div>
      <ul v-else>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} ({{ user.email }})
        </li>
      </ul>
    </div>
  </template>


<script setup>
import { ref, onMounted } from 'vue';
import { userService } from '../services/api';

const users = ref([]);
const loading = ref(true);
const newUser = ref({
  email: '',
  name: ''
});

const fetchUsers = async () => {
  try {
    const response = await userService.getUsers();
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
};

const createUser = async () => {
  try {
    await userService.createUser(newUser.value);
    newUser.value = { email: '', name: '' };
    await fetchUsers();
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

onMounted(fetchUsers);
</script>