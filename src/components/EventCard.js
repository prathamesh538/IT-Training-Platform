import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  People,
  AttachMoney,
  Business,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { format, isAfter, parseISO } from 'date-fns';
import { useData } from '../context/DataContext';

const EventCard = ({ event, showActions = false, onApprove, onReject, onEdit, onDelete }) => {
  const { currentUser } = useData();
  const eventDate = parseISO(event.date);
  const isExpired = !isAfter(eventDate, new Date());
  const isOwner = currentUser?.email === event.providerEmail;

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
        return 'PENDING';
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
    <Card 
      className={`event-card ${isExpired ? 'expired' : ''}`}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: isExpired ? 0.6 : 1,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={event.image}
        alt={event.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Chip
            label={event.type.toUpperCase()}
            color={getTypeColor()}
            size="small"
            sx={{ textTransform: 'uppercase' }}
          />
          <Chip
            label={getStatusText()}
            color={getStatusColor()}
            size="small"
            variant="outlined"
          />
        </Box>

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {event.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {event.description.length > 120
            ? `${event.description.substring(0, 120)}...`
            : event.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Business sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {event.provider}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {format(eventDate, 'MMM dd, yyyy')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {format(eventDate, 'HH:mm')} • {event.duration}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <People sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {event.currentParticipants}/{event.maxParticipants} participants
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              ${event.price}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            component={Link}
            to={`/events/${event.id}`}
            variant="contained"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            View Details
          </Button>

          {showActions && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {event.status === 'pending' && (
                <>
                  <Tooltip title="Approve">
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => onApprove(event.id)}
                    >
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onReject(event.id)}
                    >
                      <Cancel />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              
              {isOwner && (
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/edit-event/${event.id}`}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(event.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard; 