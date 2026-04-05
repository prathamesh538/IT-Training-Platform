import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Divider,
  Chip,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Phone,
  Business,
  AppRegistration,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const Register = () => {
  const { register } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    organization: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [isStudent] = useState(true); // For this demo, we're registering students

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const success = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || '',
      organization: formData.organization || 'Student',
      role: 'student',
    });

    if (success) {
      toast.success('Registration successful! You can now login.');
      // Auto-login the new student
      navigate('/login');
    } else {
      setError('Email already registered. Please use another email or login.');
      toast.error('Registration failed. Email might already exist.');
    }
  };

  return (
    <div className="main-content">
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AppRegistration sx={{ fontSize: 50, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Create Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join thousands of students learning new IT skills
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <Person sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              placeholder="John Doe"
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email Address"
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
              placeholder="you@example.com"
            />

            {/* Phone */}
            <TextField
              fullWidth
              label="Phone Number (Optional)"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              placeholder="+1-555-0000"
            />

            {/* Organization */}
            <TextField
              fullWidth
              label="School/Organization (Optional)"
              name="organization"
              type="text"
              value={formData.organization}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Business sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              placeholder="Your School Name"
            />

            {/* Password */}
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
              helperText="At least 6 characters"
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />

            {/* Terms & Conditions */}
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <span style={{ color: '#1976d2', cursor: 'pointer' }}>
                    Terms & Conditions
                  </span>
                </Typography>
              }
              sx={{ mt: 2, mb: 2 }}
            />

            {/* Register Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              size="large"
              startIcon={<AppRegistration />}
              sx={{ mt: 2, mb: 2, py: 1.5, textTransform: 'none' }}
            >
              Create Account
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Chip label="OR" />
          </Divider>

          {/* Login Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                Sign in here
              </Link>
            </Typography>
          </Box>

          {/* Features */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Why Join Us?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ✓ Access to hundreds of training courses
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ✓ Learn from industry experts
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ✓ Affordable pricing
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ✓ Flexible learning schedules
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
