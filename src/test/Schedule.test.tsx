import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Schedule } from '../components/schedule/Schedule';
import { BrowserRouter } from 'react-router-dom';

describe('Schedule Component', () => {
  it('should render schedule header', () => {
    render(
      <BrowserRouter>
        <Schedule />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Aircraft Schedule')).toBeInTheDocument();
  });

  it('should render weekly and monthly toggle buttons', () => {
    render(
      <BrowserRouter>
        <Schedule />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
  });

  it('should render navigation buttons', () => {
    render(
      <BrowserRouter>
        <Schedule />
      </BrowserRouter>
    );
    
    expect(screen.getByText('← Prev')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Next →')).toBeInTheDocument();
  });
});
