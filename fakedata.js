const { faker } = require('@faker-js/faker/locale/he')

function generateData() {
    const users = []
    const posts = []
    const comments = []
    const photos = []

    //gen users
    for (let index = 1; index <= 10; index++) {
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
    //gen posts
    for (let index = 1; index <= 100; index++) {
        const title = faker.lorem.sentence()
        const body = faker.lorem.sentences(2, '\n')
        const userId = getRandom(users)
        const publishedOn = faker.date.past()
        const image = faker.image.urlLoremFlickr({ width: 128, height: 128 })

        const post = {
            id: index,
            title,
            body,
            userId,
            publishedOn,
            image
        }

        posts.push(post)
    }

    //gen comments
    for (index = 1; index <= 50; index++) {
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const body = faker.lorem.sentences(2, '\n')
        const postId = getRandom(posts)

        const comment = {
            "id": index,
            postId,
            name,
            email,
            body
        }
        comments.push(comment)
    }
    //gen images?
    for (index = 1; index <= 50; index++) {
        const title = faker.lorem.sentence()
        const url = faker.image.urlLoremFlickr({ width: 400, height: 400 })
        const thumbnailUrl = faker.image.urlLoremFlickr({ width: 128, height: 128 })
        const postId = getRandom(posts)

        const photo = {
            "id": index,
            postId,
            title,
            thumbnailUrl,
            url
        }

        photos.push(photo)

    }
    return { "users": users, "posts": posts, "comments": comments, "photos": photos }
}

function getRandom(array, field = "id") {
    const rndITem = array[~~(Math.random() * array.length)]
    if (rndITem && field)
        return rndITem[field]
    return field;
}

module.exports = generateData
