document.getElementById('addBurger').addEventListener('click', event => {
    event.preventDefault()
  
    axios.post('/api/burgers', {
      name: document.getElementById('product').value,
      quantity: document.getElementById('quantity').value,
      cost: document.getElementById('cost').value,
      purchased: false
    })
      .then(({ data }) => {
        let burgerElem = document.createElement('li')
        burgerElem.className = 'list-group-item'
        burgerElem.id = data.id
        burgerElem.innerHTML = `
         <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${document.getElementById('product').value}</h5>
           <button 
            data-name="${document.getElementById('product').value}"
            data-quantity="${document.getElementById('quantity').value}"
            data-cost="${document.getElementById('cost').value}"
            class="purchase btn btn-success">✓</button>
         </div>
         <p class="mb-1">Quantity: ${document.getElementById('quantity').value}</p>
         <small>Price: $${document.getElementById('cost').value}</small>
        `
        document.getElementById('notPurchased').append(burgerElem)
  
        document.getElementById('product').value = ''
        document.getElementById('quantity').value = ''
        document.getElementById('cost').value = ''
      })
      .catch(err => console.error(err))
  })
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('purchase')) {
      axios.put(`/api/burgers/${event.target.parentNode.parentNode.id}`, {
        purchased: true
      })
        .then(() => {
          let burgerElem = document.createElement('li')
          burgerElem.className = 'list-group-item'
          burgerElem.id = event.target.parentNode.parentNode.id
          burgerElem.innerHTML = `
         <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${event.target.dataset.name}</h5>
           <button class="btn btn-danger remove">X</button>
         </div>
         <p class="mb-1">Quantity: ${event.target.dataset.quantity}</p>
         <small>Price: $${event.target.dataset.cost}</small>
        `
          document.getElementById('purchased').append(burgerElem)
          event.target.parentNode.parentNode.remove()
        })
        .catch(err => console.error(err))
    } else if (event.target.classList.contains('remove')) {
      axios.delete(`/api/burgers/${event.target.parentNode.parentNode.id}`)
        .then(() => {
          event.target.parentNode.parentNode.remove()
        })
        .catch(err => console.error(err))
    }
  })