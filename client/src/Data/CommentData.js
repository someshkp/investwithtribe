export const getComments = async() => {
    return [
        {
            id: "1",
            body:"first comment",
            username: "jack",
            userId: "1",
            parentId: null,
        },
        {
            id: "2",
            body:"second comment",
            username: "john",
            userId: "1",
            parentId: null,
        },
        {
            id: "3",
            body:"first comment first child",
            username: "john",
            userId: "2",
            parentId: "1",
        },
        {
            id: "4",
            body:"second comment second child",
            username: "mack",
            userId: "2",
            parentId: "2",
        },
    ]
}