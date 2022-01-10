async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)
}

function renderBook(book) {
    // List book titles
    let div = document.querySelector('#root');
    let li = document.createElement('li');
    li.textContent = book.title;

    // Text input with book quantity
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', book.quantity);

    // Create save button
    let saveBtn = document.createElement('button');
    saveBtn.appendChild(document.createTextNode("Save"))

    // Event listener to retrieve/save quantity when saveBtn clicked
    saveBtn.addEventListener('click', function() {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': book.id,
                'quantity': input.value
            })
        });
    });
    // add elements to the page
    li.append(input, saveBtn);
    div.append(li);
}


main()