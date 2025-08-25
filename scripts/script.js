const cards = [
  {
    name: "Camalardo guapo",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtEmmtJBHqff6x1J6CelPt28cYI2UKwcJ1uA&s",
  },
  {
    name: "Mauricio",
    image:
      "https://images3.memedroid.com/images/UPLOADED853/64bd7ab4e157f.webp",
  },
  {
    name: " Bob cholo",
    image:
      "https://phoneky.co.uk/thumbs/wallpapers/2022/p2/drawings/29/b3o93300.jpg",
  },
];
const templtePlaceCard = document.querySelector("#template-place-card");

const modalsClose = Array.from(document.querySelectorAll(".modal__close"));

const travelerProfileAddPlaceBtn = document.querySelector(
  ".traveler-profile__add-place-btn"
);

const modalNewPlace = document.querySelector("#modal-new-place");

const modalImageView = document.querySelector("#modal-image-view");

const travelerProfileDetails = document.querySelector(
  ".traveler-profile__details"
);

const placesGalleryList = document.querySelector(".places-gallery__list");
const modalProfile = document.querySelector("#modal-profile");
const travelerProfileEditBtn = document.querySelector("#button-edit");
const modalEditProfile = document.querySelector("#modal-edit-profile");

const travelerProfileName = document.querySelector(".traveler-profile__name");
const travelerProfileBio = document.querySelector(".traveler-profile__bio");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const modalForms = Array.from(document.querySelectorAll(".modal__form"));

/**
 * Función que valida si un formulario tiene algún input inválido.
 * Retorna true si al menos uno no es válido.
 */
const validarBoton = (modalInputs) => {
  return modalInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/**
 * Función que crea una card (tarjeta de lugar) a partir de un objeto "card".
 * - Inserta la imagen y el título
 * - Agrega eventos para abrir la imagen en modal, dar like o eliminar la tarjeta
 */
const createCards = (card) => {
  const template = document
    .querySelector("#template-place-card")
    .content.cloneNode(true);

  const placeCardImage = template.querySelector(".place-card__image");
  const placeCardTitle = template.querySelector(".place-card__title");

  placeCardImage.src = card.image;
  placeCardImage.alt = card.name;
  placeCardTitle.textContent = card.name;

  // Evento: al hacer click en la imagen abre el modal de vista
  placeCardImage.addEventListener("click", () => {
    modalImageView.classList.toggle("modal_is-opened");
    const modalImage = modalImageView.querySelector(".modal__image");
    const modalCaption = modalImageView.querySelector(".modal__caption");
    modalImage.src = placeCardImage.src;
    modalImage.alt = placeCardImage.alt;
    modalCaption.textContent = placeCardImage.alt;
  });

  // Evento: botón de like
  const placeCardLikeButton = template.querySelector(
    ".place-card__like-button"
  );
  placeCardLikeButton.addEventListener("click", (evt) => {
    placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
  });

  // Evento: botón de eliminar tarjeta
  const placeCardDeleteButton = template.querySelector(
    ".place-card__delete-button"
  );

  placeCardDeleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".place-card").remove();
  });

  // Agregar la card a la lista de la galería
  placesGalleryList.appendChild(template);
};

/**
 * Validación de formularios:
 * - Desactiva o activa botón según validez de inputs
 * - Muestra mensajes de error en tiempo real
 */
modalForms.forEach((modalForm) => {
  const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
  const modalButton = modalForm.querySelector(".modal__button");
  modalButton.disabled = false;
  modalButton.disabled = validarBoton(modalInputs);

  modalInputs.forEach((modalInput) => {
    modalInput.addEventListener("input", () => {
      modalButton.disabled = validarBoton(modalInputs);

      let modalError = modalForm.querySelector("#" + modalInput.id + "-error");
      if (!modalInput.validity.valid) {
        modalError.textContent = "Hay un error";
        modalError.classList.add("modal__error_visible");
      } else {
        modalError.textContent = "";
        modalError.classList.remove("modal__error_visible");
      }
    });
  });
});

/**
 * Evento submit para editar perfil:
 * - Cambia nombre y bio del perfil
 * - Cierra el modal
 */
modalProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  travelerProfileName.textContent = profileName.value;
  travelerProfileBio.textContent = profileDescription.value;
  modalProfile.classList.toggle("modal_is-opened");
});

/**
 * Evento click en botón de editar perfil:
 * - Rellena los campos del modal con los valores actuales
 * - Abre el modal
 */
travelerProfileEditBtn.addEventListener("click", () => {
  profileName.value = travelerProfileName.textContent;
  profileDescription.value = travelerProfileBio.textContent;
  modalProfile.classList.toggle("modal_is-opened");
});

/**
 * Evento click en botón "Agregar lugar":
 * - Abre el modal para añadir un nuevo lugar
 */
travelerProfileAddPlaceBtn.addEventListener("click", () => {
  modalNewPlace.classList.toggle("modal_is-opened");
});

/**
 * Evento click en botón de cerrar modal:
 * - Busca el modal al que pertenece el botón y lo cierra
 */
modalsClose.forEach((modalClose) => {
  modalClose.addEventListener("click", (evt) => {
    let modal = evt.target.closest(".modal");
    modal.classList.toggle("modal_is-opened");
  });
});

/**
 * Evento submit para crear un nuevo lugar:
 * - Toma los valores del formulario
 * - Crea una nueva card y la agrega a la galería
 */
modalNewPlace.addEventListener("submit", (evt) => {
  const tempCard = {};
  evt.preventDefault();
  const modalForm = modalNewPlace.querySelector(".modal__form");
  const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
  modalInputs.forEach((modalInput) => {
    tempCard[modalInput.name] = modalInput.value;
  });

  createCards(tempCard);
});

// Inicializa la página con las cards predefinidas
cards.forEach((card) => {
  createCards(card);
});
