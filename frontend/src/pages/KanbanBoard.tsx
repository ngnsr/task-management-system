// src/pages/KanbanBoardPage.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Divider,
  Breadcrumbs,
  FormControl,
  InputLabel,
  Select,
  Link as MuiLink,
  SelectChangeEvent
} from '@mui/material';
import { 
  FilterList as FilterIcon, 
  Add as AddIcon,
  MoreVert as MoreIcon 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import KanbanBoard from '../components/tasks/KanbanBoard';
import { useTaskStore } from '../store/taskStore';

const KanbanBoardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    groups, 
    fetchGroups, 
    selectedGroup, 
    getGroupById,
    clearFilters
  } = useTaskStore();
  
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  
  useEffect(() => {
    fetchGroups();
    clearFilters();
  }, [fetchGroups, clearFilters]);
  
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };
  
  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };
  
  const handleGroupChange =  (event: SelectChangeEvent<string>) => {
    const groupId = event.target.value as string;
    if (groupId) {
      getGroupById(groupId);
    } else {
      // Clear selected group
      useTaskStore.setState({ selectedGroup: null });
    }
  };
  
  const handleCreateTask = () => {
    navigate('/tasks/new');
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box 
        sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiLink component={Link} to="/" underline="hover" color="inherit">
                Home
              </MuiLink>
              <Typography color="text.primary">Kanban Board</Typography>
              {selectedGroup && (
                <Typography color="text.primary">{selectedGroup.name}</Typography>
              )}
            </Breadcrumbs>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
              {selectedGroup ? selectedGroup.name : 'All Tasks'}
            </Typography>
          </Box>
          
          <Box>
            <IconButton 
              aria-label="filter tasks" 
              onClick={handleFilterClick}
              sx={{ mr: 1 }}
            >
              <FilterIcon />
            </IconButton>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={handleFilterClose}>Filter by assignee</MenuItem>
              <MenuItem onClick={handleFilterClose}>Filter by priority</MenuItem>
              <MenuItem onClick={handleFilterClose}>Filter by due date</MenuItem>
              <Divider />
              <MenuItem onClick={handleFilterClose}>Clear filters</MenuItem>
            </Menu>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateTask}
            >
              New Task
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              value={selectedGroup?._id || ''}
              onChange={handleGroupChange}
              label="Group"
            >
              <MenuItem value="">
                <em>All Groups</em>
              </MenuItem>
              {groups.map((group) => (
                <MenuItem key={group._id} value={group._id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <IconButton onClick={handleMoreClick}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={moreAnchorEl}
            open={Boolean(moreAnchorEl)}
            onClose={handleMoreClose}
          >
            <MenuItem onClick={handleMoreClose}>Save view</MenuItem>
            <MenuItem onClick={handleMoreClose}>Export tasks</MenuItem>
            <MenuItem onClick={handleMoreClose}>Board settings</MenuItem>
          </Menu>
        </Box>
      </Box>
      
      {/* Kanban Board */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <KanbanBoard />
      </Box>
    </Box>
  );
};

export default KanbanBoardPage;