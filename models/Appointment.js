// models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    timeSlot: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    // Add more fields as needed for your appointment data
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;