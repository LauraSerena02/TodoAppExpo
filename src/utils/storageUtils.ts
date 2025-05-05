import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage to save/load data locally
import { Task } from '../types/taskTypes'; // Import Task type for better structure

// The key used to save tasks in AsyncStorage
const STORAGE_KEY = '@task_items';

// Function to save tasks to AsyncStorage
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(tasks); // Convert the tasks array into a string
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue); // Save the string in AsyncStorage
  } catch (e) {
    console.error('Error saving tasks', e); // If an error happens, log it
    throw e; // Rethrow the error to handle it elsewhere
  }
};

// Function to load tasks from AsyncStorage
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY); // Get the saved string from AsyncStorage
    if (jsonValue != null) { // If there are tasks saved
      const loadedTasks = JSON.parse(jsonValue); // Convert the string back to an array
      // Convert the dueDate of each task to a Date object and return the tasks
      return loadedTasks.map((task: any) => ({
        ...task,
        dueDate: task.dueDate ? new Date(new Date(task.dueDate).setHours(12, 0, 0, 0)) : new Date(new Date().setHours(12, 0, 0, 0))
      }));
    }
    return []; // If no tasks found, return an empty array
  } catch (e) {
    console.error('Error loading tasks', e); // Log error if loading fails
    throw e; // Rethrow the error
  }
};
