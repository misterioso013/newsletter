
const form = document.querySelector('form');
const email = document.querySelector('#email');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    setTimeout(() => {
        if (document.querySelector('p')) {
            document.querySelector('p').remove();
        }
    }, 2000);

    document.querySelector('button').disabled = true;
    document.querySelector('button').innerHTML = 'Enviando...';

    if (email.value === '') {
        email.classList.add('error');
        const error = document.createElement('p');
        error.classList.add('error');
        error.innerText = 'Por favor, insira um e-mail válido';
        email.after(error);
        document.querySelector('button').disabled = false;
        document.querySelector('button').innerHTML = 'Inscrever-se';
    } else {
        if (email.classList.contains('error')) {
            email.classList.remove('error');
            email.nextElementSibling.remove();
        }
        document.querySelector('button').disabled = false;
        document.querySelector('button').innerHTML = 'Inscrever-se';
        // regex email validation
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email.value)) {
            email.classList.add('error');
            const error = document.createElement("p");
            error.classList.add('error');
            error.innerText = 'Por favor, insira um e-mail válido';
            email.after(error);
        } else {
            // ajax request
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://sinais.helpdevelop.top/api/newsletter/subscribe?email=${email.value}`);
            xhr.send();
            xhr.onload = () => {

                const status = xhr.status;
                if (status === 201) {
                    email.classList.remove('error');
                    email.value = '';
                    const success = document.createElement('p');
                    success.classList.add('success');
                    success.innerText = 'E-mail cadastrado com sucesso! Você receberá as novidades em seu e-mail.';
                    email.after(success);
                } else {
                    const error = document.createElement('p');
                    error.classList.add('already');
                    error.innerText = 'E-mail já cadastrado. Fique tranquilo, você já está inscrito.';
                    email.after(error);
                }
            }
        }
    }
                                         
});

email.addEventListener("focus", () => {
  if (email.classList.contains('error')) {
    email.classList.remove('error');
    email.nextElementSibling.remove();
  }
});