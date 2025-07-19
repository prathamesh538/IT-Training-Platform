import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Card,
} from '@mui/material';
import {
  Save,
  Cancel,
  Event,
  Business,
  AttachMoney,
  People,
  Description,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const EventForm = () => {
  const { events, addEvent, currentUser } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    category: '',
    date: '',
    time: '',
    duration: '',
    price: '',
    maxParticipants: '',
    requirements: '',
    image: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      const event = events.find(e => e.id === parseInt(id));
      if (event) {
        const eventDate = new Date(event.date);
        setFormData({
          title: event.title,
          type: event.type,
          description: event.description,
          category: event.category,
          date: eventDate.toISOString().split('T')[0],
          time: eventDate.toTimeString().split(' ')[0].substring(0, 5),
          duration: event.duration,
          price: event.price.toString(),
          maxParticipants: event.maxParticipants.toString(),
          requirements: event.requirements,
          image: event.image,
        });
      }
    }
  }, [id, events, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.type) {
      newErrors.type = 'Event type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date + 'T' + (formData.time || '00:00'));
      if (selectedDate <= new Date()) {
        newErrors.date = 'Event date must be in the future';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.maxParticipants || formData.maxParticipants <= 0) {
      newErrors.maxParticipants = 'Maximum participants must be greater than 0';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const eventData = {
      ...formData,
      provider: currentUser.name,
      providerEmail: currentUser.email,
      providerPhone: currentUser.phone || '',
      date: new Date(formData.date + 'T' + formData.time).toISOString(),
      price: parseFloat(formData.price),
      maxParticipants: parseInt(formData.maxParticipants),
    };

    if (isEditing) {
      // Update existing event
      toast.success('Event updated successfully!');
    } else {
      // Create new event
      addEvent(eventData);
      toast.success('Event created successfully! It will be reviewed by admin.');
    }

    navigate('/provider');
  };

  const handleCancel = () => {
    navigate('/provider');
  };

  const categories = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile Development',
    'Cloud Computing',
    'Cybersecurity',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Database Management',
    'UI/UX Design',
    'Project Management',
    'Agile/Scrum',
    'Other',
  ];

  return (
    <div className="main-content">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              {isEditing ? 'Edit Event' : 'Create New Event'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isEditing ? 'Update your training event details' : 'Add a new training event to your portfolio'}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Event sx={{ mr: 1 }} />
                  Basic Information
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.type} required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Event Type"
                  >
                    <MenuItem value="webinar">Webinar</MenuItem>
                    <MenuItem value="seminar">Seminar</MenuItem>
                    <MenuItem value="course">Course</MenuItem>
                  </Select>
                  {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.category} required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </Grid>

              {/* Date and Time */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Business sx={{ mr: 1 }} />
                  Schedule
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  error={!!errors.time}
                  helperText={errors.time}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 2 hours, 6 weeks"
                  error={!!errors.duration}
                  helperText={errors.duration}
                  required
                />
              </Grid>

              {/* Pricing and Capacity */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <AttachMoney sx={{ mr: 1 }} />
                  Pricing & Capacity
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price ($)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  required
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ color: 'text.secondary' }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Participants"
                  name="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  error={!!errors.maxParticipants}
                  helperText={errors.maxParticipants}
                  required
                  InputProps={{
                    startAdornment: <People sx={{ color: 'text.secondary' }} />,
                  }}
                />
              </Grid>

              {/* Additional Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <Description sx={{ mr: 1 }} />
                  Additional Information
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="e.g., Basic React knowledge, None"
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  error={!!errors.image}
                  helperText={errors.image || 'Provide a URL for the event image'}
                  required
                />
              </Grid>

              {/* Preview Card */}
              {formData.title && formData.image && (
                <Grid item xs={12}>
                  <Card sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="h6" gutterBottom>
                      Event Preview
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=Image+Error';
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {formData.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formData.type} • {formData.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${formData.price} • {formData.maxParticipants} participants
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              )}

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    startIcon={<Cancel />}
                    sx={{ textTransform: 'none' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    sx={{ textTransform: 'none' }}
                  >
                    {isEditing ? 'Update Event' : 'Create Event'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default EventForm; 