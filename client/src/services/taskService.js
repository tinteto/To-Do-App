const url = 'http://localhost:3030/jsonstore/todos';

export default {
  async getAllTasks() {
    const response = await fetch(url);
    const result = await response.json();
    const tasks = Object.values(result);
    return tasks;
  },

  async createTask(text) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text, isCompleted: false}), 
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  },

async editTask(taskId, text) {
  const response = await fetch(`${url}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',  
    },
    body: JSON.stringify({text, _id: taskId, isCompleted: false})
  });

  if(response.ok) {
    const result = response.json();
    return result;
  }

  },

async deleteTask(taskId) {
    const response = await fetch(`${url}/${taskId}`, { method: 'DELETE' });
    const result = response.json();
    return result;
  },
};