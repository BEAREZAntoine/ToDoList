<template>
    <div class="form-container">
      <h1 class="text-center">{{ isEdit ? 'Edit Task' : 'Create Task' }}</h1>
      <form @submit.prevent="submitForm" class="task-form">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            type="text"
            v-model="task.title"
            id="title"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            v-model="task.description"
            id="description"
            class="form-input"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="status">Status:</label>
          <select v-model="task.status" id="status" class="form-input">
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn">
            {{ isEdit ? 'Save Changes' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        task: {
          title: '',
          description: '',
          status: 'todo',
        },
        isEdit: false,
      };
    },
    created() {
      if (this.$route.params.id) {
        this.isEdit = true;
        this.fetchTask();
      }
    },
    methods: {
      async fetchTask() {
        try {
          const response = await axios.get(
            `http://localhost:3000/tasks/${this.$route.params.id}`
          );
          this.task = response.data;
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      },
      async submitForm() {
        try {
          if (this.isEdit) {
            await axios.patch(
              `http://localhost:3000/tasks/${this.$route.params.id}`,
              this.task
            );
          } else {
            await axios.post('http://localhost:3000/tasks', this.task);
          }
          this.$router.push('/');
        } catch (error) {
          console.error('Error saving task:', error);
        }
      },
    },
  };
  </script>
  
  <style src="../assets/styles.css"></style>
  