import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search,
  School,
  Business,
  TrendingUp,
  People,
  Star,
} from '@mui/icons-material';
import EventCard from '../components/EventCard';
import { useData } from '../context/DataContext';

const Home = () => {
  const { getActiveEvents, getExpiredEvents } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTab, setSelectedTab] = useState(0);

  const activeEvents = getActiveEvents();

  const filteredEvents = activeEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getStats = () => {
    const totalEvents = activeEvents.length;
    const totalProviders = new Set(activeEvents.map(e => e.provider)).size;
    const totalParticipants = activeEvents.reduce((sum, e) => sum + e.currentParticipants, 0);
    
    return { totalEvents, totalProviders, totalParticipants };
  };

  const stats = getStats();

  return (
    <div className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Typography variant="h2" className="hero-title">
            IT Training Platform
          </Typography>
          <Typography variant="h5" className="hero-subtitle">
            Connect with top training providers for webinars, seminars, and courses
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{ textTransform: 'none', px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              to="#events"
              variant="outlined"
              size="large"
              sx={{ 
                textTransform: 'none', 
                px: 4, 
                py: 1.5,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Browse Events
            </Button>
          </Box>
        </Container>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Card className="stats-card" sx={{ textAlign: 'center', p: 3 }}>
                <TrendingUp sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.totalEvents}
                </Typography>
                <Typography variant="h6">Active Events</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className="stats-card success" sx={{ textAlign: 'center', p: 3 }}>
                <Business sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.totalProviders}
                </Typography>
                <Typography variant="h6">Training Providers</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className="stats-card warning" sx={{ textAlign: 'center', p: 3 }}>
                <People sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stats.totalParticipants}
                </Typography>
                <Typography variant="h6">Total Participants</Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Events Section */}
      <section id="events" style={{ padding: '60px 0', backgroundColor: '#f5f5f5' }}>
        <Container>
          <Typography variant="h3" className="section-title">
            Upcoming Events
          </Typography>
          <Typography variant="h6" className="section-subtitle">
            Discover the latest webinars, seminars, and courses from top IT training providers
          </Typography>

          {/* Search and Filter */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search events, providers, or topics..."
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
            
            <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab 
                label="All Events" 
                onClick={() => setSelectedType('all')}
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                label="Webinars" 
                onClick={() => setSelectedType('webinar')}
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                label="Seminars" 
                onClick={() => setSelectedType('seminar')}
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                label="Courses" 
                onClick={() => setSelectedType('course')}
                sx={{ textTransform: 'none' }}
              />
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
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No events found matching your criteria
              </Typography>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                }}
                sx={{ mt: 2, textTransform: 'none' }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Container>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
        <Container>
          <Typography variant="h3" className="section-title">
            Why Choose Our Platform?
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Quality Training
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  All training providers are vetted and approved by our team to ensure high-quality content.
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Business sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Direct Contact
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Connect directly with training providers for personalized learning experiences.
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Star sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Verified Reviews
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Read authentic reviews from previous participants to make informed decisions.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#1976d2', color: 'white' }}>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to Start Learning?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of professionals who trust our platform for their IT training needs
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{ 
                  textTransform: 'none', 
                  px: 4, 
                  py: 1.5,
                  backgroundColor: 'white',
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Get Started Today
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{ 
                  textTransform: 'none', 
                  px: 4, 
                  py: 1.5,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </section>
    </div>
  );
};

export default Home; 