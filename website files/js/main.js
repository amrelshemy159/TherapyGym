//Show Menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

//Menu Show
if(navToggle){
    navToggle.addEventListener('click', ()=>{
        navMenu.classList.add('show-menu');
    })
}

//Menu hidden
if(navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu');
    })
}

//Remove Menu Mobile
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    //when we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction));

//change background header
const scrollHeader = () =>{
    const header = document.getElementById('header')
    /*when the scroll is greater than 50 viewport height,
     add the croll-header class to the header tag*/

    this.scrollY >= 50 ? header.classList.add('bg-header')
                       : header.classList.remove('bg-header')
}

window.addEventListener('scroll', scrollHeader)

//scroll sections active link
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset
    
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })

}

window.addEventListener('scroll', scrollActive)

/*show scrollup*/
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    //when scroll is higher than 350 viewport height, add the show-scroll class to a tag with scrollup
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*scrollreveal animation*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`,{delay: 700, origin: 'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculate__content`, {origin: 'left'})
sr.reveal(`.choose__content, .calculate__img`, {origin: 'right'})



//Calculate JS
const calculateForm = document.getElementById('calculate-form'),
      calculateCm = document.getElementById('calculate-cm'),
      calculateKg = document.getElementById('calculate-kg'),
      calculateMesssage = document.getElementById('calculate-message');

const calculateBmi = (e) =>{
    e.preventDefault()

    //check if the fields have a value
    if(calculateCm.value === '' || calculateKg === ''){
        //Add and remove color
        calculateMesssage.classList.remove('color-green')
        calculateMesssage.classList.add('color-red')

        //show message
        calculateMesssage.textContent = 'Fill in the Height and Weight';

        //remove message after 3s
        setTimeout(() => {
            calculateMesssage.textContent = ''
        }, 3000);
    } else{
        //BMI formula
        const cm = calculateCm.value / 100,
              kg = calculateKg.value,
              bmi = Math.round(kg / (cm * cm))

        //show your health status
        if(bmi < 18.5){
            //add color and display message
            calculateMesssage.classList.add('color-green')
            calculateMesssage.textContent = `Your BMI is ${bmi} and you are skinny` 
        } else if(bmi < 25){
            calculateMesssage.classList.add('color-green')
            calculateMesssage.textContent = `Your BMI is ${bmi} and you are healthy` 
        } else{
            calculateMesssage.classList.add('color-green')
            calculateMesssage.textContent = `Your BMI is ${bmi} and you are overweight` 
        }

        //to clear input field
        calculateCm.value = ''
        calculateKg.value = ''

        //remove message after 4s
        setTimeout(() => {
            calculateMesssage.textContent = ''
        }, 4000);
    }
}

calculateForm.addEventListener('submit', calculateBmi)

//EMAIL JS
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message'),
      contactUser = document.getElementById('contact-user');


const sendEmail = (e) =>{
    e.preventDefault()

    //check if the field has a value
    if(contactUser.value === ''){
        //add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        //show message
        contactMessage.textContent = 'You Must Enter Your Email'

        //remove message after 3s
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 3000);
    } else{
        //serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_x2sam1q', 'template_rkqtwcq', '#contact-form', 't-gRzwWFO-SR62-kr')
        .then(() => {
            //show message and color
            contactMessage.classList.add('color-green');
            contactMessage.textContent = 'You registered successfully'

            //remove message after 3s
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 3000);
        }, (error) => {
            //Mail sending error
            alert('OOPS! SOMETHING HAS FAILED...', error)
        })

        //To clear input field
        contactUser.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail);