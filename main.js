/*-----------Variables----------------*/

let weatherAPIKey = "608c7ddab1d7c9e1ea58c102e0a9ab10"
let weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={key}`


let weatherCondition = "sunny";
let userLocation = "Boston";
let temp = 22.345;
let weatherText = `The weather is ${weatherCondition} in ${userLocation} and its ${temp.toFixed(1)} C outside`;


const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "img1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "img2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "img3"
    }
]

const socialImages = [
    {
        src: "./assets/socials/DiscordLogo.png",
        alt: "Discord logo"
    },
    {
        src: "./assets/socials/YoutubeLogo.png",
        alt: "Youtube logo"
    },
    {
        src: "./assets/socials/TwitterLogo.png",
        alt: "Twitter logo"
    },
    {
        src: "./assets/socials/InstagramLogo.png",
        alt: "Instagram logo"
    }
]

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
]

/*-----------Menu section----------------*/

function menuHandler() {

    function nav() {
        document.querySelector("header nav .wrapper").classList.toggle("nav-open");
    }

    document.querySelector("#open-nav-menu").addEventListener("click", nav);
    document.querySelector("#close-nav-menu").addEventListener("click", nav);

}


/*-----------Greeting section----------------*/

function greetingHandler() {

    let greetingText = "Good Morning";


    let currentHour = new Date().getHours()
    if (currentHour < 12) {
        greetingText = "Good Mikeing"
    } else if (currentHour < 17) {
        greetingText = "Good Afternoon"
    } else if (currentHour <= 24) {
        greetingText = "Welcome"
    }
    document.querySelector("#greeting").innerHTML = greetingText;
    document.querySelector("#weather").innerHTML = weatherText;

    function clock() {
        time = new Date();
        document.querySelector('[data-time="hours"]').innerHTML = time.getHours().toString().padStart(2, 0);
        document.querySelector('[data-time="minutes"]').innerHTML = time.getMinutes().toString().padStart(2, 0);
        document.querySelector('[data-time="seconds"]').innerHTML = time.getSeconds().toString().padStart(2, 0);
    }

    (function () { clock(); })();
    setInterval(() => {
        clock();
    }, 1000);

    function celciusToFar(temp) {
        let far = ((temp * 9 / 5) + 32);
        return far;
    }

    celciusToFar(30)
    document.querySelector(".weather-group").addEventListener("click", function (e) {
        let tempFormat = e.target.id;
        if (tempFormat == "celsius") {
            document.querySelector("#weather").innerHTML = `The weather is ${weatherCondition} in ${userLocation} and its ${temp.toFixed(1)} C outside`;

        }
        else if (tempFormat == "fahr") {
            document.querySelector("#weather").innerHTML = `The weather is ${weatherCondition} in ${userLocation} and its ${celciusToFar(temp).toFixed(1)} F outside`;
        }
        // console.log(e.target.id)
        // console.log(e)
    });
}

/*-----------Gallery section----------------*/
function galleryHandler() {

    // for (let i in galleryImages) {
    //     console.log(galleryImages[i].src)
    // }

    // forEach shortcut
    galleryImages.forEach(image => {
        // console.log(image.src)
        // console.log(image.alt)
    });
    let mainImage = document.querySelector("#gallery > img")
    let thumbnails = document.querySelector("#gallery .thumbnails")

    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    galleryImages.forEach((image, index) => {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;

        thumb.dataset.arrayIndex = index
        thumb.dataset.selected = index == 0 ? true : false


        thumb.addEventListener('click', (e) => {
            let selectedIndex = e.target.dataset.arrayIndex
            let selectedImage = galleryImages[selectedIndex]
            mainImage.src = selectedImage.src
            mainImage.alt = selectedImage.alt

            thumbnails.querySelectorAll('img').forEach(img => {
                img.dataset.selected = false
            })

            e.target.dataset.selected = true

        });


        thumbnails.appendChild(thumb)
    });

}


/*-----------Products section----------------*/

// filter()

function populateProducts(productList) {
    let productSection = document.querySelector('.products-area');
    productSection.textContent = ""
    productList.forEach((product, index) => {
        let productElement =
            `<div class="product-item">
            <img src="${product.image}" alt="image for ${product.title}">
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-author">${product.author}</p>
                <p class="price-title">Price</p>
               <p class="product-price">${product.price > 0 ? '$' + product.price.toFixed(2) : 'Free'}</p>
            </div>
        </div> `

        productSection.insertAdjacentHTML('beforeend', productElement);
    });

}

function productsHandler() {


    let freeProducts = products.filter(item => {
        return !item.price || item.price <= 0
    })
    let paidProducts = products.filter(item => {
        return item.price > 0
    })

    // console.log(freeProducts)
    // console.log(paidProducts)

    populateProducts(products)

    let productsFilter = document.querySelector('.products-filter')
    productsFilter.addEventListener('click', function (e) {
        if (e.target.id == "all") {
            populateProducts(products)
        } else if (e.target.id == "paid") {
            populateProducts(paidProducts)
            console.log(paidProducts)
        } else if (e.target.id == "free") {
            populateProducts(freeProducts)
            console.log(freeProducts)
        }

    });

    // products.forEach((product, index) => {
    //     // let productElement = document.createElement('div');
    //     // productElement.classList.add('product-item')
    //     // let productImage = document.createElement('img')
    //     // productImage.src = product.image
    //     // product.alt = product.title;
    //     // productElement.append(productImage)
    //     // productSection.append(productElement)

    //     let productElement =
    //         `<div class="product-item">
    //         <img src="${product.image}" alt="image for ${product.title}">
    //         <div class="product-details">
    //             <h3 class="product-title">${product.title}</h3>
    //             <p class="product-author">${product.author}</p>
    //             <p class="price-title">Price</p>
    //            <p class="product-price">${product.price > 0 ? '$' + product.price.toFixed(2) : 'Free'}</p>
    //         </div>
    //     </div> `

    //     productSection.insertAdjacentHTML('beforeend', productElement);
    // });


    document.querySelector('.products-filter label[for=all] span.product-amount').textContent = products.length

    document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = paidProducts.length

    document.querySelector('.products-filter label[for=free] span.product-amount').textContent = freeProducts.length




}


function footerHandler() {

    fullYear = new Date();
    document.querySelector('footer').textContent = `© ${fullYear.getFullYear()} all rights reserved`

}

function weatherHandler() {



    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        let url = weatherAPIURL.replace('{lat}', lat).replace('{lon}', lon).replace('{key}', weatherAPIKey)

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // let condition = data.weather[0].description
                // let userLocation = data.name
                // let temp = data.main.temp
                try {

                } catch (err) {
                    console.log(err)
                    document.querySelector('p#weather').innerHTML = "Error getting weather"
                }
            })

        // trivia API
        //https://opentdb.com/api_config.php
        // fetch("https://opentdb.com/api.php?amount=1")
        //     .then(response => response.json())
        //     .then(data => console.log(data.results))


    })

}
// const customer = "John";
// let balance = 2000;
// console.log("Hi " + customer + " your balance is " + balance)
// balance += 200;
// console.log("Hi " + customer + " your balance is " + balance)
// let num1 = 7;
// let num2 = "you"
// // typeof operator
// // alert(typeof num2);
// let accountNumber = "I1-23456"
// console.log(accountNumber[0]);
// console.log(accountNumber.slice(0, 2));
// console.log(accountNumber.replace("-", "*"));

// let student = { "name": "john", "yob": "1980", "country": "italy" }








// for (let i = 0; i < 10; i++) {
//     console.log(i)
// }


// let animals = ["cat", "bunny", "lion", "zebra"]
// for (let i = 0; i < animals.length; i++) {
//     console.log(animals[i])
// }
// // 'in' keyword
// // increment through array shorthand
// for (let i in animals) {
//     console.log(animals[i])
// }

// let critters = { "name": "frog", "color": "green", "legs": "4" }
// for (let i in critters) {
//     console.log(i) // key of the key-value
//     console.log(`${i}: ${critters[i]}`)
// }

// let bankAccounts = ["EX_983746", "US_233478", "UK_098765", "EX_098777", "PT_002544"];
// function printEXAccounts() {
//     // write your solution here
//     for (let i in bankAccounts) {
//         if (bankAccounts[i].startsWith("EX_")) {
//             console.log(bankAccounts[i])
//         }
//     }
// }
// printEXAccounts();


// let lessons = [
//     {
//         id: "273",
//         title: "Variables",
//         length: 12
//     },
//     {
//         id: "295",
//         title: "Conditionals",
//         length: 12
//     },
//     {
//         id: "299",
//         title: "Functions",
//         length: 12
//     }
// ];
// // use this variable to add the lesson titles
// let lessonTitles = [];
// // write your code below this line
// lessons.forEach(lesson => {
//     lessonTitles.push(lesson.title)
// })


// let numbers = [1, 2, 3, 4, 5, 6, 7, 8]
// let greaterThan4 = numbers.filter(item => {
//     return item > 4
// })

// console.log(greaterThan4)

//page load
menuHandler();
greetingHandler();
galleryHandler();
productsHandler();
footerHandler();
weatherHandler();
/*
learn
promises
async
await
.then()
.try()
.catch()
arrow functions
*/
/*
let members = [
    {
        name: "John Doe",
        yearOfBirth: 2004
    },
    {
        name: "Maria Alba",
        yearOfBirth: 2007
    },
    {
        name: "Ankit Patel",
        yearOfBirth: 2010
    },
    {
        name: "Mario Gomes",
        yearOfBirth: 1982
    },
    {
        name: "Enzo Alvarez",
        yearOfBirth: 2018
    },
    {
        name: "Jan Hansen",
        yearOfBirth: 1972
    }
];
*/
// use this variable to store the new array with 18+ years old members only

// let adultMembers = [];
// let members18 = members.filter(member => {
//     member.yearOfBirth < 2005 ? adultMembers.push(member) : false
// })
// console.log(adultMembers)

document.querySelector('#element').addEventListener('click', function () { });