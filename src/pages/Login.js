import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import {
  School,
  Business,
  AdminPanelSettings,
  Email,
  Lock,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(formData.email, formData.password);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      setError('Invalid email or password');
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const demoAccounts = [
    {
      role: 'admin',
      email: 'admin@itplatform.com',
      password: 'admin123',
      title: 'Admin Dashboard',
      description: 'Manage events, approve providers, and oversee the platform',
      icon: <AdminPanelSettings sx={{ fontSize: 40 }} />,
      color: 'error',
    },
    {
      role: 'provider',
      email: 'contact@techacademypro.com',
      password: 'provider123',
      title: 'Provider Dashboard',
      description: 'Create and manage your training events',
      icon: <Business sx={{ fontSize: 40 }} />,
      color: 'primary',
    },
    {
      role: 'student',
      email: 'student@example.com',
      password: 'student123',
      title: 'Student Portal',
      description: 'Browse and enroll in training events',
      icon: <School sx={{ fontSize: 40 }} />,
      color: 'success',
    },
  ];

  const fillDemoAccount = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  return (
    <div className="main-content">
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Login Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign in to access your dashboard
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<LoginIcon />}
                  sx={{ mt: 3, mb: 2, py: 1.5, textTransform: 'none' }}
                >
                  Sign In
                </Button>
              </form>

              <Divider sx={{ my: 3 }}>
                <Chip label="OR" />
              </Divider>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Don't have an account? Contact us to get started as a training provider.
              </Typography>
            </Paper>
          </Grid>

          {/* Demo Accounts */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Try Demo Accounts
            </Typography>
            
            <Grid container spacing={2}>
              {demoAccounts.map((account) => (
                <Grid item xs={12} key={account.role}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                    onClick={() => fillDemoAccount(account.email, account.password)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ color: `${account.color}.main`, mr: 2 }}>
                          {account.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {account.title}
                          </Typography>
                          <Chip 
                            label={account.role.toUpperCase()} 
                            color={account.color}
                            size="small"
                            sx={{ textTransform: 'uppercase' }}
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {account.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          Email: {account.email}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          color={account.color}
                          sx={{ textTransform: 'none' }}
                        >
                          Use This Account
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Platform Features
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Auto-expiring events after their scheduled date
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Direct contact between students and providers
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Admin approval system for quality control
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Real-time event management and analytics
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login; 