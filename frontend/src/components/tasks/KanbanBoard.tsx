// src/components/tasks/KanbanBoard.tsx
import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Box, Paper, Typography, Chip, Button, Card, CardContent, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Task, TaskStatus } from '../../types';
import { useTaskStore } from '../../store/taskStore';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onAddTask: (status: TaskStatus) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, status, onAddTask }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 280, mx: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: 1,
          backgroundColor: '#f4f5f7',
          borderRadius: '4px 4px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {title} ({tasks.length})
        </Typography>
        <Button 
          size="small" 
          startIcon={<AddIcon />} 
          onClick={() => onAddTask(status)}
          sx={{ minWidth: 'auto', p: 0.5 }}
        >
          Add
        </Button>
      </Paper>
      
      <Droppable droppableId={status}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              backgroundColor: '#f4f5f7',
              p: 1,
              borderRadius: '0 0 4px 4px',
              minHeight: 500,
              height: '100%',
            }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ 
                      mb: 1, 
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Typography variant="body2" fontWeight="medium" gutterBottom>
                        {task.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Chip 
                          label={task.priority} 
                          size="small" 
                          color={
                            task.priority === 'critical' ? 'error' :
                            task.priority === 'high' ? 'warning' :
                            task.priority === 'medium' ? 'info' : 'default'
                          }
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        {task.tags && task.tags.length > 0 && (
                          <Chip 
                            label={task.tags[0]} 
                            size="small" 
                            sx={{ ml: 0.5, height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

const KanbanBoard: React.FC = () => {
  const { 
    tasks, 
    isLoading, 
    fetchTasks, 
    updateTask, 
    selectedGroup, 
    fetchTasksByGroup 
  } = useTaskStore();

  useEffect(() => {
    if (selectedGroup) {
      fetchTasksByGroup(selectedGroup._id);
    } else {
      fetchTasks();
    }
  }, [fetchTasks, fetchTasksByGroup, selectedGroup]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If no destination or same position, do nothing
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Update task status
    const task = tasks.find(t => t._id === draggableId);
    if (task) {
      updateTask(task._id, { 
        status: destination.droppableId as TaskStatus 
      });
    }
  };

  const handleAddTask = (status: TaskStatus) => {
    // Implement a modal or navigation to task creation form
    console.log(`Add task with status: ${status}`);
    // This would typically open a modal or navigate to task creation page
  };

  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === TaskStatus.TODO);
  const inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
  const inReviewTasks = tasks.filter(task => task.status === TaskStatus.IN_REVIEW);
  const doneTasks = tasks.filter(task => task.status === TaskStatus.DONE);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', p: 2 }}>
        {[1, 2, 3, 4].map((column) => (
          <Box key={column} sx={{ width: 280, mx: 1 }}>
            <Skeleton variant="rectangular" height={40} />
            <Box sx={{ mt: 1 }}>
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} variant="rectangular" height={80} sx={{ mb: 1 }} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', overflowX: 'auto', p: 2, height: 'calc(100vh - 120px)' }}>
        <KanbanColumn 
          title="To Do" 
          tasks={todoTasks} 
          status={TaskStatus.TODO} 
          onAddTask={handleAddTask} 
        />
        <KanbanColumn 
          title="In Progress" 
          tasks={inProgressTasks} 
          status={TaskStatus.IN_PROGRESS} 
          onAddTask={handleAddTask} 
        />
        <KanbanColumn 
          title="In Review" 
          tasks={inReviewTasks} 
          status={TaskStatus.IN_REVIEW} 
          onAddTask={handleAddTask} 
        />
        <KanbanColumn 
          title="Done" 
          tasks={doneTasks} 
          status={TaskStatus.DONE} 
          onAddTask={handleAddTask} 
        />
      </Box>
    </DragDropContext>
  );
};

export default KanbanBoard;