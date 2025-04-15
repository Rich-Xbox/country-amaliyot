let input = document.querySelector("#search");
let select = document.querySelector(".select");
let card_ota = document.querySelector(".flags-container");
let davlatlar = [];

function toggleDarkMode() {
  document.body.classList.toggle('light-mode');
}

function cardlarni_render_qilish(data) {
  card_ota.innerHTML = ""; // Always clear before rendering
  data.forEach(davlat => {
    let card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `
      <div class="card-img">
        <img src="${davlat.flags.svg}" alt="">
      </div>
      <div class="card-body">
        <h1>${davlat.name.common}</h1>
        <p>Region: ${davlat.region}</p>
        <p>Mustaqilmi: ${davlat.independent}</p>
      </div>`;
    card_ota.append(card);
  });
}

fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    davlatlar = data;
    cardlarni_render_qilish(davlatlar);
  });

  
  function card_filter() {
    let filtered = davlatlar.filter(davlat =>
      davlat.name.common.toLowerCase().includes(input.value.toLowerCase()) 
    );
    
    
    cardlarni_render_qilish(filtered);
  }

  function select_filter() {
    console.log(select.value);
  
    if (select.value === "all") {
      cardlarni_render_qilish(davlatlar);
      return;
    }
  
    let filtered = davlatlar.filter(davlat =>
      String(davlat.independent) === select.value
    );
  
    console.log(filtered);
    cardlarni_render_qilish(filtered);
  }

setTimeout(() => {
  input.addEventListener("input", card_filter);
  select.addEventListener("change", select_filter)
}, 1000);
