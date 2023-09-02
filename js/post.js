(async () => {
    //get id from url
    const url = new URL(location.href);
    const postID = url.searchParams.get("id");
    //if id isnt good - exit
    if (!postID || isNaN(postID))
        return window.location = "/";


    const res = await fetch("http://localhost:3000/posts/" + postID + "?_expand=user&_embed=comments")
    //if response error with api call
    if (res.status != 200)
        return window.location = "/";

    const postData = await res.json();

    //load h1 view
    mainTitle.innerText = postData.title
    //load page title
    document.title += " " + postData.title
    //set bg image
    document.querySelector(".masthead").setAttribute("style", `background:url('${postData.image.replace("300/300", window.outerWidth + "/" + window.outerWidth)}') 50% 50%; background-size: cover`);


    const monthNames = ["ינואר", "בפרואר", "מרץ", "אפריל", "מאי", "יוני",
        "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
    const postDate = new Date(postData.publishedOn);
    const formatedDate = `${postDate.getUTCDate()} ${monthNames[postDate.getMonth()]} , ${postDate.getFullYear()}`;

    let htmlParts = [`        <div class="row">
            <div class="col-12 col-sm-8">
                ${postData.body.replaceAll(/\n/g, "<br>")}
            </div>
            <div class="col col-12 col-sm-4 text-center opacity-75">
                <p>
                    מאת: <a href="#!">${postData.user.name}</a>.<br>
                    <a href="${postData.user.website}">${postData.user.website}</a>
                </p>

            </div>
            <p class="fst-italic fw-lighter opacity-50"> <br>-${formatedDate}.</p>
        </div>
        <h3>תגובות:</h3>
        `]

    postData?.comments.forEach(c => htmlParts.push(`<div class="card p-3">
        <p class="fst-italic m-0"><span class="fw-bold text-decoration-underline fs-4">${c.name}:</span><br>${c.body}</p>
    </div>`))

    postBody.innerHTML = htmlParts.join("")
})()

