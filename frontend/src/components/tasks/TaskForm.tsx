// src/components/tasks/TaskForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Box, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Typography,
  Paper,
  Stack,
  Divider,
  Chip,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Task, TaskStatus, TaskPriority, CreateTaskDto, UpdateTaskDto } from '../../types';
import { useTaskStore } from '../../store/taskStore';

// Form validation schema
const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum([
    TaskStatus.TODO, 
    TaskStatus.IN_PROGRESS, 
    TaskStatus.IN_REVIEW, 
    TaskStatus.DONE
  ]),
  priority: z.enum([
    TaskPriority.LOW, 
    TaskPriority.MEDIUM, 
    TaskPriority.HIGH, 
    TaskPriority.CRITICAL
  ]),
  dueDate: z.date().nullable().optional(),
  assignee: z.string().optional().nullable(),
  reporter: z.string().optional().nullable(),
  groupId: z.string().min(1, 'Group is required'),
  tags: z.array(z.string()).optional()
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const { createTask, updateTask, groups, fetchGroups } = useTaskStore();
  
  React.useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);
  
  const defaultValues: TaskFormValues = {
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || TaskStatus.TODO,
    priority: task?.priority || TaskPriority.MEDIUM,
    dueDate: task?.dueDate ? new Date(task.dueDate) : null,
    assignee: task?.assignee || null,
    reporter: task?.reporter || null,
    groupId: task?.groupId || '',
    tags: task?.tags || []
  };
  
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues
  });
  
  const onSubmit = async (data: TaskFormValues) => {
    try {
      if (task?._id) {
        // Format the data for update
        const updateData: UpdateTaskDto = {
          ...data,
          dueDate: data.dueDate ? data.dueDate.toISOString() : null
        };
        await updateTask(task._id, updateData);
      } else {
        // Format the data for creation
        const createData: CreateTaskDto = {
          ...data,
          dueDate: data.dueDate ? data.dueDate.toISOString() : ''
        };
        await createTask(createData);
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          {task?._id ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
                      <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
                      <MenuItem value={TaskStatus.IN_REVIEW}>In Review</MenuItem>
                      <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
                    </Select>
                    {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.priority}>
                    <InputLabel>Priority</InputLabel>
                    <Select {...field} label="Priority">
                      <MenuItem value={TaskPriority.LOW}>
                        <Chip 
                          size="small" 
                          label="Low" 
                          sx={{ backgroundColor: '#ededed', fontWeight: 'bold' }}
                        />
                      </MenuItem>
                      <MenuItem value={TaskPriority.MEDIUM}>
                        <Chip 
                          size="small" 
                          label="Medium" 
                          color="info" 
                          sx={{ fontWeight: 'bold' }}
                        />
                      </MenuItem>
                      <MenuItem value={TaskPriority.HIGH}>
                        <Chip 
                          size="small" 
                          label="High" 
                          color="warning" 
                          sx={{ fontWeight: 'bold' }}
                        />
                      </MenuItem>
                      <MenuItem value={TaskPriority.CRITICAL}>
                        <Chip 
                          size="small" 
                          label="Critical" 
                          color="error" 
                          sx={{ fontWeight: 'bold' }}
                        />
                      </MenuItem>
                    </Select>
                    {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Box>
            
            <Controller
              name="groupId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.groupId}>
                  <InputLabel>Group</InputLabel>
                  <Select {...field} label="Group">
                    {groups.map(group => (
                      <MenuItem key={group._id} value={group._id}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.groupId && <FormHelperText>{errors.groupId.message}</FormHelperText>}
                </FormControl>
              )}
            />
            
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Due Date"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                />
              )}
            />
            
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={['frontend', 'backend', 'bug', 'feature', 'improvement']}
                  value={value || []}
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      placeholder="Add tags..."
                    />
                  )}
                />
              )}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => onSuccess()}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isSubmitting}
              >
                {task?._id ? 'Update Task' : 'Create Task'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default TaskForm;