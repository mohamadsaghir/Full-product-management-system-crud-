let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// get total
function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +texes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create product
const product = localStorage.getItem('product');
const dataPro = product ? JSON.parse(product) : [];

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        texes: texes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if( title.value != ''&& price.value !='' && category.value !=''&& texes.value !=''&& newPro.count<100){
    // Add newPro multiple times if count > 1
    let countValue = parseInt(newPro.count);
    if (countValue > 1) {
        for (let i = 0; i < countValue; i++) {
            dataPro.push(newPro);
        }
    } else {
        dataPro.push(newPro);
    }
    clearData();
}
    // Save to localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));

    
    showData();
};

// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].texes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id = "update" >Update</button></td>
            <td><button onclick="deleteData(${i})" id = "delete" >Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    } else {
        btnDelete.innerHTML = '';
    }
}

showData();

// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    texes.value = dataPro[i].texes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });

    submit.onclick = function() {
        if (mood === 'update') {
            dataPro[tmp] = {
                title: title.value,
                price: price.value,
                texes: texes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                count: count.value,
                category: category.value,
            };
            localStorage.setItem('product', JSON.stringify(dataPro));
            mood = 'create';
            submit.innerHTML = 'Create';
            clearData();
            showData();
            window.location.reload();
            
        }
    };
}

// search
let searchMood = 'title';

function getsearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'Category';
    }
    search.placeholder = 'search By ' + searchMood;
    search.focus()
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i =0; i < dataPro.length;i++ ){
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].texes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id = "update" >Update</button></td>
                    <td><button onclick="deleteData(${i})" id = "delete" >Delete</button></td>
                </tr>
                `;



            }
        }
    }
    
    else{
        for(let i =0; i < dataPro.length;i++ ){
            if(dataPro[i].category.includes(value.toLowerCase())){
                
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].texes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id = "update" >Update</button></td>
                    <td><button onclick="deleteData(${i})" id = "delete" >Delete</button></td>
                </tr>
                `;
            }
        }
      
        
    }
    document.getElementById('tbody').innerHTML = table;
}


// clean data
function cleanData() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
};
function goBack() {
    window.history.back();
};

  