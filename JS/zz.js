document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('orderForm');
    const showOrderBtn = document.getElementById('showOrder');
    const editOrderBtn = document.getElementById('editOrder');
    const deleteOrderBtn = document.getElementById('deleteOrder');

    const modal = document.getElementById('orderModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const orderDetails = document.getElementById('orderDetails');
    const prevOrderBtn = document.getElementById('previousOrder');
    const nextOrderBtn = document.getElementById('nextOrder');

    let currentOrderIndex = 0;
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        saveOrder();
    });

    showOrderBtn.addEventListener('click', function () {
        orders = JSON.parse(localStorage.getItem('orders')) || [];
        if (orders.length === 0) {
            alert('Brak zapisanych zamówień.');
            return;
        }
        currentOrderIndex = 0;
        displayOrder(currentOrderIndex);
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    prevOrderBtn.addEventListener('click', function () {
        if (currentOrderIndex > 0) {
            currentOrderIndex--;
            displayOrder(currentOrderIndex);
        }
    });

    nextOrderBtn.addEventListener('click', function () {
        if (currentOrderIndex < orders.length - 1) {
            currentOrderIndex++;
            displayOrder(currentOrderIndex);
        }
    });

    editOrderBtn.addEventListener('click', loadOrder);
    deleteOrderBtn.addEventListener('click', deleteOrder);

    function saveOrder() {
        const order = {
            marka: form.marka.value,
            silnik: form.silnik.value,
            wyp: Array.from(form.querySelectorAll('input[name="wyp[]"]:checked')).map(el => el.value),
            imie: form.imie.value,
            nazwisko: form.nazwisko.value,
            adres: form.adres.value,
            telefon: form.telefon.value,
            kolor: form.kolor.value,
            komentarz: form.komentarz.value
        };

        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        alert('Zamówienie zostało zapisane.');
        form.reset();
    }

    function displayOrder(index) {
        const order = orders[index];
        let orderStr = `<pre>${JSON.stringify(order, null, 2)}</pre>`;
        orderDetails.innerHTML = orderStr;
    }

    function loadOrder() {
        if (orders.length === 0) {
            alert('Brak zapisanego zamówienia.');
            return;
        }

        const order = orders[0]; // Load the first order for simplicity

        for (let key in order) {
            let element = form.querySelector(`[name="${key}"]`);
            if (Array.isArray(order[key])) {
                order[key].forEach(val => {
                    const checkbox = form.querySelector(`[name="${key}"][value="${val}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            } else if (element.type === 'radio' || element.type === 'checkbox') {
                const checkbox = form.querySelector(`[name="${key}"][value="${order[key]}"]`);
                if (checkbox) checkbox.checked = true;
            } else {
                element.value = order[key];
            }
        }
        alert('Zamówienie zostało załadowane do formularza.');
    }

    function deleteOrder() {
        localStorage.removeItem('orders');
        alert('Wszystkie zamówienia zostały usunięte.');
        orders = [];
    }
});
