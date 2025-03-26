// Doctor data (in a real application, this would come from a backend API)
const doctors = {
    'dr-rajesh-kumar': {
        name: 'Dr. Rajesh Kumar',
        specialty: 'Kardiolog',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        experience: '15 yillik tajriba',
        hospital: 'Apollo Hospital, Dehli',
        languages: 'O\'zbek, Ingliz, Hindi',
        description: 'Dr. Rajesh Kumar - Hindistondagi eng taniqli kardiologlardan biri. U 15 yildan ortiq tajribaga ega bo\'lib, murakkab yurak kasalliklarini davolash bo\'yicha mutaxassis. Dr. Kumar xalqaro standartlarga mos keladigan zamonaviy davolash usullarini qo\'llaydi.',
        education: [
            'MBBS - All India Institute of Medical Sciences, Dehli',
            'MD - Kardiologiya, Apollo Hospital',
            'Fellowship - Yurak jarrohligi, Mayo Clinic, AQSh'
        ],
        specializations: [
            'Yurak yetishmovchiligi',
            'Arterial gipertoniya',
            'Yurak aritmiyasi',
            'Yurak klapanlari kasalliklari',
            'Koronar arteriya kasalliklari'
        ],
        schedule: [
            { day: 'Dushanba', time: '9:00 - 17:00' },
            { day: 'Chorshanba', time: '9:00 - 17:00' },
            { day: 'Juma', time: '9:00 - 17:00' }
        ]
    },
    'dr-priya-sharma': {
        name: 'Dr. Priya Sharma',
        specialty: 'Nevrolog',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        experience: '12 yillik tajriba',
        hospital: 'Fortis Hospital, Mumbai',
        languages: "O'zbek, Ingliz, Hindi",
        description: 'Dr. Priya Sharma - taniqli nevrolog va miya jarrohi. U miya va orqa miya kasalliklarini davolash bo\'yicha keng tajribaga ega. Dr. Sharma zamonaviy nevrologik davolash usullarini qo\'llaydi va bemorlarga individual yondashuv bilan xizmat ko\'rsatadi.',
        education: [
            'MBBS - King George Medical University, Lucknow',
            'MD - Nevrologiya, AIIMS, Dehli',
            'DM - Nevrologiya, NIMHANS, Bangalore'
        ],
        specializations: [
            'Miya o\'smasi',
            'Epilepsiya',
            'Parkinson kasalligi',
            'Miya insulti',
            'Migren'
        ],
        schedule: [
            { day: 'Seshanba', time: '9:00 - 17:00' },
            { day: 'Payshanba', time: '9:00 - 17:00' },
            { day: 'Shanba', time: '9:00 - 14:00' }
        ]
    },
    'dr-amit-patel': {
        name: 'Dr. Amit Patel',
        specialty: 'Oftalmolog',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        experience: '10 yillik tajriba',
        hospital: 'Max Hospital, Dehli',
        languages: "O'zbek, Ingliz, Hindi",
        description: "Dr. Amit Patel - ko'z kasalliklarini davolash bo'yicha mutaxassis. U zamonaviy ko'z jarrohligi texnikasini qo'llaydi va bemorlarga yuqori sifatli xizmat ko'rsatadi. Dr. Patel ko'z kasalliklarini davolash bo'yicha keng tajribaga ega.",
        education: [
            'MBBS - Maulana Azad Medical College, Dehli',
            'MS - Oftalmologiya, AIIMS, Dehli',
            'Fellowship - Retina jarrohligi, LV Prasad Eye Institute'
        ],
        specializations: [
            'Katarakta jarrohligi',
            'Glaukoma',
            'Retina kasalliklari',
            'Ko\'z yallig\'lanishi',
            'Ko\'z refraksiyasi'
        ],
        schedule: [
            { day: 'Dushanba', time: '9:00 - 17:00' },
            { day: 'Chorshanba', time: '9:00 - 17:00' },
            { day: 'Juma', time: '9:00 - 17:00' }
        ]
    }
};

// Get doctor ID from URL
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get('id');

// Function to update doctor details
function updateDoctorDetails(doctor) {
    document.getElementById('doctor-image').src = doctor.image;
    document.getElementById('doctor-image').alt = doctor.name;
    document.getElementById('doctor-name').textContent = doctor.name;
    document.getElementById('doctor-specialty').textContent = doctor.specialty;
    document.getElementById('doctor-experience').textContent = doctor.experience;
    document.getElementById('doctor-hospital').textContent = doctor.hospital;
    document.getElementById('doctor-languages').textContent = doctor.languages;
    document.getElementById('doctor-description').textContent = doctor.description;

    // Update education
    const educationList = document.getElementById('doctor-education');
    educationList.innerHTML = doctor.education.map(edu => `<li>${edu}</li>`).join('');

    // Update specializations
    const specializationsList = document.getElementById('doctor-specializations');
    specializationsList.innerHTML = doctor.specializations.map(spec => `<li>${spec}</li>`).join('');

    // Update schedule
    const scheduleDiv = document.getElementById('doctor-schedule');
    scheduleDiv.innerHTML = doctor.schedule.map(sched => `
        <div class="schedule-item">
            <h3>${sched.day}</h3>
            <p>${sched.time}</p>
        </div>
    `).join('');
}

// Handle appointment form submission
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Appointment request:', data);

        // Show success message
        alert('Siz muvaffaqiyatli yozildingiz! Tez orada siz bilan bog\'lanamiz.');
        this.reset();
    });
}

// Initialize page with doctor data
if (doctorId && doctors[doctorId]) {
    updateDoctorDetails(doctors[doctorId]);
} else {
    // Redirect to home page if no valid doctor ID
    window.location.href = 'index.html';
} 