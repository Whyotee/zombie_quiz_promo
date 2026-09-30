"use strict";

const quiz = document.querySelector(".quiz");
const header = document.querySelector(".header");
const results = document.querySelectorAll(".results");
const allAnswers = document.querySelectorAll(".question_option");
const allInput = document.querySelectorAll(".input");

const credits = document.querySelector(".credits");


const shareButtons = document.querySelector(".share-buttons");
const btnFacebook = document.querySelector(".btn-share-facebook");
const btnTwitter = document.querySelector(".btn-share-twitter");
const btnReddit = document.querySelector(".btn-share-reddit");
const btnLinkedIn = document.querySelector(".btn-share-linkedin");




const btnBox = document.querySelector(".btn-box");

const killFriend = document.querySelector(".killed");
const skipQuestion = document.querySelector(".skip-question");

const modalTwo = document.querySelector(".choose-two");
const boxes = document.querySelectorAll(".boxes");
const modalPara = document.querySelectorAll(".modal_text")
const ctaSlide = document.querySelector(".cta");


const btnNext = document.querySelector(".btn-next");

const btnFinish = document.querySelector(".btn-finish");
const btnAgain = document.querySelector(".btn-again");
const btnLook = document.querySelector(".btn-look");
const btnBack = document.querySelector(".btn-back");



const linksA = document.querySelectorAll(".link-a");


results.forEach(res => console.log(res.classList.contains("hidden")));

let food, fight, mood, cure, outcome, result;


const init = function() {
    items = 0;
    food = 0;
    fight = 0;
    mood = 0;
    cure = 0;
    result = "";
    curSlide = 0;
    goToSlide(0);    
    activateDot(0);
    quiz.classList.remove("hidden");
    header.classList.add("hidden");
    results.forEach(r => {r.classList.add("hidden"); r.removeAttribute("back-to")});
    shareButtons.classList.add("hidden");
    credits.classList.add("hidden");    

    allInput.forEach(input => {
        // input.setAttribute("checked", "true");
        // input.removeAttribute("checked");
        input.checked = false;
    });
    
}

const showOutcome = function(res) {
    quiz.classList.add("hidden");
    header.classList.remove("hidden");

    results.forEach(r => r.classList.contains(`${res}`) ? (r.classList.remove("hidden"), r.setAttribute("id", "back-to")) : r.classList.add("hidden"));

    const resultTextElement = document.querySelector(".results:not(.hidden) .results_text");
    const resultText = encodeURIComponent(resultTextElement.textContent.trim());

    // Show share buttons
    shareButtons.classList.remove("hidden");
    credits.classList.remove("hidden");


    btnFacebook.onclick = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.rain-hunter.com/thegame?result=${resultText}`, '_blank');
    };

    btnTwitter.onclick = () => {
        window.open(`https://twitter.com/intent/tweet?url=https://www.rain-hunter.com/thegame?result=${resultText}&text=I just finished the Zombie Quiz!`, '_blank');
    };

    btnReddit.onclick = () => {
         window.open(`https://www.reddit.com/submit?url=https://www.rain-hunter.com/thegame?result=${resultText}&title=Check+out+my+Zombie+Quiz+result!`, '_blank');
    };

    btnLinkedIn.onclick = () => {
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://www.rain-hunter.com/thegame?result=${resultText}&title=Zombie+Quiz+Result&summary=I+survived+the+zombie+apocalypse!`, '_blank');
    };



    
}


const checkLifeFinal = function() {
    if (fight < 45 & mood < 10 ) {        
        showOutcome(5);
    } else if (food < 30) {        
        showOutcome(4);
    } else if (mood < 25) {
        showOutcome(3);
    } else if (cure < 50) {
        showOutcome(2);
    } else {
        showOutcome(1);
    }
}   


const checkLifeCur = function() {
    if (outcome === false) {        
        showOutcome(result);
    } 
}


const calcPoints = function(choice) {

    food += Number(choice.getAttribute("food"));
    fight += Number(choice.getAttribute("fight"));
    mood += Number(choice.getAttribute("mood"));
    cure += Number(choice.getAttribute("cure"));
    outcome = Boolean(choice.getAttribute("outcome"));

    if (outcome === false) result = choice.getAttribute("res");

    console.log(food, fight, mood, cure, outcome, result);   

}


// SLIDER
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
const links = document.querySelectorAll(".link");

let curSlide = 0;
const maxSlide = slides.length - 1;

const createDots = function() {
    slides.forEach((_, i) => dotContainer.insertAdjacentHTML("beforeend", `<button class="dot" data-slide="${i}">${i + 1}</button>`));
}

const activateDot = function(slide) {
    document
        .querySelectorAll(".dot")
        .forEach(dot => dot.classList.remove("dot--active"));

    document
        .querySelector(`.dot[data-slide="${slide}"]`)
        .classList.add("dot--active");
        
};

const goToSlide = function(slide) {
    slides.forEach((s, i) => {
        const x = 100 * (i - slide);
        s.style.transform = `translateX(${x}%)`;
        if(x !== 0) {
            // s.style.display = "none";
            s.style.visibility = "hidden";
            s.style.width = 0;
        } else {
            // s.style.display = "block";
            s.style.visibility = "visible"
            s.style.width = "100%";
        }
    })
        
};

const nextSlide = function() {
    console.log('curslide:',curSlide);
    console.log('maxSlide:', maxSlide)

    if(curSlide === maxSlide) return;
    curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
}

// dotContainer.addEventListener("click", function(e) {
//     if (e.target.classList.contains("dot")) {
//         const {slide} = e.target.dataset;
//         goToSlide(slide);
//         activateDot(slide);
//     };
// });



let items = 0;

// EVENT LISTENERS


btnNext.addEventListener("click", function(e) {
    e.preventDefault();
    
    if(items === 2) {
        
        nextSlide();
        

        checkedBoxes.forEach(checkbox => {
            const answer = checkbox.closest(".question_option");
            calcPoints(answer);
            checkLifeCur();

            const boxName = checkbox.nextElementSibling.getAttribute("title");

            boxes.forEach(box => {
                if (box.classList.contains(boxName)) {
                    box.classList.remove("hidden");
                    openModal();
                }
            })
        })

        
        
    }else{
        openModal();
        modalTwo.classList.remove("hidden");
    }    


    

});

btnFinish.addEventListener("click", function() {
    checkLifeFinal();

});

btnAgain.addEventListener("click", function() {
    init();
    
    checkedBoxes.forEach(box => box.classList.remove("clicked"));
    console.log(checkedBoxes);
}
);

btnLook.addEventListener("click", function() {
    quiz.classList.remove("hidden");
    ctaSlide.classList.remove("hidden");
    header.classList.add("hidden");
})

btnBack.addEventListener("click", function() {
    quiz.classList.add("hidden");
    ctaSlide.classList.add("hidden");
    header.classList.remove("hidden");
})






links.forEach(link => link.addEventListener("click", function() {
    const boxName = link.getAttribute("title");
    boxes.forEach(box => {
        if (box.classList.contains(boxName)) {
                box.classList.remove("hidden");
                openModal();
            }
    })

    const answer = link.closest(".question_option");
    calcPoints(answer);
    checkLifeCur();
    nextSlide();
    if (link.classList.contains("killed")) nextSlide();  

    let checkbox = link.previousElementSibling;
    
    
    
}
));


// 
let checkedBoxes;

linksA.forEach(link => link.addEventListener("click", function() {
    
    let checkbox = link.previousElementSibling;
    checkbox.classList.toggle("clicked");
    console.log(checkbox.classList.contains("clicked"));

    checkedBoxes = document.querySelectorAll(".clicked");

    items = checkedBoxes.length;
    console.log(items);   

    

}
));



// MODALS
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close");

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");

    modalPara.forEach(para => para.classList.add("hidden"));
}

function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e) {   
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});



// START

createDots();
init(); 






