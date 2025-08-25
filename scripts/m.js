//console.log("Hola Mundo")
const templatePlaceCard = document.querySelector("#template-place-card");
const cards = [
  {
    name: "Bob Millonario",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSW1_MPTzfULxuQq12kOMOzkpLeMTNLs4Bw&s",
  },
  {
    name: "Kenny Pro",
    image:
      "https://ih1.redbubble.net/image.4988894177.8401/st,small,507x507-pad,600x600,f8f8f8.jpg",
  },
  {
    name: "Pepinillo Rick",
    image:
      "https://wallpapers.com/images/featured/pickle-rick-rh0wcfyj4u556stl.jpg",
  },
];

//const travelerProfileCard = document.querySelector(".traveler-profile__name");
const travelerProfileAddPlaceBtn = document.querySelector(
  ".traveler-profile__add-place-btn"
);
const modalNewPlace = document.querySelector("#modal-new-place");
const travelerProfileDetails = document.querySelector(
  ".traveler-profile__details"
);
const modalEditProfile = document.querySelector("#modal-edit-profile");
const buttonEdit = document.querySelector(".traveler-profile__edit-btn");
const modalsClose = document.querySelectorAll(".modal__close");

modalsClose.forEach((modalClose) => {
  modalClose.addEventListener("click", (evt) => {
    let modal = evt.target.closest(".modal");
    modal.classList.remove("modal_is-opened"); // Cierra el modal
    console.log("Cerrando modal:", modal);
  });
});

const ModalNewPlace = document.querySelector("#modal-new-place");
const modalImageView = document.querySelector("#modal-image-view");

//console.dir(travelerProfileDetails);
const travelerProfileBio = document.querySelector(".traveler-profile__bio");
const travelerProfileName = document.querySelector(".traveler-profile__name");
const placesGalleryList = document.querySelector(".places-gallery__list");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

travelerProfileAddPlaceBtn.addEventListener("click", () => {
  ModalNewPlace.classList.toggle("modal_is-opened");
});

const createCards = (card) => {
  const template = document
    .querySelector("#template-place-card")
    .content.cloneNode(true);

  const placeCardImage = template.querySelector(".place-card__image");
  const placeCardTitle = template.querySelector(".place-card__title");

  placeCardImage.src = card.image;
  placeCardTitle.alt = card.name;
  placeCardTitle.textContent = card.name;
  console.dir(template);

  placeCardImage.addEventListener("click", () => {
    modalImageView.classList.toggle("modal_is-opened");
    const modalImage = modalImageView.querySelector(".modal__image");
    const modalCaption = modalImageView.querySelector(".modal__caption");
    modalImage.src = placeCardImage.src;
    modalCaption.textContent = placeCardImage.alt;
  });

  const placeCardDeleteButton = template.querySelector(
    ".place-card__delete-button"
  );

  const placeCardLikeButton = template.querySelector(
    ".place-card__like-button"
  );
  placeCardLikeButton.addEventListener("click", () => {
    placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
  });

  placeCardDeleteButton.addEventListener("click", (evt) => {
    console.log(evt);
    evt.target.closest(".place-card").remove();
  });
  placesGalleryList.appendChild(template);
};

/*modalsClose.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    console.log("Está funcionando");
    ModalNewPlace.classList.toggle("modal_is-opened");
  });
});*/

travelerProfileAddPlaceBtn.addEventListener("click", () => {
  ModalNewPlace.classList.toggle("modal_is-opened");
});

buttonEdit.addEventListener("click", () => {
  profileName.value = travelerProfileName.textContent;
  profileDescription.value = travelerProfileBio.textContent;
  modalEditProfile.classList.toggle("modal_is-opened");
});

ModalNewPlace.addEventListener("submit", (evt) => {
  const tempCard = {};
  evt.preventDefault();
  const modalForm = ModalNewPlace.querySelector(".modal__form");
  const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
  modalInputs.forEach((modalInput) => {
    tempCard[modalInput.name] = modalInput.value;
  });
  console.log(tempCard);
  createCards(tempCard);
});

//modalForm = ModalNewPlace.querySelector(".modal__form")
//console.log(modalForm.elements());

cards.forEach((card) => {
  createCards(card);
});
buttonEdit;
