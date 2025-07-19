import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  Button,
  Tabs,
  Tab,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PendingActions,
  CheckCircle,
  Business,
  Event,
} from '@mui/icons-material';
import EventCard from '../components/EventCard';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { 
    events, 
    users, 
    getActiveEvents, 
    getPendingEvents, 
    getExpiredEvents,
    approveEvent,
    rejectEvent,
  } = useData();
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [rejectionDialog, setRejectionDialog] = useState(false);

  const activeEvents = getActiveEvents();
  const pendingEvents = getPendingEvents();
  const expiredEvents = getExpiredEvents();
  const providers = users.filter(user => user.role === 'provider');

  const stats = {
    totalEvents: events.length,
    activeEvents: activeEvents.length,
    pendingEvents: pendingEvents.length,
    expiredEvents: expiredEvents.length,
    totalProviders: providers.length,
    totalParticipants: activeEvents.reduce((sum, e) => sum + e.currentParticipants, 0),
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleApprove = (eventId) => {
    setSelectedEvent(events.find(e => e.id === eventId));
    setApprovalDialog(true);
  };

  const handleReject = (eventId) => {
    setSelectedEvent(events.find(e => e.id === eventId));
    setRejectionDialog(true);
  };

  const confirmApprove = () => {
    if (selectedEvent) {
      approveEvent(selectedEvent.id);
      toast.success('Event approved successfully!');
      setApprovalDialog(false);
      setSelectedEvent(null);
    }
  };

  const confirmReject = () => {
    if (selectedEvent) {
      rejectEvent(selectedEvent.id);
      toast.success('Event rejected successfully!');
      setRejectionDialog(false);
      setSelectedEvent(null);
    }
  };

  const getTabContent = () => {
    switch (selectedTab) {
      case 0: // Overview
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Platform Overview
              </Typography>
            </Grid>
            
            {/* Stats Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stats-card" sx={{ textAlign: 'center', p: 3 }}>
                <Event sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.totalEvents}
                </Typography>
                <Typography variant="h6">Total Events</Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stats-card success" sx={{ textAlign: 'center', p: 3 }}>
                <CheckCircle sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.activeEvents}
                </Typography>
                <Typography variant="h6">Active Events</Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stats-card warning" sx={{ textAlign: 'center', p: 3 }}>
                <PendingActions sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.pendingEvents}
                </Typography>
                <Typography variant="h6">Pending Approval</Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stats-card error" sx={{ textAlign: 'center', p: 3 }}>
                <Business sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.totalProviders}
                </Typography>
                <Typography variant="h6">Providers</Typography>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Events
                </Typography>
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {events.slice(0, 5).map((event) => (
                    <Box key={event.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.provider} • {event.type}
                      </Typography>
                      <Chip 
                        label={event.status.toUpperCase()} 
                        color={event.status === 'approved' ? 'success' : event.status === 'pending' ? 'warning' : 'error'}
                        size="small"
                        sx={{ mt: 1, textTransform: 'uppercase' }}
                      />
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Platform Statistics
                </Typography>
                <Box sx={{ space: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Total Participants:</Typography>
                    <Typography sx={{ fontWeight: 600 }}>{stats.totalParticipants}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Expired Events:</Typography>
                    <Typography sx={{ fontWeight: 600 }}>{stats.expiredEvents}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Approval Rate:</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {stats.totalEvents > 0 ? Math.round((stats.activeEvents / stats.totalEvents) * 100) : 0}%
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        );

      case 1: // Pending Approval
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Pending Approval ({pendingEvents.length})
            </Typography>
            
            {pendingEvents.length === 0 ? (
              <Alert severity="info">
                No events pending approval at the moment.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {pendingEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <EventCard 
                      event={event} 
                      showActions={true}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );

      case 2: // All Events
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              All Events ({events.length})
            </Typography>
            
            <Grid container spacing={3}>
              {events.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <EventCard 
                    event={event} 
                    showActions={true}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 3: // Providers
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Training Providers ({providers.length})
            </Typography>
            
            <Grid container spacing={3}>
              {providers.map((provider) => (
                <Grid item xs={12} sm={6} md={4} key={provider.id}>
                  <Card sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Business sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {provider.name}
                        </Typography>
                        <Chip 
                          label="PROVIDER" 
                          color="primary" 
                          size="small"
                          sx={{ textTransform: 'uppercase' }}
                        />
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {provider.description || 'No description available'}
                    </Typography>
                    
                    <Box sx={{ space: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Email: {provider.email}
                      </Typography>
                      {provider.phone && (
                        <Typography variant="body2" color="text.secondary">
                          Phone: {provider.phone}
                        </Typography>
                      )}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-content">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage the platform, approve events, and monitor activity
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Overview" sx={{ textTransform: 'none' }} />
            <Tab 
              label={`Pending Approval (${pendingEvents.length})`} 
              sx={{ textTransform: 'none' }} 
            />
            <Tab label="All Events" sx={{ textTransform: 'none' }} />
            <Tab label="Providers" sx={{ textTransform: 'none' }} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {getTabContent()}

        {/* Approval Dialog */}
        <Dialog open={approvalDialog} onClose={() => setApprovalDialog(false)}>
          <DialogTitle>Approve Event</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to approve "{selectedEvent?.title}"?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setApprovalDialog(false)}>Cancel</Button>
            <Button onClick={confirmApprove} color="success" variant="contained">
              Approve
            </Button>
          </DialogActions>
        </Dialog>

        {/* Rejection Dialog */}
        <Dialog open={rejectionDialog} onClose={() => setRejectionDialog(false)}>
          <DialogTitle>Reject Event</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to reject "{selectedEvent?.title}"?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRejectionDialog(false)}>Cancel</Button>
            <Button onClick={confirmReject} color="error" variant="contained">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AdminDashboard; 