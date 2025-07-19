import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Event,
  People,
  AttachMoney,
  CheckCircle,
  PendingActions,
  Business,
} from '@mui/icons-material';
import EventCard from '../components/EventCard';
import { useData } from '../context/DataContext';

const ProviderDashboard = () => {
  const { currentUser, events, getActiveEvents } = useData();
  const [selectedTab, setSelectedTab] = useState(0);

  // Filter events for current provider
  const myEvents = events.filter(event => event.providerEmail === currentUser?.email);
  const myActiveEvents = myEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate > new Date() && event.status === 'approved';
  });
  const myPendingEvents = myEvents.filter(event => event.status === 'pending');
  const myExpiredEvents = myEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate <= new Date();
  });

  const stats = {
    totalEvents: myEvents.length,
    activeEvents: myActiveEvents.length,
    pendingEvents: myPendingEvents.length,
    expiredEvents: myExpiredEvents.length,
    totalParticipants: myActiveEvents.reduce((sum, e) => sum + e.currentParticipants, 0),
    totalRevenue: myActiveEvents.reduce((sum, e) => sum + (e.currentParticipants * e.price), 0),
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getTabContent = () => {
    switch (selectedTab) {
      case 0: // Overview
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Welcome back, {currentUser?.name}!
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
                <People sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.totalParticipants}
                </Typography>
                <Typography variant="h6">Participants</Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stats-card error" sx={{ textAlign: 'center', p: 3 }}>
                <AttachMoney sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ${stats.totalRevenue}
                </Typography>
                <Typography variant="h6">Revenue</Typography>
              </Card>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    component={Link}
                    to="/create-event"
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
                  >
                    Create New Event
                  </Button>
                  <Button
                    component={Link}
                    to="#pending"
                    variant="outlined"
                    startIcon={<PendingActions />}
                    sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
                  >
                    View Pending Events
                  </Button>
                </Box>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Events
                </Typography>
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {myEvents.slice(0, 5).map((event) => (
                    <Box key={event.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.type} • {new Date(event.date).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Chip 
                          label={event.status.toUpperCase()} 
                          color={event.status === 'approved' ? 'success' : event.status === 'pending' ? 'warning' : 'error'}
                          size="small"
                          sx={{ textTransform: 'uppercase' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {event.currentParticipants}/{event.maxParticipants} participants
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>

            {/* Performance Metrics */}
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Performance Metrics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Event Approval Rate
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={stats.totalEvents > 0 ? (stats.activeEvents / stats.totalEvents) * 100 : 0}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {stats.totalEvents > 0 ? Math.round((stats.activeEvents / stats.totalEvents) * 100) : 0}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Average Participation Rate
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={myActiveEvents.length > 0 ? 
                            (myActiveEvents.reduce((sum, e) => sum + (e.currentParticipants / e.maxParticipants), 0) / myActiveEvents.length) * 100 : 0}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {myActiveEvents.length > 0 ? 
                            Math.round((myActiveEvents.reduce((sum, e) => sum + (e.currentParticipants / e.maxParticipants), 0) / myActiveEvents.length) * 100) : 0}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        );

      case 1: // Active Events
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Active Events ({myActiveEvents.length})
            </Typography>
            
            {myActiveEvents.length === 0 ? (
              <Alert severity="info">
                No active events. <Link to="/create-event">Create your first event</Link> to get started!
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {myActiveEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <EventCard event={event} showActions={true} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );

      case 2: // Pending Events
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Pending Approval ({myPendingEvents.length})
            </Typography>
            
            {myPendingEvents.length === 0 ? (
              <Alert severity="info">
                No events pending approval.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {myPendingEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <EventCard event={event} showActions={true} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );

      case 3: // All Events
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              All My Events ({myEvents.length})
            </Typography>
            
            <Grid container spacing={3}>
              {myEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <EventCard event={event} showActions={true} />
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
            Provider Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your training events and track your performance
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Overview" sx={{ textTransform: 'none' }} />
            <Tab 
              label={`Active Events (${myActiveEvents.length})`} 
              sx={{ textTransform: 'none' }} 
            />
            <Tab 
              label={`Pending (${myPendingEvents.length})`} 
              sx={{ textTransform: 'none' }} 
            />
            <Tab label="All Events" sx={{ textTransform: 'none' }} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {getTabContent()}
      </Container>
    </div>
  );
};

export default ProviderDashboard; 