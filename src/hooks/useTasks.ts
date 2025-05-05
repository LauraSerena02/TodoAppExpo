import { useState, useEffect } from 'react';
import { Task } from '../types/taskTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isSameDay } from '../utils/dateUtils';

const STORAGE_KEY = '@task_items';

export const useTasks = () => {
  const [taskItems, setTaskItems] = useState<Task[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [showTodayTasksModal, setShowTodayTasksModal] = useState(false);

  // Cargar tareas al iniciar
  useEffect(() => {
    const initializeApp = async () => {
      await loadTasks();
      setIsInitialLoad(false);
    };
    initializeApp();

    const interval = setInterval(checkDueTasks, 60000);
    return () => clearInterval(interval);
  }, []);

  // Verificar tareas pendientes
  useEffect(() => {
    if (!isInitialLoad) {
      checkDueTasks();
    }
  }, [taskItems, isInitialLoad]);

  // Guardar tareas cuando cambian
  useEffect(() => {
    saveTasks(taskItems);
  }, [taskItems]);

  const saveTasks = async (tasks: Task[]) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Error saving tasks', e);
    }
  };

  const loadTasks = async (): Promise<Task[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const loadedTasks = JSON.parse(jsonValue);
        const tasksWithDates = loadedTasks.map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          completed: !!task.completed
        }));
        setTaskItems(tasksWithDates);
        return tasksWithDates;
      }
      return [];
    } catch (e) {
      console.error('Error loading tasks', e);
      return [];
    }
  };

  const checkDueTasks = () => {
    const today = new Date();
    const tasksForToday = taskItems.filter(item => 
      !item.completed && isSameDay(new Date(item.dueDate), today)
    );
    if (tasksForToday.length > 0) {
      setTodayTasks(tasksForToday);
      setShowTodayTasksModal(true);
    }
  };

  const getTodayTasks = () => {
    const today = new Date();
    const tasksForToday = taskItems.filter(item => 
      isSameDay(new Date(item.dueDate), today)
    );
    setTodayTasks(tasksForToday);
    setShowTodayTasksModal(true);
  };

  const addTask = (task: Task) => {
    setTaskItems(prev => [...prev, task]);
  };

  const toggleTask = (id: string) => {
    setTaskItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id: string) => {
    setTaskItems(prev => prev.filter(item => item.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTaskItems(prev =>
      prev.map(item =>
        item.id === id ? { 
          ...item, 
          ...updates,
          dueDate: updates.dueDate ? new Date(updates.dueDate) : item.dueDate
        } : item
      )
    );
  };

  return {
    taskItems,
    todayTasks,
    showTodayTasksModal,
    setShowTodayTasksModal,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTodayTasks,
    setTaskItems,
  };
};