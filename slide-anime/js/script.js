'use strict';

const images = [
    { 'id': '1', 'url': './img/berserk.jpg' },
    { 'id': '2', 'url': './img/Hunter-x-hunter.jpeg' },
    { 'id': '3', 'url': './img/jojo.png' },
    { 'id': '4', 'url': './img/kill_la_kill.jpeg' },
    { 'id': '5', 'url': './img/One_piece.jpg' },
    { 'id': '6', 'url': './img/yuyuhakusho.jpg' },
]

const containerItems = document.querySelector('#container-items');
const containerIndicators = document.querySelector('.indicators');

const createIndicators = (images, container) => {
    images.forEach ( image => {
        container.innerHTML += `<span data-number=${image.id}>${image.id}</span>`
    })
}

const loadImages = ( images, container ) => {
    images.forEach ( image => {
        container.innerHTML += `
            <div class='item' data-number=${image.id}>
                <img src='${image.url}'
            </div>
        `
    })
}

loadImages( images, containerItems );
createIndicators(images, containerIndicators);

let items = document.querySelectorAll('.item');

const removeClassSelected = () => {
    const indicators = document.querySelectorAll('span');
    indicators.forEach( indicator => indicator.classList.remove ('selected'));
} 

const selectIndicator = (number) => {
    removeClassSelected();
    const indicator = document.querySelector(`span[data-number="${number}"]`)
    indicator.classList.add('selected')
} 

const previous = () => {
    containerItems.appendChild(items[0]);
    items = document.querySelectorAll('.item');
    selectIndicator (items[1].dataset.number)
}

const next = () => {
    const lastItem = items[items.length - 1];
    containerItems.insertBefore( lastItem, items[0] );
    items = document.querySelectorAll('.item');
    selectIndicator (items[1].dataset.number)
}




const clickIndicators = ({target}) => {

    if ( target.tagName == 'SPAN') {
        const selectedIndicator = target.dataset.number;
        let visibleSlide = items[1].dataset.number
        if (selectedIndicator !== visibleSlide){
            
            const autoNext = setInterval ( () => {
                document.querySelector('#next').click();
                visibleSlide = items[1].dataset.number;
                if (selectedIndicator == visibleSlide) clearInterval(autoNext);
            }, 100);
        }
    }

}

document.querySelector('#previous').addEventListener('click', previous);
document.querySelector('#next').addEventListener('click', next);
document.getElementById('indicators').addEventListener('click',clickIndicators);
