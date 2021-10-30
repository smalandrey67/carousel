document.addEventListener("DOMContentLoaded", () => {
    const additions = document.querySelector(".additions");
    const containerOfCarousel = document.querySelector(".carousel__container");
    const buttonMove = document.querySelector("#move");
    const btnContainer = document.querySelector(".additions__move");
    const form = document.forms.main;
    const input = form.image;

    const enlargement = [".png", ".jpg", ".jpeg", ".gif"];

    if(enlargement && Array.isArray(enlargement)){
        input.setAttribute("accept", enlargement.join(","));
    }

    input.addEventListener("change", function(){
        containerOfCarousel.innerHTML = "";
        const dataFromUser = Array.from(input.files);

        btnContainer.classList.add("additions__move--active");
        buttonMove.addEventListener("click", () =>{
            additions.classList.add("additions--move");
        })

        createUrl(dataFromUser);
    })
    function showError(){
        alert("error")
        buttonMove.classList.remove("additions__button--active");
    }
    function createUrl(data){
        data.forEach(element => {
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                const url = e.target.result;
    
                createItems(url);
            })
            reader.readAsDataURL(element);
        })
    }
    function createItems(source){
        containerOfCarousel.innerHTML += `
            <div class="carousel__slide" style="background-image: url('${source}')"></div>
        `
        // ================CAROUSEL=======================
        const slides = document.querySelectorAll(".carousel__slide");

        slides.forEach(element => {
            element.addEventListener("click", () => {
                removeClass();

                element.classList.toggle("active")
            })
        })
        function removeClass(){
           slides.forEach(element => {
               element.classList.remove("active")
           })
        }
    }

     // ================POPUP=======================
     const popup = document.querySelector(".popup");
     const openPopup = document.querySelector(".additions__link--move");
     const closePopup = document.querySelector(".popup--close");

     openPopup.addEventListener("click", (e) => {
         e.preventDefault();
         if(!popup.classList.contains("popup--active")){
             popup.classList.add("popup--active")
         }
     })
     closePopup.addEventListener("click", (e) => {
        e.preventDefault();
        if(popup.classList.contains("popup--active")){
             popup.classList.remove("popup--active")
        }
     })
})


