const form = document.querySelector('#form')
const firstName = document.querySelector('#firstName')
const secondName = document.querySelector('#secondName')
const email = document.querySelector('#email')
const checkbox = document.querySelector('#checkbox')
const content = document.querySelector('.productList');
const button = document.querySelector('.form-button')
const editCard = document.querySelector('#editCard')
let users = [];

const validate = (input) => {
if (input.value === '') {
    setError(input, 'Field can not be empty')
    return false
}
else if (input.value.trim().length < 2) {
    setError(input, 'Too short')
    return false
}
else {
    setSuccess(input)
    return true
}
}
const validateEmail = (input) => {
    const found = users.some(user => user.email === input.value);
    const mailFormat = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (input.value === '') {
        setError(input, 'Email can not be empty')
        return false;
    }
    else if (found) {
        setError(input, 'Email already exist')
        console.log('Email already exist');
        return false;
    }
    else if  (!mailFormat.test(input.value))
     {
        setError(input, 'Invalid email')
        return false;
    }
    else {
        setSuccess(input)
        return true;
    }
    }


    const validateEditedEmail = (input) => {
        const mailFormat = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (input.value === '') {
            setError(input, 'Email can not be empty')
            return false;
        }
        else if  (!mailFormat.test(input.value)) {
            setError(input, 'Invalid email');
            return false;
        }
       
        else {
            setSuccess(input);
            return true;
        }
        }

const validateCheckbox = input => {
    if (input.checked) {
        setSuccess(input)
        return true
    }
    else {
        setError(input, 'Confirm registration')
        return false
    }
}


const setError = (input, message) => {
const inputGroup = input.parentElement;
inputGroup.classList.add('invalid');
inputGroup.classList.remove('valid')

const error = inputGroup.querySelector('p');
error.innerText = message;
return false;
}

const setSuccess = (input) => {
    const inputGroup = input.parentElement;
    inputGroup.classList.remove('invalid')
    inputGroup.classList.add('valid')
    return true;
}


const createUser = (firstName, secondName, email) => {
    const user =  {
         id: uuidv4(),
         firstName,
         secondName,
         email
     }
     users.push(user);
 }

 
  const createUserForm = id => {
    editCard.classList.remove('hide')
    let user = users.find(user => user.id === id)
   
  
    let template =
    `
    <div id="editCard" class="mb-2" >
    <div class="edit-form">
        <div class="form-group ">
          <input type="text" id="editedFirstName" class="form-control" value="${user.firstName}" >
          <p  class='errorMessage'></p>
        </div>
        <div class="form-group">
          <input type="text" id="editedLastName" class="form-control" value="${user.secondName}" >
          <p  class='errorMessage'></p>
        </div>
        <div class="form-group">
          <input type="email" id="editedEmail" class="form-control" value="${user.email}" placeholder="Please enter your email">
          <p  class='errorMessage'></p>
        </div>
        </div>
      <button type ='button' id="editButton" class='btn btn-primary'>Save</button>
      </div>
      `
  
      editCard.innerHTML = template;
      const firstNameEdit = document.querySelector('#editedFirstName')
      const lastNameEdit = document.querySelector('#editedLastName')
      const emailEdit = document.querySelector('#editedEmail')

      const saveBtn = document.querySelector('#editButton')
      saveBtn.addEventListener('click', () => {
        user.firstName = firstNameEdit.value
        user.secondName = lastNameEdit.value
        user.email = emailEdit.value
        validate(firstNameEdit);
        validate(lastNameEdit);
        validateEditedEmail(emailEdit);
        if (validate(firstNameEdit) && validateEditedEmail (emailEdit) && validate(lastNameEdit))
       { 
        content.innerHTML =  createMarkup();
        editCard.classList.add('hide')
    }
      })
  }

const options = e => {
      if (e.target.dataset.btn === 'edit') {
        const id = e.target.closest('[data-id]').dataset.id;
        createUserForm(id);
      } 
      else (e.target.dataset.btn === 'delete') 
      {
        const id = e.target.closest('[data-id]').dataset.id;
        deleteUser(id);
      } 
    
  };

content.addEventListener('click', options)



const deleteUser = (id) => { 
   users = users.filter(user => user.id !== id);
    content.innerHTML =  createMarkup();
} 
const createMarkup = () => {
    return users.reduce((acc, user) => {
       acc+= `
       <li class='cards mb-2' data-id="${user.id}">
       <div > 
       <div class='contact-info'>
       <p>${user.firstName}</p>
        <p>${user.secondName}</p>
        </div> 
        <p>${user.email}</p>
        </div>
        <div class='button-set'> 
        <button type="button" class='btn btn-success' data-btn="edit"> Edit </button>
        <button type="button" class='btn btn-danger' data-btn="delete"> Delete </button>
        </div>
        </li>
        `
    return acc
    }, '' )
}


form.addEventListener('submit', event => {
   event.preventDefault();
    validate(firstName);
    validate(secondName);
    validateEmail(email);
    validateCheckbox(checkbox);
    if (validate(firstName) && validateEmail(email) && validate(secondName) && validateCheckbox(checkbox) )
    {createUser(firstName.value, secondName.value, email.value)
        content.innerHTML =  createMarkup();
    form.reset();
       
}
})

