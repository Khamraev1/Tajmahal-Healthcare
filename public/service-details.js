// Service data (in a real application, this would come from a backend API)
const services = {
    'medical-consultation': {
        name: 'Tibbiy Maslahat',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        availability: 'Har kuni mavjud',
        locations: 'Barcha kasalxonalarda',
        priceRange: '$50 - $200',
        description: 'Tajmahal Healthcare kompaniyasining Tibbiy Maslahat xizmati, malakali va tajribali mutaxassislar tomonidan yuqori sifatli tibbiy konsultatsiyalar taqdim etadi. Bizning mutaxassislarimiz turli xil tibbiy muammolar bo\'yicha maslahat beradi va shaxsiy ehtiyojlaringizga mos keladigan davolash rejasini taklif qiladi. Tajmahal Healthcare\'da, biz bemorlarning sog\'lig\'i va farovonligini eng oliy qadriyat deb bilamiz.',
        benefits: [
            'Tajribali va malakali mutaxassislar',
            'Shaxsiy yondashuvga asoslangan davolash',
            'Zamonaviy tibbiy uskunalar',
            'Ko\'p tilli konsultatsiyalar (O\'zbek, Ingliz, Hindi)',
            'Qulay narxlar va sug\'urta qoplama imkoniyatlari'
        ],
        process: [
            {
                step: 1,
                title: 'Ro\'yxatdan o\'tish',
                description: 'Online yoki telefon orqali ro\'yxatdan o\'ting va sizga mos vaqtni tanlang.'
            },
            {
                step: 2,
                title: 'Tarix va diagnostika',
                description: 'Shifokor sizning tibbiy tarixingizni o\'rganadi va zarur bo\'lsa, diagnostika testlarini o\'tkazish uchun yo\'naltiradi.'
            },
            {
                step: 3,
                title: 'Maslahat va davolash rejasi',
                description: 'Shifokor sizning natijalaringizni muhokama qiladi va shaxsiy davolash rejasini taklif qiladi.'
            },
            {
                step: 4,
                title: 'Kuzatuv va qo\'llab-quvvatlash',
                description: 'Shifokor davolash jarayonini kuzatib boradi va zarur bo\'lsa, rejani o\'zgartiradi.'
            }
        ],
        faq: [
            {
                question: 'Konsultatsiya qancha vaqt davom etadi?',
                answer: 'Odatda konsultatsiya 30-45 daqiqa davom etadi, lekin murakkab holatlar uchun ko\'proq vaqt ajratilishi mumkin.'
            },
            {
                question: 'Konsultatsiya uchun qanday tayyorgarlik ko\'rish kerak?',
                answer: 'Mavjud tibbiy hujjatlaringiz, dori-darmonlar ro\'yxati va shikoyatlaringiz haqida ma\'lumotni tayyorlab keling.'
            },
            {
                question: 'Konsultatsiyadan keyin qo\'shimcha savollarim bo\'lsa nima qilaman?',
                answer: 'Siz bizning qo\'llab-quvvatlash xizmatimizga murojaat qilishingiz yoki shifokoringiz bilan bog\'lanishingiz mumkin.'
            }
        ]
    },
    'medical-tourism': {
        name: 'Tibbiy Turizm',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        availability: 'Har kuni mavjud',
        locations: 'Hindistondagi yuqori sifatli kasalxonalar',
        priceRange: 'Xizmat turiga qarab',
        description: 'Tajmahal Healthcare kompaniyasining Tibbiy Turizm xizmati, xalqaro bemorlarga Hindistonning eng yaxshi tibbiy muassasalarida sifatli va arzon narxlarda davolanish imkonini beradi. Biz viza rasmiylashtirishdan tortib, davolanish va reabilitatsiyagacha bo\'lgan barcha jarayonlarni tashkil qilamiz. Tajmahal Healthcare sizning sog\'lig\'ingiz va qulayligingiz uchun to\'liq xizmat ko\'rsatadi.',
        benefits: [
            'To\'liq xizmat ko\'rsatish – viza, transfer, davolanish, yashash',
            'Yuqori malakali shifokorlar bilan ishlash',
            'Ko\'p til biluvchi koordinatorlar',
            'Arzon narxlar – AQSh va Yevropa narxlariga nisbatan 60-80% arzonroq',
            'Sifatli davolanish va kuzatuv'
        ],
        process: [
            {
                step: 1,
                title: 'Boshlang\'ich maslahat',
                description: 'Bizning mutaxassislar bilan bog\'laning va davolanish ehtiyojlaringizni muhokama qiling.'
            },
            {
                step: 2,
                title: 'Tibbiy hujjatlar tahlili',
                description: 'Tibbiy hujjatlaringizni yuboring va bizning shifokorlarimiz ularni o\'rganib chiqadi.'
            },
            {
                step: 3,
                title: 'Davolanish rejasi va narx taklifi',
                description: 'Biz sizga davolanish rejasi va narx taklifini taqdim etamiz.'
            },
            {
                step: 4,
                title: 'Safar uchun tayyorgarlik',
                description: 'Biz sizga viza olishda, transportni bron qilishda va boshqa tashkiliy ishlarda yordam beramiz.'
            },
            {
                step: 5,
                title: 'Davolanish va kuzatuv',
                description: 'Hindistonga kelganingizdan so\'ng, bizning koordinatorlarimiz sizni kutib oladi va barcha davolanish jarayonini boshqaradi.'
            }
        ],
        faq: [
            {
                question: 'Tibbiy turizm uchun viza olish qanday amalga oshiriladi?',
                answer: 'Tajmahal Healthcare kompaniyasi sizga tibbiy viza olish uchun zarur bo\'lgan barcha hujjatlarni taqdim etadi va jarayonda yordam beradi.'
            },
            {
                question: 'Hindistonda davolanish qancha vaqt oladi?',
                answer: 'Davolanish muddati sizning holatiningizga bog\'liq. Oddiy protseduralar uchun 1-2 hafta, murakkab jarrohliklar uchun 3-4 hafta yoki undan ko\'proq vaqt kerak bo\'lishi mumkin.'
            },
            {
                question: 'Davolanish paytida qayerda yashayman?',
                answer: 'Biz sizga turli xil turar joy variantlarini taklif qilamiz - kasalxona yotoqxonalari, mehmonxonalar yoki ijaraga olingan kvartiralar. Tanlov sizning byudjetingiz va afzalliklaringizga bog\'liq.'
            }
        ]
    },
    'specialized-treatment': {
        name: 'Ixtisoslashtirilgan Davolash',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        availability: 'Oldindan ro\'yxatdan o\'tish orqali',
        locations: 'Maxsus jihozlangan kasalxonalar',
        priceRange: 'Xizmat turiga qarab',
        description: 'Tajmahal Healthcare kompaniyasining Ixtisoslashtirilgan Davolash xizmati, yuqori malakali mutaxassislar tomonidan murakkab kasalliklarni davolash imkonini beradi. Bizning kasalxonalarimizda zamonaviy tibbiy uskunalar va innovatsion davolash usullari qo\'llaniladi. Biz onkologiya, kardiologiya, nevrologiya, ortopediya va boshqa sohalarda murakkab operatsiyalar va davolash kurslarini taklif etamiz.',
        benefits: [
            'Yuqori malakali va tajribali shifokorlar',
            'Eng zamonaviy tibbiy uskunalar va texnologiyalar',
            'Kompleks yondashuv va shaxsiy davolash rejasi',
            'Yuqori darajadagi parvarish va reabilitatsiya',
            'Xalqaro standartlarga mos keluvchi davolash protokollari'
        ],
        process: [
            {
                step: 1,
                title: 'Boshlang\'ich konsultatsiya va diagnostika',
                description: 'Mutaxassis bilan konsultatsiya va to\'liq diagnostika tekshiruvlari.'
            },
            {
                step: 2,
                title: 'Davolash rejasi',
                description: 'Shifokorlar konsiliumida sizning holatingingiz muhokama qilinadi va optimal davolash rejasi ishlab chiqiladi.'
            },
            {
                step: 3,
                title: 'Davolash jarayoni',
                description: 'Davolash rejasiga muvofiq davolash jarayoni amalga oshiriladi - jarrohlik amaliyoti, dori terapiyasi yoki boshqa davolash usullari.'
            },
            {
                step: 4,
                title: 'Reabilitatsiya',
                description: 'Davolanishdan so\'ng to\'liq reabilitatsiya kursi taqdim etiladi.'
            },
            {
                step: 5,
                title: 'Kuzatuv',
                description: 'Davolanish yakunlangandan so\'ng ham, sog\'lig\'ingizni kuzatib borish va zarur bo\'lsa maslahatlar berish.'
            }
        ],
        faq: [
            {
                question: 'Davolash uchun qancha kutish kerak bo\'ladi?',
                answer: 'Kutish vaqti sizning holatingizning murakkabligiga va tanlangan shifokorning ish jadvaliga bog\'liq. Shoshilinch holatlar uchun tezkor davolash imkoniyati mavjud.'
            },
            {
                question: 'Davolash narxiga nimalar kiradi?',
                answer: 'Narxga diagnostika, davolash, shifokor xizmatlari, kasalxona to\'lovlari va asosiy dori-darmonlar kiradi. Har bir bemor uchun alohida narx taklifi tayyorlanadi.'
            },
            {
                question: 'Xalqaro sug\'urta qabul qilinadi?',
                answer: 'Ha, biz ko\'plab xalqaro sug\'urta kompaniyalari bilan hamkorlik qilamiz. Iltimos, davolanishdan oldin sug\'urta qoplamasini tekshirish uchun biz bilan bog\'laning.'
            }
        ]
    },
    'insurance-assistance': {
        name: 'Sug\'urta Yordami',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        availability: 'Har kuni mavjud',
        locations: 'Online yoki ofisimizda',
        priceRange: 'Bepul konsultatsiya',
        description: 'Tajmahal Healthcare kompaniyasining Sug\'urta Yordami xizmati, tibbiy sug\'urta va to\'lovlar bilan bog\'liq barcha muammolarni hal qilishda yordam beradi. Biz sizning sug\'urta policyangizni tahlil qilib, qanday davolash xarajatlari qoplanishini aniqlaymiz, hujjatlarni to\'g\'ri rasmiylashtirishda yordam beramiz va sug\'urta kompaniyasi bilan muloqotni olib boramiz.',
        benefits: [
            'Sug\'urta policyangizni bepul tahlil qilish',
            'Hujjatlarni to\'g\'ri rasmiylashtirishda yordam',
            'Sug\'urta kompaniyalari bilan muzokaralar',
            'To\'lovlar bilan bog\'liq muammolarni hal qilish',
            'Xalqaro sug\'urta bilan ishlash tajribasi'
        ],
        process: [
            {
                step: 1,
                title: 'Sug\'urta policyasini tahlil qilish',
                description: 'Bizning mutaxassislar sizning sug\'urta policyangizni o\'rganib chiqadi va qanday xizmatlar qoplanishini aniqlashtiradi.'
            },
            {
                step: 2,
                title: 'Maslahat va rejalashtirish',
                description: 'Sug\'urta qoplamasi asosida, biz sizga optimal davolanish rejasini taklif qilamiz.'
            },
            {
                step: 3,
                title: 'Sug\'urta ruxsatnomasini olish',
                description: 'Biz sug\'urta kompaniyasidan davolanish uchun oldindan ruxsatnoma olishda yordam beramiz.'
            },
            {
                step: 4,
                title: 'Davolanish va hujjatlashtirish',
                description: 'Davolanish jarayonida barcha zarur hujjatlarni to\'g\'ri rasmiylashtirishni nazorat qilamiz.'
            },
            {
                step: 5,
                title: 'To\'lovlarni hal qilish',
                description: 'Davolanish tugagandan so\'ng, biz sug\'urta kompaniyasiga to\'lovlar bo\'yicha hujjatlarni yuboramiz va jarayonni kuzatib boramiz.'
            }
        ],
        faq: [
            {
                question: 'Sug\'urta kompaniyam davolanish xarajatlarini to\'lamasa nima qilaman?',
                answer: 'Biz sug\'urta kompaniyasi bilan muzokaralar olib boramiz va rad etish sabablarini aniqlaymiz. Ko\'p hollarda, qo\'shimcha hujjatlar yoki tushuntirishlar orqali rad etish qarorini o\'zgartirish mumkin.'
            },
            {
                question: 'Davolanishdan oldin sug\'urta ruxsatnomasini olish qancha vaqt oladi?',
                answer: 'Sug\'urta kompaniyasiga bog\'liq, lekin odatda 3-5 ish kuni. Shoshilinch holatlar uchun tezroq jarayon mavjud.'
            },
            {
                question: 'Agar mening sug\'urtam barcha xarajatlarni qoplamasa nima bo\'ladi?',
                description: 'Biz sizga to\'liq xarajatlar va sug\'urta qoplamasi o\'rtasidagi farqni aniqlab beramiz va to\'lov variantlarini muhokama qilamiz.'
            }
        ]
    }
};

// Get service ID from URL
const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get('id');

// Function to update service details
function updateServiceDetails(service) {
    document.getElementById('service-image').src = service.image;
    document.getElementById('service-image').alt = service.name;
    document.getElementById('service-name').textContent = service.name;
    document.getElementById('service-availability').textContent = service.availability;
    document.getElementById('service-locations').textContent = service.locations;
    document.getElementById('service-price-range').textContent = service.priceRange;
    document.getElementById('service-description').textContent = service.description;
    document.getElementById('service-form-name').value = service.name;

    // Update benefits
    const benefitsList = document.getElementById('service-benefits');
    benefitsList.innerHTML = service.benefits.map(benefit => `<li>${benefit}</li>`).join('');

    // Update process steps
    const processStepsDiv = document.getElementById('service-process-steps');
    processStepsDiv.innerHTML = service.process.map(step => `
        <div class="process-step">
            <div class="step-number">${step.step}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');

    // Update FAQ
    const faqItemsDiv = document.getElementById('service-faq-items');
    faqItemsDiv.innerHTML = service.faq.map((item, index) => `
        <div class="faq-item" id="faq-${index}">
            <div class="faq-question">
                <h3>${item.question}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${item.answer || item.description}</p>
            </div>
        </div>
    `).join('');

    // Add click event to FAQ items
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');

            const icon = question.querySelector('i');
            if (faqItem.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

// Handle service form submission
const serviceForm = document.getElementById('service-form');
if (serviceForm) {
    serviceForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Service request:', data);

        // Show success message
        alert('Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
        this.reset();
    });
}

// Initialize page with service data
if (serviceId && services[serviceId]) {
    updateServiceDetails(services[serviceId]);
    document.title = `${services[serviceId].name} - Tajmahal Healthcare`;
} else {
    // Redirect to home page if no valid service ID
    window.location.href = 'index.html';
} 