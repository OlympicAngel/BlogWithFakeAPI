/**@type {HTMLDivElement} */
let lastPostDiv;
let page = 1;
const loadPosts = async () => {
    const postPerLoad = 5
    const res = await fetch(`http://localhost:3000/posts?&_page=${page}&_limit=${postPerLoad}&_sort=publishedOn&_order=asc&_expand=user`);
    posts = await res.json();

    //empty html
    if (page <= 1)
        postBody.innerHTML = ""


    for (let post of posts) {
        //convert time stamp
        const monthNames = ["ינואר", "בפרואר", "מרץ", "אפריל", "מאי", "יוני",
            "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
        const postDate = new Date(post.publishedOn);
        const formatedDate = `${postDate.getUTCDate()} ${monthNames[postDate.getMonth()]} , ${postDate.getFullYear()}`;

        //html structure
        const div = document.createElement("div");
        div.className = "post-preview row";
        div.innerHTML = `<div class="col col-12 col-md-3">
                            <image src="${post.image}" class="container-fluid" alt="${post.title} by ${post?.user?.name || "unknown"}">
                        </div>
                        <div class="col col-12 col-md-9">
                            <a href="post.html?id=${post.id}">
                                <h2 class="post-title">${post.title}</h2>
                                <h3 class="post-subtitle">${post.body.split("\n")[0].substring(0, 60)}..</h3>
                            </a>
                            <p class="post-meta">
                                פורסם על ידי
                                <a href="#!">${post?.user?.name || "unknown"}</a>
                                בתאריך ${formatedDate}
                            </p>
                        </div>`
        postBody.appendChild(div);
    }
    lastPostDiv = postBody.lastChild;
}

loadPosts()

document.body.onscroll = async (e) => {
    if (!lastPostDiv)
        return;
    if (window.innerHeight + window.scrollY >= lastPostDiv.offsetTop + lastPostDiv.offsetHeight) {
        lastPostDiv = undefined; //nullify the last post - blocking from the user to trigger scroll even more

        //temp lock scroll updates for 1H
        lastScrollLoad = Date.now() + 1000 * 60 * 60;

        //add loading animation
        const loadingIcon = document.createElement("i");
        loadingIcon.className = "fa-solid fa-spinner fa-spin-pulse"
        loadingIcon.style = `font-size: 3em; margin: auto; display: block;`
        postBody.appendChild(loadingIcon);

        await sleep(500) //let the loading animation run to the user

        page++; //loading next page of posts
        await loadPosts() //API & page update (also sets `lastPostDiv`)

        postBody.querySelector("& > .fa-spin-pulse")?.remove();//removes the loading animation

    }
}

const sleep = (ms) => new Promise(res => setTimeout(res, ms))