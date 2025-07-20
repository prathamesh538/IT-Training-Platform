import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { isAfter, parseISO } from 'date-fns';

const DataContext = createContext();

const initialState = {
  events: [],
  users: [],
  currentUser: null,
  isAuthenticated: false,
  userRole: null, // 'admin', 'provider', 'student'
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_AUTHENTICATION':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_USER_ROLE':
      return { ...state, userRole: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null, isAuthenticated: false, userRole: null };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Initialize with sample data
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: 'React Advanced Patterns',
        type: 'webinar',
        description: 'Learn advanced React patterns and best practices for building scalable applications.',
        provider: 'TechAcademy Pro',
        providerEmail: 'contact@techacademypro.com',
        providerPhone: '+1-555-0123',
        date: '2024-02-15T14:00:00',
        duration: '2 hours',
        price: 49,
        maxParticipants: 50,
        currentParticipants: 23,
        status: 'approved',
        category: 'Frontend Development',
        requirements: 'Basic React knowledge',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        createdAt: '2024-01-15T10:00:00',
      },
      {
        id: 2,
        title: 'AWS Cloud Architecture',
        type: 'course',
        description: 'Comprehensive course on AWS cloud architecture and deployment strategies.',
        provider: 'Cloud Masters Institute',
        providerEmail: 'info@cloudmasters.com',
        providerPhone: '+1-555-0456',
        date: '2024-02-20T09:00:00',
        duration: '6 weeks',
        price: 299,
        maxParticipants: 30,
        currentParticipants: 18,
        status: 'approved',
        category: 'Cloud Computing',
        requirements: 'Basic IT knowledge',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        createdAt: '2024-01-10T14:30:00',
      },
      {
        id: 3,
        title: 'Cybersecurity Fundamentals',
        type: 'seminar',
        description: 'Essential cybersecurity concepts and practical defense strategies.',
        provider: 'SecureNet Academy',
        providerEmail: 'hello@securenet.com',
        providerPhone: '+1-555-0789',
        date: '2024-01-25T16:00:00',
        duration: '4 hours',
        price: 79,
        maxParticipants: 40,
        currentParticipants: 35,
        status: 'approved',
        category: 'Cybersecurity',
        requirements: 'None',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
        createdAt: '2024-01-05T11:15:00',
      },
    ];

    const sampleUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@itplatform.com',
        password: 'admin123',
        role: 'admin',
        organization: 'IT Training Platform',
      },
      {
        id: 2,
        name: 'TechAcademy Pro',
        email: 'contact@techacademypro.com',
        password: 'provider123',
        role: 'provider',
        organization: 'TechAcademy Pro',
        phone: '+1-555-0123',
        description: 'Leading provider of React and frontend development training.',
      },
      {
        id: 3,
        name: 'Cloud Masters Institute',
        email: 'info@cloudmasters.com',
        password: 'provider123',
        role: 'provider',
        organization: 'Cloud Masters Institute',
        phone: '+1-555-0456',
        description: 'Specialized in cloud computing and AWS training programs.',
      },
      {
        id: 4,
        name: 'Student User',
        email: 'student@example.com',
        password: 'student123',
        role: 'student',
        organization: 'Student',
      },
    ];

    dispatch({ type: 'SET_EVENTS', payload: sampleEvents });
    dispatch({ type: 'SET_USERS', payload: sampleUsers });
  }, []);

  // Filter expired events
  const getActiveEvents = () => {
    return state.events.filter(event => {
      const eventDate = parseISO(event.date);
      return isAfter(eventDate, new Date()) && event.status === 'approved';
    });
  };

  const getExpiredEvents = () => {
    return state.events.filter(event => {
      const eventDate = parseISO(event.date);
      return !isAfter(eventDate, new Date());
    });
  };

  const getPendingEvents = () => {
    return state.events.filter(event => event.status === 'pending');
  };

  const login = (email, password) => {
    // Simple authentication logic with email and password validation
    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
      dispatch({ type: 'SET_CURRENT_USER', payload: user });
      dispatch({ type: 'SET_AUTHENTICATION', payload: true });
      dispatch({ type: 'SET_USER_ROLE', payload: user.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      status: 'pending',
      currentParticipants: 0,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_EVENT', payload: newEvent });
    return newEvent;
  };

  const approveEvent = (eventId) => {
    const event = state.events.find(e => e.id === eventId);
    if (event) {
      const updatedEvent = { ...event, status: 'approved' };
      dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent });
    }
  };

  const rejectEvent = (eventId) => {
    const event = state.events.find(e => e.id === eventId);
    if (event) {
      const updatedEvent = { ...event, status: 'rejected' };
      dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent });
    }
  };

  const value = {
    ...state,
    getActiveEvents,
    getExpiredEvents,
    getPendingEvents,
    login,
    logout,
    addEvent,
    approveEvent,
    rejectEvent,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; 