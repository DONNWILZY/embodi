const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const {createAppointment, bookAppointment} = require('../controllers/appointmentController');
const { verifyToken, verifyDoctor , verifyUser, verifyAdmin} = require('../middleware/authMiddleware');
const patient = require('../models/User')
router.use(express.json()); 


router.get('/', (req, res) => {
  res.send('THIS IS APPOINTMENT');
});

// Route to create a new appointment
//router.post('/create/:userId', verifyToken, verifyDoctor, verifyUser, appointmentController.createAppointment);
router.post('/create/:userId', verifyToken, async (req, res) => {
  const { doctorId, date, appointments } = req.body;

  if (!doctorId || !date || !appointments) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Call the createAppointment function
  const result = await appointmentController.createAppointment(doctorId, date, appointments);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  const { doctorDetails, appointment } = result;

  return res.status(201).json({ success: true, appointment, doctorDetails,});
});


router.post( '/book/:doctorId/:patientId', verifyToken, appointmentController.bookAppointment );


//FETCH ALL THE BOOKED APPOINTMENT FOR ALL THE DOCTORS
router.get('/bookedAppointment', appointmentController.fetchBookedAppointments);

router.put('/updatestatus/:doctorId/:appointmentId/:bookingId' );


////get completed appointment for all the doctors get All CompletedAppointments
router.get('/getAllTheAppointment',  appointmentController.fetchCompletedAppointments);

///// FETCH BOOKED APPOINTMENT FOR INDIVIDUAL DOCTOR
router.get('/bookedAppointment/:doctorId/view', appointmentController.fetchBookedAppointmentsByDoctor);

//// CHANGE APPOINTMENT STATUS


//// get complete appointment for each doctor getCompletedAppointments
router.get('/getAppointmentById/:appointmentId');




///DELELTE APPOINTM
router.delete('/delete/:appointmentId');

//FETCH ALL THE  APPOINTMENT FOR ALL THE DOCTORS
router.get('/viewAll');

///// SORT APPOINTMENT BY DATE FOR INDIVIDUAL DOCTOR 
router.get('/sortbydate/:doctorId');

////// getCompletedAppointmentsForDoctor GET ALL COMPLETED APPOINTMENT FOR EACH DOCTOR (ASIN ONE DOTOR SEEING ALL HIS APPOINTMENT)
router.get('/viewCompleted/:doctorId');







module.exports = router;