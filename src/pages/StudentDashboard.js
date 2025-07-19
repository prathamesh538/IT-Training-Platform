import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Alert,
  Button,
} from '@mui/material';
import {
  Search,
  School,
  Category,
  Event,
} from '@mui/icons-material';
import EventCard from '../components/EventCard';
import { useData } from '../context/DataContext';

const StudentDashboard = () => {
  const { getActiveEvents, getExpiredEvents } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTab, setSelectedTab] = useState(0);

  const activeEvents = getActiveEvents();

  const filteredEvents = activeEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getStats = () => {
    const categories = [...new Set(activeEvents.map(e => e.category))];
    const totalProviders = new Set(activeEvents.map(e => e.provider)).size;
    const avgPrice = activeEvents.length > 0 ? 
      Math.round(activeEvents.reduce((sum, e) => sum + e.price, 0) / activeEvents.length) : 0;
    
    return { categories: categories.length, totalProviders, avgPrice };
  };

  const stats = getStats();

  const getTabContent = () => {
    switch (selectedTab) {
      case 0: // Browse Events
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Browse Training Events
            </Typography>
            
            {/* Search and Filter */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                placeholder="Search events, providers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Tabs value={selectedType} onChange={(e, newValue) => setSelectedType(newValue)} sx={{ mb: 3 }}>
                <Tab value="all" label="All Events" sx={{ textTransform: 'none' }} />
                <Tab value="webinar" label="Webinars" sx={{ textTransform: 'none' }} />
                <Tab value="seminar" label="Seminars" sx={{ textTransform: 'none' }} />
                <Tab value="course" label="Courses" sx={{ textTransform: 'none' }} />
              </Tabs>
            </Box>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <Grid container spacing={3}>
                {filteredEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <EventCard event={event} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">
                No events found matching your criteria. Try adjusting your search or filters.
              </Alert>
            )}
          </Box>
        );

      case 1: // Categories
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Browse by Category
            </Typography>
            
            <Grid container spacing={3}>
              {[...new Set(activeEvents.map(e => e.category))].map((category) => {
                const categoryEvents = activeEvents.filter(e => e.category === category);
                const avgPrice = Math.round(categoryEvents.reduce((sum, e) => sum + e.price, 0) / categoryEvents.length);
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={category}>
                    <Card sx={{ p: 3, cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Category sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {category}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {categoryEvents.length} events available
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Average Price: ${avgPrice}
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          setSelectedType('all');
                          setSearchTerm(category);
                          setSelectedTab(0);
                        }}
                        sx={{ textTransform: 'none' }}
                      >
                        View Events
                      </Button>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );

      case 2: // Providers
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Training Providers
            </Typography>
            
            <Grid container spacing={3}>
              {[...new Set(activeEvents.map(e => e.provider))].map((provider) => {
                const providerEvents = activeEvents.filter(e => e.provider === provider);
                const providerInfo = {
                  name: provider,
                  email: providerEvents[0]?.providerEmail,
                  phone: providerEvents[0]?.providerPhone,
                  eventCount: providerEvents.length,
                  avgPrice: Math.round(providerEvents.reduce((sum, e) => sum + e.price, 0) / providerEvents.length),
                };
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={provider}>
                    <Card sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <School sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {providerInfo.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {providerInfo.eventCount} events available
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Average Price: ${providerInfo.avgPrice}
                        </Typography>
                        {providerInfo.email && (
                          <Typography variant="body2" color="text.secondary">
                            Email: {providerInfo.email}
                          </Typography>
                        )}
                        {providerInfo.phone && (
                          <Typography variant="body2" color="text.secondary">
                            Phone: {providerInfo.phone}
                          </Typography>
                        )}
                      </Box>
                      
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          setSelectedType('all');
                          setSearchTerm(provider);
                          setSelectedTab(0);
                        }}
                        sx={{ textTransform: 'none' }}
                      >
                        View Events
                      </Button>
                    </Card>
                  </Grid>
                );
              })}
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
            Student Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover and enroll in IT training events from top providers
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card className="stats-card" sx={{ textAlign: 'center', p: 3 }}>
              <Event sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {activeEvents.length}
              </Typography>
              <Typography variant="h6">Available Events</Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card className="stats-card success" sx={{ textAlign: 'center', p: 3 }}>
              <Category sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {stats.categories}
              </Typography>
              <Typography variant="h6">Categories</Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card className="stats-card warning" sx={{ textAlign: 'center', p: 3 }}>
              <School sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {stats.totalProviders}
              </Typography>
              <Typography variant="h6">Providers</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Browse Events" sx={{ textTransform: 'none' }} />
            <Tab label="Categories" sx={{ textTransform: 'none' }} />
            <Tab label="Providers" sx={{ textTransform: 'none' }} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {getTabContent()}
      </Container>
    </div>
  );
};

export default StudentDashboard; 