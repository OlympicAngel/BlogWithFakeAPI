const { faker } = require('@faker-js/faker/locale/he')

function generateData() {
    const users = []
    const posts = []
    const comments = []
    const photos = []

    let index = 0

    for (index = 1; index <= 11; index++) {
        const fullname = faker.person.fullName()
        const username = faker.internet.userName()
        const email = faker.internet.email()
        const phone = faker.phone.number()
        const website = faker.internet.url()

        const user = {
            "id": index,
            "name": fullname,
            "username": username,
            "email": email,
            "website": website,
            "phone": phone
        }

        users.push(user)

    }

    let cnt = 1;
    while (cnt <= 100) {
        const title = faker.lorem.sentence()
        const body = faker.lorem.sentences(2, '\n')
        const userId = getRandomUserId()
        const publishedOn = faker.date.anytime()

        const post = {
            id: cnt,
            title,
            body,
            userId,
            publishedOn
        }

        posts.push(post)

        cnt++
    }


    for (index = 1; index <= 50; index++) {
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const body = faker.lorem.sentences(2, '\n')
        const postId = getRandomPostId()

        const comment = {
            "id": index,
            postId,
            name,
            email,
            body
        }

        comments.push(comment)

    }

    for (index = 1; index <= 50; index++) {

        const title = faker.lorem.sentence()
        const url = faker.image.urlLoremFlickr({ width: 400, height: 400 })
        const thumbnailUrl = faker.image.urlLoremFlickr({ width: 128, height: 128 })
        const postId = getRandomPostId()

        const photo = {
            "id": index,
            postId,
            title,
            thumbnailUrl,
            url
        }

        photos.push(photo)

    }


    function getRandomUserId() {
        // return faker.number.int({ min: 1, max: 11 })
        // return Math.ceil(Math.random() * users.length)
        return users[Math.ceil(Math.random() * users.length)]?.id
    }

    function getRandomPostId() {
        // return faker.number.int({ min: 1, max: 11 })
        // return Math.ceil(Math.random() * users.length)
        return posts[Math.ceil(Math.random() * posts.length)]?.id
    }


    return { "users": users, "posts": posts, "comments": comments, "photos": photos }

}


module.exports = generateData
