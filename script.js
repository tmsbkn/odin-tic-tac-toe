const form = document.querySelector('#gameForm');

form.addEventListener('submit', (event) => {
   event.preventDefault();

   const formData = new FormData(form);
   const data = Object.fromEntries(formData);
   document.querySelector('.formWrap').setAttribute('hidden', true);
   console.log(data);
});
// Attach event listener to boxes

// initialize game

//set win conditions

// determine current player

//after each move, check win conditions. If not met change active player
