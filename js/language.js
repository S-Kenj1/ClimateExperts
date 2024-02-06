const allLangs = ['en', 'ru', 'uzb'];
let currentLeng = localStorage.getItem('language') || checkBrowserLang() || 'ru';
const langButtons = document.querySelectorAll('[data-btn]');
const currentPathName = window.location.pathname;
let currentTexts = {};
const innerBtnText = document.querySelectorAll('.lang__btn');
const pageTexts = {
  'head__page-title': {
    en: 'Climate Experts - design, installation, and setup of air conditioning, ventilation, humidification, and heating systems, as well as automatic systems for home and office.',
    ru: 'Climate Experts - проектирование, монтаж и установка систем кондиционирования, вентиляции, увлажнения и отопления,  а так же автоматических систем для дома и офиса.',
    uzb: 'Climate Experts - havo sharoitlash, ventilatsiya, namlik va isitish tizimlarini loyihalash, ornatish va sozlash, shuningdek uy va ofis uchun avtomatik tizimlar.'
  },
  'menu-text-home': {
    en: 'home',
    ru: 'главная',
    uzb: 'асосий'
  },
  'menu-text-about': {
    en: 'about us',
    ru: 'о нас',
    uzb: 'биз ҳақида'
  },
  'menu-text-services': {
    en: 'services',
    ru: 'услуги',
    uzb: 'хизматлар'
  },
  'menu-text-equip': {
    en: 'equipments',
    ru: 'оборудование',
    uzb: 'ускуналар'
  },
  'menu-text-projects': {
    en: 'projects',
    ru: 'проэкты',
    uzb: 'лойиҳалар'
  },
  'more-btn-leader': {
    en: 'learn more',
    ru: 'подробнее',
    uzb: 'тафсилан'
  },
  'more-btn-serv': {
    en: 'learn more',
    ru: 'подробнее',
    uzb: 'тафсилан'
  },
  'more-btn-equip': {
    en: 'learn more',
    ru: 'подробнее',
    uzb: 'тафсилан'
  },
  'more-btn-client': {
    en: 'learn more',
    ru: 'подробнее',
    uzb: 'тафсилан'
  },
  'more-btn-project': {
    en: 'learn more',
    ru: 'подробнее',
    uzb: 'тафсилан'
  },
  'more-btn-about': {
    en: 'learn more',
    ru: 'подробнее',
    uzb: 'тафсилан'
  },
  'form-btn-search': {
    en: 'site search',
    ru: 'поиск по сайту',
    uzb: 'сайт бўйича қидирув'
  },
  'sub-app-btn-slider': {
    en: 'submit an application',
    ru: 'оставить заявку',
    uzb: 'аризани қолдириш'
  },
  'sub-app-btn-mission': {
    en: 'submit an application',
    ru: 'оставить заявку',
    uzb: 'аризани қолдириш'
  },
  'get-cons-form-btn': {
    en: 'get a consultation',
    ru: 'получить консультацию',
    uzb: 'маслаҳат олиш'
  },
  'menu-hover-servlink0': {
    en: 'air conditioning',
    ru: 'кондиционирование',
    uzb: 'Ҳаво шароитлаш'
  },
  'menu-hover-servlink1': {
    en: 'heating',
    ru: 'отопление',
    uzb: 'иситиш'
  },
  'menu-hover-servlink2': {
    en: 'ventilation',
    ru: 'вентиляция',
    uzb: 'вентиляция'
  },
  'menu-hover-servlink3': {
    en: 'plumbing',
    ru: 'сантехника',
    uzb: 'сантехника'
  },
  'menu-hover-servlink4': {
    en: 'automation installation',
    ru: 'установка автоматики',
    uzb: 'Automation installation'
  },
  'menu-hover-servlink5': {
    en: 'installation and maintenance',
    ru: 'монтаж и обслуживание',
    uzb: 'Ўрнатиш ва хизмат кўрсатиш'
  },
  'menu-hover-equiplink0': {
    en: 'air conditioning systems',
    ru: 'системы Кондиционирования',
    uzb: 'Ҳаво Шароитлаш тизимлари'
  },
  'menu-hover-equiplink1': {
    en: 'supply and exhaust ventilation systems',
    ru: 'приточно-вытяжные системы',
    uzb: 'омбор-чақирув вентиляция тизимлари'
  },
  'menu-hover-equiplink2': {
    en: 'heating systems',
    ru: 'системы отопления',
    uzb: 'иситиш тизимлари)'
  },
  'menu-hover-equiplink3': {
    en: 'automation systems',
    ru: 'системы автоматики',
    uzb: 'автоматлаштириш тизимлари'
  },
  'slider-title': {
    en: 'We provide services for the design, installation, and maintenance of air conditioning, ventilation, heating systems, as well as automatic systems for homes and offices. We ensure efficiency and reliability.',
    ru: 'предоставляем услуги по проектированию, монтажу и обслуживанию систем кондиционирования, вентиляции, отопления, а также автоматических систем для дома и офиса. Обеспечиваем эффективность и надежность.',
    uzb: 'Биз ҳаво шароитлаш, вентиляция, иситиш тизимларининг, шунингдек уй ва офис учун автоматик тизимларининг лойихалаш, ўрнатиш ва хизмат кўрсатиш соҳасида хизматлар тақдим қиламиз. Самарадорлик ва ишончни таъминлаймиз'
  },
  'slider-subtitle': {
    en: 'We provide a full range of services for commercial and residential properties throughout Tashkent. Our comprehensive solutions will ensure a comfortable and healthy air environment in any type of building.',
    ru: 'Мы предоставляем полный комплекс услуг для коммерческих и жилых объектов по всему Ташкенту. Наши комплексные решения обеспечат комфортное и здоровое воздушное окружение в любом типе здания.',
    uzb: 'Биз Тошкент бўйлаб коммерциял ва жойлашган объектлар учун тузилган тизим бўйича тўлиқ хизматлар кўрсатамиз. Бизнинг умумий ҳал ҳалқалари, ҳар қандай бино турини эртиб ёлғиз ва сағлиқли ҳаво муҳити билан таъминлайди.'
  },
  'serv-title': {
    en: 'our services',
    ru: 'наши услуги',
    uzb: 'бизнинг хизматлар'
  },
  'equip-title': {
    en: 'equipments',
    ru: 'оборудование',
    uzb: 'ускуналар'
  },
  'mission-title': {
    en: 'our mission',
    ru: 'наша миссия',
    uzb: 'бизнинг миссиямиз'
  },
  'clients-title': {
    en: 'clients',
    ru: 'клиенты',
    uzb: 'мижозлар'
  },
  'projects-title': {
    en: 'projects',
    ru: 'проэкты',
    uzb: 'лойиҳалар'
  },
  'about-title': {
    en: 'About the Company',
    ru: 'о компании',
    uzb: 'Компания ҳақида'
  },
  'contacts-title': {
    en: 'contacts',
    ru: 'контакты',
    uzb: 'Алоқа'
  },
  'equip-subtitle': {
    en: 'catalog of equipment for air conditioning and ventilation',
    ru: 'каталог оборудования для кондиционирования и вентиляции',
    uzb: 'хаво шароитлаш ва вентиляция учун тақом каталоги'
  },
  'mission-subtitle': {
    en: 'leading positions in the industry thanks to exceptional service and a fruitful work cultur',
    ru: 'лидирующие позиции в отрасли благодаря исключительному сервису и плодотворной культуре работы.',
    uzb: 'ажоиб хизмат ва меҳнат культураси билан секторда илғарли позициялар.'
  },
  'clients-subtitle': {
    en: 'customer trust is our main value',
    ru: 'каталог оборудования для кондиционирования и вентиляции',
    uzb: 'мижозларнинг ишонч - бизнинг асосий қийматимиз'
  },
  'projects-subtitle': {
    en: 'our successful projects in the field of air conditioning and ventilation.',
    ru: 'наши успешные проекты в области кондиционирования и вентиляции',
    uzb: 'хаво шароитлаш ва вентиляция соҳасидаги муваффақиятли лойиҳаларимиз.'
  },
  'about-subtitle': {
    en: 'turnkey ventilation, air conditioning, and heating systems in Tashkent.',
    ru: 'Системы вентиляции, кондиционирования и отопления под ключ в Ташкенте.',
    uzb: 'Тошкентда комплекс вентиляция, кондиционлаш ва иситиш тизимлари.'
  },
  'contacts-subtitle': {
    en: 'contact us in a convenient way, and we will answer all your questions.',
    ru: 'свяжитесь с нами удобным способом, и мы ответим на все вопросы',
    uzb: 'биз билан мос холда боғланишингиз ва биз ҳамма саволларингизга жавоб бераётганимиз.'
  },
  'clients-text': {
    en: 'over 200 companies and households have turned to us for solutions to various challenges. And we are glad that we could help!',
    ru: 'более 200 компаний и домовладений обратилось к нам за решениями различных сложностей. И мы рады, что смогли помочь!',
    uzb: '200 дан зиёд компания ва uy-mulkiyат бизга аёнларнинг мурожаат қилган. Ва биз шуни хурсандлик биламиз, ки ёрдам беришимиз мумкин бўлди!'
  },
  'serv-card-title1': {
    en: 'Air conditioning',
    ru: 'Кондиционирование',
    uzb: 'Ҳаво шароитлаш'
  },
  'serv-card-title2': {
    en: 'Heating',
    ru: 'Отопление',
    uzb: 'Иситиш'
  },
  'serv-card-title3': {
    en: 'Plumbing',
    ru: 'Сантехника',
    uzb: 'Сантехника'
  },
  'serv-card-title4': {
    en: 'Automation',
    ru: 'Автоматика',
    uzb: 'Автоматик'
  },
  'serv-card1-links1': {
    en: 'Air Conditioning Service',
    ru: 'Услуги по БК',
    uzb: 'Ҳаво шароитлаш хизматлари'
  },
  'serv-card1-links2': {
    en: 'Installation and Replacement of Air Conditioner',
    ru: 'Установка и Замена БК',
    uzb: 'Кондиционерни орнатиш ва алмаштириш'
  },
  'serv-card1-links3': {
    en: '"Air Conditioner Repair',
    ru: 'Ремонт БК',
    uzb: 'Кондиционерни таъмирлаш'
  },
  'serv-card1-links4': {
    en: 'Air Conditioner Maintenance',
    ru: 'Техническое обслуживание БК',
    uzb: 'Кондиционер техник хизмати'
  },
  'serv-card1-links5': {
    en: 'Comprehensive Air Conditioning',
    ru: 'Комплексное БК',
    uzb: 'Жамиятли кондиционлаш'
  },
  'serv-card2-links1': {
    en: 'Heating Services',
    ru: 'Услуги по отоплению',
    uzb: 'Иситиш хизматлари'
  },
  'serv-card2-links2': {
    en: 'Installation and Replacement of Batteries',
    ru: 'Установка и Замена батарей',
    uzb: 'Батареяларни орнатиш ва алмаштириш'
  },
  'serv-card2-links3': {
    en: 'Heating System Repair',
    ru: 'Ремонт отопления',
    uzb: 'Иситиш тизими таъмирлаш"'
  },
  'serv-card2-links4': {
    en: 'Technical Maintenance for Heating',
    ru: 'Техническое обслуживание по отоплению',
    uzb: 'Иситиш учун техник хизмат'
  },
  'serv-card2-links5': {
    en: 'Boilers',
    ru: 'Котлы',
    uzb: 'Котеллар'
  },
  'serv-card3-links1': {
    en: 'Water Filters',
    ru: 'Фильтры для воды',
    uzb: 'Сув филтрлари'
  },
  'serv-card3-links2': {
    en: 'Water Heaters',
    ru: 'Водонагреватели',
    uzb: 'Сув иситгичлари'
  },
  'serv-card4-links1': {
    en: 'Manufacturing Services',
    ru: 'Услуги по изготовлению',
    uzb: 'Ишлаб чиқариш хизматлари'
  },
  'serv-card4-links2': {
    en: 'Installation and Replacement',
    ru: 'Установка и Замена',
    uzb: 'Орнатиш ва алмаштириш'
  },
  'serv-card4-links3': {
    en: 'Installation and Repair',
    ru: 'Монтаж и ремонт',
    uzb: 'Монтаж ва таъмирлаш'
  },
  'serv-card4-links4': {
    en: 'Technical Maintenance',
    ru: 'Техническое обслуживание',
    uzb: 'Техник хизмат'
  },
  'equip-form-title': {
    en: 'Submit a request for equipment selection',
    ru: 'Оставьте заявку на подбор оборудования',
    uzb: 'Техника танлови учун ариза қўйинг'
  },
  'equip-form-subtitle': {
    en: 'We will call you back within 5 minutes and provide consultation on all your inquiries',
    ru: 'Мы перезвоним вам в течение 5 мин и проконсультируем по всем интересующим',
    uzb: '5 дақиқа ичида сизга қайта қўнғироқ қиламиз ва сизни маълумот берган хамма саволларга маслаҳат берамиз.'
  },
  'equip-gallery-card1': {
    en: 'Supply and Exhaust Ventilation Systems',
    ru: 'Приточные вытяжные системы',
    uzb: 'Тақсимлаш ва чиқиш вентиляция тизимлари'
  },
  'equip-gallery-card2': {
    en: 'Ductwork Equipmen',
    ru: 'Канальное оборудование',
    uzb: 'Канал техникаси'
  },
  'equip-gallery-card3': {
    en: 'Radial Equipment',
    ru: 'Радиальное оборудование',
    uzb: 'Радиал техникаси'
  },
  'equip-gallery-card4': {
    en: 'Air Ducts',
    ru: 'Воздуховоды',
    uzb: 'Ҳаво каналлари'
  },
  'equip-gallery-card5': {
    en: 'Multi Split Systems',
    ru: 'Мульти сплит-системы',
    uzb: 'Кўп бўлинган сплит-тизимлар'
  },
  'equip-gallery-card6': {
    en: 'Chillers',
    ru: 'Чиллеры',
    uzb: 'Чиллерлар'
  },
  'equip-gallery-card7': {
    en: 'Fan Coils',
    ru: 'Фанкойлы',
    uzb: 'Турбина батареялари'
  },
  'equip-gallery-card8': {
    en: 'Components for All Types of Equipment',
    ru: 'Комплектующие ко всем видам оборудования',
    uzb: 'Барча турдаги техникалар учун комплектлаш'
  },
  'equip-gallery-card9': {
    en: 'Roller Shutters',
    ru: 'Рольставни',
    uzb: 'Роллставни'
  },
  'equip-gallery-card10': {
    en: 'Boilers',
    ru: 'Котлы',
    uzb: 'Котеллар'
  },
  'mission-text-left': {
    en: 'Our goal at Climate Experts is to provide our clients with a unique experience. Education is the foundation of our business. We believe that our technical specialists offer the most thorough assessments of the quality of conditioning, heating, and air in Tashkents indoor spaces.',
    ru: 'Наша цель в Climate Experts - предоставить нашим клиентам уникальный опыт. Образование - основа нашего бизнеса. Мы считаем, что наши технические специалисты предлагают наиболее тщательные оценки качества кондиционирования, отопления и воздуха в помещениях в Ташкента.',
    uzb: 'Climate Experts компаниясининг махсади - мижозларимизга уникaлай тажриба тажриба бeрмок. Тaълим - бизнинг бизнесимиз основаси. Биз тexникaчи специaлистлaримизнинг Тошкентдаги хонадонлaрдa климатланиш, иситиш ва ҳавони тузиш сифатини энг телбий оценкаларини тақдирлашини эътирoф қилиб туримизни ҳисобламoликка соламиз.'
  },
  'mission-text-right': {
    en: 'Members of the Climate Experts team adhere to strict company principles, and our positive work culture contributes to excellent customer service. We would be delighted to meet all your indoor climate needs. Call "Your Indoor Meteorologists" today!',
    ru: 'Члены команды Climate Experts руководствуются строгими принципами компании, а наша позитивная культура работы способствует превосходному обслуживанию клиентов. Мы будем рады удовлетворить любые ваши потребности климата в помещении. Позвоните "Вашим синоптикам в помещении" сегодня!',
    uzb: 'Climate Experts" командаси аъзолари компания тамойиллари билан раҳбарлик қилади, бизнинг иш фаолиятимизнинг позитив иш бандлиги мижозларга яхши хизмат кўрсатишга кўмак килади. Биз ўзингизнинг ички иклимнинг барча муҳити талабларини узгартиришга тайёрмиз. Бугун "Сизнинг ички метеорологларингизга" қўнғироқ қилинг!'
  },
  'projects-card-title1': {
    en: ' Supermarket',
    ru: 'Супермаркет',
    uzb: 'Супермаркет'
  },
  'projects-card-title2': {
    en: 'Bank',
    ru: 'Банк',
    uzb: 'Банк'
  },
  'projects-card-title3': {
    en: 'Pharmaceutical Production',
    ru: 'Фарм Производство',
    uzb: 'Фармокология Продукцияси'
  },
  'projects-card-subtitle1': {
    en: 'Samarkand darvoza',
    ru: 'Самарканд Дарвоза',
    uzb: 'Самарканд Дарвоза'
  },
  'projects-card-subtitle2': {
    en: 'Agrobank',
    ru: 'Агробанк',
    uzb: 'Агробанк'
  },
  'projects-card-subtitle3': {
    en: 'Dori darmon',
    ru: 'ДОРИ дармон',
    uzb: 'ДОРИ дармон'
  },
  'projects-card-toptext1': {
    en: ' An object with an area of 15,000 m², located in the city of Tashkent, with a project delivery deadline of 2 months.',
    ru: 'Объект площадью 15000 м², в городе Ташкент, со сроком сдачи проекта: 2 месяца.',
    uzb: '15000 м² майдонда обект, Тошкент шаҳрида, лойиҳани бажариш муддати: 2 ой.'
  },
  'projects-card-toptext2': {
    en: 'An object with an area of 9,000 m², located in the city of Tashkent, with a project delivery deadline of 3 months.',
    ru: 'Объект площадью 9000 м², в городе Ташкент, со сроком сдачи проекта: 3 месяца.',
    uzb: '9000 м² майдонда обект, Тошкент шаҳрида, лойиҳани бажариш муддати: 3 ой.'
  },
  'projects-card-toptext3': {
    en: 'An object with an area of 1400 m², located in the city of Tashkent, with a project delivery deadline of 2 months',
    ru: 'Объект площадью 1400 м², в городе Ташкент, со сроком сдачи проекта: 2 месяца.',
    uzb: '1400 м² майдонда обект, Тошкент шаҳрида, лойиҳани бажариш муддати: 2 ой.'
  },
  'project-card-bottomtext1': {
    en: 'Comprehensive work has been carried out on the installation, supply of materials, and maintenance of touch doors and roller shutters.',
    ru: 'Проведены комплексные работы по монтажу, поставке материалов и обслуживанию сенсорных двирей и рольставней',
    uzb: 'Ўрнатиш, материалларни таҳлил қилиш ва сенсорли эшиклар ва роллшторларнинг монтажи ва хизмат кўрсатиш бўйича кўмплекс ишлар амалга оширилган.'
  },
  'project-card-bottomtext2': {
    en: 'Comprehensive work has been carried out on the design, installation, and supply of heating, air conditioning, and ventilation materials.',
    ru: 'Проведены комплексные работы по проектированию, монтажу и поставке материалов отопления, кондиционирования и вентиляции.',
    uzb: 'Иситиш, кондиционлаш ва вентиляция материаллари дизайни, монтажи ва таъминоти бўйича кўмплекс ишлар амалга оширилган.'
  },
  'project-card-bottomtext3': {
    en: 'Comprehensive work has been carried out on the design, installation, and supply of materials for refrigerated warehouse spaces.',
    ru: 'Проведены комплексные работы по проектированию, монтажу и поставке материалов для холодильных складских помещений.',
    uzb: 'Созлаш, ўрнатиш ва совунчли омбор хоналари учун материаллар таъминлаш бўйича кўмплекс ишлар амалга оширилган.'
  },
  'about-top-text': {
    en: 'Are you looking for a reliable and professional company for the installation and design of ventilation, air conditioning, and heating systems in Tashkent? Congratulations! You have found the perfect partner to create a comfortable and healthy atmosphere in your spaces.',
    ru: 'Вы ищете надежную и профессиональную компанию для монтажа и проектирования систем вентиляции, кондиционирования и отоплению в Ташкенте? Поздравляем! Вам удалось найти идеального партнера для создания комфортной и здоровой атмосферы в ваших помещениях.',
    uzb: 'Тошкентда вентиляция, кондиционлаш ва иситиш тизимларини ўрнатиш ва дизайни қилиш учун ишончли ва профессионал компанияни излайотганмисиз? Табриклаймиз! Сиз учун сифатли ва саҳиҳ атмосферани тузиш учун идеал партнерни топдингиз.'
  },
  'about-center-text': {
    en: 'What makes us special? Our experience, competence, and professionalism are the key factors that make us a leader in this field. We carefully study each project to develop the best individual solution for you.',
    ru: 'Что делает нас особенными? Наш опыт, компетенция и профессионализм являются основными факторами, которые делают нас лидером в данной области. Мы тщательно изучаем каждый проект, чтобы разработать наилучшее индивидуальное решение для вас.',
    uzb: ' Бизни махсус қилган нима? Бизнинг тажриба, мавжудлик ва профессионализмимиз - ушбу сферада бизни лидер қилишга олиб келган асосий факторлар. Ҳар бир лойихани тўлиқ таҳлил қилиб, сиз учун энг яхши индивидуал ёлгиз муаммо ҳал қилиш учун.'
  },
  'about-serv-title1': {
    en: 'Our services include:',
    ru: 'Наши услуги включают:',
    uzb: 'Бизнинг хизматларимизга киришади:'
  },
  'about-serv-title2': {
    en: 'Our services include:',
    ru: 'Наши услуги включают:',
    uzb: 'Бизнинг хизматларимизга киришади:'
  },
  'about-serv-title3': {
    en: 'Our services include:',
    ru: 'Наши услуги включают:',
    uzb: 'Бизнинг хизматларимизга киришади:'
  },
  'about-serv-title4': {
    en: 'Our services include:',
    ru: 'Наши услуги включают:',
    uzb: 'Бизнинг хизматларимизга киришади:'
  },
  'about-vent-subtitle': {
    en: 'Designing ventilation systems in Tashkent:',
    ru: 'Проектирование систем вентиляции в Ташкенте:',
    uzb: 'Тошкентда вентиляция тизимларини дизайн қилиш:'
  },
  'about-heat-subtitle': {
    en: 'Designing heating systems in Tashkent:',
    ru: 'Проектирование систем отопления в Ташкенте:',
    uzb: 'Тошкентда иситиш тизимларини дизайн қилиш:'
  },
  'about-condit-subtitle': {
    en: 'Designing air conditioning systems in Tashkent:',
    ru: 'Проектирование систем кондиционирования в Ташкенте:',
    uzb: 'Тошкентда кондиционлаш тизимларини дизайн қилиш:'
  },
  'about-dorsandgate-subtitle': {
    en: 'Installation and maintenance of swing, sliding doors, and gates in Tashkent:',
    ru: 'Монтаж и обслуживание распашных, откатных дверей и ворот в Ташкенте:',
    uzb: 'Тошкентда распаш, откат дарвозалар ва иштабол вратларини орнатиш ва техническое обслуживание:'
  },
  'about-ventilation': {
    en: 'Development of an optimal ventilation system to ensure fresh and clean air in the premises. Individual approach to each project, taking into account the features of the space and your requirements. Optimization of energy consumption and improvement of ventilation system efficiency.',
    ru: 'Разработка оптимальной системы вентиляции для обеспечения свежего и чистого воздуха в помещении.Индивидуальный подход к каждому проекту, учитывающий особенности помещения и ваши требованияОптимизация расхода энергии и повышение эффективности системы вентиляции.',
    uzb: 'Фреш ва тоза ҳавони таъминлаш учун оптимал вентиляция тизимини ишлаб чикариш. Ҳар бир лойихага шахсий мулоқот, жойнининг особликлари ва сизнинг талабларингизни эътиборга олиш. Энергия сарфланишини оптималлаштириш ва вентиляция тизимининг эффективлигини ошириш.'
  },
  'about-heating': {
    en: 'Designing efficient heating systems in Tashkent, taking into account climatic features, room sizes, and energy efficiency. Individual solutions for comfortable and economical heating in accordance with local standards.',
    ru: 'Проектирование эффективных систем отопления в Ташкенте, учитывая климатические особенности, размеры помещений и энергетическую эффективность. Индивидуальные решения для комфортного и экономичного обогрева в соответствии с местными стандартами.',
    uzb: 'Тошкентда эффектив иситиш тизимларини дизайн қилиш, иклим особликлари, ҳавони ҳажми ва энергетика эффективлигини эътиборга олиш. Маҳаллий стандартларга мос, комфортли ва иқтисодий иситиш учун индивидуал ҳал этишлар.'
  },
  'about-condition': {
    en: 'Designing efficient air conditioning systems in Tashkent, considering climatic features, room sizes, and energy efficiency. Individual solutions for comfortable and economical cooling in accordance with local standards.',
    ru: 'Проектирование эффективных систем кондиционирования в Ташкенте, учитывая климатические особенности, размеры помещений и энергетическую эффективность. Индивидуальные решения для комфортного и экономичного охлаждения в соответствии с местными стандартами.',
    uzb: 'Тошкентда эффектив кондиционлаш тизимларини дизайн қилиш, иклим особликлари, ҳавони ҳажми ва энергетика эффективлигини эътиборга олиш. Маҳаллий стандартларга мос, комфортли ва иқтисодий серинг ичиндаги индивидуал ҳал этишлар.'
  },
  'about-doorsandgate': {
    en: 'Our company combines professional installation and maintenance services for swing, sliding doors, and gates in Tashkent, ensuring reliability, safety, and an individual approach in accordance with high-quality standards and customer expectations.',
    ru: 'Наша компания объединяет профессиональные услуги монтажа и технического обслуживания распашных, откатных дверей и ворот в Ташкенте, обеспечивая надежность, безопасность и индивидуальный подход в соответствии с высокими стандартами качества и ожиданиями клиентов.',
    uzb: 'Бизнинг компаниямиз Тошкентда дарвозаларни, оралаётгич ва тескари дарвозаларни орнатиш ва техник хизмат кўрсатишда профессионал хизматларни бирлаштиради, сифат стандартлари ва мижозларнинг кузатишларига мослик билан, ишончлик ва индивидуал йўлгозиш беради.'
  },
  'contacts-director': {
    en: 'Technical Director:  Marguba Rahmatovna.',
    ru: 'Технический Директор: Маргуба Рахматовна.',
    uzb: 'Техник директори: Маргуба Рахматовна.'
  },
  'contacts-consultant': {
    en: 'Consultant: Roman Viktorovich.',
    ru: 'Консультант: Роман Викторович.',
    uzb: 'Консультант: Роман Викторович.'
  },
  'contacts-ofis': {
    en: 'Office Number:',
    ru: 'Номер Офиса:',
    uzb: 'Офис рақами:'
  },
  'contscts-addres': {
    en: 'Our address:',
    ru: 'Наш адрес:',
    uzb: 'Бизнинг манзил:'
  },
  'contscts-addres-city': {
    en: 'Tashkent, Chilanzar 19th block.',
    ru: 'г. Ташкент, Чиланзар 19 квартал.',
    uzb: 'Тошкент, Чиланзар 19-квартал.'
  },
  'contscts-addres-landmark': {
    en: ' Landmark: mahalla Shuxrat idorasi.',
    ru: 'Ориентир: махаля Шухрат идораси.',
    uzb: 'Ориентир: махаля Шухрат идораси.'
  },
  'popup-title': {
    en: 'Submit an application',
    ru: 'Оставить заявку',
    uzb: 'Мурожаат қўйиш'
  },
  'popup-btn-send': {
    en: 'Send',
    ru: 'Отправить',
    uzb: 'Жўнатиш'
  }
};
function checkPagePathName() {
  switch (currentPathName) {
    case '/index.html':
      currentTexts = pageTexts;
      break;
    case '/another_page.html':
      currentTexts = anotherTexts;
      break;
    default:
      currentTexts = pageTexts;
      break;
  }
}
checkPagePathName();
function changeLang() {
  for (const key in currentTexts) {
    const elem = document.querySelector(`[data-lang=${key}]`);
    if (elem) {
      elem.textContent = currentTexts[key][currentLeng];
    }
  }
}
changeLang();
langButtons.forEach(btn => {
  btn.addEventListener('click', event => {
    currentLeng = event.target.dataset.btn;
    localStorage.setItem('language', event.target.dataset.btn);
    resetActiveClass(langButtons, 'lang__btn-active');
    btn.classList.add('lang__btn-active');
    changeLang();
  });
});
function resetActiveClass(arr, activeClass) {
  arr.forEach(elem => {
    elem.classList.remove(activeClass);
  });
}
function checkActiveLangBtnAndHash() {
  switch (currentLeng) {
    case 'ru':
      document.querySelector(`[data-btn="ru"]`).classList.add('lang__btn-active');
      document.querySelector(`[data-btn='show']`).innerHTML = 'Russian';
      location.href = window.location.pathname + '#' + currentLeng;
      break;
    case 'en':
      document.querySelector(`[data-btn="en"]`).classList.add('lang__btn-active');
      document.querySelector(`[data-btn='show']`).innerHTML = 'English';
      location.href = window.location.pathname + '#' + currentLeng;
      break;
    case 'uzb':
      document.querySelector(`[data-btn="uzb"]`).classList.add('lang__btn-active');
      document.querySelector(`[data-btn='show']`).innerHTML = 'Uzbek';
      location.href = window.location.pathname + '#' + currentLeng;
      break;
    default:
      document.querySelector(`[data-btn="ru"]`).classList.add('lang__btn-active');
      document.querySelector(`[data-btn='show']`).innerHTML = 'Russian';
      location.href = window.location.pathname + '#' + currentLeng;
      break;
  }
  ;
}
checkActiveLangBtnAndHash();
function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  const result = allLangs.some(elem => {
    return elem === navLang;
  });
  if (result) {
    return navLang;
  }
}