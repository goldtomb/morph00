const _style = document.createElement('style');
const _template = document.createElement('template');

// styles template
_style.innerHTML = `
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

body {
    background: white;
}

header {
    background: tan;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
}

.logo {
    font-size: 1.6rem;
    font-weight: bold;
    color: #efefef;
}

.dropdown-tog {
    display: none;
}

.nav-bar .nav-items {
    display: flex;

    list-style: none;
    text-decoration: none;
}

.nav-bar .nav-items .nav-item .nav-link {
    display: block;
    color: #efefef;
    font-size: 1.3rem;
    padding: 5px 25px;
    border-radius: 50px;
    transition: 0.2s;
    margin: 0 5px;
    text-decoration: none;
}

.nav-bar .nav-items .nav-item .nav-link:hover {
    color: gray;
    background: #efefef;
}

.nav-bar .nav-items .nav-item .nav-link.active {
    color: gray;
    background: #efefef;
}

@media only screen and (max-width:1320px) {
    header {
        padding: 0 50px;
    }
}

@media only screen and (max-width:1100px) {
    header {
        padding: 0 30px;
    }
}

@media only screen and (max-width:900px) {
    .dropdown-tog {
        display: block;
        cursor: pointer;
    }
    .dropdown-tog .line {
        width: 30px;
        height: 3px;
        background: #efefef;
        margin: 6px 0;
    }
    .nav-bar {
        height: 0;
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        width: 100%;
        background: tan;
        transition: 0.5s;
        overflow: hidden;
    }
    .nav-bar.active {
        height: 450px;
    }
    .nav-bar .nav-items {
        display: block;
        width: fit-content;
        margin: 80px auto 0 auto;
        text-align: center;
        transition: 0.5s;
        opacity: 0;
    }
    .nav-bar.active .nav-items {
        opacity: 1;
    }
    .nav-bar .nav-items .nav-item .nav-link {
        margin-bottom: 12px;
    }
}
`;

//innerHTML template
_template.innerHTML = `
<header>
    <div class="logo">MORPH</div>
    <div class="dropdown-tog">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
    <div class="nav-bar">
        <ul class="nav-items">
            <li class="nav-item">
                <a href="/index.html" class="nav-link">home</a>
            </li>
            <li class="nav-item">
                <a href="/about.html" class="nav-link">about</a>
            </li>
            <li class="nav-item">
                <a href="/contact.html" class="nav-link">contact</a>
            </li>
        </ul>
    </div>
</header>
`;

// create custom element extends HTMLElement Class
class NavBarComponent extends HTMLElement {

    //create object and set properties
    constructor() {
        //super inherits features of the class
        super();

        //create shadowDOM
        this.attachShadow({ mode: 'open' });

        //append styles and template to shadowDOM
        this.shadowRoot.append(_style);
        this.shadowRoot.append(_template.content.cloneNode(true));


    }

    // On start up, include onClick method to dropdown-tog button
    connectedCallback() {
        // Select dropdown-tog button
        this.shadowRoot.querySelector('.dropdown-tog')
            // OnClick run toggleActive method
            .addEventListener('click', (e) => {
                this.toggleActive();
            });

        // Set active class on nav-items
        // based on current page
        this.setActiveLink();
    }

    // toggle active class on nav-bar
    // allows it to open nav when toggler is clicked
    toggleActive() {
        this.shadowRoot.querySelector('.nav-bar').classList.toggle('active');
    }

    setActiveLink() {
        // Get current pathname from url
        const activeLink = window.location.pathname;

        // Get all Nav Links
        // selectLinks returns an array of all nav-links
        const selectLinks = this.shadowRoot.querySelectorAll('.nav-link')

        // iterate through selectLinks array
        for (var i = 0; i < selectLinks.length; i++) {

            // store nav-link value
            var link = selectLinks[i];

            // if current link in iteration matches activeLink
            // set active class on that nav-link
            if (link.getAttribute('href') === activeLink) {
                link.classList.add('active');
            }
        }
    }
}

customElements.define('nav-bar', NavBarComponent);