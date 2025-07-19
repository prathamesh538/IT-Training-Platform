import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  People,
  AttachMoney,
  Business,
  Email,
  Phone,
  School,
} from '@mui/icons-material';
import { format, isAfter, parseISO } from 'date-fns';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const EventDetail = () => {
  const { id } = useParams();
  const { events, currentUser } = useData();
  const [contactDialog, setContactDialog] = useState(false);
  const [enrollmentDialog, setEnrollmentDialog] = useState(false);

  const event = events.find(e => e.id === parseInt(id));
  const eventDate = event ? parseISO(event.date) : null;
  const isExpired = eventDate ? !isAfter(eventDate, new Date()) : false;
  const isFull = event ? event.currentParticipants >= event.maxParticipants : false;
  const canEnroll = event && !isExpired && !isFull && event.status === 'approved';

  if (!event) {
    return (
      <div className="main-content">
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="error">
            Event not found. <Link to="/">Return to home</Link>
          </Alert>
        </Container>
      </div>
    );
  }

  const handleContact = () => {
    setContactDialog(true);
  };

  const handleEnroll = () => {
    if (!currentUser) {
      toast.error('Please log in to enroll in events');
      return;
    }
    setEnrollmentDialog(true);
  };

  const getStatusColor = () => {
    if (isExpired) return 'default';
    switch (event.status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = () => {
    if (isExpired) return 'EXPIRED';
    switch (event.status) {
      case 'approved':
        return 'APPROVED';
      case 'pending':
        return 'PENDING APPROVAL';
      case 'rejected':
        return 'REJECTED';
      default:
        return 'UNKNOWN';
    }
  };

  const getTypeColor = () => {
    switch (event.type) {
      case 'webinar':
        return 'primary';
      case 'seminar':
        return 'secondary';
      case 'course':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="main-content">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Event Image */}
          <Grid item xs={12} md={6}>
            <Card sx={{ overflow: 'hidden' }}>
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Event+Image';
                }}
              />
            </Card>
          </Grid>

          {/* Event Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={event.type.toUpperCase()}
                  color={getTypeColor()}
                  sx={{ textTransform: 'uppercase' }}
                />
                <Chip
                  label={getStatusText()}
                  color={getStatusColor()}
                  variant="outlined"
                  sx={{ textTransform: 'uppercase' }}
                />
              </Box>

              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                {event.title}
              </Typography>

              <Typography variant="h6" color="text.secondary" gutterBottom>
                by {event.provider}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {event.description}
              </Typography>
            </Box>

            {/* Event Info */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date & Time"
                      secondary={format(eventDate, 'EEEE, MMMM dd, yyyy')}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Time"
                      secondary={format(eventDate, 'HH:mm')}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AccessTime color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Duration"
                      secondary={event.duration}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <People color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Participants"
                      secondary={`${event.currentParticipants}/${event.maxParticipants} enrolled`}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoney color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Price"
                      secondary={`$${event.price}`}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <School color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Category"
                      secondary={event.category}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Requirements */}
            {event.requirements && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Requirements
                  </Typography>
                  <Typography variant="body1">
                    {event.requirements}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* Status Alerts */}
            {isExpired && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                This event has already taken place.
              </Alert>
            )}

            {isFull && !isExpired && (
              <Alert severity="info" sx={{ mb: 3 }}>
                This event is full. Contact the provider for availability.
              </Alert>
            )}

            {event.status === 'pending' && (
              <Alert severity="info" sx={{ mb: 3 }}>
                This event is pending approval by admin.
              </Alert>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {canEnroll && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleEnroll}
                  sx={{ textTransform: 'none', px: 4 }}
                >
                  Enroll Now
                </Button>
              )}
              
              <Button
                variant="outlined"
                size="large"
                onClick={handleContact}
                sx={{ textTransform: 'none', px: 4 }}
              >
                Contact Provider
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Provider Information */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  About the Provider
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Business sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {event.provider}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Professional Training Provider
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {event.providerEmail}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  {event.providerPhone && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {event.providerPhone}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Contact Dialog */}
        <Dialog open={contactDialog} onClose={() => setContactDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Contact Provider</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Get in touch with <strong>{event.provider}</strong> about this event.
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">
                  {event.providerEmail}
                </Typography>
              </Box>
              
              {event.providerPhone && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1">
                    {event.providerPhone}
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              Please mention the event "{event.title}" when contacting the provider.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setContactDialog(false)}>Close</Button>
            <Button 
              variant="contained" 
              onClick={() => {
                window.open(`mailto:${event.providerEmail}?subject=Inquiry about ${event.title}`);
                setContactDialog(false);
              }}
            >
              Send Email
            </Button>
          </DialogActions>
        </Dialog>

        {/* Enrollment Dialog */}
        <Dialog open={enrollmentDialog} onClose={() => setEnrollmentDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Enroll in Event</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              You're about to enroll in <strong>{event.title}</strong>.
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Event Details
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Date:</Typography>
                <Typography>{format(eventDate, 'MMM dd, yyyy')}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Time:</Typography>
                <Typography>{format(eventDate, 'HH:mm')}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Duration:</Typography>
                <Typography>{event.duration}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Price:</Typography>
                <Typography>${event.price}</Typography>
              </Box>
            </Box>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              After enrollment, you'll receive contact information to coordinate with the provider.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEnrollmentDialog(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={() => {
                toast.success('Enrollment successful! Check your email for details.');
                setEnrollmentDialog(false);
              }}
            >
              Confirm Enrollment
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default EventDetail; 