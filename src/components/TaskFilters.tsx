// Import necessary modules from React and React Native
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Import the Picker component for dropdowns
import { Picker } from '@react-native-picker/picker';

// Import types for category and status filters
import { CategoryFilter, StatusFilter } from '../types/taskTypes';

// Import styles specific to this component and shared app styles
import { taskFiltersStyles, appStyles } from '../theme/styles';

// Define the type of props this component expects
interface TaskFiltersProps {
  categoryFilter: CategoryFilter; // currently selected category filter
  statusFilter: StatusFilter;     // currently selected status filter
  onCategoryChange: (category: CategoryFilter) => void; // callback when category changes
  onStatusChange: (status: StatusFilter) => void;       // callback when status changes
}

// Define the functional component TaskFilters
const TaskFilters: React.FC<TaskFiltersProps> = ({
  categoryFilter,
  statusFilter,
  onCategoryChange,
  onStatusChange,
}) => {
  return (
    <View style={taskFiltersStyles.filterContainer}>
      {/* Filter by category dropdown */}
      <View style={taskFiltersStyles.filterItem}>
        <Text style={taskFiltersStyles.filterText}>Filtrar por categoría:</Text>
        <Picker
          selectedValue={categoryFilter}       // current selected category
          onValueChange={onCategoryChange}     // when category changes, call handler
          style={appStyles.picker}
        >
          {/* Dropdown options for categories */}
          <Picker.Item label="Todas" value="" />
          <Picker.Item label="🏠 Hogar" value="Hogar" />
          <Picker.Item label="📚 Estudio" value="Estudio" />
          <Picker.Item label="💼 Trabajo" value="Trabajo" />
          <Picker.Item label="🛒 Compras" value="Compras" />
          <Picker.Item label="⚽ Ocio" value="Ocio" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>

      {/* Filter by task status dropdown */}
      <View style={taskFiltersStyles.filterItem}>
        <Text style={taskFiltersStyles.filterText}>Filtrar por estado:</Text>
        <Picker
          selectedValue={statusFilter}       // current selected status
          onValueChange={onStatusChange}     // when status changes, call handler
          style={appStyles.picker}
        >
          {/* Dropdown options for status */}
          <Picker.Item label="Todas" value="" />
          <Picker.Item label="Realizadas" value="completed" />
          <Picker.Item label="Pendientes" value="pending" />
        </Picker>
      </View>
    </View>
  );
};

// Export the component so it can be used elsewhere in the app
export default TaskFilters;
