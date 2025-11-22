import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Sortie } from '../../types';
import './SortieModal.css';

interface SortieModalProps {
  sortie?: Sortie;
  onSave: (sortie: Sortie) => void;
  onClose: () => void;
}

export const SortieModal: React.FC<SortieModalProps> = ({ sortie, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Sortie>>({
    id: sortie?.id || `S-${Date.now()}`,
    missionNumber: sortie?.missionNumber || '',
    aircraft: sortie?.aircraft || '',
    tailNumber: sortie?.tailNumber || '',
    crew: sortie?.crew || [],
    status: sortie?.status || 'scheduled',
    missionType: sortie?.missionType || 'training',
    scheduledTime: sortie?.scheduledTime || new Date(),
    actualTime: sortie?.actualTime,
    duration: sortie?.duration || 60,
    location: sortie?.location || ''
  });

  const [crewInput, setCrewInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.missionNumber) newErrors.missionNumber = 'Mission number is required';
    if (!formData.aircraft) newErrors.aircraft = 'Aircraft type is required';
    if (!formData.tailNumber) newErrors.tailNumber = 'Tail number is required';
    if (!formData.crew || formData.crew.length === 0) newErrors.crew = 'At least one crew member is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.duration || formData.duration < 1) newErrors.duration = 'Duration must be at least 1 minute';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData as Sortie);
    }
  };

  const addCrewMember = () => {
    if (crewInput.trim()) {
      setFormData({
        ...formData,
        crew: [...(formData.crew || []), crewInput.trim()]
      });
      setCrewInput('');
    }
  };

  const removeCrewMember = (index: number) => {
    setFormData({
      ...formData,
      crew: formData.crew?.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{sortie ? 'Edit Sortie' : 'Add New Sortie'}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Mission Number *</label>
              <input
                type="text"
                value={formData.missionNumber}
                onChange={e => setFormData({ ...formData, missionNumber: e.target.value })}
                placeholder="e.g., TRN-2024-001"
              />
              {errors.missionNumber && <span className="error">{errors.missionNumber}</span>}
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as Sortie['status'] })}
              >
                <option value="scheduled">Scheduled</option>
                <option value="in-flight">In Flight</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Aircraft Type *</label>
              <select
                value={formData.aircraft}
                onChange={e => setFormData({ ...formData, aircraft: e.target.value })}
              >
                <option value="">Select Aircraft</option>
                <option value="F-16C">F-16C</option>
                <option value="F-15E">F-15E</option>
                <option value="A-10C">A-10C</option>
                <option value="F-22A">F-22A</option>
                <option value="F-35A">F-35A</option>
              </select>
              {errors.aircraft && <span className="error">{errors.aircraft}</span>}
            </div>

            <div className="form-group">
              <label>Tail Number *</label>
              <input
                type="text"
                value={formData.tailNumber}
                onChange={e => setFormData({ ...formData, tailNumber: e.target.value })}
                placeholder="e.g., 91-0403"
              />
              {errors.tailNumber && <span className="error">{errors.tailNumber}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mission Type *</label>
              <select
                value={formData.missionType}
                onChange={e => setFormData({ ...formData, missionType: e.target.value })}
              >
                <option value="training">Training</option>
                <option value="combat">Combat</option>
                <option value="reconnaissance">Reconnaissance</option>
                <option value="transport">Transport</option>
                <option value="search-rescue">Search & Rescue</option>
                <option value="maintenance-test">Maintenance Test</option>
              </select>
            </div>

            <div className="form-group">
              <label>Duration (minutes) *</label>
              <input
                type="number"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                min="1"
              />
              {errors.duration && <span className="error">{errors.duration}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Scheduled Time *</label>
              <input
                type="datetime-local"
                value={formData.scheduledTime instanceof Date 
                  ? formData.scheduledTime.toISOString().slice(0, 16) 
                  : ''}
                onChange={e => setFormData({ ...formData, scheduledTime: new Date(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Range 7 or Local Airspace"
              />
              {errors.location && <span className="error">{errors.location}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Crew Members * ({formData.crew?.length || 0})</label>
            <div className="crew-input-container">
              <input
                type="text"
                value={crewInput}
                onChange={e => setCrewInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCrewMember())}
                placeholder="Enter crew member name and press Enter"
              />
              <button type="button" onClick={addCrewMember} className="add-crew-btn">
                Add
              </button>
            </div>
            {errors.crew && <span className="error">{errors.crew}</span>}
            <div className="crew-list">
              {formData.crew?.map((member, index) => (
                <span key={index} className="crew-tag">
                  {member}
                  <button type="button" onClick={() => removeCrewMember(index)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {sortie ? 'Update Sortie' : 'Create Sortie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
