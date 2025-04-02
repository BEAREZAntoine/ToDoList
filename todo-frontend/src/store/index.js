import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task._id === updatedTask._id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task._id !== taskId);
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        commit('setTasks', response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask({ commit }, task) {
      try {
        const response = await axios.post('http://localhost:3000/tasks', task);
        commit('addTask', response.data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async updateTask({ commit }, task) {
      try {
        const response = await axios.patch(`http://localhost:3000/tasks/${task._id}`, task);
        commit('updateTask', response.data);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask({ commit }, taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        commit('deleteTask', taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
  getters: {
    allTasks: (state) => state.tasks,
  },
});
