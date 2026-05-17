'use client';

import React from 'react';
import { EmergencyContact } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  onCall?: (contact: EmergencyContact) => void;
  onEmail?: (contact: EmergencyContact) => void;
  compact?: boolean;
}

export const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({
  contact,
  onCall,
  onEmail,
  compact = false,
}) => {
  const handleCall = () => {
    if (onCall) {
      onCall(contact);
    } else {
      window.location.href = `tel:${contact.phone}`;
    }
  };

  const handleEmail = () => {
    if (onEmail) {
      onEmail(contact);
    } else if (contact.email) {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {contact.name}
              </p>
              {contact.isPrimary && (
                <Badge variant="primary" className="text-xs">
                  Primary
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {contact.relationship}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCall}
            className="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-lg transition-colors"
            title="Call"
          >
            📱
          </button>
          {contact.email && (
            <button
              onClick={handleEmail}
              className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg transition-colors"
              title="Email"
            >
              ✉️
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          {contact.isPrimary && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
              ⭐
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {contact.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {contact.relationship}
              </p>
            </div>
            {contact.isPrimary && (
              <Badge variant="warning" className="flex items-center gap-1">
                <span>⭐</span>
                <span>Primary</span>
              </Badge>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">📱</span>
              <a
                href={`tel:${contact.phone}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {contact.phone}
              </a>
            </div>
            {contact.email && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">✉️</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCall}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>📱</span>
              <span>Call Now</span>
            </button>
            {contact.email && (
              <button
                onClick={handleEmail}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>✉️</span>
                <span>Email</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface EmergencyContactListProps {
  contacts: EmergencyContact[];
  onCall?: (contact: EmergencyContact) => void;
  onEmail?: (contact: EmergencyContact) => void;
  title?: string;
  compact?: boolean;
}

export const EmergencyContactList: React.FC<EmergencyContactListProps> = ({
  contacts,
  onCall,
  onEmail,
  title = 'Emergency Contacts',
  compact = false,
}) => {
  // Sort contacts to show primary first
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return 0;
  });

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🚨</span>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <Badge variant="default" className="ml-auto">
          {contacts.length}
        </Badge>
      </div>

      {sortedContacts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            No emergency contacts available
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Add contacts to enable quick emergency communication
          </p>
        </div>
      ) : (
        <div className={compact ? 'space-y-2' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          {sortedContacts.map((contact) => (
            <EmergencyContactCard
              key={contact.id}
              contact={contact}
              onCall={onCall}
              onEmail={onEmail}
              compact={compact}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Made with Bob
