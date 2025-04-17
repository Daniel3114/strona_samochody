// // document.addEventListener('DOMContentLoaded', function () {
// //     const form = document.getElementById('orderForm');
// //     const showOrderBtn = document.getElementById('showOrder');
// //     const editOrderBtn = document.getElementById('editOrder');
// //     const deleteOrderBtn = document.getElementById('deleteOrder');

// //     const modal = document.getElementById('orderModal');
// //     const closeModal = document.getElementsByClassName('close')[0];
// //     const orderDetails = document.getElementById('orderDetails');
// //     const prevOrderBtn = document.getElementById('previousOrder');
// //     const nextOrderBtn = document.getElementById('nextOrder');

// //     let currentOrderIndex = 0;
// //     let orders = JSON.parse(localStorage.getItem('orders')) || [];

// //     form.addEventListener('submit', function (event) {
// //         event.preventDefault();
// //         saveOrder();
// //     });

// //     showOrderBtn.addEventListener('click', function () {
// //         orders = JSON.parse(localStorage.getItem('orders')) || [];
// //         if (orders.length === 0) {
// //             alert('Brak zapisanych zamówień.');
// //             return;
// //         }
// //         currentOrderIndex = 0;
// //         displayOrder(currentOrderIndex);
// //         modal.style.display = 'block';
// //     });

// //     closeModal.addEventListener('click', function () {
// //         modal.style.display = 'none';
// //     });

// //     window.addEventListener('click', function (event) {
// //         if (event.target === modal) {
// //             modal.style.display = 'none';
// //         }
// //     });

// //     prevOrderBtn.addEventListener('click', function () {
// //         if (currentOrderIndex > 0) {
// //             currentOrderIndex--;
// //             displayOrder(currentOrderIndex);
// //         }
// //     });

// //     nextOrderBtn.addEventListener('click', function () {
// //         if (currentOrderIndex < orders.length - 1) {
// //             currentOrderIndex++;
// //             displayOrder(currentOrderIndex);
// //         }
// //     });

// //     editOrderBtn.addEventListener('click', loadOrder);
// //     deleteOrderBtn.addEventListener('click', deleteOrder);

// //     function saveOrder() {
// //         const order = {
// //             marka: form.marka.value,
// //             silnik: form.silnik.value,
// //             wyp: Array.from(form.querySelectorAll('input[name="wyp[]"]:checked')).map(el => el.value),
// //             imie: form.imie.value,
// //             nazwisko: form.nazwisko.value,
// //             adres: form.adres.value,
// //             telefon: form.telefon.value,
// //             kolor: form.kolor.value,
// //             komentarz: form.komentarz.value
// //         };

// //         orders.push(order);
// //         localStorage.setItem('orders', JSON.stringify(orders));

// //         alert('Zamówienie zostało zapisane.');
// //         form.reset();
// //     }

// //     function displayOrder(index) {
// //         const order = orders[index];
// //         let orderStr = `<pre>${JSON.stringify(order, null, 2)}</pre>`;
// //         orderDetails.innerHTML = orderStr;
// //     }

// //     function loadOrder() {
// //         if (orders.length === 0) {
// //             alert('Brak zapisanego zamówienia.');
// //             return;
// //         }

// //         const order = orders[0]; // Load the first order for simplicity

// //         for (let key in order) {
// //             let element = form.querySelector(`[name="${key}"]`);
// //             if (Array.isArray(order[key])) {
// //                 order[key].forEach(val => {
// //                     const checkbox = form.querySelector(`[name="${key}"][value="${val}"]`);
// //                     if (checkbox) checkbox.checked = true;
// //                 });
// //             } else if (element.type === 'radio' || element.type === 'checkbox') {
// //                 const checkbox = form.querySelector(`[name="${key}"][value="${order[key]}"]`);
// //                 if (checkbox) checkbox.checked = true;
// //             } else {
// //                 element.value = order[key];
// //             }
// //         }
// //         alert('Zamówienie zostało załadowane do formularza.');
// //     }

// //     function deleteOrder() {
// //         localStorage.removeItem('orders');
// //         alert('Wszystkie zamówienia zostały usunięte.');
// //         orders = [];
// //     }
// // });

// // document.addEventListener('DOMContentLoaded', function () {
// //     const form = document.getElementById('orderForm');

// //     form.addEventListener('submit', async function (event) {
// //         event.preventDefault(); // Zapobiega domyślnemu odświeżaniu strony po wysłaniu formularza

// //         // Przygotowanie danych formularza
// //         const formData = new FormData(form);
// //         const wyp = Array.from(form.querySelectorAll('input[name="wyp[]"]:checked')).map(el => el.value);
// //         formData.append('wyp', JSON.stringify(wyp)); // Konwertuj dane "wyp" na JSON

// //         try {
// //             // Wysłanie danych do backendu za pomocą fetch
// //             const response = await fetch(form.action, {
// //                 method: 'POST',
// //                 headers: {
// //                     'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value, // Token CSRF
// //                 },
// //                 body: formData // Przekazanie danych formularza
// //             });

// //             if (response.ok) {
// //                 // Jeśli odpowiedź jest OK, wyświetl komunikat
// //                 const result = await response.json();
// //                 alert(result.message); // Wyświetlenie komunikatu z odpowiedzi
// //                 form.reset(); // Zresetowanie formularza po poprawnym zapisie
// //             } else {
// //                 // Obsługa błędów serwera
// //                 const errorData = await response.json();
// //                 alert('Błąd: ' + (errorData.message || 'Nie udało się zapisać zamówienia.'));
// //             }
// //         } catch (error) {
// //             // Obsługa błędów sieciowych
// //             console.error('Wystąpił błąd:', error);
// //             alert('Nie udało się zapisać zamówienia. Spróbuj ponownie później.');
// //         }
// //     });
// // });



// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('orderForm');
//     const showOrderBtn = document.getElementById('showOrder');
//     const editOrderBtn = document.getElementById('editOrder');
//     const deleteOrderBtn = document.getElementById('deleteOrder');

//     const modal = document.getElementById('orderModal');
//     const closeModal = document.getElementsByClassName('close')[0];
//     const orderDetails = document.getElementById('orderDetails');
//     const prevOrderBtn = document.getElementById('previousOrder');
//     const nextOrderBtn = document.getElementById('nextOrder');

//     let currentOrderIndex = 0;

//     form.addEventListener('submit', function (event) {
//         event.preventDefault(); // Zapobiega przeładowaniu strony
//         saveOrder(); // Zapisz zamówienie na serwerze
//     });

//     showOrderBtn.addEventListener('click', function () {
//         fetchOrders(); // Pobierz zamówienia z serwera
//     });

//     closeModal.addEventListener('click', function () {
//         modal.style.display = 'none';
//     });

//     window.addEventListener('click', function (event) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     });

//     prevOrderBtn.addEventListener('click', function () {
//         if (currentOrderIndex > 0) {
//             currentOrderIndex--;
//             displayOrder(currentOrderIndex);
//         }
//     });

//     nextOrderBtn.addEventListener('click', function () {
//         if (currentOrderIndex < orders.length - 1) {
//             currentOrderIndex++;
//             displayOrder(currentOrderIndex);
//         }
//     });

//     editOrderBtn.addEventListener('click', loadOrder);
//     deleteOrderBtn.addEventListener('click', deleteOrders);

//     async function saveOrder() {
//         const order = {
//             marka: form.marka.value,
//             silnik: form.silnik.value,
//             wyp: Array.from(form.querySelectorAll('input[name="wyp[]"]:checked')).map(el => el.value),
//             imie: form.imie.value,
//             nazwisko: form.nazwisko.value,
//             adres: form.adres.value,
//             telefon: form.telefon.value,
//             kolor: form.kolor.value,
//             komentarz: form.komentarz.value
//         };

//         try {
//             const response = await fetch('/api/orders', { // Ustaw URL do endpointu
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value // Token CSRF
//                 },
//                 body: JSON.stringify(order) // Konwertuj dane zamówienia na JSON
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 alert(result.message || 'Zamówienie zostało zapisane.');
//                 form.reset(); // Resetowanie formularza
//             } else {
//                 const errorData = await response.json();
//                 alert('Błąd: ' + (errorData.message || 'Nie udało się zapisać zamówienia.'));
//             }
//         } catch (error) {
//             console.error('Błąd sieci:', error);
//             alert('Nie udało się zapisać zamówienia. Spróbuj ponownie później.');
//         }
//     }

//     async function fetchOrders() {
//         try {
//             const response = await fetch('/api/orders', {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.length === 0) {
//                     alert('Brak zapisanych zamówień.');
//                     return;
//                 }

//                 orders = data; // Przypisz pobrane zamówienia
//                 currentOrderIndex = 0;
//                 displayOrder(currentOrderIndex);
//                 modal.style.display = 'block'; // Wyświetl modal z zamówieniami
//             } else {
//                 alert('Nie udało się pobrać zamówień.');
//             }
//         } catch (error) {
//             console.error('Błąd sieci:', error);
//             alert('Nie udało się pobrać zamówień. Spróbuj ponownie później.');
//         }
//     }

//     async function deleteOrders() {
//         try {
//             const response = await fetch('/api/orders', {
//                 method: 'DELETE',
//                 headers: {
//                     'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
//                 }
//             });

//             if (response.ok) {
//                 alert('Wszystkie zamówienia zostały usunięte.');
//                 orders = [];
//             } else {
//                 alert('Nie udało się usunąć zamówień.');
//             }
//         } catch (error) {
//             console.error('Błąd sieci:', error);
//             alert('Nie udało się usunąć zamówień. Spróbuj ponownie później.');
//         }
//     }

//     function displayOrder(index) {
//         const order = orders[index];
//         let orderStr = `<pre>${JSON.stringify(order, null, 2)}</pre>`;
//         orderDetails.innerHTML = orderStr;
//     }

//     function loadOrder() {
//         if (orders.length === 0) {
//             alert('Brak zapisanego zamówienia.');
//             return;
//         }

//         const order = orders[currentOrderIndex]; // Pobierz bieżące zamówienie

//         for (let key in order) {
//             let element = form.querySelector(`[name="${key}"]`);
//             if (Array.isArray(order[key])) {
//                 order[key].forEach(val => {
//                     const checkbox = form.querySelector(`[name="${key}"][value="${val}"]`);
//                     if (checkbox) checkbox.checked = true;
//                 });
//             } else if (element && (element.type === 'radio' || element.type === 'checkbox')) {
//                 const checkbox = form.querySelector(`[name="${key}"][value="${order[key]}"]`);
//                 if (checkbox) checkbox.checked = true;
//             } else if (element) {
//                 element.value = order[key];
//             }
//         }
//         alert('Zamówienie zostało załadowane do formularza.');
//     }
// });
