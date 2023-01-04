
class AuthControllers {
    
    async logout(req, res, next) {
        const user = req.user
        if (user && user.email) {
            req.session.destroy(err => {
                if (!err) {
                    res.render(path.join(process.cwd(), 'Public/views/pages/logout.ejs'), { email: user.email })
                } else {
                    res.redirect('/')
                }
            })
        } else {
            res.redirect('/')
        }
    }
}

module.exports = new AuthControllers();