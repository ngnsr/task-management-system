// src/App.tsx
import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  PaletteMode 
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import KanbanBoardPage from './pages/KanbanBoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskFormPage from './pages/TaskFormPage';
import GroupsPage from './pages/GroupsPage';
import GroupFormPage from './pages/GroupFormPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  
  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };
  
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb', // Blue
      },
      secondary: {
        main: '#8b5cf6', // Purple
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  }), [mode]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <AppLayout toggleTheme={toggleTheme} darkMode={mode === 'dark'}>
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/board" element={<KanbanBoardPage />} />
              
              {/* Task routes */}
              <Route path="/tasks/new" element={<TaskFormPage />} />
              <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
              <Route path="/tasks/:taskId/edit" element={<TaskFormPage />} />
              
              {/* Group routes */}
              <Route path="/groups" element={<GroupsPage />} />
              <Route path="/groups/new" element={<GroupFormPage />} />
              <Route path="/groups/:groupId/edit" element={<GroupFormPage />} />
              
              {/* Settings */}
              <Route path="/settings" element={<SettingsPage />} />
              
              {/* Fallbacks */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;