<template>
    <div class="container">
      <h1 class="text-center">Task List</h1>
      <div class="text-right mb-4">
        <button @click="addTask" class="btn">Add New Task</button>
      </div>
      <div class="task-list">
        <ul>
          <li v-for="task in tasks" :key="task._id" class="task-card">
            <h2>{{ task.title }}</h2>
            <p class="status">{{ task.status }}</p>
            <div class="action-buttons">
              <button @click="editTask(task._id)" class="btn btn-edit">Edit</button>
              <button @click="deleteTask(task._id)" class="btn btn-delete">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tasks: [],
      };
    },
    created() {
      this.fetchTasks();
    },
    methods: {
      async fetchTasks() {
        try {
          const response = await axios.get('http://localhost:3000/tasks');
          this.tasks = response.data;
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      },
      addTask() {
        this.$router.push('/tasks/new');
      },
      async deleteTask(id) {
        try {
          await axios.delete(`http://localhost:3000/tasks/${id}`);
          this.fetchTasks();
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      },
      editTask(id) {
        this.$router.push(`/tasks/${id}`);
      },
    },
  };
  </script>
  
  <style src="../assets/styles.css"></style>
  