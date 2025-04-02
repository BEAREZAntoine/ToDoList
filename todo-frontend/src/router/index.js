import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../views/TaskList.vue';
import TaskForm from '../views/TaskForm.vue';

const routes = [
{
    path: '/',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/tasks/new',
    name: 'TaskForm',
    component: TaskForm,
  },
  {
    path: '/tasks/:id',
    name: 'TaskEdit',
    component: TaskForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
