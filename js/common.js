'use strict'

const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`
  setTimeout(() => {
    el.style.opacity = 1
  }, 10)
}
const fadeOut = (el, timeout) => {
  el.style.opacity = 1
  el.style.transition = `opacity ${timeout}ms`
  el.style.opacity = 0

  setTimeout(() => {
    el.style.display = 'none'
  }, timeout)
}


// const onScrollHeader = () => {

//  	const header = document.querySelector('.header__top')

//  	let currentScroll;

// 	currentScroll = window.pageYOffset;
	
// 	if (currentScroll > 110) {
//  		header.classList.add('header-fixed')
//  	}
//  	if (currentScroll < 110) {
//  		header.classList.remove('header-fixed')
//  	}

//  	window.addEventListener('scroll', () => {

//  		currentScroll = window.pageYOffset;

//  		if (currentScroll > 110) {
//  			header.classList.add('header-fixed')
//  		}
//  		if (currentScroll < 110) {
//  			header.classList.remove('header-fixed')
//  		}

//  	});

// }

const headerBurger = () => {
	const burger_button = document.querySelector('.header__top_burger')
	const slide_menu = document.querySelector('.slide_menu')
	const slide_menu_close = document.querySelector('.slide_menu__close')

	burger_button.addEventListener('click', function(event) {
		event.preventDefault()

		slide_menu.classList.add('active')
	})

	slide_menu_close.addEventListener('click', function(event) {
		event.preventDefault()

		slide_menu.classList.remove('active')
	})
}

const maskInit = () => {

	const mask_phone = document.querySelectorAll('.mask--phone');

	const im = new Inputmask("+7 (999) 999 - 99 - 99");
	if(mask_phone) {
		mask_phone.forEach(e => {
			im.mask(e);
		});
	}
}

// form

const modal_message = document.getElementById('modal_success')
const modal_phone = document.getElementById('modal_phone')
const modal_close = document.querySelectorAll('.modal_close')
const modal_button_active_phone = document.querySelectorAll('.js--modal-phone')
const modal_close_button = document.querySelectorAll('.modal_close_button')

modal_button_active_phone.forEach(e => {
	e.addEventListener('click', function(event) {
		event.preventDefault()

		// modal_phone.classList.add('active')
		document.body.classList.add('overflow-hidden')
		fadeIn(modal_phone, 500, 'flex');
	})
})

modal_close.forEach(e => {
	e.addEventListener('click', function(event) {
		event.preventDefault()

		// e.closest('.modal_overlay').classList.remove('active')
		document.body.classList.remove('overflow-hidden')
		fadeOut(e.closest('.modal_overlay'), 500);
	})
})

modal_close_button.forEach(e => {
	e.addEventListener('click', function(event) {
		event.preventDefault()

		fadeOut(e.closest('.modal_overlay'), 500);
	})
})

const add_class_error = (element) => {
	element.parentNode.classList.add('error');
}

const remove_class_error = (element) => {
	element.parentNode.classList.remove('error');
}

const add_message_error = (element) => {
	let error_element = document.createElement('span');
	error_element.classList.add('error-message');
	error_element.innerHTML = '*Данные введены некорректно';

	if(element.parentNode.querySelector('.error-message') == null) {
		element.insertAdjacentElement('afterEnd', error_element);
	}
}

const add_message_error_phone = (element) => {
	let error_element = document.createElement('span');
	error_element.classList.add('error-message');
	error_element.innerHTML = '*Телефон введен неверно';

	if(element.parentNode.querySelector('.error-message') == null) {
		element.insertAdjacentElement('afterEnd', error_element);
	}
}

const remove_message_error = (element) => {
	if(element.nextSibling != null) {
		element.nextSibling.remove();
	}
}

const validateName = (element) => {
	element.addEventListener('keyup', function(event) {
		if(this.value.length < 3) {
			add_class_error(this);
			add_message_error(this);
		} else {
			remove_class_error(this);
			remove_message_error(this);
		}
	})
}

const validatePhone = (element) => {
	element.addEventListener('keyup', function(event) {
		if(this.value.indexOf('_') > -1) {
			add_class_error(this);
			add_message_error_phone(this);
		} else {
			remove_class_error(this);
			remove_message_error(this);
		}
	});
}

const validateEmail = (element) => {
	element.addEventListener('keyup', function(event) {
		const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if(reg.test(this.value) == false) {
			add_class_error(this);
			add_message_error(this);
		} else {
			remove_class_error(this);
			remove_message_error(this);
		}
	});
}

const checkedName = (element) => {
	if(element.value.length < 3) {
		add_class_error(element);
		add_message_error(element);
	} else {
		remove_class_error(element);
		remove_message_error(element);
	}
}

const checkedPhone = (element) => {
	if(element.value.indexOf('_') > -1 || element.value == '') {
		add_class_error(element);
		add_message_error_phone(element);
	} else {
		remove_class_error(element);
		remove_message_error(element);
	}
}

const checkedEmail = (element) => {
	const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	if(reg.test(element.value) == false) {
		add_class_error(element);
		add_message_error(element);
	} else {
		remove_class_error(element);
		remove_message_error(element);
	}
}



const js_form = document.querySelectorAll('.js_form');


if(js_form) {
	js_form.forEach(e => {
		const input_name = e.querySelector('.js_name');
		const input_phone = e.querySelector('.js_phone');
		const input_email = e.querySelector('.js_email');

		const button = e.querySelector('.button-accent');

		if(input_name) validateName(input_name);
		if(input_phone) validatePhone(input_phone);
		if(input_email) validateEmail(input_email);

		e.addEventListener('submit', function(event) {
			event.preventDefault();

			if(input_name) checkedName(input_name);
			if(input_phone) checkedPhone(input_phone);
			if(input_email) checkedEmail(input_email);
			

			if(e.querySelector('.error-message') == null) {

				const request = new XMLHttpRequest();
				request.onreadystatechange = function() { 
					if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
						
						modal_message.getAttribute('style', 'display: none;')
						// fadeOut(modal_message, 500);
						fadeOut(modal_phone, 500);
						
						fadeIn(modal_success, 500, 'flex');

						e.querySelectorAll('input').forEach(input => input.value = "");
					}
				}
				
				request.open(this.method, this.action, true);
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				
				const data = new FormData(this);
				

					
				request.send('name=' + encodeURIComponent(data.get('name')) + '&phone=' + encodeURIComponent(data.get('phone')) + '&email=' + encodeURIComponent(data.get('email')));

			}

		});	
	});
}



scrollSpy('.slide_menu__nav', {
    sectionSelector: '.scrollby',
    targetSelector: 'a',
    offset: 400,
    activeClass: 'active',
});

const anim_sect = document.querySelectorAll('.animate-sect');

ScrollReveal().reveal(anim_sect, {
	easing: 'ease-in',
	duration: 500,
	reset: false,
	mobile: false
});

document.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault()

        let href = this.getAttribute('href').substring(1)

        const scrollTarget = document.getElementById(href)
		const header_top_height = document.querySelector('.header__top').clientHeight
        let topOffset = 0
        const elementPosition = scrollTarget.getBoundingClientRect().top

		topOffset = header_top_height
        const offsetPosition = elementPosition

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        })
    })
})

lightGallery(document.getElementById('lightgallery'), {
        plugins: [lgZoom],
        // licenseKey: 'your_license_key',
        speed: 500,
		// counter: false,
		captions: false,
		download: false,

		mobileSettings: {
			showCloseIcon: true,
		}
		// enableSwipe: false,
		// enableDrag: false,
		// pager: false,
		// controls: false,
})

const advantages_wrap = document.querySelector('#advantages')
const advantages_wrap_slider = new Swiper(advantages_wrap.querySelector('.swiper'), {
	loop: true,
	observer: true,
	observeParents: true,

	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},

	navigation: {
		nextEl: advantages_wrap.querySelector('.button_slide_next'),
		prevEl: advantages_wrap.querySelector('.button_slide_prev'),
	},

	pagination: {
		el: advantages_wrap.querySelector('.bullet_slide'),
		// dynamicBullets: true,
		clickable: true
	},

	on: {
		init: function () {
			advantages_wrap.querySelector('.advantages__right_count .count').innerHTML = this.realIndex + 1
		},

		activeIndexChange: function () {
			advantages_wrap.querySelector('.advantages__right_count .count').innerHTML = this.realIndex + 1
		}
	}
})

const diving_wrap = document.querySelector('.diving')
const nav_item = diving_wrap.querySelectorAll('.slider_bullet')

const diving_wrap_slider = new Swiper(diving_wrap.querySelector('.swiper'), {
	loop: true,

	slidesPerView: 1.2,
	spaceBetween: 180,

	observer: true,
	observeParents: true,

	navigation: {
		nextEl: diving_wrap.querySelector('.button_slide_next'),
		prevEl: diving_wrap.querySelector('.button_slide_prev'),
	},

	pagination: {
		el: diving_wrap.querySelector('.bullet_slide'),
		clickable: true
	},

	on: {

		activeIndexChange: function () {
			
			nav_item.forEach(e => {
				const ind = e.querySelectorAll('.item')

				// ind.forEach(items => {
					for (let item of ind[this.realIndex].parentNode.children) {
						item.classList.remove('active')
					}
					ind[this.realIndex].classList.add('active')
				// })
			})

			// for (let item of nav_item[this.realIndex].parentNode.children) {
			// 	item.classList.remove('active')
			// }
			// nav_item[this.realIndex].classList.add('active')
		}
	},

	breakpoints: {
		1440: {
			slidesPerView: 1.2,
			// spaceBetween: 180,
		},

		1280: {
			slidesPerView: 1.1,
			spaceBetween: 180,
		},

		1050: {
			slidesPerView: 2.2,
			spaceBetween: 56,
		},

		768: {
			slidesPerView: 2.1,
			spaceBetween: 40,
		},
		540: {
			slidesPerView: 1.2,
			spaceBetween: 30,
		},
		0: {
			slidesPerView: 1,
			spaceBetween: 20,
		}
	}
})



nav_item.forEach(e => {

	const ind = e.querySelectorAll('.item')

	ind.forEach((items, i) => {
		items.addEventListener('click', function (event) {
			event.preventDefault()

			for (let item of items.parentNode.children) {
				item.classList.remove('active')
			}

			this.classList.add('active')
			console.log(i)
			diving_wrap_slider.slideTo(i + 2)
		})
	})

	
})

const layouts_wrap = document.querySelector('.layouts')
const layouts_wrap_slider = new Swiper(layouts_wrap.querySelector('.swiper'), {
	loop: true,

	observer: true,
	observeParents: true,

	navigation: {
		nextEl: layouts_wrap.querySelector('.button_slide_next'),
		prevEl: layouts_wrap.querySelector('.button_slide_prev'),
	},

	pagination: {
		el: layouts_wrap.querySelector('.bullet_slide'),
		clickable: true,
	},

	breakpoints: {
		0: {
			slidesPerView: 1.5,
			spaceBetween: 16,
			centeredSlides: true,
			centeredSlidesBounds: true,
		},
		// 370: {
		// 	slidesPerView: 1.5,
		// 	spaceBetween: 16,
		// },
		768: {
			slidesPerView: 2.5,
			spaceBetween: 55,
		},
		1050: {
			slidesPerView: 1.6,
			spaceBetween: 80,
			centeredSlides: false,
			centeredSlidesBounds: false,
		},
		1440: {
			slidesPerView: 1.8,
			spaceBetween: 40
		},

		1600: {
			slidesPerView: 2.3,
		}
	}
})

const gallery_wrap = document.querySelector('.gallery')
const gallery_wrap_slider = new Swiper(gallery_wrap.querySelector('.swiper'), {
	loop: true,

	slidesPerView: 'auto',
	spaceBetween: 100,

	centeredSlides: true,
	centeredSlidesBounds: true,

	observer: true,
	observeParents: true,

	navigation: {
		nextEl: gallery_wrap.querySelector('.button_slide_next'),
		prevEl: gallery_wrap.querySelector('.button_slide_prev'),
	},

	pagination: {
		el: gallery_wrap.querySelector('.bullet_slide'),
		clickable: true
	},

	breakpoints: {
		0: {
			slidesPerView: 1.1,
			spaceBetween: 8
		},

		1024: {
			slidesPerView: 'auto',
			spaceBetween: 100,
		},
	}
})

const section_card_wrap = document.querySelector('.section_card')
const section_card_wrap_slider = new Swiper(section_card_wrap.querySelector('.swiper'), {


	// centeredSlides: true,
	// centeredSlidesBounds: true,

	observer: true,
	observeParents: true,

	pagination: {
		el: section_card_wrap.querySelector('.bullet_slide'),
		clickable: true
	},

	breakpoints: {
		0: {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 25,
		},

		768: {
			loop: false,
			slidesPerView: 'auto',
			onlyExternal: true,
			noSwiping: true,
			allowTouchMove: false,
		}
	}
})


// onScrollHeader()

headerBurger()
maskInit()
