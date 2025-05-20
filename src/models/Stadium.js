import mongoose from 'mongoose';

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a stadium name'],
    trim: true
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city']
    },
    country: {
      type: String,
      required: [true, 'Please provide a country']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide stadium capacity']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price per hour']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  images: [{
    url: String,
    alt: String
  }],
  amenities: [{
    name: String,
    description: String,
    icon: String
  }],
  specifications: {
    pitchSize: {
      length: Number,
      width: Number,
      unit: {
        type: String,
        default: 'meters'
      }
    },
    surfaceType: {
      type: String,
      enum: ['Natural Grass', 'Artificial Turf', 'Hybrid'],
      required: true
    },
    lighting: {
      type: String,
      enum: ['Daylight Only', 'Floodlights', 'Full Lighting'],
      required: true
    },
    changingRooms: {
      type: Boolean,
      default: false
    },
    parking: {
      type: Boolean,
      default: false
    },
    showers: {
      type: Boolean,
      default: false
    }
  },
  availability: {
    weekdays: {
      start: String,
      end: String
    },
    weekends: {
      start: String,
      end: String
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  status: {
    type: String,
    enum: ['active', 'maintenance', 'closed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
stadiumSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

export default Stadium; 