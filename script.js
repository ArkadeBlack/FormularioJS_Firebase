//Base de datos no relacional en Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDV-QaBp5ouY3NdPVPiq1ow9aGmB05Z030",
    authDomain: "formulario-de-js.firebaseapp.com",
    projectId: "formulario-de-js",
    storageBucket: "formulario-de-js.firebasestorage.app",
    messagingSenderId: "352523198180",
    appId: "1:352523198180:web:605b348acab9a3354456f1",
    measurementId: "G-9D5T758NZV"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Cloud Firestore
const db = firebase.firestore();

//Evento de escucha a un Submit
document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

//Validacion Nombre:
    let escribirNombre = document.getElementById('name')
    let errorNombre = document.getElementById('name_error')

    if (escribirNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce un nombre valido'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

//Validacion Email:
    let escribirEmail = document.getElementById('email')
    let errorEmail = document.getElementById('email_error')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if (!emailPattern.test(escribirEmail.value)){
        errorEmail.textContent = 'Por favor, introduce un mail valido'
        errorEmail.classList.add('error-message')
    }else{
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }

//Validacion Contraseña:
    let escribirPassword = document.getElementById('password')
    let errorPassword = document.getElementById('password_error')
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;

    if (!passwordPattern.test(escribirPassword.value)){
        errorPassword.textContent = 'La contraseña debe tener al menos de 8 a 15 caracteres, numeros, mayusculas y minusculas'
        errorPassword.classList.add('error-message')
    }else{
        errorPassword.textContent = ''
        errorPassword.classList.remove('error-message')
    }


//Todos los campos validos
    if (!errorNombre.textContent && !errorEmail.textContent && !errorPassword.textContent) {

    //Backend que reciba los datos
        db.collection("users").add({
            nombre: escribirNombre.value,
            email: escribirEmail.value,
            password: escribirPassword.value
        })
        .then((docRef) => {
            alert('El formulario se envio con exito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert('Error de formulario', error);
        });

    }
})