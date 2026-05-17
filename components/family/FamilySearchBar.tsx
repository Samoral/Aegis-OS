'use client';

import React, { useState } from 'react';
import { FamilySearchParams, SafetyStatus } from '@/types';

interface FamilySearchBarProps {
  onSearch: (params: FamilySearchParams) => void;
  isLoading?: boolean;
}

export const FamilySearchBar: React.FC<FamilySearchBarProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<SafetyStatus | ''>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: FamilySearchParams = {};
    
    if (address.trim()) params.address = address.trim();
    if (name.trim()) params.name = name.trim();
    if (status) params.status = status;
    
    onSearch(params);
  };

  const handleClear = () => {
    setAddress('');
    setName('');
    setStatus('');
    onSearch({});
  };

  return (
    <div className="glass rounded-xl p-6 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Search Families
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Address Search */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              📍 Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Name Search */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              👤 Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              🚦 Safety Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as SafetyStatus | '')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            >
              <option value="">All Statuses</option>
              <option value="safe">✓ Safe</option>
              <option value="injured">⚠ Injured</option>
              <option value="missing">! Missing</option>
              <option value="unknown">? Unknown</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Search Families</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400 py-2">
            Quick filters:
          </span>
          <button
            type="button"
            onClick={() => {
              setStatus('missing');
              onSearch({ status: 'missing' });
            }}
            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full transition-colors"
            disabled={isLoading}
          >
            ! Missing Only
          </button>
          <button
            type="button"
            onClick={() => {
              setStatus('injured');
              onSearch({ status: 'injured' });
            }}
            className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full transition-colors"
            disabled={isLoading}
          >
            ⚠ Injured Only
          </button>
          <button
            type="button"
            onClick={() => {
              setStatus('safe');
              onSearch({ status: 'safe' });
            }}
            className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full transition-colors"
            disabled={isLoading}
          >
            ✓ Safe Only
          </button>
        </div>
      </form>
    </div>
  );
};

// Made with Bob
