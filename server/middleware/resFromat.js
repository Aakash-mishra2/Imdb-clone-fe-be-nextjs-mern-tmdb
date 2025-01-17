const genResponseFromat = (id, email, created_at, token) => {
    const obj = {
        status: true,
        content: {
            data: {
                id, email, created_at
            }
        },
        meta: {
            access_token: token
        }
    }
    return obj;
}

export default genResponseFromat;