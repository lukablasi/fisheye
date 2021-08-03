//API request
const api = '/data.json';

function makeRequest() {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', api);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    console.log('Oooops, something went wrong');
                }
            }
        }
    }
    );
}

async function requestData() {
    const response = await makeRequest();
    const photographers = response.photographers;
    const pictures = response.media;

    const location = String(window.location.href).split('=')[1];

    const mainContainer = document.querySelector('main');
    const phoInfo = document.getElementById('photographer-info');
    const phoWork = document.getElementById('photographer-work');

    const name = document.createElement('h1');
    const details = document.createElement('div');
    const localization = document.createElement('div');
    const phrase = document.createElement('div');
    const tagList = document.createElement('ul');
    const contactMe = document.createElement('button');
    const phoImage = document.createElement('img');
    const info = document.createElement('div');
    const likes = document.createElement('div');
    const rate = document.createElement('div');

    phoInfo.appendChild(name);
    phoInfo.appendChild(details);
    details.appendChild(localization);
    details.appendChild(phrase);
    phoInfo.appendChild(tagList);
    phoInfo.appendChild(contactMe);
    phoInfo.appendChild(phoImage);
    mainContainer.appendChild(info);
    info.appendChild(likes);
    info.appendChild(rate);

    

    for (let photographer of photographers) {
        if(location.includes(photographer.id)) {
            name.innerHTML = photographer.name;
            localization.innerHTML = photographer.city + ', ' + photographer.country;
            phrase.innerHTML = photographer.tagline;
            for (let tag of photographer.tags) {
                const tagItem = document.createElement('li');
                const tagLink = document.createElement('a');

                tagList.appendChild(tagItem);
                tagItem.appendChild(tagLink);

                tagLink.setAttribute('href', '#');
                tagLink.innerHTML = '#' + tag;
            }
            contactMe.innerHTML = 'Contact Me';
            phoImage.setAttribute('src', '/photos/Photographers ID Photos/' + photographer.portrait);
            likes.setAttribute('id', 'total-likes');
            likes.innerHTML = '0';
            rate.innerHTML = photographer.price + '$ / Day';
            info.classList.add('info');
        }
    }
    details.classList.add('details');
    localization.classList.add('localization');
    phrase.classList.add('tagline');
    let totalLikes = 0;

    for (let picture of pictures) {
        if(location.includes(picture.photographerId)) {
            const imageContainer = document.createElement('div');
            const imageLink = document.createElement('a');
            const image = document.createElement('img');
            const video = document.createElement('video');
            const videoSource = document.createElement('source');
            const imageTitle = document.createElement('p');
            const imageLikes = document.createElement('p');

            phoWork.appendChild(imageContainer);
            imageContainer.appendChild(imageLink);
            if (picture.image) {
                imageLink.appendChild(image);
                
                image.setAttribute('src', '/photos/' + picture.photographerId + '/' + picture.image);
            } else {
                imageLink.appendChild(video);
                video.appendChild(videoSource);
                videoSource.setAttribute('src', '/photos/' + picture.photographerId + '/' + picture.video);
            }
            imageContainer.appendChild(imageTitle);
            imageContainer.appendChild(imageLikes);
            imageLink.setAttribute('href', '#');
            imageLink.classList.add('image-link');
            imageContainer.classList.add('image-container');
            
            imageTitle.innerHTML = picture.title;
            imageTitle.classList.add('title');
            imageLikes.innerHTML = picture.likes + ' ' + '<img class="likes-button" src="heart.svg">';
            imageLikes.classList.add('likes');

            totalLikes = totalLikes + picture.likes;
            likes.innerHTML = totalLikes;
            
        }
    }
    const likesButtons = document.getElementsByClassName('likes-button');
    for (let likesButton of likesButtons) {
        likesButton.addEventListener('click', e => {
            parentElement = e.target.parentElement.innerHTML;
            currentNumber = parentElement.split(' ')[0];
            currentNumber = Number(currentNumber);
            newNumber = currentNumber + 1;
            parentElement = e.target.parentElement;
            parentElement.innerHTML = newNumber + '<img class="likes-button" src="heart.svg">';
            totalLikes = totalLikes + 1;
            likes.innerHTML = totalLikes
        })
    }
    

}
requestData()