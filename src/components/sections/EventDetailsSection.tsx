import React from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';
import { Artist, EventFormData } from '../../types';

interface EventDetailsSectionProps {
  formData: EventFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleArtistChange: (index: number, field: keyof Artist, value: string | boolean) => void;
  addArtist: () => void;
  removeArtist: (index: number) => void;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  formData,
  handleInputChange,
  handleArtistChange,
  addArtist,
  removeArtist
}) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-purple-700 text-lg font-bold">🎫</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Event Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="Enter Event Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name & Address</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="Enter Venue Name & Address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
          <input
            type="time"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Crowd</label>
          <input
            type="text"
            name="expectedAttendees"
            value={formData.expectedAttendees}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="Estimated Number of Attendees"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sound Check Date</label>
          <input
            type="date"
            name="soundCheckDate"
            value={formData.soundCheckDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sound Check Time</label>
          <input
            type="time"
            name="soundCheckTime"
            value={formData.soundCheckTime}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person (Name & Role)</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="Enter Contact Person Name & Role"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Artist Lineup</label>
            <button
              type="button"
              onClick={addArtist}
              className="text-purple-700 hover:text-purple-900 text-sm font-medium flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Artist
            </button>
          </div>

          <div className="space-y-4">
            {formData.artists.map((artist, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-medium text-gray-700">Artist {index + 1}</div>
                  {formData.artists.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArtist(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Artist Name</label>
                    <input
                      type="text"
                      value={artist.name}
                      onChange={(e) => handleArtistChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter Artist Name"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        id={`practice-${index}`}
                        checked={artist.practiceRequired}
                        onChange={(e) => handleArtistChange(index, 'practiceRequired', e.target.checked)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                      />
                      <label htmlFor={`practice-${index}`} className="ml-2 block text-sm font-medium text-gray-600">
                        Practice Required
                      </label>
                    </div>

                    {artist.practiceRequired && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Practice Date</label>
                          <input
                            type="date"
                            value={artist.practiceDate}
                            onChange={(e) => handleArtistChange(index, 'practiceDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Practice Time</label>
                          <input
                            type="time"
                            value={artist.practiceTime}
                            onChange={(e) => handleArtistChange(index, 'practiceTime', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSection;