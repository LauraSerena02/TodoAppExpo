import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TaskFilters from '../../src/components/TaskFilters';
import TaskForm from '../../src/components/TaskForm';
import TaskItem from '../../src/components/TaskItem';
import TodayTasksModal from '../../src/components/TodayTasksModal';
import { useTasks } from '../../src/hooks/useTasks';
import { appStyles } from '../../src/theme/styles';
import { CategoryFilter, StatusFilter, Task } from '../../src/types/taskTypes';

export default function TabOneScreen() {
  // Destructure properties and functions from the useTasks hook
  const {
    taskItems,              // Full list of tasks
    todayTasks,             // Tasks due today
    showTodayTasksModal,    // Modal visibility state
    setShowTodayTasksModal, // Function to set modal visibility
    addTask,                // Function to add a new task
    toggleTask,             // Function to mark/unmark task as completed
    deleteTask,             // Function to delete a task
    updateTask,             // Function to update an existing task
    getTodayTasks,          // Function to retrieve today's tasks
  } = useTasks();

  // ID of the task currently being edited (if any)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Category and status filters
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');

  // Handles adding a new task
  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),              // Generate a unique ID using timestamp
      completed: false,                       // New task starts as incomplete
      dueDate: taskData.dueDate || new Date() // Default due date is today
    };
    addTask(newTask);
  };

  // Handles updating an existing task
  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    if (editingTaskId) {
      const updatedTask: Partial<Task> = {
        ...taskData,
        dueDate: new Date(taskData.dueDate || new Date()) // Ensure we always use a new Date object
      };
      updateTask(editingTaskId, updatedTask); // Update the task by ID
      setEditingTaskId(null);                 // Exit edit mode
    }
  };

  /**
   * Handles entering edit mode for a specific task
   * This function sets the editingTaskId which triggers the form to populate
   * with the selected task's data. The form will switch from "Add" mode to
   * "Edit" mode, showing cancel and save buttons instead of just an add button.
   * 
   * @param id The ID of the task to be edited
   */
  const handleEditTask = (id: string) => {
    setEditingTaskId(id); // Set the ID of the task we're editing
  };

  // Cancels editing and returns to normal view
  const handleCancelEdit = () => {
    setEditingTaskId(null); // Clear the editing ID
  };

  // Sets the category filter for task list
  const handleCategoryChange = (category: CategoryFilter) => {
    setCategoryFilter(category);
  };

  // Sets the status filter (completed or pending)
  const handleStatusChange = (status: StatusFilter) => {
    setStatusFilter(status);
  };

  // Count completed and pending tasks for the summary display
  const completedCount = taskItems.filter(item => item.completed).length;
  const pendingCount = taskItems.length - completedCount;

// Apply filters to the task list
const filteredTasks = taskItems.filter(item => {
  // Check if the task matches the selected category filter:
  // - If a category is selected (categoryFilter is not empty), 
  //   compare it with the task's category
  // - If no category is selected (categoryFilter is empty), 
  //   include all tasks (return true)
  const categoryMatch = categoryFilter ? item.category === categoryFilter : true;

  // Check if the task matches the selected status filter:
  // - If a status is selected (statusFilter is not empty):
  //   - If filtering for "completed" tasks, return the task's completed status
  //   - If filtering for "pending" tasks (implied by statusFilter not being empty 
  //     and not "completed"), return the inverse of completed status
  // - If no status is selected (statusFilter is empty), include all tasks (return true)
  const statusMatch = statusFilter
    ? statusFilter === 'completed'
      ? item.completed    // Include if task is completed
      : !item.completed  // Include if task is NOT completed
    : true;              // No status filter applied

  // Only include tasks that match BOTH filters (category and status)
  // This uses logical AND (&&) - both conditions must be true
  return categoryMatch && statusMatch;
});

  // Get the task data for the task being edited (if any)
  const editingTask = editingTaskId 
    ? taskItems.find(item => item.id === editingTaskId) // Find the task by ID
    : null; // No task being edited

  return (
    <View style={appStyles.container}>
      {/* Screen title */}
      <Text style={appStyles.title}>📝 Lista de Tareas</Text>
      
      {/* Task summary counters */}
      <Text style={appStyles.counter}>
        ✅ Realizadas: {completedCount} | ⏳ Pendientes: {pendingCount}
      </Text>

      {/* Button to show today's tasks */}
      <TouchableOpacity 
        style={appStyles.todayButton}
        onPress={getTodayTasks}
      >
        <Text style={appStyles.todayButtonText}>Ver tareas de hoy</Text>
      </TouchableOpacity>

      {/* Conditional rendering of TaskForm based on edit mode */}
      {editingTask ? (
        <TaskForm
          key={`edit-form-${editingTaskId}`} // Unique key to force re-render when editing different tasks
          onSubmit={handleUpdateTask}
          initialText={editingTask.text}
          initialCategory={editingTask.category}
          initialDueDate={new Date(editingTask.dueDate)} // Ensure new Date instance
          isEditing={true}
          onCancel={handleCancelEdit}
        />
      ) : (
        <TaskForm 
          key="add-form" // Different key for add mode
          onSubmit={handleAddTask}
          isEditing={false}
        />
      )}

      {/* Task filters component */}
      <TaskFilters
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
      />

      {/* Task list container */}
      <View style={appStyles.listContainer}>
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onEdit={handleEditTask}
              onDelete={deleteTask}
            />
          )}
          contentContainerStyle={appStyles.listContent}
        />
      </View>

      {/* Modal for today's tasks */}
      <TodayTasksModal
        visible={showTodayTasksModal}
        tasks={todayTasks}
        onClose={() => setShowTodayTasksModal(false)}
      />
    </View>
  );
}

