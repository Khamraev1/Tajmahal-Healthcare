require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const multer = require('multer');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'tajmahalhealthcare',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } // 1 hour
}));

// Handle missing images - needs to come AFTER static middleware but BEFORE routes
app.get('/uploads/*', (req, res, next) => {
    // Just continue if the file exists (Express static middleware will handle it)
    next();
});

// Set up MongoDB connection
console.log('Connecting to MongoDB...');
let useMockDb = false;
let mockDb = {
    blogs: [
        {
            _id: '1',
            title: 'New Medical Technologies in 2024',
            content: '<p>Zamonaviy tibbiyot texnologiyalari haqida ma\'lumot. Bu maqolada biz 2024 yilning eng yangi tibbiy innovatsiyalari haqida gaplashamiz.</p><p>Zamonaviy tibbiyot juda tez rivojlanmoqda. Har kuni yangi texnologiyalar va davolash usullari paydo bo\'lmoqda. Bu bemorlar uchun yangi imkoniyatlar yaratadi va shifokorlar ishini osonlashtiradi.</p><p>Tajmahal Sog\'liqni saqlash markazi doimo eng so\'nggi tibbiy yutuqlardan foydalanadi va o\'z mijozlariga eng yangi xizmatlarni taqdim etadi.</p>',
            author: 'admin',
            image: '/uploads/blog1.jpg',
            createdAt: new Date(2024, 2, 1)
        },
        {
            _id: '2',
            title: 'Hindistonda tibbiy sayohat qilish uchun eng yaxshi shifoxonalar',
            content: '<p>Hindistonda tibbiy davolanish uchun eng yaxshi shifoxonalar haqida ma\'lumot. Bu maqolada biz Hindistonning eng mashhur va nufuzli tibbiyot markazlari haqida ma\'lumot beramiz.</p><p>Hindiston tibbiy turizm sohasida dunyoda yetakchi o\'rinlardan birini egallaydi. Bu yerda yuqori sifatli tibbiy xizmatlar juda arzon narxlarda taklif etiladi.</p><p>Tajmahal Sog\'liqni saqlash markazi O\'zbekistondan kelgan bemorlarni Hindistonning eng yaxshi shifoxonalariga yo\'naltiradi va ularga butun davolanish jarayonida yordam beradi.</p>',
            author: 'admin',
            image: '/uploads/blog2.jpg',
            createdAt: new Date(2024, 2, 15)
        }
    ],
    contacts: [],
    serviceRequests: [],
    appointments: [],
    admins: [{
        username: 'admin',
        // Use plaintext password for testing only
        password: 'admin123'
    }]
};

// Configure mongoose options for production
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 45000, // 45 seconds
    family: 4 // Use IPv4, skip trying IPv6
};

// Get MongoDB URI from environment or use local fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tajmahal-healthcare';

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
    try {
        await mongoose.connect(MONGODB_URI, mongooseOptions);
        console.log('Connected to MongoDB successfully');
        useMockDb = false;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.log('MongoDB URI being used (credentials hidden):',
            MONGODB_URI ? MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'localhost');

        console.log('Fallback to mock database for testing purposes');
        useMockDb = true;

        // In production, you may want to retry the connection
        if (process.env.NODE_ENV === 'production') {
            console.log('Running in production, attempting to reconnect in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        }
    }
};

// Start the connection process
connectWithRetry();

// Create models
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const serviceRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    doctor: { type: String, required: true },
    appointmentDate: { type: Date },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Blog = mongoose.model('Blog', blogSchema);
const Contact = mongoose.model('Contact', contactSchema);
const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helper function to send email
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

// Mock Blog model in case MongoDB connection fails
const mockModel = (collectionName) => {
    return {
        find: () => {
            return {
                sort: (criteria) => {
                    // Handle sorting if needed
                    return mockDb[collectionName].slice().reverse(); // Simple reverse sort by date
                }
            };
        },
        findById: (id) => {
            return mockDb[collectionName].find(item => item._id === id);
        },
        create: (data) => {
            const newItem = { ...data, _id: Date.now().toString(), createdAt: new Date() };
            mockDb[collectionName].push(newItem);
            return newItem;
        },
        countDocuments: () => {
            return mockDb[collectionName].length;
        }
    };
};

// API Routes
// Health check endpoint for monitoring
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Create new contact
        if (useMockDb) {
            const newContact = {
                _id: Date.now().toString(),
                name,
                email,
                phone,
                message,
                createdAt: new Date()
            };
            mockDb.contacts.push(newContact);
        } else {
            const newContact = new Contact({
                name,
                email,
                phone,
                message
            });
            await newContact.save();
        }

        // Send notification email (skipped in mock mode)
        if (!useMockDb) {
            await sendEmail(
                process.env.ADMIN_EMAIL || 'info@tajmahalhealthcare.com',
                'New Contact Form Submission',
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
            );
        }

        res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ success: false, message: 'Error submitting form' });
    }
});

// Service request form submission
app.post('/api/service-request', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Create new service request
        if (useMockDb) {
            const newServiceRequest = {
                _id: Date.now().toString(),
                name,
                email,
                phone,
                service,
                message,
                createdAt: new Date()
            };
            mockDb.serviceRequests.push(newServiceRequest);
        } else {
            const newServiceRequest = new ServiceRequest({
                name,
                email,
                phone,
                service,
                message
            });
            await newServiceRequest.save();
        }

        // Send notification email (skipped in mock mode)
        if (!useMockDb) {
            await sendEmail(
                process.env.ADMIN_EMAIL || 'info@tajmahalhealthcare.com',
                'New Service Request',
                `Service: ${service}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
            );
        }

        res.status(200).json({ success: true, message: 'Service request submitted successfully' });
    } catch (error) {
        console.error('Error submitting service request:', error);
        res.status(500).json({ success: false, message: 'Error submitting request' });
    }
});

// Doctor appointment form submission
app.post('/api/appointment', async (req, res) => {
    try {
        const { name, email, phone, doctor, appointmentDate, message } = req.body;

        // Create new appointment
        if (useMockDb) {
            const newAppointment = {
                _id: Date.now().toString(),
                name,
                email,
                phone,
                doctor,
                appointmentDate: appointmentDate || null,
                message,
                createdAt: new Date()
            };
            mockDb.appointments.push(newAppointment);
        } else {
            const newAppointment = new Appointment({
                name,
                email,
                phone,
                doctor,
                appointmentDate: appointmentDate || null,
                message
            });
            await newAppointment.save();
        }

        // Send notification email (skipped in mock mode)
        if (!useMockDb) {
            await sendEmail(
                process.env.ADMIN_EMAIL || 'info@tajmahalhealthcare.com',
                'New Appointment Request',
                `Doctor: ${doctor}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAppointment Date: ${appointmentDate || 'Not specified'}\nMessage: ${message || 'None'}`
            );
        }

        res.status(200).json({ success: true, message: 'Appointment request submitted successfully' });
    } catch (error) {
        console.error('Error submitting appointment request:', error);
        res.status(500).json({ success: false, message: 'Error submitting request' });
    }
});

// Blog routes
app.get('/api/blogs', async (req, res) => {
    try {
        let blogs;
        if (useMockDb) {
            blogs = mockModel('blogs').find().sort({ createdAt: -1 });
        } else {
            blogs = await Blog.find().sort({ createdAt: -1 });
        }
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: 'Error fetching blogs' });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        let blog;
        if (useMockDb) {
            blog = mockModel('blogs').findById(req.params.id);
        } else {
            blog = await Blog.findById(req.params.id);
        }

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ success: false, message: 'Error fetching blog' });
    }
});

// Admin routes
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
});

app.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', username);

        // Find admin user
        let admin;
        if (useMockDb) {
            admin = mockDb.admins.find(a => a.username === username);
            console.log('Using mock DB, found admin:', admin ? 'yes' : 'no');
        } else {
            admin = await Admin.findOne({ username });
        }

        if (!admin) {
            console.log('Admin not found');
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare password
        console.log('Admin found, comparing passwords');
        let isMatch = false;

        if (useMockDb) {
            // For mock DB, directly compare passwords (only for testing)
            isMatch = password === admin.password;
        } else {
            // For real DB, use bcrypt
            isMatch = await bcrypt.compare(password, admin.password);
        }
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Set session
        req.session.isAdmin = true;
        req.session.username = admin.username;
        console.log('Login successful, setting session');

        res.status(200).json({ success: true, redirect: '/admin/dashboard' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/admin/dashboard', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.post('/admin/blog', isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;

        // Create new blog
        if (useMockDb) {
            const newBlog = {
                _id: Date.now().toString(),
                title,
                content,
                author: req.session.username,
                image: req.file ? `/uploads/${req.file.filename}` : null,
                createdAt: new Date()
            };
            mockDb.blogs.push(newBlog);
        } else {
            const newBlog = new Blog({
                title,
                content,
                author: req.session.username,
                image: req.file ? `/uploads/${req.file.filename}` : null
            });
            await newBlog.save();
        }

        res.status(200).json({ success: true, message: 'Blog post created successfully' });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ success: false, message: 'Error creating blog post' });
    }
});

app.get('/admin/contacts', isAdmin, async (req, res) => {
    try {
        let contacts;
        if (useMockDb) {
            contacts = mockDb.contacts.slice().reverse();
        } else {
            contacts = await Contact.find().sort({ createdAt: -1 });
        }
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ success: false, message: 'Error fetching contacts' });
    }
});

app.get('/admin/service-requests', isAdmin, async (req, res) => {
    try {
        let serviceRequests;
        if (useMockDb) {
            serviceRequests = mockDb.serviceRequests.slice().reverse();
        } else {
            serviceRequests = await ServiceRequest.find().sort({ createdAt: -1 });
        }
        res.status(200).json(serviceRequests);
    } catch (error) {
        console.error('Error fetching service requests:', error);
        res.status(500).json({ success: false, message: 'Error fetching service requests' });
    }
});

app.get('/admin/appointments', isAdmin, async (req, res) => {
    try {
        let appointments;
        if (useMockDb) {
            appointments = mockDb.appointments.slice().reverse();
        } else {
            appointments = await Appointment.find().sort({ createdAt: -1 });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: 'Error fetching appointments' });
    }
});

app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// Delete blog post
app.delete('/api/blogs/:id', isAdmin, async (req, res) => {
    try {
        const blogId = req.params.id;

        if (useMockDb) {
            // Find the index of the blog post with the given ID
            const index = mockDb.blogs.findIndex(blog => blog._id === blogId);

            if (index === -1) {
                return res.status(404).json({ success: false, message: 'Blog not found' });
            }

            // Remove the blog post from the array
            mockDb.blogs.splice(index, 1);
            console.log(`Blog with ID ${blogId} deleted from mock DB`);
        } else {
            // Delete from MongoDB
            const result = await Blog.findByIdAndDelete(blogId);

            if (!result) {
                return res.status(404).json({ success: false, message: 'Blog not found' });
            }
        }

        res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ success: false, message: 'Error deleting blog post' });
    }
});

// Initialize admin user
const initAdminUser = async () => {
    try {
        if (useMockDb) {
            console.log('Using mock database with pre-configured admin user (username: admin, password: admin123)');
            return;
        }

        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = new Admin({
                username: 'admin',
                password: hashedPassword
            });
            await admin.save();
            console.log('Default admin user created');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

// Serve front-end routes
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/blog/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog-detail.html'));
});

// Move existing HTML files to public directory (for static file serving)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the website at http://localhost:${PORT}`);
    console.log(`Access the admin dashboard at http://localhost:${PORT}/admin/login (username: admin, password: admin123)`);
    initAdminUser();
}); 