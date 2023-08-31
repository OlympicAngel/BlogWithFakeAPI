const loadPosts = async (page = 0) => {
    const postPerLoad = 500
    const res = await fetch(`http://localhost:3000/posts?&_page=${page}&_limit=${postPerLoad}&_sort=publishedOn&_order=asc`);
    posts = await res.json();

    //empty html
    if (page == 0)
        postBody.innerHTML = ""

    //show only 10 post
    posts.splice(10)

    posts.forEach(async post => {
        if (post.userId == undefined)
            return console.log("post with no user id?", post)

        //get auther user data
        const userFetch_res = await fetch("http://localhost:3000/users/" + post.userId);
        const userFetch = await userFetch_res.json();

        //convert time stamp
        const monthNames = ["ינואר", "בפרואר", "מרץ", "אפריל", "מאי", "יוני",
            "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
        const postDate = new Date(post.publishedOn);
        const formatedDate = `${postDate.getUTCDate()} ${monthNames[postDate.getMonth()]} , ${postDate.getFullYear()}`;

        //html structure
        const div = document.createElement("div");
        div.className = "post-preview";
        div.innerHTML = `
                        <a href="post.html">
                            <h2 class="post-title">${post.title}</h2>
                            <h3 class="post-subtitle">${post.body.split("\n")[0]}..</h3>
                        </a>
                        <p class="post-meta">
                            פורסם על ידי
                            <a href="#!">${userFetch.name || "unknown"}</a>
                            בתאריך ${formatedDate}
                        </p>`
        postBody.appendChild(div)

    });
}

loadPosts()
